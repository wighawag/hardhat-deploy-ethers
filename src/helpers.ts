import type {ethers} from 'ethers';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import type {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {FactoryOptionsWithSignerAddress} from './types';

export function getContractFactoryWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signerOrOptions: string | FactoryOptionsWithSignerAddress
): Promise<ethers.ContractFactory>;

export function getContractFactoryWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any[],
  bytecode: ethers.utils.BytesLike,
  signer: string
): Promise<ethers.ContractFactory>;

export async function getContractFactoryWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nameOrAbi: string | any[],
  bytecodeOrFactoryOptions?: (string | FactoryOptionsWithSignerAddress) | ethers.utils.BytesLike,
  signer?: string
): Promise<ethers.ContractFactory> {
  let actualSigner: SignerWithAddress;
  if (typeof nameOrAbi === 'string') {
    if (typeof bytecodeOrFactoryOptions === 'string') {
      actualSigner = await hre.ethers.getSigner(bytecodeOrFactoryOptions);
      return hre.ethers.getContractFactory(nameOrAbi, actualSigner);
    }
    const FactoryOptionsWithSignerAddress: FactoryOptionsWithSignerAddress = (bytecodeOrFactoryOptions as unknown) as FactoryOptionsWithSignerAddress;
    actualSigner = await hre.ethers.getSigner(FactoryOptionsWithSignerAddress.signer);
    return hre.ethers.getContractFactory(nameOrAbi, {
      libraries: FactoryOptionsWithSignerAddress.libraries,
      signer: actualSigner,
    });
  }
  actualSigner = await hre.ethers.getSigner(signer as string);
  return hre.ethers.getContractFactory(nameOrAbi, bytecodeOrFactoryOptions as ethers.utils.BytesLike, actualSigner);
}

export async function getContractAtWithSignerAddress(
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nameOrAbi: string | any[],
  address: string,
  signer: string
): Promise<ethers.Contract> {
  const actualSigner = await hre.ethers.getSigner(signer);
  return hre.ethers.getContractAt(nameOrAbi, address, actualSigner);
}

export async function getSignerOrNull(
  hre: HardhatRuntimeEnvironment,
  address: string
): Promise<SignerWithAddress | null> {
  try {
    // TODO do not use try catch
    const signer = await hre.ethers.getSigner(address);
    return signer;
  } catch (e) {
    return null;
  }
}

export async function getNamedSigners(hre: HardhatRuntimeEnvironment): Promise<Record<string, SignerWithAddress>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNamedAccounts = (hre as any).getNamedAccounts;
  if (getNamedAccounts !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const namedAccounts = (await getNamedAccounts()) as any;
    const namedSigners: Record<string, SignerWithAddress> = {};
    for (const name of Object.keys(namedAccounts)) {
      try {
        const address = namedAccounts[name];
        if (address) {
          const signer = await getSignerOrNull(hre, address); // TODO cache ?
          if (signer) {
            namedSigners[name] = signer;
          }
        }
      } catch (e) {}
    }
    return namedSigners;
  }
  throw new Error(`No Deployment Plugin Installed, try 'import "harhdat-deploy"'`);
}

export async function getNamedSigner(hre: HardhatRuntimeEnvironment, name: string): Promise<SignerWithAddress> {
  const signer = await getNamedSignerOrNull(hre, name);
  if (!signer) {
    throw new Error(`no signer for ${name}`);
  }
  return signer;
}

export async function getNamedSignerOrNull(
  hre: HardhatRuntimeEnvironment,
  name: string
): Promise<SignerWithAddress | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNamedAccounts = (hre as any).getNamedAccounts;
  if (getNamedAccounts !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const namedAccounts = (await getNamedAccounts()) as any;
    const address = namedAccounts[name];
    if (!address) {
      throw new Error(`no account named ${name}`);
    }
    const signer = await getSignerOrNull(hre, address);
    if (signer) {
      return signer;
    }
    return null;
  }
  throw new Error(`No Deployment Plugin Installed, try 'import "harhdat-deploy"'`);
}

export async function getUnnamedSigners(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getUnnamedAccounts = (hre as any).getUnnamedAccounts;
  if (getUnnamedAccounts !== undefined) {
    const unnamedAccounts = (await getUnnamedAccounts()) as string[];
    const unnamedSigners: SignerWithAddress[] = [];
    for (const address of unnamedAccounts) {
      if (address) {
        try {
          const signer = await getSignerOrNull(hre, address);
          if (signer) {
            unnamedSigners.push(signer); // TODO cache ?
          }
        } catch (e) {}
      }
    }
    return unnamedSigners;
  }
  throw new Error(`No Deployment Plugin Installed, try 'import "harhdat-deploy"'`);
}

export async function getContract(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signer?: ethers.Signer | string
): Promise<ethers.Contract> {
  const contract = await getContractOrNull(hre, name, signer);
  if (contract === null) {
    throw new Error(`No Contract deployed with name: ${name}`);
  }
  return contract;
}

export async function getContractOrNull(
  hre: HardhatRuntimeEnvironment,
  name: string,
  signer?: ethers.Signer | string
): Promise<ethers.Contract | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deployments = (hre as any).deployments;
  if (deployments !== undefined) {
    const get = deployments.getOrNull;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contract = (await get(name)) as any;
    if (contract === undefined) {
      return null;
    }
    if (typeof signer === 'string') {
      return getContractAtWithSignerAddress(hre, contract.abi, contract.address, signer);
    }
    return hre.ethers.getContractAt(contract.abi, contract.address, signer);
  }
  throw new Error(`No Deployment Plugin Installed, try 'import "harhdat-deploy"'`);
}
