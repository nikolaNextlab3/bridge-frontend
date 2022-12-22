import './converter.scss';
import deposit from '../../utilities/deposit';
import Registry from '../registry/registry';

import networks from '../../assets/data/networks.json';

const Converter = ({metamask}: any) => {

  const transferTokens = () => {
    const fromChain: string = (document.getElementById("fromChain") as HTMLSelectElement).value;
    const toChain: string = (document.getElementById("toChain") as HTMLSelectElement).value;
    const tokenType: string = (document.getElementById("tokenType") as HTMLSelectElement).value;
    const amount: string = (document.getElementById("amount") as HTMLInputElement).value;

    if(!metamask) {
      alert('You must connect to your metamask wallet in order to proceed!');
      return;
    }

    if(fromChain === toChain){
      alert('Please select a different from or to chain in order to perform a transfer!');
      return;
    }

    if(tokenType.slice(1) === fromChain) {
      alert('You can not send this type of token from the "from" chain!');
      return;
    }

    if(!amount || Number.isNaN(Number(amount)) || Number(amount) < 0) {
      alert('You must enter a positive number in order to proceed!');
      return;
    }

    deposit(metamask, fromChain, toChain, tokenType, Number(amount));

  }

  const changeChain = async () => {
    const chain: string = (document.getElementById("fromChain") as HTMLSelectElement).value;
    const network = Object.values(networks)[Object.keys(networks).indexOf(chain)];

    // Change network
    try {
      await metamask.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: `0x${(Number(network.id)).toString(16)}`
        }]
      });
    } catch (switchError) {
      alert('You must first add this chain to your metamask!');
      return;
    }
  }

  return(
  <div className="converter">
    <div className="inputFields">
      <div className="fromChain">
        <h1>From</h1>
        <select name="fromChain" id="fromChain" onChange={changeChain}>
          <option value="fuji">Fuji</option>
          <option value="tbnb">BNB Testnet</option>
          <option value="jgld">Juneo Gold Chain</option>
        </select>
      </div>
      <div className="toChain">
        <h1>To</h1>
        <select name="toChain" id="toChain">
          <option value="fuji">Fuji</option>
          <option value="tbnb">BNB Testnet</option>
          <option value="jgld">Juneo Gold Chain</option>
        </select>
      </div>
      <div className="tokenType">
        <h1>Token</h1>
        <select name="tokenType" id="tokenType">
          <option value="native">Native</option>
          <option value="wfuji">Wrapped FE20</option>
          <option value="wtbnb">Wrapped BE20</option>
          <option value="wjgld">Wrapped JE20</option>
        </select>
      </div>
      <div className="amount">
        <h1>Amount</h1>
        <input id="amount" type="text" placeholder="0.0"></input>
      </div>
    </div>
    <button className="transferBtn" onClick={transferTokens}>Transfer</button>
    <Registry metamask={metamask}/>
  </div>
  );
  
};

export default Converter;
