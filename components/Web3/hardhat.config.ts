import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

import 'hardhat-gas-reporter'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-deploy'
import 'solidity-coverage'

import { NetworksUserConfig, HardhatUserConfig } from 'hardhat/types'

const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const INFURA_API_KEY = process.env.INFURA_API_KEY || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const REPORT_GAS = Boolean(process.env.REPORT_GAS)

const networks: NetworksUserConfig = {
  hardhat: {},
  localhost: {},
  coverage: {
    url: 'http://127.0.0.1:8555', // Coverage launches its own ganache-cli client
  },
  goerli: {
    url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
    accounts: [PRIVATE_KEY],
    chainId: 5,
  },
  mainnet: {
    url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    accounts: [PRIVATE_KEY],
    chainId: 1,
  },
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: 'EUR',
    enabled: REPORT_GAS,
    showTimeSpent: true,
  },
  networks,
  mocha: {
    timeout: 200000,
  },
}

if (ETHERSCAN_API_KEY) {
  config.etherscan = {
    apiKey: ETHERSCAN_API_KEY,
  }
}

export default config
