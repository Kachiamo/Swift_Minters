// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721 {
    address public admin;

    struct NFT {
        uint256 tokenId;
        address owner;
        uint256 price;
    }

    NFT[] public nfts;

    mapping(uint256 => bool) public tokenIdExists;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, uint256 price);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor() ERC721("NFTMarketplace", "NFTM") {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function mintNFT(address _owner, uint256 _price) external onlyAdmin {
        uint256 tokenId = nfts.length + 1;
        _mint(_owner, tokenId);
        nfts.push(NFT(tokenId, _owner, _price));
        tokenIdExists[tokenId] = true;
        emit NFTMinted(tokenId, _owner, _price);
    }

    function listNFTForSale(uint256 _tokenId, uint256 _price) external {
        require(tokenIdExists[_tokenId], "Token doesn't exist");
        require(ownerOf(_tokenId) == msg.sender, "Not token owner");
        nfts[_tokenId - 1].price = _price;
        emit NFTListed(_tokenId, _price);
    }

    function buyNFT(uint256 _tokenId) external payable {
        require(tokenIdExists[_tokenId], "Token doesn't exist");
        NFT storage nft = nfts[_tokenId - 1];
        require(msg.value >= nft.price, "Insufficient funds");

        address payable seller = payable(nft.owner);
        seller.transfer(msg.value);
        _transfer(seller, msg.sender, _tokenId);

        nft.owner = msg.sender;
        nft.price = 0;

        emit NFTSold(_tokenId, seller, msg.sender, msg.value);
    }
}
