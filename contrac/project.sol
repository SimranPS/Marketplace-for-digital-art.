// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalArtAndCodeMarketplace {
    struct NFT {
        uint256 id;
        string tokenURI;
        address owner;
    }

    struct Listing {
        uint256 price;
        address seller;
        bool isListed;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => Listing) public listings;
    mapping(address => uint256[]) public ownedTokens;

    event ArtMinted(uint256 indexed tokenId, address owner, string tokenURI);
    event ArtListed(uint256 indexed tokenId, uint256 price);
    event ArtSold(uint256 indexed tokenId, address buyer, uint256 price);
    event ArtDelisted(uint256 indexed tokenId);

    modifier onlyOwner(uint256 tokenId) {
        require(nfts[tokenId].owner == msg.sender, "Not the owner");
        _;
    }

    function mintArt(string memory tokenURI) external {
        uint256 tokenId = ++_tokenIdCounter;
        nfts[tokenId] = NFT(tokenId, tokenURI, msg.sender);
        ownedTokens[msg.sender].push(tokenId);

        emit ArtMinted(tokenId, msg.sender, tokenURI);
    }

    function listArtForSale(uint256 tokenId, uint256 price) external onlyOwner(tokenId) {
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing(price, msg.sender, true);
        emit ArtListed(tokenId, price);
    }

    function buyArt(uint256 tokenId) external payable {
        Listing memory listedItem = listings[tokenId];
        require(listedItem.isListed, "Art is not listed for sale");
        require(msg.value >= listedItem.price, "Insufficient funds");

        address seller = listedItem.seller;
        listings[tokenId].isListed = false;
        nfts[tokenId].owner = msg.sender;

        payable(seller).transfer(msg.value);

        emit ArtSold(tokenId, msg.sender, listedItem.price);
    }

    function delistArt(uint256 tokenId) external onlyOwner(tokenId) {
        require(listings[tokenId].isListed, "Art is not listed");

        listings[tokenId].isListed = false;
        emit ArtDelisted(tokenId);
    }

    function getOwnedTokens(address owner) external view returns (uint256[] memory) {
        return ownedTokens[owner];
    }
}

