import {assert} from 'chai';

import {useEnvironment} from './helpers';

describe('Integration tests examples', function () {
  describe('Hardhat Runtime Environment extension', function () {
    useEnvironment('hardhat-project');

    it('It should get the Contract by deployment name', async function () {
      await this.env.deployments.fixture(['Test']);
      const contract = await this.env.ethers.getContract('Test');
      assert.isNotNull(contract);
    });
  });
});
