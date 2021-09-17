import Moralis from 'moralis';
import { ChainList } from './types';
import {
  MORALIS_APPLICATION_ID,
  MORALIS_SERVER_URL
} from './constants'

/**
   * Init Moralis SDK
   * @summary Initialize Moralis SDK using server ulr and application id
*/
const init = async () => {
  Moralis.serverURL = MORALIS_SERVER_URL;
  Moralis.initialize(MORALIS_APPLICATION_ID);
}

/**
   * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
   * @summary Gets the NFTs owned by a given address
   * @param {string} address The owner of a given token
   * @param {ChainList} [chain] The chain to query
   * @param {string} [format] The format of the token id
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
*/
export const getNFTs = (
  address: string,
  chain?: ChainList,
  format?: string,
  offset?: number,
  limit?: number,
  order?: string,
  options: any = {},
) => {
  return Moralis.Web3API.account.getNFTs({chain, format, offset, limit, address, order, ...options} )
}