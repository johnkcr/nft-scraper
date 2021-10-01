/**
  * @summary Gets the NFTs owned by a given address
  * @param {string} address The owner of a given token
*/
export declare const getUserNFTs: (userAddress: string) => any;
/**
  * @summary Add new user to watchEthEvent Table
  * @param {string} address The owner of a given token
*/
export declare const addUserToWatchEthEvent: (userAddress: string) => any;
/**
  * @summary Get all tokens after specific time
  * @param {string} lastUpdatedAt The owner of a given token
*/
export declare const getUpdatedUserNFTs: (lastUpdatedAt: Date) => any;
