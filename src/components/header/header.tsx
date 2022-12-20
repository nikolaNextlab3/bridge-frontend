import { useState } from 'react';
import './header.scss';

import detectEthereumProvider from '@metamask/detect-provider';
const logo = require('../../assets/images/mcn.png');

const metamask = window.ethereum;

const Header = ({setMetamask}: any) => {

  const[address, setAddress] = useState("Connect to a wallet");
  
  const connectWalletHandler = async () => {
    if(metamask && metamask.isMetaMask) {
      const accounts = await getAccounts();
      setAddress(formatAddress(accounts[0]));
      setMetamask(metamask);
    }else {
      alert('In order to use this bridge you need to install Metamask on your browser!');
    }
  }
  
  const getAccounts = async () => {
    const accounts = await metamask.request({
      method: 'eth_requestAccounts'
    });
    return accounts;
  }

  const formatAddress = (address: any) => {
    const formatedAddress: string = address.slice(0, 5) + '...' + address.slice(-4);
    return formatedAddress;
  }

  metamask.on('accountsChanged', () => {
    if(address !== "Connect to a wallet") {
      connectWalletHandler();
    }
  })

  metamask.on('chainChanged', (chainID: any) => {
    window.location.reload();
  })

  return (
    <div className="header">
      <div className="logo">
        <img src={ logo } alt="MCN Logo" />
      </div>
      <div className="title">
        <p id='title'>BRIDGER</p>
      </div>
      <div className="wallet">
        <button onClick={connectWalletHandler}>{address}</button>
      </div>
    </div>
  )
}

export default Header;
