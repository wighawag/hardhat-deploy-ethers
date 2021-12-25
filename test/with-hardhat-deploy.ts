import { assert } from "chai";
import { ethers } from "ethers";
import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { Artifact, HardhatRuntimeEnvironment } from "hardhat/types";

import { SignerWithAddress } from "../src/signers";

import { useEnvironment } from "./helpers";

describe("hardhat-deploy plugin", function () {
  describe("hardhat config with external artifacts", function () {
    useEnvironment("hardhat-project-with-hardhat-deploy", "localhost");

    describe("getContractAt", function () {
      describe("with the name and address", function () {
        it("Should return an instance of a contract", async function () {
          const randomAddress = this.env.ethers.utils.hexlify(
            this.env.ethers.utils.randomBytes(20)
          );
          // it should create instance with external artifacts, even though there is no deployment for the contract
          const contract = await this.env.ethers.getContractAt(
            "Greeter",
            randomAddress
          );

          // it should load abi
          assert.isDefined(contract.functions.greet);
          // it should be attached with same address
          assert.equal(contract.address, randomAddress);
        });
      });
    });

    describe("getContractFactory", function () {
      describe("with external contract builded by hardhat", async function () {
        it("should return a contract factory", async function () {
          const contractFactory = await this.env.ethers.getContractFactory("Greeter");
          const contract = await contractFactory.deploy()
          assert.isDefined(contract)
          assert.isDefined(contract.greet)
        })
      })
      describe("with external contract builded by waffle", async function () {
        it("should return a contract factory", async function () {
          const [signer] = await this.env.ethers.getSigners();
          const contractFactory = await this.env.ethers.getContractFactory('UniswapV2Factory', signer);
          const contract = await contractFactory.deploy(signer.address)
          assert.isDefined(contract)
          assert.isDefined(contract.createPair)
        })
      })
    })
  });
});
