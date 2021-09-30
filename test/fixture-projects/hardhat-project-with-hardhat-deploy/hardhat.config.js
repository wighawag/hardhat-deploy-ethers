require("../../../src/internal/index");
require("hardhat-deploy");

module.exports = {
  solidity: "0.5.15",
  networks: {
    hardhat: {
      accounts: [],
    },
  },
  external: {
    contracts: [
      {
        artifacts: "./external/artifacts", // simulates importing external artifacts
      },
    ],
  },
};
