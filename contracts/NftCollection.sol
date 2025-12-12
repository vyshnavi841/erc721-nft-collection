// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftCollection is ERC721, Ownable {
    using Strings for uint256;

    uint256 public maxSupply;
    uint256 public totalSupply;
    bool public paused;

    string private baseTokenURI;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        string memory baseURI_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        maxSupply = maxSupply_;
        baseTokenURI = baseURI_;
    }

    modifier whenNotPaused() {
        require(!paused, "Minting is paused");
        _;
    }

    function pauseMinting(bool _state) external onlyOwner {
        paused = _state;
    }

    function safeMint(address to, uint256 tokenId) external onlyOwner whenNotPaused {
        require(to != address(0), "Zero address");
        require(totalSupply < maxSupply, "Max supply reached");

        // FIX for OZ v5: _exists removed
        require(_ownerOf(tokenId) == address(0), "Token already minted");

        totalSupply++;
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        totalSupply--;
        _burn(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // FIX for OZ v5: _exists removed
        require(_ownerOf(tokenId) != address(0), "Non-existent token");

        return string(abi.encodePacked(baseTokenURI, tokenId.toString(), ".json"));
    }
}