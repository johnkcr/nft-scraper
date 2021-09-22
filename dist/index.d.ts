import * as api from './moralis/api';
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
export declare const getAllNFTs: (address: string, chain?: api.ChainList, format?: string, order?: string, delayLimit?: number) => Promise<Array<api.NftOwner>>;
