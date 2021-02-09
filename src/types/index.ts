import type * as ethers from 'ethers';
import type {Libraries} from '@nomiclabs/hardhat-ethers/types';

export declare interface FactoryOptionsWithSignerAddress {
  signer: string;
  libraries?: Libraries;
}

export declare function getContractFactoryWithSignerAddress(
  name: string,
  signerOrOptions: string | FactoryOptionsWithSignerAddress
): Promise<ethers.ContractFactory>;
export declare function getContractFactoryWithSignerAddress(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any[],
  bytecode: ethers.utils.BytesLike,
  signer: string
): Promise<ethers.ContractFactory>;
