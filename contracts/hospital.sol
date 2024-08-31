// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


 import "hardhat/console.sol";
 contract Hospital{
    address owner;
    struct Record{
        uint recordId;
        string patientName;
        string diagnosis;
        string treatmentStatus;
        uint timeStamp;
    }
    constructor(){
        owner=msg.sender;
    }
   mapping(uint256=>Record[]) private patientRecord;
   mapping(address=>bool) public isAuthorizedPerson;

  modifier isOwner(){
    require(msg.sender==owner,"Only owner will access it");
    _;
  }
  modifier isAuthorized(){
    require(isAuthorizedPerson[msg.sender]==true,"Only owner will access it");
    _;
  }

  function getOwner() view public returns(address){
    return owner;
  }
  function Authorize(address _address) public isOwner{
        isAuthorizedPerson[_address]=true;
  }
  function addRecord(uint _patientId,string memory _patientName,string memory _diagnosis,string memory _status) public isAuthorized{
    uint recordId=patientRecord[_patientId].length+1;
    patientRecord[_patientId].push(Record(recordId,_patientName,_diagnosis,_status,block.timestamp));
  }
  function getRecord(uint _patientId) view public  returns(Record[] memory){
       return patientRecord[_patientId];
  }


 }


