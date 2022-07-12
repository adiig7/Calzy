const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Set Rate", function () {
  it("Should set the minutely rate", async function () {
    const Contract = await ethers.getContractFactory("Calzy");
    const contract = await Contract.deploy();
    await contract.deployed();

    const tx = await contract.setRate(1000);
    await tx.wait();

    expect(await contract.getRate()).to.equal(1000);

    const [owner, addr1, addr2] = await ethers.getSigners();
    console.log(owner.address);
    console.log(addr1.address);

    await expect(
      contract.connect(addr1).setRate(500)
    ).to.be.revertedWith('Only owner can set the rate')
  })
})