import React, { useState } from "react";
import IPFS from "ipfs-core";
import { ethers } from "ethers";
import { Rainbow } from "@rainbow-me/rainbow-sdk";

const mintMy1155 = () => {
  const [tokenId, setTokenId] = useState("");
  const [file, setFile] = useState();
  const [ipfsHash, setIpfsHash] = useState("");
  const [status, setStatus] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const contractAddress = "0x1aB14B36Ca49DA30985dAC3383f06525ad8A3F0B"; // Replace with your contract address
  const abi = [
    
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "treasuryAddress_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "deployer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "enum NFTFactory.NFTContractType",
        "name": "nftContractType",
        "type": "uint8"
      }
    ],
    "name": "NFTContractCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "controller_",
        "type": "address"
      }
    ],
    "name": "addController",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tokenSymbol_",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "maxItems_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mintPrice_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyCut_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "devCut_",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "baseTokenURI_",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_salt",
        "type": "bytes32"
      }
    ],
    "name": "createERC721A",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
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
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      }
    ],
    "name": "pauseMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "controller_",
        "type": "address"
      }
    ],
    "name": "removeController",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "devCut_",
        "type": "uint256"
      }
    ],
    "name": "setDevCut",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasuryAddress",
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
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      }
    ],
    "name": "unpauseMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }

  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const mintToken = async () => {
    setStatus("Uploading file to IPFS...");

    const ipfs = await IPFS.create();
    const fileAdded = await ipfs.add(file);
    setIpfsHash(fileAdded.cid.toString());

    setStatus("Connecting to Ethereum network...");

    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/2LVTHB8TTm6BNrPCjKQlCsXSo4X"); // Replace with your Infura project ID
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    setStatus("Minting token...");

    try {
      const tx = await contract.mint(ipfsHash, tokenId);
      await tx.wait();
      setStatus("Token minted successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Error minting token.");
    }
  };

  const handlePayment = async () => {
    const { ethAddress } = await Rainbow.signIn();
    const transaction = await Rainbow.payments.requestPayment({
      toAddress: ethAddress,
      value: paymentAmount,
      currency: "ETH",
    });

    if (transaction.status === "succeeded") {
      mintToken();
    } else {
      setStatus("Error processing payment.");
    }
  };

  return (
    <div>
      <label>
        Token ID:
        <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      </label>
      <label>
        File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <label>
        Payment amount:
        <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
      </label>
      <button onClick={handlePayment}>Pay with Rainbowkit</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default mintMy1155;
