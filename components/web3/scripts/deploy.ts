/* eslint-disable no-console */

import { parseEther } from 'ethers/lib/utils'
import { ethers } from 'hardhat'
import { NFTFactory } from '../typechain/NFTFactory'

const ADMIN_WALLET = process.env.ADMIN_WALLET || ''
const TREASURY_WALLET = '0x8c8221Aced0201eCEDb308dF9fD9f7CCB58FDE19'

const BASE_TOKEN_URI = ''

async function main() {
  const NFTFactory = await ethers.getContractFactory('NFTFactory')

  console.log('Starting deployments...')
  const nftFactory = (await NFTFactory.deploy(TREASURY_WALLET)) as NFTFactory
  await nftFactory.deployed()
  console.log('NFTFactory contract is deployed to:', nftFactory.address)
  const salt = ethers.utils.keccak256([0x0])

  const tx = await nftFactory.createERC721A(
    'Xtraverse NFT',
    'XTNFT',
    5,
    parseEther('0.01'),
    ADMIN_WALLET,
    200,
    500,
    BASE_TOKEN_URI,
    salt
  )
  await tx.wait()

  console.log('Test ERC721A Contract is deployed.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
