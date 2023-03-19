// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./interfaces/INFTContractTemplate.sol";
import "./ERC2981Royalties.sol";

contract ERC721ATemplate is
  ERC721A,
  ERC2981Royalties,
  INFTContractTemplate,
  Ownable,
  Pausable,
  ReentrancyGuard
{
  uint public mintPrice;
  uint public maxItems;
  address public creator;
  uint public royaltyCut;
  uint public devCut;
  string public _baseTokenURI;

  bytes32 public merkleRoot = "";
  mapping(address => uint) public whitelistRemaining;
  mapping(address => bool) public whitelistUsed;

  uint public maxItemsPerTx = 10;
  uint public whitelistAllocation = 3;
  bool public whitelistUsable = false;
  uint public startTimestamp;

  uint private constant BP_DIVISOR = 10000; // 100%

  // Mapping from an address to manage and control states
  mapping(address => bool) public controllers;

  modifier onlyController() {
    require(controllers[msg.sender], "Only controller can execute");
    _;
  }

  modifier mintingStarted() {
    require(startTimestamp != 0, "Start timestamp not set");
    require(block.timestamp >= startTimestamp, "Not open yet");
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
  ) ERC721A(tokenName_, tokenSymbol_) {
    maxItems = maxItems_;
    mintPrice = mintPrice_;
    creator = creator_;
    royaltyCut = royaltyCut_;
    devCut = devCut_;
    _baseTokenURI = baseTokenURI_;
  }

  function mint(uint amount) external payable whenNotPaused nonReentrant {
    // Require nonzero amount
    require(amount > 0, "Can't mint zero");

    // Check proper amount sent
    require(msg.value == amount * mintPrice, "Send proper ETH amount");

    require(totalSupply() + amount <= maxItems, "mint: Sold out");

    _safeMint(msg.sender, amount);

    if (royaltyCut > 0) {
      for (uint i = 0; i < amount; i++) {
        _setTokenRoyalty(currentIndex + i, creator, royaltyCut);
      }
    }
  }

  function whitelistMint(
    uint amount,
    bytes32 leaf,
    bytes32[] memory proof
  ) external payable whenNotPaused nonReentrant {
    require(whitelistUsable, "Whitelist is not allowed");

    // Create storage element tracking user mints if this is the first mint for them
    if (!whitelistUsed[msg.sender]) {
      // Verify that (msg.sender, amount) correspond to Merkle leaf
      require(
        keccak256(abi.encodePacked(msg.sender)) == leaf,
        "Sender don't match Merkle leaf"
      );

      // Verify that (leaf, proof) matches the Merkle root
      require(
        verify(merkleRoot, leaf, proof),
        "Not a valid leaf in the Merkle tree"
      );

      whitelistUsed[msg.sender] = true;
      whitelistRemaining[msg.sender] = whitelistAllocation;
    }

    // Require nonzero amount
    require(amount > 0, "Can't mint zero");

    // Check proper amount sent
    require(msg.value == amount * mintPrice, "Send proper ETH amount");

    require(
      whitelistRemaining[msg.sender] >= amount,
      "Can't mint more than remaining allocation"
    );

    whitelistRemaining[msg.sender] -= amount;
    _mintWithoutValidation(msg.sender, amount);
  }

  function _mintWithoutValidation(address to, uint amount) internal {
    require(
      amount <= maxItemsPerTx,
      "mintWithoutValidation: Surpasses maxItemsPerTx"
    );
    require(
      totalSupply() + amount <= maxItems,
      "mintWithoutValidation: Sold out"
    );

    _safeMint(to, amount);
  }

  function verify(
    bytes32 root,
    bytes32 leaf,
    bytes32[] memory proof
  ) public pure returns (bool) {
    return MerkleProof.verify(proof, root, leaf);
  }

  // OWNERABLE FUNCTIONS

  function setWhitelistUsable(bool _whitelistUsable) external onlyController {
    whitelistUsable = _whitelistUsable;
  }

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

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721A, ERC165Storage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
