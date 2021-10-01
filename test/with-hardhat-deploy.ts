import { assert } from "chai";
import { ethers } from "ethers";
import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { Artifact, HardhatRuntimeEnvironment } from "hardhat/types";

import { SignerWithAddress } from "../src/signers";

import { useEnvironment } from "./helpers";

describe("hardhat-deploy plugin", function () {
  describe("hardhat config with external artifacts", function () {
    useEnvironment("hardhat-project-with-hardhat-deploy", "hardhat");

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
  });
});
