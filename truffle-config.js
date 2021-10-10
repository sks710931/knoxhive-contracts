var HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = "Walllet private key here";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://data-seed-prebsc-2-s3.binance.org:8545` //RPC URL
        ),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bscMainnet: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://bsc-dataseed1.binance.org`), //RPC URL
      network_id: 56,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    eth: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/12351ae7b81b4899bf671dfc4f732b16`), //RPC URL
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://kovan.infura.io/v3/12351ae7b81b4899bf671dfc4f732b16`), //RPC URL
      network_id: 42,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/12351ae7b81b4899bf671dfc4f732b16`), //RPC URL
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
