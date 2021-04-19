import type EthersT from "ethers";
import { extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";

import { getContractAt, getContractFactory, getSigners, getSigner, getContract, getContractOrNull, getNamedSigners, getNamedSigner, getSignerOrNull, getNamedSignerOrNull, getUnnamedSigners } from "./helpers";
import type * as ProviderProxyT from "./provider-proxy";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.ethers = lazyObject(() => {
    const {
      createProviderProxy,
    } = require("./provider-proxy") as typeof ProviderProxyT;

    const { ethers } = require("ethers") as typeof EthersT;

    const providerProxy = createProviderProxy(hre.network.provider);

    return {
      ...ethers,

      // The provider wrapper should be removed once this is released
      // https://github.com/nomiclabs/hardhat/pull/608
      provider: providerProxy,

      // We cast to any here as we hit a limitation of Function#bind and
      // overloads. See: https://github.com/microsoft/TypeScript/issues/28582
      getContractFactory: getContractFactory.bind(null, hre) as any,
      getContractAt: async <T extends EthersT.Contract>(
        nameOrAbi: string | any[],
        address: string,
        signer?: EthersT.Signer | string
      )=> getContractAt<T>(hre, nameOrAbi, address, signer),
      
      getSigners: async () => getSigners(hre),
      getSigner: async(address) => getSigner(hre, address),
      getSignerOrNull: async(address) => getSignerOrNull(hre, address),

      getNamedSigners: async () => getNamedSigners(hre),
      getNamedSigner: async(name) => getNamedSigner(hre, name),
      getNamedSignerOrNull: async (name) => getNamedSignerOrNull(hre, name),
      getUnnamedSigners: async () => getUnnamedSigners(hre),
  

      getContract: async <T extends EthersT.Contract>(
        name: string,
        signer?: EthersT.Signer | string
      ) => getContract<T>(hre, name, signer),
      getContractOrNull: async <T extends EthersT.Contract>(
        name: string,
        signer?: EthersT.Signer | string
      ) => getContractOrNull<T>(hre, name, signer),
    };
  });
});
