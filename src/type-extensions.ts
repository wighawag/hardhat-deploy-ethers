import 'hardhat/types/config';
import 'hardhat/types/runtime';
import '@nomiclabs/hardhat-ethers/types';
import type * as ethers from 'ethers';
import type {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

import type {getContractFactoryWithSignerAddress} from './types';

declare module '@nomiclabs/hardhat-ethers/types' {
  interface HardhatEthersHelpers {
    getContractFactoryWithSignerAddress: typeof getContractFactoryWithSignerAddress;
    getContractAtWithSignerAddress: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nameOrAbi: string | any[],
      address: string,
      signer: string
    ) => Promise<ethers.Contract>;
    getSignerOrNull: (address: string) => Promise<SignerWithAddress | null>;
    getNamedSigners: () => Promise<Record<string, SignerWithAddress>>;
    getNamedSigner: (name: string) => Promise<SignerWithAddress>;
    getNamedSignerOrNull: (name: string) => Promise<SignerWithAddress | null>;
    getUnnamedSigners: () => Promise<SignerWithAddress[]>;
    getContract: (name: string, signer?: ethers.Signer | string) => Promise<ethers.Contract>;
    getContractOrNull: (name: string, signer?: ethers.Signer | string) => Promise<ethers.Contract | null>;
  }
}
