import pkg from 'hardhat';
const {ethers} = pkg;

async function main() { 

  const [owner]=await ethers.getSigners();
  const Contract = await ethers.getContractFactory("Hospital");
  const contract = await Contract.deploy(owner);
  const receipt=await contract.waitForDeployment();
  // console.log(receipt);
  console.log("The contract Address:",await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error)=>{
    console.error(error);
    process.exit(1);
  });
