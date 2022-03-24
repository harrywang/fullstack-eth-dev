# About
My note and code for the tutorial at https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13

## Setup

### Local Node

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

committed and added a git tag `local-greeting`

`git checkout local-greeting` to come to this snapshot.

### Rinkeby Testnet

Get test either from https://rinkebyfaucet.com/

Go to https://www.alchemy.com/ to register an account. Create a new app:

<img width="1224" alt="Screen Shot 2022-03-23 at 8 23 09 PM" src="https://user-images.githubusercontent.com/595772/159817846-50c499e5-0838-4c6f-b255-149aba45c7b3.png">
<img width="796" alt="Screen Shot 2022-03-23 at 8 23 24 PM" src="https://user-images.githubusercontent.com/595772/159817850-789f08da-2bb2-4198-87fa-ca832c8df8cf.png">

```
npm install dotenv --save
```

```
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```

get the private key for the rinkeby test account and put the key in `.env` file which should be gitignored.

```
PRIVATE_KEY='xxxx475819ff278c127f877cf9dc998f0609eb9'
ALCHEMY_URL='https://eth-rinkeby.alchemyapi.io/v2/WDL-ZpOtJ3Yxxx'
```

change `hardhat.config.js`: 

```
module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/0_9y9twl9AjteiyKkWszAFySVqjZioi7",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.4",
};
```
Deploy to rinkeby:

```
npx hardhat run scripts/deploy.js --network rinkeby

Greeter deployed to: 0xd9945E118a2e2a98d68B0778a652EA839129F6ec
```

Gas fee is 0.00124 ether

Check at [https://rinkeby.etherscan.io/tx/0xb702b0cbfd43be4afdbeae29da1165509bbc020632b4930d5e4791a80533930c](https://rinkeby.etherscan.io/tx/0xb702b0cbfd43be4afdbeae29da1165509bbc020632b4930d5e4791a80533930c)

change App.js to the rinkeby address and run `npm start` to test.

Use the Rinkeby account to connect and it should work.

added a git tag: `rinkeby-greeting`.

`git checkout rinkeby-greeting` to get to this point.


### Issue Token on Rinkeby

add the Token contract Token.sol, compile it: `npx hardhat compile`

update the deploy.js file to add the new contract.

(I had to only deploy one contract to avoid this error: `Error: replacement fee too low`)

```
npx hardhat run scripts/deploy.js --network rinkeby
Deploying contracts with the account: xx2d57Fd71dc38BE362ab6f7
Token deployed to: 0xC6f1f574F56F6e484eBA944e39fC00Eecc11fcFf
```

Check out the contract at [https://rinkeby.etherscan.io/address/0xC6f1f574F56F6e484eBA944e39fC00Eecc11fcFf](https://rinkeby.etherscan.io/address/0xC6f1f574F56F6e484eBA944e39fC00Eecc11fcFf)

The account used to deploy the contract get 1M WIT tokens. 

<img width="348" alt="Screen Shot 2022-03-23 at 9 29 46 PM" src="https://user-images.githubusercontent.com/595772/159824071-595b4342-5cbe-44ca-affc-cd6c8bb69ee0.png">
<img width="346" alt="Screen Shot 2022-03-23 at 9 30 20 PM" src="https://user-images.githubusercontent.com/595772/159824078-1288a3eb-5f4f-459d-a774-9e6eda83c540.png">

update App.js with two contacts and then run `npm start`, send 1000 WIT tokens to another account:

<img width="354" alt="Screen Shot 2022-03-23 at 9 51 59 PM" src="https://user-images.githubusercontent.com/595772/159826203-931601c5-7498-4ff6-9d0e-00d54abe3cff.png">
<img width="1047" alt="Screen Shot 2022-03-23 at 9 52 52 PM" src="https://user-images.githubusercontent.com/595772/159826205-fe3d8d0b-a6be-465f-a139-c42ef78480bc.png">

Verify the contract:

Make sure to use the compiler version as specified in `hardhat.config.js`:

<img width="1200" alt="Screen Shot 2022-03-24 at 9 10 31 AM" src="https://user-images.githubusercontent.com/595772/159923293-9d41a55a-66af-44fa-878a-f7e4628ae4a8.png">


committed and added a git tag `rinkeby-token`

`git checkout rinkeby-token` to come to this snapshot.

### Issue ERC20 Token

```
npm install @openzeppelin/contracts
```

a new ERC20 contract, a new deploy script.

```
npx hardhat compile
npx hardhat run scripts/deploy-erc20.js --network rinkeby

Token deployed to: 0xbDb07bB0Bbb0dbD35AcDD20Ac379C192ba2CBcbF
```

Check at [https://rinkeby.etherscan.io/address/0xbDb07bB0Bbb0dbD35AcDD20Ac379C192ba2CBcbF](https://rinkeby.etherscan.io/address/0xbDb07bB0Bbb0dbD35AcDD20Ac379C192ba2CBcbF)

Only when you issue ERC20 Tokens, you can see the Token page on Etherscan:

<img width="388" alt="Screen Shot 2022-03-24 at 10 08 25 AM" src="https://user-images.githubusercontent.com/595772/159934697-23f6043b-b729-46f0-9aca-e682c5f3076f.png">

Now when you import the ERC20 tokens, the decimal is 18:

<img width="351" alt="Screen Shot 2022-03-24 at 10 10 49 AM" src="https://user-images.githubusercontent.com/595772/159934998-8f3ace77-7cbd-46f9-9a95-831d111dc0fc.png">

committed and added a git tag `rinkeby-erc20`

`git checkout rinkeby-erc20` to come to this snapshot.