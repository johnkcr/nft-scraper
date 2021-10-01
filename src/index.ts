import Moralis from 'moralis/node';

import {
  MORALIS_APPLICATION_ID,
  MORALIS_SERVER_URL,
  MORALIS_MASTER_KEY
} from './constants'

Moralis.serverURL = MORALIS_SERVER_URL;
Moralis.masterKey = MORALIS_MASTER_KEY;
Moralis.initialize(MORALIS_APPLICATION_ID);


/**
  * @summary Gets the NFTs owned by a given address
  * @param {string} address The owner address
*/
export const getUserNFTs = (userAddress: string) => {
  return Moralis.Cloud.run('getUserNFTs', { userAddress });
}

/**
  * @summary Add new user to watchEthEvent Table
  * @param {string} address The owner address
*/
export const addUserToWatchEthEvent = (userAddress: string) => {
  return Moralis.Cloud.run('watchEthAddress', { address: userAddress })
}

/**
  * @summary Get all tokens after specific time
  * @param {Date} lastUpdatedAt The last updated time
*/
export const getUpdatedUserNFTs = (lastUpdatedAt: Date) => {
  return Moralis.Cloud.run('getUpdatedNFTs', { lastUpdatedAt });
}

// Just for testing will remove this part
const runProcess = async () => {
  try {
    const userNFTs = await getUserNFTs('0x9B6134Fe036F1C22D9Fe76c15AC81B7bC31212eB');
    await addUserToWatchEthEvent('0xf1f5cb17E17759A4fc1CD1C6EdC8aa1bFE6Cf8D0');
    const res = await getUserNFTs('0xf1f5cb17E17759A4fc1CD1C6EdC8aa1bFE6Cf8D0');
    console.log({res});
  } catch(err) {
    console.log("error", err);
  }
}

runProcess();
