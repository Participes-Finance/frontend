<template>
  <div class="title is-4 text-black" style="margin-bottom: 5px;"> LP Token Faucet </div>
  <div class="center-div">
  <div> 
    <button class="button bg-white text-black" @click="requestTokens">Request 10 Tokens</button>
  </div> 
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { abi as faucetABI } from 'src/utils/contracts/Faucet.json';
import { FAUCET_ADDRESSES } from 'src/utils/constants';
import { Contract } from 'src/utils/ethers';
import useWalletStore from 'src/store/wallet';
const { userAddress, signer, network } = useWalletStore();


export default defineComponent({
  name: 'Faucet',
  setup() {
    const requestAmount = 0;
    const chainId = (network?.value?.chainId)?.toString();
    const FaucetContract = new Contract( FAUCET_ADDRESSES?.get(chainId as string) as string, JSON.stringify(faucetABI), signer.value);

    async function requestTokens() {
      const allowed = await isAllowed();
      if(!allowed){
        window.alert("You have to wait a day after requesting tokens to request more!!!");
      }
      await FaucetContract.requestTokens();
    }

    async function isAllowed() {
      const allowed = await FaucetContract.allowedToWithdraw(userAddress.value);
      return allowed
    }

    return { requestAmount, requestTokens };
  },
});
</script>