[![hardhat](https://hardhat.org/buidler-plugin-badge.svg?1)](https://hardhat.org)

# hardhat-deploy-ethers

[Hardhat](https://hardhat.org) plugin extension for `@nomicfoundation/hardhat-ethers` and its integration with [ethers.js](https://github.com/ethers-io/ethers.js/).

The extension add support for [hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

## What

## Installation

`hardhat-deploy-ethers` require the installation of `hardhat-deploy` and `@nomicfoundation/hardhat-ethers`

Note that you cannot use `@nomicfoundation/hardhat-toolbox` for installing `@nomicfoundation/hardhat-ethers` as this interfere with the typing extensions provided by `hardhat-deploy-ethers`

```bash
npm install --save-dev @nomicfoundation/hardhat-ethers ethers hardhat-deploy hardhat-deploy-ethers
```

Which means you then add the following statement to your `hardhat.config.js`:

```js
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
``` 

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```ts
import '@nomicfoundation/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

```


Note that if you were using `@nomicfoundation/hardhat-toolbox` you can simply add the dependencies it added for you with

```bash
npm install --save-dev @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-ethers @typechain/hardhat hardhat-gas-reporter solidity-coverage
```

and add them to your hardhat.config.js

```js
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-ethers');
require('@typechain/hardhat');
require('hardhat-gas-reporter');
require('solidity-coverage');
```

or hardhat.config.ts (typescript)

```ts
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
```

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This object has add some extra `hardhat-deploy` specific functionalities to the `hre.ethers` added already by `@nomicfoundation/hardhat-ethers`

### Helpers

These helpers are added to the `ethers` object:

```ts
interface HardhatEthersHelpers {
  getContractAtWithSignerAddress: <ContractType extends ethers.BaseContract = ethers.BaseContract>(nameOrAbi: string | any[], address: string, signer: string) => Promise<ContractType>;
  getSignerOrNull: (address: string) => Promise<SignerWithAddress | null>;
  getNamedSigners: () => Promise<Record<string, SignerWithAddress>>;
  getNamedSigner: (name: string) => Promise<SignerWithAddress>;
  getNamedSignerOrNull: (name: string) => Promise<SignerWithAddress | null>;
  getUnnamedSigners: () => Promise<SignerWithAddress[]>;
  getContract: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType>;
  getContractOrNull: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType | null>;
}
```


## Usage

There are no additional steps you need to take for this plugin to work.


It automatically integrate with the `hardhat-deploy` plugin if detected and let you do the following:

```js
const contract = await hre.ethers.getContract('<deploymentName>');
```
