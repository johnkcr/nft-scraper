
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
  * Gets all NFTs owned by the given address * 
  * @summary Gets all the NFTs owned by a given address
  * @param {string} address The owner of a given token
  * @param {ChainList} [chain] The chain to query
  * @param {string} [format] The format of the token id
  * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
  * @param {string} [delayLimit] The deay limt to sync moralis api. Default 10,000 ms
  * @throws {RequiredError}
  * @memberof AccountApi
*/
export const getAllNFTs = async (
  address: string,
  chain?: api.ChainList,
  format?: string,
  order?: string,
  delayLimit: number = 10000,
): Promise<Array<api.NftOwner>> => {
  
  let NFTs: Array<api.NftOwner> = [];
  // delay 10 secs to sync the address for the first time.

  try{

    let offset = 0, totalCount = 0;
    let page = 0, pageSize = 100;
    let waitSyncTime = -1;

    while(offset <= totalCount) {
      const response = await instance.getNFTs(address, chain, format, offset, offset + pageSize);

      if(waitSyncTime > delayLimit ) {
        console.error("error occured in getAllNFTs: sync failed");
        throw(new Error("error occured in getAllNFTs: sync failed"));
      }

      if(response.status == 'SYNCING') {
        await sleep(3000);
        waitSyncTime += 3000;
        continue;
      }

      NFTs = [...NFTs, ...response.result];
      
      page++;
      offset = page * pageSize;
      totalCount = response.total;
    }

  } catch(err) {
    console.error("error occured in getNFTs:", err);
    throw(err);
  }
  return NFTs;
}


const runProcess = async () => {
  console.log("woww");
  const res = await getAllNFTs("0x9B6134Fe036F1C22D9Fe76c15AC81B7bC31212eB", api.ChainList.Rinkeby);
  console.log(res.length);
}

runProcess();
