import { useState } from 'react';
import './converter.scss';

const Converter = () => {

  const[fromValue, setFromValue] = useState('0.0');

  return(
  <div className="converter">
    <div className="fromTable">
      <div className="firstPart">
        <p>From</p>
        <input type="text" placeholder='0.0'/>
      </div>
      <div className="secondPart">

      </div>
    </div>
    <div className="toTable">

    </div>
  </div>
  );
  
};

export default Converter;
