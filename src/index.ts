
import {
  MORALIS_APPLICATION_ID,
  MORALIS_API_KEY
} from './constants'

import { Configuration } from './moralis/configuration';
import * as api from './moralis/api';

const config: Configuration = { apiKey: MORALIS_API_KEY, accessToken: MORALIS_APPLICATION_ID };
const instance: api.AccountApi = new api.AccountApi(config);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
  * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
  * @summary Gets the NFTs owned by a given address
  * @param {string} address The owner of a given token
  * @param {ChainList} [chain] The chain to query
  * @param {string} [format] The format of the token id
  * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
  * @param {*} [options] Override http request option.
  * @throws {RequiredError}
  * @memberof AccountApi
*/
const getAllNFTs = async (
  address: string,
  chain?: api.ChainList,
  format?: string,
  order?: string
): Promise<Array<api.NftOwner>> => {
  
  let page = 0;
  let pageSize = 100;
  let NFTs: Array<api.NftOwner> = [];
  let delay = 3;
  try{
    while(true) {
      const response = await instance.getNFTs(address, chain, format, page * pageSize, page * pageSize + pageSize);
      if(response.status == 'SYNCING' && delay !== 0) {
        await sleep(2000);
        delay--;
        continue;
      }
      if(delay === 0) {
        console.error("Moralis NFT SDK Syncing Failed");
        throw(new Error("error moralis sdk getNfts sync failed"));
      }
      NFTs = [...NFTs, ...response.result];
      page++;
      if(page * pageSize > response.total) break;
    }
  } catch(err) {
    console.error("error occured while fetching user NFTs");
    throw(err);
  }
  return NFTs;
}

const runProcess = async () => {
  console.log("woww");
  const res = await getAllNFTs("0x9B6134Fe036F1C22D9Fe76c15AC81B7bC31212eB", api.ChainList.Rinkeby);
}

export const {
  getAllNFTs
}