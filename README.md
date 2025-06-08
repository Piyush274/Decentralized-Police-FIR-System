# 🛡️ Decentralized Police FIR System

A blockchain-based application that modernizes the process of lodging and managing First Information Reports (FIRs) in India. This system provides an immutable, transparent, and decentralized infrastructure for citizens and law enforcement authorities, leveraging Web3 technologies for a trustless and secure experience.

🔗 **Live Application:** → https://digitalfir.vercel.app

---


## 📌 About the Project

The **Decentralized Police FIR System** aims to combat corruption, improve public trust, and streamline case reporting by allowing users to submit FIRs that are:

- Immutable and tamper-proof using Ethereum smart contracts.
- Transparent and publicly verifiable.
- Decentralized, removing dependency on centralized police servers.

Use cases include:
- Filing police complaints with uploaded digital evidence.
- Allowing police officials to update and manage FIRs with verified accountability.
- Citizens being able to track their FIR status anytime without needing to visit a station.

---

## ✨ Key Features

### 👥 For Citizens
- Connect MetaMask to file FIRs.
- Submit details like name, Aadhar number (hashed), FIR type, date, location, and description.
- Upload and link evidence (images, documents) using IPFS.
- Get an on-chain FIR ID and view the real-time status.

### 🧑‍✈️ For Police/Admins
- Secure access via MetaMask wallet verification.
- View and update FIR statuses (e.g., "Under Review", "Resolved").
- Ensures traceable and accountable state changes on-chain.

### 🔐 Security
- Personal data is hashed or stored securely off-chain.
- Transactions are signed via MetaMask ensuring authenticity.
- Data immutability and decentralization guaranteed via Ethereum.

---

## 🧰 Tech Stack

### 🔗 Blockchain
- **Solidity** – Smart contract language for Ethereum
- **Hardhat** – Smart contract development environment
- **Polygon (Mumbai Testnet)** – Scalable testnet for contract deployment
- **IPFS (Web3.storage)** – Decentralized file storage for evidence

### 🌐 Frontend
- **React.js** – Framework for frontend
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **Ethers.js** – Library for interacting with Ethereum blockchain
- **Wagmi + Viem** – Wallet connection and contract hooks

### 🧪 Development Tools
- **Metamask** – Wallet provider for Web3 login
- **dotenv** – For managing environment variables

---

## 🔗 Smart Contract Functionality

### `createFIR()`
- Creates a new FIR with input fields and stores it on-chain.
- Evidence file hashes are stored via IPFS.

### `getFIR(firId)`
- Returns FIR details for a specific ID.

### `updateFIRStatus(firId, newStatus)`
- Allows only admin (police) to update the status.

### Access Control
- The smart contract ensures only authorized users (like police) can update case statuses.

---

## 🏗️ Architecture Overview

```txt
+---------------------+
|    React Frontend   |
|  (React.js + Wagmi)  |
+----------+----------+
           |
           v
+---------------------+
|   Wallet Provider   |
|     (MetaMask)      |
+----------+----------+
           |
           v
+---------------------+
| Ethers.js & Wagmi   |
| Contract Interface  |
+----------+----------+
           |
           v
+---------------------+
|   Smart Contract    |
|      (Ethereum)
+----------+----------+
           |
           v
+---------------------+
|        IPFS 
| For FIR evidence files  |
+---------------------+
