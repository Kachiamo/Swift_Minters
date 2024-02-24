
import MetaMaskOnboarding from '@metamask/onboarding';

//onboarding manuverability for buyers who don't have hot nft wallets to get a wallet
const player = document.querySelector(".success-anim");

//this is a cont. of the code above in javascript
const onboarding = new MetaMaskOnboarding();
const btn = document.querySelector('.onboard'); //this is a onboard function event listiner 
const statusText = document.querySelector('h1');
const statusDesc = document.querySelector('.desc');
const loader = document.querySelector('.loader');
const upArrow = document.querySelector('.up');
const confetti = document.querySelector('.confetti');

//background update on client side, asking browser is wallet in your device
const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}
//connect account if you have a wallet
let connected = (accounts) => {
    statusText.innerHTML = 'Connected!'
    statusDesc.classList.add('account');
    statusDesc.innerHTML = accounts[0]
    btn.style.display = 'none';
    loader.style.display = 'none';
    upArrow.style.display = 'none';
    confetti.style.display = 'block'; //confetti for a success
    player.play();
    statusDesc.classList.add('account');
}


const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NmNkMTRiZi05NjM5LTRlMzAtYmM1OS00ZTQ4MzdmNTNlMWUiLCJlbWFpbCI6Im1yLmp3aWxsaWFtczkzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZDcxNzdjYjEwNjhiODFkNzZiYiIsInNjb3BlZEtleVNlY3JldCI6IjljYWQ0YWQzMDM1Y2I3ZjY2ZjFmOThlNDQ0NmNkYTE4NTVmZTA3OGUxOTkxZGMxY2ZkYzMxZjM3OTAzNmM2MDUiLCJpYXQiOjE3MDg2NTUyMzl9.M0JCR8hBr2nXkKJqwgkb8DGaLFMNQ8miMR6h31dXQC8

/// This is code to looooooooooook @
const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}







