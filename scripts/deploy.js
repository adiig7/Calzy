// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { artifacts } = require("hardhat");
const hre = require("hardhat");

async function main() {
  
  const Contract = await hre.ethers.getContractFactory("Calzy");
  const contract = await Contract.deploy();

  await contract.deployed();

  saveFrontendFiles();

  console.log("Calzy Contract deployed to:", contract.address);
}

function saveFrontendFiles() {
  const fs = require("fs");
  const abiDir = __dirname + "/../frontend/src/abis";

  if (!fs.existsSync(abiDir))
    fs.mkdirSync(abiDir);
const artifact = artifacts.readArtifactSync("Calzy");

fs.writeFileSync(
  abiDir + "/Calzy.json",
  JSON.stringify(artifact, null, 2)
);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
