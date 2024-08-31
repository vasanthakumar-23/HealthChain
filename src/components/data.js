export const abi= [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "Authorize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_patientId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_patientName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_diagnosis",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_status",
            "type": "string"
          }
        ],
        "name": "addRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_patientId",
            "type": "uint256"
          }
        ],
        "name": "getRecord",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "recordId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "patientName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "diagnosis",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "treatmentStatus",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timeStamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct Hospital.Record[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isAuthorizedPerson",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
   
  