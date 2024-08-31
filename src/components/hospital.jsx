import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./data.js";
import "../App.css";

const Hospital = () => {
  const [Contract, setContract] = useState(null);
  const [isConnect, setIsConnect] = useState(true);
  const [account, setAccount] = useState(null);
  const [providerAddress, setProviderAddress] = useState("");
  const [patientId, setPatientId] = useState();
  const [patientName,setPatientName]=useState("");
  const [patientRecord, setPatientRecord] = useState([]);
  const [diagnosis,setDiagnosis]=useState("");
  const [treatment,setTreatment]=useState("");
  const contractAddress = "0x4E52F8340Ac53a3ec4a39B755c7002552a5c477e";
  const contractABI = abi;
  let ownerAddress, _account;

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          throw new Error(
            "MetaMask or other Ethereum wallet extension is not installed"
          );
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        _account = await signer.getAddress();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(_account);
        setContract(contract);
        console.log("the account is:", account);
        ownerAddress = await contract.getOwner();
        console.log("the owner:",ownerAddress);
        console.log("success", _account == ownerAddress);
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, [account]);
  
  
  //functions
  const Authorize = async (e) => {
      try {
        e.preventDefault();
        const tx = await Contract.Authorize(providerAddress);
        await tx.wait();
        alert(`Provider ${providerAddress} is authorized`);
        setProviderAddress(" ");
      } catch (error) {
        alert("only owner can able to authorize people");
        console.error("you are not authorized person", error);
      }
  };

  const AddRecord = async (e) => {
    try {
      e.preventDefault();
      const tx=await Contract.addRecord(patientId,patientName,diagnosis,treatment);
      await tx.wait();
      alert(`patient ${patientName} is added`);
    } catch (error) {
      alert("only authorized person can add record");
      console.error("record is not added", error);
    }
  };
  const GetRecord = async (e) => {
    try {
      e.preventDefault();
      const records = await Contract.getRecord(patientId);
      setPatientRecord(records);
      console.log(records);
    } catch (error) {
      console.error("patient Not Found", error);
    }
  };
  const isAuthorize=async(e)=>{
    try{
      e.preventDefault();
      const tx=await Contract.isAuthorizedPerson(providerAddress);
      console.log(tx);
      const Auth=tx?"Authorized":"Not Authorized";
      alert(`you Are ${Auth}`);
      setProviderAddress("");
    }catch(error){
      console.error(error);
    }
  }
  const handleConnect = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
    setIsConnect(false);
  };

  return (
    <div className="container">
      <h1 className="title">Health Chain</h1>
      {isConnect ? (
        <button className="connect" onClick={handleConnect}>
          Connect
        </button>
      ) : (
        <p className="address">ConnectedAccount:{account}</p>
      )}
        
      <form className="form-section">
        <h1>Check Authorization</h1>
        <input
          className="input-field"
          placeholder="providerAddress"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
          type="text"
        />
        <button className="action-button" onClick={isAuthorize}>
          Check
        </button>
        </form>

      <form className="form-section">
        <h1>Authorize user</h1>
        <input
          className="input-field"
          placeholder="providerAddress"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
          type="text"
        />
        <button className="action-button" onClick={Authorize}>
          Authorize
        </button>
      </form>
      <form className="form-section">
        <h1>Fetch Records</h1>
        <input
          className="input-field"
          placeholder="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          type="text"
        />
        <button className="action-button" onClick={GetRecord}>
          Get record
        </button>
      </form>
      <form className="form-section">
        <h1>Add Records</h1>
        <input className="input-field" placeholder="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} type="text"/>
        <input className="input-field" placeholder="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} type="text"/>
        <input className="input-field" placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} type="text"/>
        <input className="input-field" placeholder="Treatment Status" value={treatment} onChange={(e) => setTreatment(e.target.value)} type="text"/>
        <button className="action-button" onClick={AddRecord}>
          Add Records
        </button>
      </form>
      <div className="record-section">
           <h1>Records</h1>
  {patientRecord && (
    <ul>
      {patientRecord.map((record, index) => (
        <li key={index}>
          <p>Record ID: {record.recordId.toNumber()}</p>
          <p>Patient Name: {record.patientName}</p>
          <p>Diagnosis: {record.diagnosis}</p>
          <p>Treatment Status: {record.treatmentStatus}</p>
          <p>Date: {new Date(record.timeStamp.toNumber() * 1000).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )}
    </div>

    </div>
  );
};
export default Hospital;
