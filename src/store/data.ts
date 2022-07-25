/**
 * @dev Poll on each block to read data
 */

 import { ref } from 'vue';
 import { BigNumber, Contract } from 'src/utils/ethers';
 import useWalletStore from 'src/store/wallet';
 import { ContractInterface, constants} from 'ethers';
 import { valueToNode } from '@babel/types';

 import { MASTERCHEFV2_ADDRESSES, VE_ADDRESSES, DIST_ADDRESSES } from 'src/utils/constants';
 import { abi as MasterChefV2ABI } from 'src/utils/contracts/MasterChefV2.json';
 import { abi as ercABI } from 'src/utils/contracts/ERC20.json';
 import { abi as veABI } from 'src/utils/contracts/ve.json';
 import { abi as distABI } from 'src/utils/contracts/ve_dist.json';
 
 const { provider, userAddress, network, signer } = useWalletStore();
 
 // Most recent data read is saved as state
 const lastBlockNumber = ref<number>(0);
 const lastBlockTimestamp = ref<number>(0);
 const ethBalance = ref<bigint>();
 const masterChefV2 = ref<Contract>(0);
 const veContract = ref<Contract>(0);
 const distContract = ref<Contract>(0);
 const poolLength = ref<number>(0);
 const numLocks = ref<number>(0);
 const pools = ref();
 const lpTokens = ref();
 const userInfos = ref();
 const erc20abi = JSON.stringify(ercABI);
 
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
      const balance = await provider.value.getBalance(userAddress.value);
  
      // Save off data
      lastBlockNumber.value = blockNumber;
      lastBlockTimestamp.value = timestamp 
      ethBalance.value = (balance as BigNumber).toBigInt();
    
      // [TODO]: insert farms polling here as well (as a start - might need to reorg. later) C:
      masterChefV2.value = new Contract(MASTERCHEFV2_ADDRESSES?.get(chainId as string) as string, JSON.stringify(MasterChefV2ABI), signer.value);
      poolLength.value = ((await masterChefV2.value.poolLength()) as BigNumber).toNumber();

      veContract.value = new Contract(VE_ADDRESSES?.get(chainId as string) as string, JSON.stringify(veABI), signer.value);
      distContract.value = new Contract(DIST_ADDRESSES?.get(chainId as string) as string, JSON.stringify(distABI), signer.value);

      numLocks.value = (await veContract?.value?.balanceOf(userAddress.value)).toNumber();

      const tempPools = [];
      const tempTokens = [];
      const tempInfos = [];
      for(let i=0; i<poolLength.value; i++){
        tempPools.push(await masterChefV2.value.poolInfo(i));
      }
      pools.value = tempPools;

      for(let i=0; i<poolLength.value; i++){
        tempTokens.push((await masterChefV2.value.lpToken(i)).toString());
      }
      lpTokens.value = tempTokens;


      for(let i=0; i<poolLength.value; i++){
        tempInfos.push((await masterChefV2.value.userInfo(i, userAddress.value)));
      }
      userInfos.value = tempInfos;
 
   }

  async function getERC20Balance(tokenAddr: string | undefined, provider:any){
    const ERC20Contract = new Contract(tokenAddr as string, erc20abi, provider);
    const tokenBalance = (await ERC20Contract.balanceOf(userAddress.value) as BigNumber).toString();
    return tokenBalance;
  }

  async function getAllowance(tokenAddr: string, provider:any){
    const ERC20Contract = new Contract(tokenAddr, erc20abi, provider);
    const allowance = (await ERC20Contract.allowance(userAddress.value,  masterChefV2.value.address) as BigNumber);
    return allowance;
  }

  async function approveContract(tokenAddr: string, provider:any, contractAddress:string){
    const ERC20Contract = new Contract(tokenAddr, erc20abi, provider);
    await ERC20Contract.approve(contractAddress, constants.MaxUint256);
  }

   // Call this method to poll now, then poll on each new block
   function startPolling() {
     // const multicall = new Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider.value);
     provider.value.on('block', (/* block: number */) => void poll());
   }
 
   return {
     // Methods
     startPolling,
     getERC20Balance,
     getAllowance,
     approveContract,
     // Data
     lastBlockNumber,
     lastBlockTimestamp,
     ethBalance,
     masterChefV2,
     veContract,
     distContract,
     poolLength,
     numLocks,
     pools,
     lpTokens,
     userInfos
   };
 }