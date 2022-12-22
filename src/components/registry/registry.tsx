import './registry.scss';

import addNetworkElements from '../../utilities/addNetworkElements';

const Registry = ({metamask}: any) => {

  return(
    <div className="registry">
      <div className="addNetworks">
        <div className="addFuji">
          <button onClick={() => {addNetworkElements(metamask, "fuji")}}>Add Fuji Network</button>
        </div>
        <div className="addTBNB">
          <button onClick={() => {addNetworkElements(metamask, "tbnb")}}>Add BNB Testnet</button>
        </div>
        <div className="addJGLD">
          <button onClick={() => {addNetworkElements(metamask, "jgld")}}>Add Juneo Gold Chain</button>
        </div>
      </div>
    </div>
  );
};

export default Registry;
