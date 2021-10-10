const KnoxhiveVault = artifacts.require("KnoxhiveVault");

module.exports = function (deployer) {
  deployer.deploy(KnoxhiveVault, "token address to manage");
};
