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
}

export default addNetworkElements;