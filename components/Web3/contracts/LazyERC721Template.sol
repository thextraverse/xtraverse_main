// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interfaces/INFTContractTemplate.sol";
import "./ERC2981Royalties.sol";

contract LazyERC721Template is
  ERC721URIStorage,
  EIP712,
  AccessControl,
  INFTContractTemplate,
  ERC2981Royalties,
  Ownable,
  Pausable,
  ReentrancyGuard
{
  using ECDSA for bytes32;

  uint public mintPrice;
  uint public maxItems;
  address public creator;
  uint public royaltyCut;
  uint public devCut;
  string public _baseTokenURI;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  mapping(address => uint256) private pendingWithdrawals;

  uint private constant BP_DIVISOR = 10000; // 100%

  /// @notice Represents an un-minted NFT, which has not yet been recorded into the blockchain. A signed voucher can be redeemed for a real NFT using the redeem function.
  struct NFTVoucher {
    /// @notice The id of the token to be redeemed. Must be unique - if another token with this ID already exists, the redeem function will revert.
    uint256 tokenId;
    /// @notice The minimum price (in wei) that the NFT creator is willing to accept for the initial sale of this NFT.
    uint256 minPrice;
    /// @notice The metadata URI to associate with this token.
    string uri;
  }

  // Mapping from an address to manage and control states
  mapping(address => bool) public controllers;

  modifier onlyController() {
    require(controllers[msg.sender], "Only controller can execute");
    _;
  }

  constructor(
    string memory tokenName_,
    string memory tokenSymbol_,
    uint maxItems_,
    uint mintPrice_,
    address creator_,
    uint royaltyCut_,
    uint devCut_,
    string memory baseTokenURI_
  ) ERC721(tokenName_, tokenSymbol_) EIP712("NFT-Voucher", "1") {
    maxItems = maxItems_;
    mintPrice = mintPrice_;
    creator = creator_;
    royaltyCut = royaltyCut_;
    devCut = devCut_;
    _baseTokenURI = baseTokenURI_;
  }

  /// @notice Redeems an NFTVoucher for an actual NFT, creating it in the process.
  /// @param redeemer The address of the account which will receive the NFT upon success.
  /// @param voucher An NFTVoucher that describes the NFT to be redeemed.
  /// @param signature An EIP712 signature of the voucher, produced by the NFT creator.
  function redeem(
    address redeemer,
    NFTVoucher calldata voucher,
    bytes memory signature
  ) external payable returns (uint256) {
    // make sure signature is valid and get the address of the signer
    address signer = _verify(voucher, signature);

    // make sure that the signer is authorized to mint NFTs
    require(hasRole(MINTER_ROLE, signer), "Signature invalid or unauthorized");

    // make sure that the redeemer is paying enough to cover the buyer's cost
    require(msg.value >= voucher.minPrice, "Insufficient funds to redeem");

    // first assign the token to the signer, to establish provenance on-chain
    _mint(signer, voucher.tokenId);
    _setTokenURI(voucher.tokenId, voucher.uri);

    // transfer the token to the redeemer
    _transfer(signer, redeemer, voucher.tokenId);

    // record payment to signer's withdrawal balance
    pendingWithdrawals[signer] += msg.value;

    return voucher.tokenId;
  }

  function pendingWithdraw() external {
    require(
      hasRole(MINTER_ROLE, msg.sender),
      "Only authorized minters can withdraw"
    );

    // IMPORTANT: casting msg.sender to a payable address is only safe if ALL members of the minter role are payable addresses.
    address payable receiver = payable(msg.sender);

    uint amount = pendingWithdrawals[receiver];
    // zero account before transfer to prevent re-entrancy attack
    pendingWithdrawals[receiver] = 0;
    receiver.transfer(amount);
  }

  function availableToWithdraw() public view returns (uint256) {
    return pendingWithdrawals[msg.sender];
  }

  /// @notice Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
  /// @param voucher An NFTVoucher to hash.
  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(
            keccak256(
              "NFTVoucher(uint256 tokenId,uint256 minPrice,string uri)"
            ),
            voucher.tokenId,
            voucher.minPrice,
            keccak256(bytes(voucher.uri))
          )
        )
      );
  }

  /// @notice Verifies the signature for a given NFTVoucher, returning the address of the signer.
  /// @dev Will revert if the signature is invalid. Does not verify that the signer is authorized to mint NFTs.
  /// @param voucher An NFTVoucher describing an unminted NFT.
  /// @param signature An EIP712 signature of the given voucher.
  function _verify(NFTVoucher calldata voucher, bytes memory signature)
    internal
    view
    returns (address)
  {
    bytes32 digest = _hash(voucher);
    return digest.toEthSignedMessageHash().recover(signature);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControl, ERC721, ERC165Storage)
    returns (bool)
  {
    return
      ERC721.supportsInterface(interfaceId) ||
      AccessControl.supportsInterface(interfaceId);
  }

  // OWNERABLE FUNCTIONS

  function setMintPrice(uint _mintPrice) external onlyController {
    mintPrice = _mintPrice;
  }

  function setMaxItems(uint _maxItems) external onlyController {
    maxItems = _maxItems;
  }

  function setCreator(address _creator) external onlyController {
    creator = _creator;
  }

  function setRoyaltyCut(uint _royaltyCut) external onlyController {
    royaltyCut = _royaltyCut;
  }

  function setBaseTokenURI(string memory __baseTokenURI) public onlyController {
    _baseTokenURI = __baseTokenURI;
  }

  function addController(address controller_) external onlyOwner {
    controllers[controller_] = true;
  }

  function removeController(address controller_) external onlyOwner {
    controllers[controller_] = false;
  }

  function setDevCut(uint _devCut) external onlyOwner {
    devCut = _devCut;
  }

  function pauseMint() external onlyOwner {
    _pause();
  }

  function unpauseMint() external onlyOwner {
    _unpause();
  }

  /**
   * @dev Withdraw the contract balance to the administrator address
   */
  function withdraw(address treasury) external onlyOwner {
    uint amount = address(this).balance;
    uint fee = (amount * devCut) / BP_DIVISOR;
    (bool success, ) = treasury.call{value: fee}("");
    require(success, "Failed to send ether to treasury");
    (success, ) = creator.call{value: (amount - fee)}("");
    require(success, "Failed to send ether to creator");
  }

  // METADATA FUNCTION
  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    return string(abi.encodePacked(_baseTokenURI, Strings.toString(_tokenId)));
  }
}
