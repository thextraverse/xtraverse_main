/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-extra-semi */
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ERC721ATemplate, NFTFactory } from '../typechain'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { solidityKeccak256 } from 'ethers/lib/utils'

chai.use(solidity)

const BASE_TOKEN_URI = 'URI'
const BP_DIVISOR = 10000
const ERC2981_INTERFACE_ID = '0xc155531d'

const ERC721A_TEST_ARGS = {
  tokenName: 'Xtraverse NFT',
  tokenSymbol: 'XTNFT',
  maxItems: 5,
  mintPrice: parseEther('0.1'),
  creator: '',
  royaltyCut: 200,
  devCut: 500,
  baseTokenURI: BASE_TOKEN_URI,
}

const ERC721A_TEST_NEW_ARGS = {
  maxItems: 3,
  mintPrice: parseEther('0.011'),
  creator: '',
  royaltyCut: 100,
  devCut: 400,
  baseTokenURI: '',
}

describe('NFTFactory', function () {
  let nftFactory: NFTFactory
  let erc721a: ERC721ATemplate
  let deployer: SignerWithAddress
  let treasury: SignerWithAddress
  let nftAdmin: SignerWithAddress
  let nftAdmin2: SignerWithAddress
  let user1: SignerWithAddress

  before(async function () {
    ;[deployer, treasury, nftAdmin, nftAdmin2, user1] = await ethers.getSigners()

    const NFTFactory = await ethers.getContractFactory('NFTFactory')
    nftFactory = (await NFTFactory.deploy(treasury.address)) as NFTFactory
    await nftFactory.deployed()
    ERC721A_TEST_ARGS.creator = nftAdmin.address
    ERC721A_TEST_NEW_ARGS.creator = nftAdmin2.address
  })

  describe('#ERC721ATemplate', function () {
    it('should be able to deploy ERC721A', async function () {
      const ERC721ATemplate = await ethers.getContractFactory('ERC721ATemplate')
      // string memory tokenName_,
      // string memory tokenSymbol_,
      // uint maxItems_,
      // uint mintPrice_,
      // address creator_,
      // uint royaltyCut_,
      // uint devCut_,
      // string memory baseTokenURI_
      const { data: initCode } = ERC721ATemplate.getDeployTransaction(
        ERC721A_TEST_ARGS.tokenName,
        ERC721A_TEST_ARGS.tokenSymbol,
        ERC721A_TEST_ARGS.maxItems,
        ERC721A_TEST_ARGS.mintPrice,
        ERC721A_TEST_ARGS.creator,
        ERC721A_TEST_ARGS.royaltyCut,
        ERC721A_TEST_ARGS.devCut,
        ERC721A_TEST_ARGS.baseTokenURI
      )
      if (!initCode) {
        expect(initCode).to.eq(undefined).reverted('initCode')
        return
      }
      const initCodeHash = ethers.utils.keccak256(initCode)
      const salt = ethers.utils.keccak256([0x0])
      const erc721aAddress = ethers.utils.getCreate2Address(nftFactory.address, salt, initCodeHash)
      erc721a = ERC721ATemplate.attach(erc721aAddress) as ERC721ATemplate
      const deployTx = nftFactory.createERC721A(
        ERC721A_TEST_ARGS.tokenName,
        ERC721A_TEST_ARGS.tokenSymbol,
        ERC721A_TEST_ARGS.maxItems,
        ERC721A_TEST_ARGS.mintPrice,
        ERC721A_TEST_ARGS.creator,
        ERC721A_TEST_ARGS.royaltyCut,
        ERC721A_TEST_ARGS.devCut,
        ERC721A_TEST_ARGS.baseTokenURI,
        salt
      )
      await expect(deployTx)
        .to.emit(nftFactory, 'NFTContractCreated')
        .withArgs(deployer.address, erc721aAddress, 0) // 0 => ERC721A
    })

    it('Should get proper args from the deployed ERC721A', async function () {
      expect(await erc721a.name()).to.eq(ERC721A_TEST_ARGS.tokenName)
      expect(await erc721a.symbol()).to.eq(ERC721A_TEST_ARGS.tokenSymbol)
      expect(await erc721a.maxItems()).to.eq(ERC721A_TEST_ARGS.maxItems)
      expect(await erc721a.mintPrice()).to.eq(ERC721A_TEST_ARGS.mintPrice)
      expect(await erc721a.creator()).to.eq(ERC721A_TEST_ARGS.creator)
      expect(await erc721a.royaltyCut()).to.eq(ERC721A_TEST_ARGS.royaltyCut)
      expect(await erc721a.devCut()).to.eq(ERC721A_TEST_ARGS.devCut)
      expect(await erc721a._baseTokenURI()).to.eq(ERC721A_TEST_ARGS.baseTokenURI)
    })

    it('Should be able to add and remove controller by only owner', async function () {
      await expect(erc721a.connect(nftAdmin).addController(nftAdmin.address)).to.revertedWith(
        'Ownable: caller is not the owner'
      )
      expect(await erc721a.controllers(nftAdmin.address)).to.eq(false)
      await nftFactory.addController(erc721a.address, nftAdmin.address)
      expect(await erc721a.controllers(nftAdmin.address)).to.eq(true)
      await expect(erc721a.connect(nftAdmin).removeController(nftAdmin.address)).to.revertedWith(
        'Ownable: caller is not the owner'
      )
      await nftFactory.removeController(erc721a.address, nftAdmin.address)
      expect(await erc721a.controllers(nftAdmin.address)).to.eq(false)
      await nftFactory.addController(erc721a.address, nftAdmin.address)
    })

    it('Should be able to mint NFTs', async function () {
      await expect(erc721a.connect(user1).mint(0)).to.revertedWith("Can't mint zero")
      await expect(erc721a.connect(user1).mint(2)).to.revertedWith('Send proper ETH amount')
      await expect(erc721a.connect(user1).mint(2, { value: parseEther('0.3') })).to.revertedWith(
        'Send proper ETH amount'
      )
      await expect(erc721a.connect(user1).mint(2, { value: parseEther('0.2') }))
      expect(await ethers.provider.getBalance(erc721a.address)).to.eq(parseEther('0.2'))
      expect(await erc721a.balanceOf(user1.address)).to.eq(2)
      expect(await erc721a.tokenOfOwnerByIndex(user1.address, 0)).to.eq(0)
      expect(await erc721a.tokenOfOwnerByIndex(user1.address, 1)).to.eq(1)
      expect(await erc721a.tokenURI(0)).to.eq(`${ERC721A_TEST_ARGS.baseTokenURI}0`)
      await expect(erc721a.connect(user1).mint(4, { value: parseEther('0.4') })).to.revertedWith(
        'mint: Sold out'
      )
    })

    it('Should be able to change args by only controller', async function () {
      await expect(
        erc721a.connect(nftAdmin2).setMaxItems(ERC721A_TEST_NEW_ARGS.maxItems)
      ).to.revertedWith('Only controller can execute')
      await expect(
        erc721a.connect(nftAdmin2).setMintPrice(ERC721A_TEST_NEW_ARGS.mintPrice)
      ).to.revertedWith('Only controller can execute')
      await expect(
        erc721a.connect(nftAdmin2).setCreator(ERC721A_TEST_NEW_ARGS.creator)
      ).to.revertedWith('Only controller can execute')
      await expect(
        erc721a.connect(nftAdmin2).setRoyaltyCut(ERC721A_TEST_NEW_ARGS.royaltyCut)
      ).to.revertedWith('Only controller can execute')
      await expect(
        erc721a.connect(nftAdmin2).setBaseTokenURI(ERC721A_TEST_NEW_ARGS.baseTokenURI)
      ).to.revertedWith('Only controller can execute')

      await erc721a.connect(nftAdmin).setMaxItems(ERC721A_TEST_NEW_ARGS.maxItems)
      await erc721a.connect(nftAdmin).setMintPrice(ERC721A_TEST_NEW_ARGS.mintPrice)
      await erc721a.connect(nftAdmin).setCreator(ERC721A_TEST_NEW_ARGS.creator)
      await erc721a.connect(nftAdmin).setRoyaltyCut(ERC721A_TEST_NEW_ARGS.royaltyCut)
      await erc721a.connect(nftAdmin).setBaseTokenURI(ERC721A_TEST_NEW_ARGS.baseTokenURI)

      expect(await erc721a.maxItems()).to.eq(ERC721A_TEST_NEW_ARGS.maxItems)
      expect(await erc721a.mintPrice()).to.eq(ERC721A_TEST_NEW_ARGS.mintPrice)
      expect(await erc721a.creator()).to.eq(ERC721A_TEST_NEW_ARGS.creator)
      expect(await erc721a.royaltyCut()).to.eq(ERC721A_TEST_NEW_ARGS.royaltyCut)
      expect(await erc721a._baseTokenURI()).to.eq(ERC721A_TEST_NEW_ARGS.baseTokenURI)
    })

    it('Should be able to change devCut by only owner', async function () {
      await expect(
        erc721a.connect(nftAdmin).setDevCut(ERC721A_TEST_NEW_ARGS.devCut)
      ).to.revertedWith('Ownable: caller is not the owner')

      expect(await erc721a.devCut()).to.eq(ERC721A_TEST_ARGS.devCut)
      await nftFactory.setDevCut(erc721a.address, ERC721A_TEST_NEW_ARGS.devCut)
      expect(await erc721a.devCut()).to.eq(ERC721A_TEST_NEW_ARGS.devCut)
    })

    it('Should be able to withdraw by only owner', async function () {
      await expect(erc721a.connect(nftAdmin).withdraw(nftAdmin.address)).to.revertedWith(
        'Ownable: caller is not the owner'
      )
      const beforeTresaury = await ethers.provider.getBalance(treasury.address)
      const beforeNftAdmin2 = await ethers.provider.getBalance(nftAdmin2.address)
      const amount = await ethers.provider.getBalance(erc721a.address)
      const fee = amount.mul(ERC721A_TEST_NEW_ARGS.devCut).div(BP_DIVISOR)
      await nftFactory.withdraw(erc721a.address)
      const afterTresaury = await ethers.provider.getBalance(treasury.address)
      const afterNftAdmin2 = await ethers.provider.getBalance(nftAdmin2.address)
      expect(afterTresaury.sub(beforeTresaury)).to.eq(fee)
      expect(afterNftAdmin2.sub(beforeNftAdmin2)).to.eq(amount.sub(fee))
    })

    it('Should be able to pause/unpause minting by only owner', async function () {
      await expect(erc721a.connect(nftAdmin).pauseMint()).to.revertedWith(
        'Ownable: caller is not the owner'
      )
      await nftFactory.pauseMint(erc721a.address)
      await expect(
        erc721a.connect(user1).mint(1, { value: ERC721A_TEST_NEW_ARGS.mintPrice })
      ).to.revertedWith('Pausable: paused')
      await expect(erc721a.connect(nftAdmin).unpauseMint()).to.revertedWith(
        'Ownable: caller is not the owner'
      )
      await nftFactory.unpauseMint(erc721a.address)
      await expect(erc721a.connect(user1).mint(1, { value: ERC721A_TEST_NEW_ARGS.mintPrice }))
    })

    it('Should be able to check interface', async function () {
      expect(await erc721a.supportsInterface(ERC2981_INTERFACE_ID)).to.eq(true)
    })
  })
})
