import { ethers, Signer } from "ethers";
import bridgeContract from "../assets/contracts/Bridge.json";

const deposit = async (bridgeAddress: string, wallet: Signer) => {
    const gasLimit = ethers.utils.hexlify();
    const gasPrice = ethers.utils.hexlify(25000000000);
    const bridge = new ethers.Contract(bridgeAddress, bridgeContract.abi, wallet);
};