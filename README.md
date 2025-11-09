# 🪩 MetaArchive  
### Preserve. Verify. Decentralize.  

**MetaArchive** is a decentralized document archiving platform built on **Ethereum** and **IPFS (via Infura)**.  
It allows users to securely upload, organize, and verify documents or media files — all while maintaining blockchain-backed proof of ownership and integrity.

---

## 🚀 Features

- 🔐 **User Authentication** — Secure login/signup using JWT  
- 🗂️ **Folder Management** — Create folders to organize files  
- 📁 **File Uploads** — Upload and store photos/documents to IPFS via Infura  
- ⛓️ **Blockchain Proof** — Each upload is verified and recorded on Ethereum  
- 🧾 **Ownership & Integrity** — Every file has a verifiable on-chain record  
- ⚙️ **Settings Page** — Manage profile and connected wallet  

---

## 🧠 Architecture Overview

**Frontend:** React + TailwindCSS  
**Backend:** Node.js + Express.js  
**Blockchain:** Ethereum (via Infura + Hardhat)  
**Storage:** IPFS (Infura)  
**Database:** MongoDB (Atlas)

### 🔗 High-Level Flow
```
User → React Frontend → Express API → Infura IPFS → Smart Contract → Ethereum Network → MongoDB Metadata
```

---

## 📁 Folder Structure

### Frontend (`/client`)
```
src/
 ├── pages/
 │   ├── Landing.jsx
 │   ├── Login.jsx
 │   ├── Signup.jsx
 │   ├── Dashboard.jsx
 │   ├── FolderView.jsx
 │   └── Settings.jsx
 ├── components/
 │   ├── Navbar.jsx
 │   ├── FolderCard.jsx
 │   ├── FileCard.jsx
 │   ├── UploadModal.jsx
 │   └── Sidebar.jsx
 ├── context/
 │   ├── AuthContext.jsx
 │   └── Web3Context.jsx
 ├── api/
 │   ├── axiosConfig.js
 │   └── fileApi.js
 └── App.jsx
```

### Backend (`/server`)
```
server/
 ├── index.js
 ├── routes/
 │   ├── auth.js
 │   ├── folder.js
 │   └── file.js
 ├── controllers/
 │   ├── authController.js
 │   ├── folderController.js
 │   └── fileController.js
 ├── models/
 │   ├── User.js
 │   ├── Folder.js
 │   └── File.js
 ├── middleware/
 │   └── authMiddleware.js
 ├── utils/
 │   ├── ipfsUpload.js
 │   └── blockchain.js
 └── config/
     └── db.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/metaarchive.git
cd metaarchive
```

### 2️⃣ Setup backend
```bash
cd server
npm install
```

Create `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
INFURA_PROJECT_ID=your_infura_project_id
INFURA_PROJECT_SECRET=your_infura_secret
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
```

Run the backend:
```bash
npm run dev
```

### 3️⃣ Setup frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🧾 Smart Contract (Solidity)

`contracts/MetaArchive.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetaArchive {
    struct File {
        string ipfsHash;
        string fileName;
        address uploader;
        uint256 timestamp;
    }

    mapping(address => File[]) public userFiles;

    event FileUploaded(address indexed uploader, string ipfsHash, string fileName, uint256 timestamp);

    function uploadFile(string memory _ipfsHash, string memory _fileName) public {
        userFiles[msg.sender].push(File(_ipfsHash, _fileName, msg.sender, block.timestamp));
        emit FileUploaded(msg.sender, _ipfsHash, _fileName, block.timestamp);
    }

    function getUserFiles(address _user) public view returns (File[] memory) {
        return userFiles[_user];
    }
}
```

Deploy using **Hardhat** and Infura RPC:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 💡 Future Enhancements
- 🔍 File search & metadata filters  
- 🔄 Shareable public access links (read-only IPFS gateway)  
- 🧱 Role-based file access (owner/viewer model)  
- 🧬 File encryption before IPFS upload  
- 🌐 ENS-based user identities  

---

## 🧰 Tools Used
- **React + TailwindCSS** — modern, fast, responsive UI  
- **Node.js + Express** — RESTful backend  
- **MongoDB Atlas** — metadata & auth persistence  
- **IPFS (Infura)** — decentralized file storage  
- **Ethereum Smart Contracts** — proof of ownership  
- **Metamask + Ethers.js** — wallet integration  

---

## 🧑‍💻 Authors
**Vasu** — Full Stack Developer | Blockchain Enthusiast  
[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🪙 License
MIT License © 2025 MetaArchive
