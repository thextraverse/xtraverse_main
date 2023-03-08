// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC721ATemplate.sol";
import "./interfaces/INFTContractTemplate.sol";

contract NFTFactory is Ownable {
  address public treasuryAddress;

  enum NFTContractType {
    ERC721A,
    ERC1155
  }

  event NFTContractCreated(
    address indexed deployer,
    address indexed nftContract,
    NFTContractType indexed nftContractType
  );

  constructor(address treasuryAddress_) {
    treasuryAddress = treasuryAddress_;
  }

  function createERC721A(
    string memory tokenName_,
    string memory tokenSymbol_,
    uint maxItems_,
    uint mintPrice_,
    address creator_,
    uint royaltyCut_,
    uint devCut_,
    string memory baseTokenURI_,
    bytes32 _salt
  ) external onlyOwner {
    ERC721ATemplate newNFTcontract = new ERC721ATemplate{salt: _salt}(
      tokenName_,
      tokenSymbol_,
      maxItems_,
      mintPrice_,
      creator_,
      royaltyCut_,
      devCut_,
      baseTokenURI_
    );
    newNFTcontract.addController(address(this));

    emit NFTContractCreated(
      msg.sender,
      address(newNFTcontract),
      NFTContractType.ERC721A
    );
  }

  function withdraw(address nftContract) external onlyOwner {
    INFTContractTemplate(nftContract).withdraw(treasuryAddress);
  }

  function pauseMint(address nftContract) external onlyOwner {
    INFTContractTemplate(nftContract).pauseMint();
  }

  function unpauseMint(address nftContract) external onlyOwner {
    INFTContractTemplate(nftContract).unpauseMint();
  }

  function setDevCut(address nftContract, uint devCut_) external onlyOwner {
    INFTContractTemplate(nftContract).setDevCut(devCut_);
  }

  function addController(address nftContract, address controller_)
    external
    onlyOwner
  {
    INFTContractTemplate(nftContract).addController(controller_);
  }

  function removeController(address nftContract, address controller_)
    external
    onlyOwner
  {
    INFTContractTemplate(nftContract).removeController(controller_);
  }
}
