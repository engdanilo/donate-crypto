import Web3 from 'web3';
import ABI from './ABI.json';

const CONTRACT_ADDRESS = '0x28634D55a0C22b1b93B25C96C8ae71670a630ce6'; // SEPOLIA TESTNET

export async function doLogin(){
    if(!window.ethereum) throw new Error('Metamask not found');

    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.requestAccounts();

    if(!accounts || !accounts.length) throw new Error('No account found/allowed');

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract(){
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from});
}

export async function addCampaign(campaign){
    const contract = getContract();
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}