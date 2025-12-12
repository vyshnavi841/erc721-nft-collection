ERC-721 NFT Collection – Smart Contract

A fully implemented ERC-721–based NFT Collection built using Solidity and Hardhat.
This project demonstrates how NFTs are minted, transferred, approved, burned, and managed on a blockchain.
It also includes a Docker environment so anyone can run the test suite with a single command—no setup required.

Features OverviewAdmin-Controlled Minting

Only the contract owner is authorized to mint new NFTs.

 Maximum Supply Limit

Minting automatically stops when the maximum collection size is reached.

 Unique Token IDs

Every NFT is assigned a unique tokenId with ownership tracking.

 Transfers

NFT holders can securely transfer their tokens to other addresses.

 Approvals

Owners can approve another address or marketplace to manage a token on their behalf.

 Metadata Support

Each token returns a metadata URI in the pattern:

https://baseURI/<tokenId>.json

 Burn Functionality

Token owners can permanently burn their NFTs.

 Pause / Unpause

Minting can be paused or resumed by the contract owner.

 Project Structure
contracts/
    └── NftCollection.sol          // Main ERC-721 contract

test/
    └── NftCollection.test.js      // Full test suite covering all features

Dockerfile                          // Containerized test environment
hardhat.config.js                   // Hardhat configuration
package.json                        // Project dependencies
README.md                           // Documentation

 How the Contract Works

When deployed, the contract initializes:

Collection name

Symbol

Maximum supply

Base metadata URI

Only the admin can mint NFTs.
Each minting action:

Creates a unique tokenId

Assigns ownership

Increases the total supply

Owners may:

Transfer their NFT

Approve another wallet

Burn their token

The contract enforces:

Token existence

Valid ownership

Correct permissions

Supply limits

The Hardhat test suite validates all core behaviors.

▶ Running Tests Locally

Install dependencies:

npm install


Run tests:

npx hardhat test

 Running Tests Using Docker

Build the Docker image:

docker build -t nft-contract .


Run the tests inside Docker:

docker run nft-contract


Docker ensures reproducibility with zero environment setup.

 Technologies Used

Solidity

Hardhat

OpenZeppelin ERC-721

Node.js

Docker

 Why This Project Matters

This project is ideal for:

Learning how NFTs work under the hood

Understanding the ERC-721 standard

Practicing smart contract development + testing

Seeing Docker-based blockchain workflows

Showcasing blockchain skills to recruiters/interviewers
