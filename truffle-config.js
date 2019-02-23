/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura API
 * keys are available for free at: infura.io/register
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('truffle-hdwallet-provider');
//const infuraKey = "KbQuP7xkP1ZYNhJkUOXF";

//const fs = require('fs');
const mnemonic = "damage world video midnight shock off mushroom rate sample lady gap mention";

 /*fs.readFileSync(".secret").toString().trim(); */

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    
  },
  ropsten:  {
    provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/5cfea0d474d94d178f030574a25eee02"),
    network_id: 3,
    gas: 4500000,
    from : "0xeB68FD34FE20C785b98848D7e78fB2Fb4bC747a5".toLowerCase()
  }
},
  compilers: {
    solc: {
      version: '^0.4.24',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
