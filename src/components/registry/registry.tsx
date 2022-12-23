import './registry.scss';

import addNetwork from '../../utilities/addNetwork';
import addTokens from '../../utilities/addTokens';

const Registry = ({metamask}: any) => {

  return(
    <div className="registry">
      <div className="addNetworks">
        <div className="addFuji">
          <button onClick={() => {addNetwork(metamask, "fuji")}}>Add Fuji Network</button>
        </div>
        <div className="addTBNB">
          <button onClick={() => {addNetwork(metamask, "tbnb")}}>Add BNB Testnet</button>
        </div>
        <div className="addJGLD">
          <button onClick={() => {addNetwork(metamask, "jgld")}}>Add Juneo Gold Chain</button>
        </div>
      </div>
      <div className="addTokens">
        <div className="fujiTokens">
          <button onClick={() => {addTokens(metamask, "fuji")}}>Add Fuji Network Tokens</button>
        </div>
        <div className="tbnbTokens">
          <button onClick={() => {addTokens(metamask, "tbnb")}}>Add BNB Testnet Tokens</button>
        </div>
        <div className="jgldTokens">
          <button onClick={() => {addTokens(metamask, "jgld")}}>Add Juneo Gold Chain Tokens</button>
        </div>
      </div>
    </div>
  );
};

export default Registry;
