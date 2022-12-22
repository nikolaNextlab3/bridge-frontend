import networks from '../assets/data/networks.json';

const addNetworkElements = async (metamask: any, network: string) => {

    if(!metamask) {
        alert('You must connect to your metamask wallet in order to proceed!');
        return;
    }

    const selectedNetwork = Object.values(networks)[Object.keys(networks).indexOf(network)];

    // Add network
    await metamask.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: `0x${(Number(selectedNetwork.id)).toString(16)}`,
            chainName: selectedNetwork.name,
            nativeCurrency: {
                name: selectedNetwork.currency.name,
                symbol: selectedNetwork.currency.symbol,
                decimals: Number(selectedNetwork.currency.decimals),
            },
                rpcUrls: [selectedNetwork.url]
        }]
    });

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

export default addNetworkElements;