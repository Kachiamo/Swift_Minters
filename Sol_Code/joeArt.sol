// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.3.0/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.3.0/contracts/math/SafeMath.sol";


contract BuildingArt is ERC721Full {
    constructor() public  ERC721Full("BuildingArt", "BArt") {}

    

    function registerArtwork(address owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 tokenId = totalSupply();
        _mint(owner, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}

