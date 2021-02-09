[![hardhat](https://hardhat.org/buidler-plugin-badge.svg?1)](https://hardhat.org)

# hardhat-deploy-ethers

[Hardhat](https://hardhat.org) plugin extension of hardhat-ethers to support extra feature related to hardhat-deploy plugin

## What

This plugin add extra features on top @nomiclabs : `@nomiclabs/hardhat-ethers for user of hardhat-deploy plugin.

## Installation

```bash
npm install --save-dev hardhat-deploy-ethers ethers @nomiclabs/hardhat-ethers
```

And add the following statement to your `hardhat.config.js`:

```js
require("hardhat-deploy-ethers");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```ts
import "hardhat-deploy-ethers";
```

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This object has add some extra `hardhat-deploy` specific functionalities by adding new extra field to `hre.ethers`

### Helpers

These helpers are added to the `ethers` object:

```typescript
interface Libraries {
  [libraryName: string]: string;
}

interface FactoryOptionsWithSignerAddress {
  signer: string;
  libraries?: Libraries;
}
export function getContractFactoryWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signerOrOptions: string | FactoryOptionsWithSignerAddress
): Promise<ethers.ContractFactory>;
export function getContractFactoryWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  abi: any[],
  bytecode: ethers.utils.BytesLike,
  signer: string
): Promise<ethers.ContractFactory>;
export async function getContractAtWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nameOrAbi: string | any[],
  address: string,
  signer: string
): Promise<ethers.Contract>;

export async function getSignerOrNull(
  hre: HardhatRuntimeEnvironment,
  address: string
): Promise<SignerWithAddress | null>;

export async function getNamedSigners(hre: HardhatRuntimeEnvironment): Promise<Record<string, SignerWithAddress>>;

export async function getNamedSigner(hre: HardhatRuntimeEnvironment, name: string): Promise<SignerWithAddress>;

export async function getNamedSignerOrNull(
  hre: HardhatRuntimeEnvironment,
  name: string
): Promise<SignerWithAddress | null>;

export async function getUnnamedSigners(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]>;

export async function getContract(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signer?: ethers.Signer | string
): Promise<ethers.Contract>;

export async function getContractOrNull(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signer?: ethers.Signer | string
): Promise<ethers.Contract | null>;

```


## Usage

There are no additional steps you need to take for this plugin to work.


```js
const contract = await hre.ethers.getContract('<deploymentName>');
```
