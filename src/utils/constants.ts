// Default RPC URL when user does not have a wallet connected
export const RPC_URL = `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`;

// Read data using Multicall2: https://github.com/makerdao/multicall
export const MULTICALL_ADDRESS = '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'; // applies to mainnet, rinkeby, goerli, ropsten, kovan
export const MULTICALL_ABI = [
  'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
  'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)',
  'function getLastBlockHash() view returns (bytes32 blockHash)',
  'function getEthBalance(address addr) view returns (uint256 balance)',
  'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
  'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
  'function getCurrentBlockCoinbase() view returns (address coinbase)',
  'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[] returnData)',
  'function tryBlockAndAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
];

export const MASTERCHEFV2_ADDRESSES = new Map<string, string>([
  ['80001', '0x767f2f056A35721FD5F475Ae25955039fF2d5b39'],
  ['1337', '0x94A81d43299156c59C72b419a5063f9D557837b0'],
]);

export const PARTS_ADDRESSES = new Map<string, string>([['80001', '0xFa547Da9b7EE8E7cf098395122d231587d995e8e']]);

export const VE_ADDRESSES = new Map<string, string>([['80001', '0xDd8277AA7Cfb00060DC1Cc41F3916c61344D13bA']]);

export const DIST_ADDRESSES = new Map<string, string>([['80001', '0xAe77B14B437A629D02a860BdeE439F63982cfc26']]);
