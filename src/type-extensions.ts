import 'hardhat/types/config';
import 'hardhat/types/runtime';
import '@nomicfoundation/hardhat-ethers/types';
import type {ethers } from 'ethers';
import type {SignerWithAddress} from '@nomicfoundation/hardhat-ethers/signers';

import type {getContractFactoryWithSignerAddress} from './types';

declare module '@nomicfoundation/hardhat-ethers/types' {
  interface HardhatEthersHelpers {
    getContractFactoryWithSignerAddress: typeof getContractFactoryWithSignerAddress;
    getContractAtWithSignerAddress: <ContractType extends ethers.BaseContract = ethers.BaseContract>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nameOrAbi: string | any[],
      address: string,
      signer: string
    ) => Promise<ContractType>;
    getSignerOrNull: (address: string) => Promise<SignerWithAddress | null>;
    getNamedSigners: () => Promise<Record<string, SignerWithAddress>>;
    getNamedSigner: (name: string) => Promise<SignerWithAddress>;
    getNamedSignerOrNull: (name: string) => Promise<SignerWithAddress | null>;
    getUnnamedSigners: () => Promise<SignerWithAddress[]>;
    getContract: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType>;
    getContractOrNull: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType | null>;
  }
}
