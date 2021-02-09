import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '../../../src/index';

import {HardhatUserConfig} from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.3',
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: 'src',
  },
  defaultNetwork: 'hardhat',
};

export default config;
