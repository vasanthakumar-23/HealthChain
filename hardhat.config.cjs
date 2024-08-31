require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
    url:"https://eth-sepolia.g.alchemy.com/v2/7av629syRpB0ZOKWnOIcDIRqizIOu-Eg",
    accounts:["4e74f7ec43f81499c3a30c5ba327be2eb8227673e2169896bd10884ced2b3ced"]
  },
    localhost:{}
  }
};
