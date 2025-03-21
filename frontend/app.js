document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is required to use this site!");
        return;
    }

    const contractAddress = "0xbF57E2a10CBEC33a001BB4616bF9F3f6C13705a1";

    const contractABI = [ [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ArtDelisted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "ArtListed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                }
            ],
            "name": "ArtMinted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "ArtSold",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "buyArt",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "delistArt",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "getOwnedTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "listArtForSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "listings",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isListed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                }
            ],
            "name": "mintArt",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "nfts",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
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
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ownedTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ] ];  // 🔥 Replace with your contract ABI

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractABI, contractAddress);
    let accounts = [];

    // ✅ Connect Wallet
    async function connectMetaMask() {
        if (window.ethereum) {
            
       
        try {
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            let userAccount = accounts[0];
            document.getElementById("walletAddress").innerText = `Connected: ${userAccount}`;
            console.log("Wallet Connected:, ", userAccount);
        } catch (error) {
            console.error("Wallet Connection Failed!", error);
        }
    } else {
        console.log("Wallet not connected")
    }
    };

    // ✅ Mint NFT
    document.getElementById("mintArt").addEventListener("click", async () => {
        const tokenURI = document.getElementById("tokenURI").value;
        if (!tokenURI) {
            alert("Enter a valid Token URI!");
            return;
        }
        try {
            await contract.methods.mintArt(tokenURI).send({ from: accounts[0] });
            alert("NFT Minted Successfully! 🎨");
        } catch (error) {
            console.error(error);
        }
    });

    // ✅ List NFT for Sale
    document.getElementById("listArt").addEventListener("click", async () => {
        const tokenId = document.getElementById("tokenId").value;
        const price = document.getElementById("price").value;

        if (!tokenId || !price) {
            alert("Enter Token ID and Price!");
            return;
        }

        try {
            await contract.methods.listArtForSale(tokenId, web3.utils.toWei(price, "ether")).send({ from: accounts[0] });
            alert("NFT Listed for Sale! ✅");
        } catch (error) {
            console.error(error);
        }
    });

    // ✅ Buy NFT
    document.getElementById("buyArt").addEventListener("click", async () => {
        const tokenId = document.getElementById("buyTokenId").value;

        if (!tokenId) {
            alert("Enter a Token ID!");
            return;
        }

        try {
            const listing = await contract.methods.listings(tokenId).call();
            const price = listing.price;

            if (price <= 0) {
                alert("NFT is not listed for sale! ❌");
                return;
            }

            await contract.methods.buyArt(tokenId).send({ from: accounts[0], value: price });
            alert("NFT Purchased Successfully! 🎉");
        } catch (error) {
            console.error(error);
        }
    });

    // ✅ Fetch Owned NFTs
    document.getElementById("fetchOwned").addEventListener("click", async () => {
        try {
            const ownedTokens = await contract.methods.getOwnedTokens(accounts[0]).call();
            const ownedList = document.getElementById("ownedList");
            ownedList.innerHTML = "";

            ownedTokens.forEach(tokenId => {
                let li = document.createElement("li");
                li.textContent = `Token ID: ${tokenId}`;
                ownedList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
        }
    });
});
