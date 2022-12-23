import networks from '../assets/data/networks.json';

const addTokens = async (metamask: any, network: string) => {
    
    if(!metamask) {
        alert('You must connect to your metamask wallet in order to proceed!');
        return;
    }

    const selectedNetwork = Object.values(networks)[Object.keys(networks).indexOf(network)];

    // Check if current network is selected tokens network
    const chainID = await metamask.request({
        method: 'net_version'
    });
    
    if(selectedNetwork.id !== chainID) {
        alert('Please change the selected network on your metamask in order to proceed!');
        return;
    } 

    // Add tokens
    const tokens = selectedNetwork.tokens;
    
    for(let i = 0; i < tokens.length; i++) {
        await metamask.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokens[i].address,
                    symbol: tokens[i].symbol,
                    decimals: Number(tokens[i].decimals),
                }
            }
        });
    }
}

export default addTokens;