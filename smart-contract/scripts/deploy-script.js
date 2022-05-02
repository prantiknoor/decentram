const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Decentram = await hre.ethers.getContractFactory("Decentram");
  const decentram = await Decentram.deploy();

  await decentram.deployed();

  console.log("Contract deployed to:", decentram.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
