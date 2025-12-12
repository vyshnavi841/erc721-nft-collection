const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftCollection", function () {
  let nft, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NftCollection");
    nft = await NFT.deploy(
      "TestNFT",
      "TNFT",
      5,
      "https://example.com/metadata/"
    );
    await nft.waitForDeployment();
  });

  it("Initial config is correct", async () => {
    expect(await nft.name()).to.equal("TestNFT");
    expect(await nft.symbol()).to.equal("TNFT");
    expect(await nft.maxSupply()).to.equal(5);
    expect(await nft.totalSupply()).to.equal(0);
  });

  it("Admin can mint", async () => {
    await nft.safeMint(user1.address, 1);
    expect(await nft.ownerOf(1)).to.equal(user1.address);
    expect(await nft.totalSupply()).to.equal(1);
  });

  it("Non-admin cannot mint", async () => {
    await expect(
      nft.connect(user1).safeMint(user1.address, 1)
    ).to.be.revertedWithCustomError;
  });

  it("Transfer works correctly", async () => {
    await nft.safeMint(user1.address, 1);
    await nft.connect(user1).transferFrom(user1.address, user2.address, 1);

    expect(await nft.ownerOf(1)).to.equal(user2.address);
  });

  it("Approvals allow transfers", async () => {
    await nft.safeMint(user1.address, 1);
    await nft.connect(user1).approve(user2.address, 1);
    await nft.connect(user2).transferFrom(user1.address, user2.address, 1);

    expect(await nft.ownerOf(1)).to.equal(user2.address);
  });

  it("Operator approval works", async () => {
    await nft.safeMint(user1.address, 1);
    await nft.connect(user1).setApprovalForAll(user2.address, true);

    await nft.connect(user2).transferFrom(user1.address, user2.address, 1);
    expect(await nft.ownerOf(1)).to.equal(user2.address);
  });

  it("Cannot exceed max supply", async () => {
    for (let i = 1; i <= 5; i++) {
      await nft.safeMint(user1.address, i);
    }

    await expect(
      nft.safeMint(user1.address, 6)
    ).to.be.revertedWith("Max supply reached");
  });

  it("Pause minting works", async () => {
    await nft.pauseMinting(true);

    await expect(
      nft.safeMint(user1.address, 1)
    ).to.be.revertedWith("Minting is paused");
  });

  it("Burn works correctly", async () => {
    await nft.safeMint(user1.address, 1);
    await nft.connect(user1).burn(1);

    expect(await nft.totalSupply()).to.equal(0);
  });

  it("Token URI is correct", async () => {
    await nft.safeMint(user1.address, 1);
    const uri = await nft.tokenURI(1);

    expect(uri).to.equal("https://example.com/metadata/1.json");
  });
});
