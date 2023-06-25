import {extendEnvironment} from 'hardhat/config';
import './type-extensions';
import {lazyObject} from 'hardhat/plugins';
import '@nomicfoundation/hardhat-ethers';


import {
  getContractFactoryWithSignerAddress,
  getContractAtWithSignerAddress,
  getSignerOrNull,
  getNamedSigners,
  getNamedSigner,
  getNamedSignerOrNull,
  getUnnamedSigners,
  getContract,
  getContractOrNull,
} from './helpers';
import { ethers } from 'ethers';



extendEnvironment((hre) => {  
  const prevEthers = hre.ethers;
  hre.ethers = lazyObject(() => {
    // We cast to any here as we hit a limitation of Function#bind and
    // overloads. See: https://github.com/microsoft/TypeScript/issues/28582
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevEthers.getContractFactoryWithSignerAddress = getContractFactoryWithSignerAddress.bind(null, hre) as any;
    prevEthers.getContractAtWithSignerAddress = ( nameOrAbi: string | any[],address: string, signer: string) => getContractAtWithSignerAddress(hre, nameOrAbi, address, signer);
    prevEthers.getSignerOrNull = (address) => getSignerOrNull(hre, address);
    prevEthers.getNamedSigners = () => getNamedSigners(hre);
    prevEthers.getNamedSigner = (name) => getNamedSigner(hre, name);
    prevEthers.getNamedSignerOrNull = (name) => getNamedSignerOrNull(hre, name);
    prevEthers.getUnnamedSigners = () => getUnnamedSigners(hre);
    prevEthers.getContract = (name: string, signer?: ethers.Signer | string) => getContract(hre, name, signer);
    prevEthers.getContractOrNull = (name: string, signer?: ethers.Signer | string) => getContractOrNull(hre, name, signer);
    return prevEthers;
  });
});
