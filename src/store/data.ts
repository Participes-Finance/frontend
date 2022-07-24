/**
 * @dev Poll on each block to read data
 */

import { ref } from 'vue';
import { BigNumber, Contract } from 'src/utils/ethers';
import useWalletStore from 'src/store/wallet';
import { MASTERCHEFV2_ADDRESSES } from 'src/utils/constants';
import { abi as MasterChefV2ABI } from 'src/utils/contracts/MasterChefV2.json';
import { BigNumberish } from '@ethersproject/bignumber';

const { provider, userAddress, network } = useWalletStore();

// Most recent data read is saved as state
const lastBlockNumber = ref<number>(0);
const lastBlockTimestamp = ref<number>(0);
const ethBalance = ref<number>(0);
const masterChefV2 = ref<Contract>();
const poolLength = ref<number>(0);
const addr = ref<string>();
const pools = ref();

export default function useDataStore() {
  // async function poll(multicall: Contract) {
  async function poll() {
    // Don't poll if user has not connected wallet
    if (!userAddress.value) return;

    // Execute calls and Parse return data
    // const chainId = ((await provider.value.getNetwork()).chainId).toString();
    const chainId = (await network.value?.chainId)?.toString();
    const latestBlock = await provider.value.getBlock('latest');
    const blockNumber = latestBlock.number;
    const timestamp = latestBlock.timestamp;
    const balance = provider.value.getBalance(userAddress.value);

    // Save off data
    lastBlockNumber.value = blockNumber;
    lastBlockTimestamp.value = timestamp 
    // ethBalance.value = (balance as BigNumber).toNumber();

    // [TODO]: insert farms polling here as well (as a start - might need to reorg. later) C:
    addr.value = MASTERCHEFV2_ADDRESSES?.get(chainId as string);
    masterChefV2.value = new Contract(MASTERCHEFV2_ADDRESSES?.get(chainId as string) as string, JSON.stringify(MasterChefV2ABI), provider.value);
    poolLength.value = ((await masterChefV2.value.poolLength()) as BigNumber).toNumber();

    const tempPools = [];
    for(let i=0; i<poolLength.value; i++){
      tempPools.push(await masterChefV2.value.poolInfo(i));
    }

    pools.value = tempPools;

  }

  // Call this method to poll now, then poll on each new block
  function startPolling() {
    // const multicall = new Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider.value);
    provider.value.on('block', (/* block: number */) => void poll());
  }

  return {
    // Methods
    startPolling,
    // Data
    lastBlockNumber,
    lastBlockTimestamp,
    ethBalance,
    masterChefV2,
    poolLength,
    addr,
    pools
  };
}
