const DappToken = artifacts.require("./DappToken.sol");

module.exports = function(deployer) {
  const name = "Santorini";
  const symbol = "Santo";
  const decimals = 18;
  deployer.deploy(DappToken, name, symbol, decimals, 200000);
  
};
