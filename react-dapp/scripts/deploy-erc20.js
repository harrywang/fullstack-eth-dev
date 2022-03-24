const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const WIToken = await hre.ethers.getContractFactory("WIToken");
  const witoken = await WIToken.deploy("Wild Idiot Token", "WIT");

  //await greeter.deployed();
  await witoken.deployed();

  //console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", witoken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });