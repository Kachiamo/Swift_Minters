 
 
document.addEventListener('DOMContentLoaded', async ()) ; {
    let web3;
    let contract;

    const connectButton = document.getElementById('connectBtn');
    const nftsElement = document.getElementById('nfts');
    const mintBtn = document.getElementById('mintBtn');

    async function init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                web3 = new web3(window.ethereum);
                // Load contract
                const contractAddress = '0xAcCa60ccEA427cF33fC33Bb2d8A80e0273480D58';
                const contractABI = [
                    ]; // ABI of your contract
                contract = new web3.eth.Contract(contractABI, contractAddress);
                // Enable UI elements
                mintBtn.disabled = false;
                loadNFTs();
            } catch (error) {
                console.error(error);
            }
        } else {
            // MetaMask is not installed, show a message or UI prompt to install MetaMask
            console.log('MetaMask is not installed');
        }
     // ABI of your contract

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const nftsElement = document.getElementById('nfts');
    const mintBtn = document.getElementById('mintBtn');

    // Function to load and display NFTs
    async function loadNFTs() {
        nftsElement.innerHTML = ''; // Clear previous NFTs
        const totalNFTs = await contract.methods.totalSupply().call();
        for (let i = 1; i <= totalNFTs; i++) {
            const nftOwner = await contract.methods.ownerOf(i).call();
            const nftPrice = await contract.methods.nfts(i).price().call();
            const nftElement = document.createElement('div');
            nftElement.innerHTML = `Token ID: ${i}, Owner: ${nftOwner}, Price: ${web3.utils.fromWei(nftPrice, 'ether')} ETH`;
            nftsElement.appendChild(nftElement);
        }
    }



    // Event listener for mint button
    mintBtn.addEventListener('click', async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.mintNFT(accounts[0], web3.utils.toWei('1', 'ether')).send({ from: accounts[0] });
        await loadNFTs();
    });

 
    connectButton.addEventListener('click', async () => {
        await init();
    });

    // Initialize when the page loads
    init();

    // Initial load of NFTs
    loadNFTs();

}