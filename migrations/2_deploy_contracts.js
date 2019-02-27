const DappToken = artifacts.require("./DappToken.sol");
const DappTokenCrowdsale = artifacts.require("./DappTokenCrowdsale.sol");

module.exports = function(deployer) {
  const name = "Santorini";
  const symbol = "Santo";
  const decimals = 18;
  const openingTime = 1551312000;
  const closingTime = openingTime + 86400 * 20;
  const rate = new web3.BigNumber(1000);
  const wallet = 0xeB68FD34FE20C785b98848D7e78fB2Fb4bC747a5;
  const softcap = new web3.BigNumber(5000000000);
  const hardcap = new web3.BigNumber(5000000000000);
  return deployer.then(() => {
    return deployer.deploy(DappToken, name, symbol, decimals, 200000);
  })
.then(() => {
  return deployer.deploy(DappTokenCrowdsale, openingTime, closingTime, rate, wallet, DappToken.address, hardcap, softcap);
})  
  
};
