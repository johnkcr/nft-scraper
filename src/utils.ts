import Moralis from 'moralis';
import { ChainList } from '../types';
import { MORALIS_CLOUD_URL } from '../constants';

export const fetchNFTMetadata = (NFTs) => {
  for (let i = 0; i <NFTs.length; i++) {
      let nft = NFTs[i];
      let id = nft.token_id;
      // call moralis cloud function -> static jason file
      fetch (MORALIS_CLOUD_URL + id)
        .then(res => res.json())
        .then(res => JSON.parse(res.result))
        .then(res => console.log(res))    
  }
}


export const transformInventory = (NFTs, ownerData) => {
  const res = [];
  return NFTs.map(nft => ({
    ...nft,
    name: nft.metadata.name,
    description: nft.metadata.description,
    amount: nft.amount,
    tokenId: nft.tokend_id,
  }))
}

const getOwnerData = async (address: string) => {
  const options = { chain: ChainList.Rinkeby, address: address};
  return Moralis.Web3API.account.getNFTsForContract(options).then((data) => {
      let result = data.result.reduce( (object, currentElement) => {
          object[currentElement.token_id] = currentElement.amount;
          return object; 
      }, {})
      console.log(result);
      return result;
  })
}