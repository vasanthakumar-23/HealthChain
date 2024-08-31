import {expect} from "chai";
import pkg from 'hardhat';
const {ethers} = pkg;

describe("Hospital Chain",async()=>{
  let contract,owner,user1;
  beforeEach(async()=>{
    const accounts=await ethers.getSigners();
    owner=accounts[0];
    user1=accounts[1];
    const Contract=await ethers.getContractFactory("Hospital");
    contract=await Contract.deploy(owner);
   
    
    // console.log(owner.address,user1.address);
  })
  it("owner",async()=>{
    expect(await contract.getOwner()).to.equal(owner.address);
  })
  it("is authorized person",async()=>{
    await contract.connect(owner).Authorize(user1.address);
    expect(await contract.isAuthorizedPerson(user1.address)).to.equal(true);
  })
})