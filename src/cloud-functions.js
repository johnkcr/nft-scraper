
// getUserNFTs from EthNFTOwners

const { Moralis } = require('moralis/node');

Moralis.Cloud.define('getUserNFTs', async function(request) {
    const { userAddress } = request.params;

    // In order to make queries based on the address you can convert it to lowercase
    const address = userAddress.toLowerCase();
    
    const EthQuery = new Moralis.Query('EthNFTOwners');
    EthQuery.equalTo('owner_of', address);
    const queryResults = await EthQuery.find({ useMasterKey : true });
    
    const result = [];
    for(let i = 0; i < queryResults.length; i ++) {
        result.push({
            ...queryResults[i].attributes
        });
    }

    return result;
});

Moralis.cloud.define('getUpdatedNFTs', async function(request) {

    const { lastUpdatedAt } = request;
    const query = new Moralis.Query('EthNFTTransfers');
    const pipeline = [
        { match: { updatedAt: { $gte : new Date(lastUpdatedAt).toISOString() } } }
    ];

    const result = await query.aggregate(pipeline);

    const tokenIds = result.map((tx) => tx.token_id);

    const EthQuery = new Moralis.Query('EthNFTOwners');
    EthQuery.containedIn('token_id', tokenIds);

    const queryResults = await EthQuery.find({ useMasterKey : true });
      
    const tokens = [];
    for(let i = 0; i < queryResults.length; i ++) {
        tokens.push({
            ...queryResults[i].attributes
        });
    }
    return tokens;
});