// asyncrinous function to run while html is loading ethereum connect to wallet
async function connectWallet() {
    return await ethereum.request({ method: 'eth_accounts' });
}
// if wallet is present , functionallity will install on connection
const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    loader.style.display = 'block';
}
// event Listner for ethererum , a 'click' function`
btn.addEventListener('click', async () => {
    btn.style.backgroundColor = '#cccccc';
    loader.style.display = 'block';

    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        connected(accounts)
    } catch (error) {
        console.error(error);
    }
})
// this line checks if the client side MetaMask comminicates to 
const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
        statusText.innerText = 'You need to Install a Wallet';
        statusDesc.innerText = 'We recommend the MetaMask wallet.';
        btn.innerText = 'Install MetaMask'
        btn.onclick = onClickInstallMetaMask;
    } else {
 
        connectWallet().then((accounts) => {
            if (accounts && accounts[0] > 0) { //if accounts are equal to 0 it will connect 
                connected(accounts)
            } else {
                statusText.innerHTML = 'Connect your wallet'
                statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`
                btn.innerText = 'Connect MetaMask'
                upArrow.style.display = 'block';
            }
        })
    }
}
// the code presented below is added for the JSON which is the ABI  connect to solidity giving a compiled Smart Contract
document.addEventListener('DOMContentLoaded', () => {
    let account;
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC721IncorrectOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC721InsufficientApproval",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidOperator",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC721NonexistentToken",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
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
            "name": "NFTListed",
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
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "NFTMinted",
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
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
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
            "name": "NFTSold",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
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
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
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
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "buyNFT",
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
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
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
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "listNFTForSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "mintNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
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
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
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
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
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
            "name": "tokenIdExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ] // this is a hard line  Address for the wallet
    const contractAddress = '0x00b8C276aa0c5a5F0F6818e01F009D515ADEdFAB';
    let contract;

    // asyncrious Cooonect to wallet function  that lets you know if you are "undefined" by the wallet connection
    async function connectMetamask() {
        if (typeof window.ethereum !== "undefined") { // Window.ethereum is the connection to web3 in development enviorments
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                account = accounts[0];
                document.getElementById("accountArea").innerHTML = account;
            } catch (error) {
                console.error("Error connecting to MetaMask", error); // error msg toconnection to MetaMask 
                document.getElementById("accountArea").innerHTML = "Error connecting to MetaMask";
            }
        } else {
            document.getElementById("accountArea").innerHTML = "MetaMask is not installed!"; // MetaMask is not connected
        }
    }

    // Initialize web3 and contract after ensuring the document is loaded with ABI
    if (typeof window.ethereum !== "undefined") {
        window.web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }

    // Example buttton to Mint 
    const mintBtn = document.getElementById('mintBtn');
    if(mintBtn) {
        mintBtn.addEventListener('click', async () => {
            // Minting functionality here
        });
    }

    // Connect to MetaMask button setup
    document.getElementById('connectMetamaskBtn').addEventListener('click', connectMetamask);
    
    // Load NFTs or any initial setup
    // loadNFTs(); Assuming you have a function to load NFTs
    async function loadNFTs() {
const nftsElement = document.getElementById('nfts'); // Ensure this element exists in your HTML
nftsElement.innerHTML = ''; // Clear previous NFTs

const totalNFTs = await contract.methods.totalSupply().call();
for (let i = 1; i <= totalNFTs; i++) {
// Assuming `nfts` is a public array, Solidity automatically creates a getter function for it
const nft = await contract.methods.nfts(i - 1).call(); // Arrays are 0-indexed in Solidity

const nftOwner = nft.owner; // Access the owner directly from the returned struct
const nftPrice = nft.price; // Access the price directly from the returned struct

// Create a new div element for each NFT and set its contents
const nftElement = document.createElement('div');
nftElement.innerHTML = `Token ID: ${i}, Owner: ${nftOwner}, Price: ${web3.utils.fromWei(nftPrice, 'ether')} ETH`;
nftsElement.appendChild(nftElement);
}
}
//
const Address = "0xC6500e1D2fc276A97E6AE88379616908C88cA363";
    window.web3 =  new Web3(window.ethereum);
    window.contract =  new window.web3.eth.Contract( ABI, Address);
    document.getElementById("contractArea").innerHTML = " connected to smart contract";
        }



        


        ,function MetaMaskClientCheck() {
            // Checks if the MetaMask extension is installed
            if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
                // MetaMask is installed, now check if the user is already connected
                ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
                    if (accounts.length > 0) {
                        // An account is connected, so you can display the connected state
                        document.getElementById('statusText').innerText = 'Connected';
                        document.getElementById('accountArea').innerText = accounts[0]; // Display first account
                        document.getElementById('connectMetamaskBtn').style.display = 'none'; // Hide connect button
                    } else {
                        // MetaMask is installed but no account is connected
                        document.getElementById('statusText').innerText = 'Connect your wallet';
                        document.getElementById('connectMetamaskBtn').style.display = 'block'; // Show connect button
                        document.getElementById('connectMetamaskBtn').innerText = 'Connect MetaMask';
                        document.getElementById('connectMetamaskBtn').addEventListener('click', connectMetamask);
                    }
                });
            } else {
                // MetaMask is not installed
                document.getElementById('statusText').innerText = 'MetaMask is not installed';
                document.getElementById('connectMetamaskBtn').innerText = 'Install MetaMask';
                document.getElementById('connectMetamaskBtn').addEventListener('click', () => {
                    window.open('https://metamask.io/download.html', '_blank');
                });
            }
        }
        
        // Example function to handle the connection request to MetaMask
        ,async function connectMetamask() {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    document.getElementById('statusText').innerText = 'Connected';
                    document.getElementById('accountArea').innerText = accounts[0]; // Display first account
                    document.getElementById('connectMetamaskBtn').style.display = 'none'; // Hide connect button
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        }
)  
pinFileToIPFS()