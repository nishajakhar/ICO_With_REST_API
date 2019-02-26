const DappToken = artifacts.require("./DappToken.sol");
const DappTokenCrowdsale = artifacts.require("./DappTokenCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  const name = "Santorini";
  const symbol = "Santo";
  const decimals = 18;
  const openingTime = web3.eth.getBlock('latest').timestamp + 2;
  const closingTime = openingTime + 86400 * 20;
  const rate = new web3.BigNumber(1000);
  const wallet = accounts[1];
  const softcap = new web3.BigNumber(5000000000);
  const hardcap = new web3.BigNumber(5000000000000);
  return deployer.then(() => {
    return deployer.deploy(DappToken, name, symbol, decimals, 200000);
  })
.then(() => {
  return deployer.deploy(DappTokenCrowdsale, openingTime, closingTime, rate, wallet, DappToken.address, hardcap, softcap);
})  
  
};
