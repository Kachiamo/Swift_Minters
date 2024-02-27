// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721, Ownable {
    uint256 private constant FEE_PERCENTAGE = 1; // 1% fee
    address payable public feeRecipient;

    struct NFT {
        address owner;
        uint256 price;
        string metadataURI;
        bool listed;
    }

    mapping(uint256 => NFT) public nfts;
    uint256 public nftCount;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, uint256 price, string metadataURI);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTUnlisted(uint256 indexed tokenId);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor(address _feeRecipient) ERC721("NFTMarketplace", "NFTM") Ownable(_msgSender()){
        feeRecipient = payable (_feeRecipient);
    }

    modifier onlyNFTOwner(uint256 _tokenId) {
        require(ownerOf(_tokenId) == msg.sender, "Not NFT owner");
        _;
    }

    function mintNFT(address _owner, uint256 _price, string memory _metadataURI) external onlyOwner {
        uint256 tokenId = nftCount;
        _safeMint(_owner, tokenId);
        nfts[tokenId] = NFT(_owner, _price, _metadataURI, false);
        nftCount++;
        emit NFTMinted(tokenId, _owner, _price, _metadataURI);
    }

    function listNFTForSale(uint256 _tokenId, uint256 _price) external onlyNFTOwner(_tokenId) {
        require(!nfts[_tokenId].listed, "NFT already listed");
        nfts[_tokenId].price = _price;
        nfts[_tokenId].listed = true;
        emit NFTListed(_tokenId, _price);
    }

    function unlistNFT(uint256 _tokenId) external onlyNFTOwner(_tokenId) {
        require(nfts[_tokenId].listed, "NFT not listed");
        nfts[_tokenId].listed = false;
        emit NFTUnlisted(_tokenId);
    }

    function buyNFT(uint256 _tokenId) external payable {
        require(nfts[_tokenId].listed, "NFT not listed");
        require(msg.value >= nfts[_tokenId].price, "Insufficient funds");

        address payable seller = payable(nfts[_tokenId].owner);
        address payable buyer = payable(msg.sender);
        uint256 feeAmount = (msg.value * FEE_PERCENTAGE) / 100;
        uint256 paymentAmount = msg.value - feeAmount;

        seller.transfer(paymentAmount);
        feeRecipient.transfer(feeAmount);
        _transfer(seller, buyer, _tokenId);

        nfts[_tokenId].owner = buyer;
        nfts[_tokenId].listed = false;

        emit NFTSold(_tokenId, seller, buyer, paymentAmount);
    }

    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        feeRecipient = payable (_feeRecipient);
    }
}
