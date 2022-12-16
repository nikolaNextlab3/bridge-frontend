import { useState } from 'react';
import './converter.scss';

import MetaMaskSDK from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';

const metamask = new MetaMaskSDK();
//const provider = await detectEthereumProvider();

const Converter = () => {

  const[fromValue, setFromValue] = useState('0.0');

  const getNetworkInfo = async () => {
    console.log();
  };

  return(
  <div className="converter">
    <div className="fromTable">
      <div className="firstPart">
        <p>From</p>
        <input type="text" placeholder='0.0'/>
      </div>
      <div className="secondPart">
        <button onClick={getNetworkInfo}>Click me!</button>
      </div>
    </div>
    <div className="toTable">

    </div>
  </div>
  );
  
};

export default Converter;
