const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Calzy", function () {
  let Contract, contract;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("Calzy");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should set the minutely rate", async function () {
    const tx = await contract.setRate(1000);
    await tx.wait();

    expect(await contract.getRate()).to.equal(1000);
  });

  // it("Should fail if non-owner sets rate", async function () {
  //   await expect(
  //     contract.connect(addr1).setRate(500))
  //     .to.be.revertedWith("Only owner can set the rate");
  // })
  it("Should create a appointment", async function () {
    const tx1 = await contract.setRate(ethers.utils.parseEther("0.001"));
    await tx1.wait();

    const tx = await contract.connect(addr1).addAppointment("Meeting with Aditya", 1644143400, 1644153980, {
      value: ethers.utils.parseEther("2")
    });
    await tx.wait();

    const tx2 = await contract.connect(addr2).addAppointment("Meeting with Dhrumi", 1444123400, 1444133980, {
      value: ethers.utils.parseEther("1")
    });
    await tx2.wait();
    const appointments = await contract.getAppointments();
    expect(appointments.length).to.equal(2);

    const provider = ethers.getDefaultProvider();
    const ownerBalance = await provider.getBalance(owner.address);
    const addr1Balance = await provider.getBalance(addr1.address);
    const addr2Balance = await provider.getBalance(addr2.address);

    console.log(ownerBalance);
    console.log(addr1Balance);
    console.log(addr2Balance);
  })
})