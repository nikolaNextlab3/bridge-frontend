import { Contract, ethers } from "ethers";

import bridgeContract from "../assets/contracts/Bridge.json";
import networks from '../utilities/networks.json'; 

const formatAmount = (amount: number, decimals: number) => {
    const withDecimals: number = amount*(10**Number(decimals));
    const bigNumber = ethers.BigNumber.from(withDecimals.toString());
    const hexString = bigNumber.toHexString();
    const final = ethers.utils.hexZeroPad(hexString, 32);
    return final.slice(2);
}

const formatAddress = (address: string) => {
    const hexified = ethers.utils.hexlify((address.length - 2) / 2);
    const final = ethers.utils.hexZeroPad(hexified, 32);
    return final.slice(2);
}

const deposit = async (metamask: any, fromChain: string, toChain: string, token: string, amount: number) => {

    const chainID = await metamask.request({
        method: 'net_version'
    });

    const accounts = await metamask.request({
        method: 'eth_requestAccounts'
    });
    const currentAddress: string = accounts[0];

    const provider = new ethers.providers.Web3Provider(metamask);
    const signer = provider.getSigner();

    const fromNetwork = Object.values(networks)[Object.keys(networks).indexOf(fromChain)];
    const toNetwork = Object.values(networks)[Object.keys(networks).indexOf(toChain)];
    const fromNetworkProvider = new ethers.providers.JsonRpcProvider(fromNetwork.url);

    let selectedTokenResourceID = '';

    if(token[0] === 'w') {
        selectedTokenResourceID = Object.values(networks)[Object.keys(networks).indexOf(token.slice(1))].resourceID
    }else {
        selectedTokenResourceID = fromNetwork.resourceID;
    }

    if(fromNetwork.id !== chainID) {
        alert('Please make sure that you are on the selected "from" chain on your metamask wallet and try again!');
        return;
    }

    const bridge: Contract = new ethers.Contract(fromNetwork.bridge, bridgeContract.abi, signer);
    bridge.connect(fromNetworkProvider);

    const formatedAmount = formatAmount(amount, Number(fromNetwork.decimals));
    const formatedAddress = formatAddress(currentAddress);
    const shortenedAddress = currentAddress.slice(2);
    
    const txData: string = `0x${formatedAmount}${formatedAddress}${shortenedAddress}`;

    const depositTransaction = await bridge.deposit(
        toNetwork.bridgeID,             // Destination
        selectedTokenResourceID,        // Resource ID that is being sent
        txData,                         // Transaction data
        {
            gasPrice: ethers.utils.hexlify(Number(fromNetwork.gasPrice)),   //  Max gas price to be paid (per gas unit)
            gasLimit: ethers.utils.hexlify(Number(fromNetwork.gasLimit))    //  Max gas limit to be used
        }
    );

    console.log(`Waiting for transaction: ${depositTransaction.hash}...`);
    await(depositTransaction).wait();
    console.log('Initial transaction finished!');
};

export default deposit;