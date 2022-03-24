# About
My note and code for the tutorial at https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13

## Setup

```
npx create-react-app react-dapp
```

<img width="195" alt="Screen Shot 2022-03-23 at 11 27 22 AM" src="https://user-images.githubusercontent.com/595772/159735461-3807f5dc-899e-4ee8-b677-475eb3ac1baa.png">


```
cd react-dapp
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
npx hardhat  # you need to delete the readme from create-react-app
```

new files:
- contacts
- scripts
- test
- hardhat.config.js

<img width="212" alt="Screen Shot 2022-03-23 at 11 30 19 AM" src="https://user-images.githubusercontent.com/595772/159736035-a8e96834-173b-4e8c-8e29-ab7fefe47db0.png">


<img width="562" alt="Screen Shot 2022-03-23 at 11 32 27 AM" src="https://user-images.githubusercontent.com/595772/159736470-8a74229c-5774-4677-b1e4-28c34805ab97.png">

change hardhat.config.js and update the module.exports to look like this:
```
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
```



compile the contracts

```
npx hardhat compile

```

start the local node:

```
npx hardhat node
```

20 test accounts have been created:

```
WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

```

rename `scripts/deploy.js` and deploy the contract to local node - the first account is used to pay the gas fee:

**NOTE: same contract can be deployed multiple times into different addresses**
```
npx hardhat run scripts/deploy.js --network localhost

Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

and the test node terminal console has the output:

```
web3_clientVersion
eth_chainId
eth_accounts
eth_blockNumber
eth_chainId (2)
eth_estimateGas
eth_getBlockByNumber
eth_feeHistory
eth_sendTransaction
  Contract deployment: Greeter
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x7269d154f4fe421d28cd94b0f36485036b4fd82a48d623148c2d61c1484e42b2
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            497026 of 497026
  Block #1:            0x5395d9352ce665c73f7466e73487d13a750cdd1fe99b74c2d90e7cba6727ea8e

  console.log:
    Deploying a Greeter with greeting: Hello, Hardhat!

eth_chainId
eth_getTransactionByHash
eth_chainId
eth_getTransactionReceipt

```

Change contract address in App.js, then test using 

```
npm start
```

click Fetch, you should see the message shown in the Chrome Inspector Console:

<img width="392" alt="Screen Shot 2022-03-23 at 8 11 30 PM" src="https://user-images.githubusercontent.com/595772/159817124-8e7380be-3148-4c12-a558-b8d334284837.png">

import the test account into MetaMask using private key, connect to the React site page and change the greeting by linking to the account and pay the gas fee.

if running into this issue: https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd

Open up your MetaMask window and click on the icon in the top right to display accounts. Go to Settings, then Advanced and hit Reset Account.

if successful, you should see the output in the Chrome console:
<img width="1175" alt="Screen Shot 2022-03-23 at 8 18 24 PM" src="https://user-images.githubusercontent.com/595772/159817397-af42db5d-afe4-4d20-af25-66ad9049dc2b.png">

Testnet

```
npx hardhat run scripts/deploy.js --network rinkeby

Greeter deployed to: 0xa099F014f8D77061A4d6f354DFf0fC1bc02EC663
```

Gas fee is 0.00124 ether

Check at [https://rinkeby.etherscan.io/tx/0xca503b42da23192f3bf70d454a55510ac5ffa06543fbf74115d40d649304cfe0](https://rinkeby.etherscan.io/tx/0xca503b42da23192f3bf70d454a55510ac5ffa06543fbf74115d40d649304cfe0)


after adding the Token contract

```
npx hardhat run scripts/deploy.js --network localhost
You are using a version of Node.js that is not supported by Hardhat, and it may work incorrectly, or not work at all.

Please, make sure you are using a supported version of Node.js.

To learn more about which versions of Node.js are supported go to https://hardhat.org/nodejs-versions
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

The first test account is used to deploy the contract, which will be given 1m HWT token. 

<img width="345" alt="Screen Shot 2022-03-23 at 6 56 56 PM" src="https://user-images.githubusercontent.com/595772/159809978-78be7fe9-7726-49ff-8c35-ba48f51980ad.png">


