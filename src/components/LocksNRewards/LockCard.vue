<template>
  <div class="card bg-white">
    <div class="card-content bg-white">
      <div class="media bg-white">
        <div class="media-content bg-white">
          <p v-if="tokenId" class="title is-4 text-black">Lock #{{ tokenId }}</p>
          <p class="subtitle is-7 text-black">Claimables:</p>
          <p v-for="(claimable, index) in claimableInfo" :key="index" class="subtitle is-7 text-black"> {{claimable.token}} : {{claimable.amount}}</p>
          <p v-if="amountLocked" class="subtitle is-7 text-black">Amount Locked: {{ amountLocked }}</p>
          <p v-if="endDate" class="subtitle is-7 text-black">Lock End Time: {{ endDate }}</p>
          <p class="subtitle is-6 text-black">Deposit Amount:</p>
          <input
            v-model="increasingAmount"
            class="input is-link bg-white text-black"
            type="text"
            placeholder="Deposit amount"
          />
        </div>
      </div>
    </div>
    <button class="button bg-white text-black" @click="increaseAmount">Increase Amount</button>
    <button class="button bg-white text-black" @click="claimRewards">Claim Rewards</button>
    <!-- <button v-if="isDeployer" class="button bg-white text-black" @click="harvest">Harvest</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import useWalletStore from 'src/store/wallet';
import useDataStore from 'src/store/data';

import { BigNumber } from '@ethersproject/bignumber';
const { userAddress} = useWalletStore();
const { veContract, distContract } = useDataStore();
import { commify, formatUnits, Contract } from 'src/utils/ethers';
import { abi as erc20abi } from 'src/utils/contracts/ERC20.json';

export default defineComponent({
  name: 'LockCard',
  props: ['tokenId'],
  async setup(props) {
    const isDeployer = true;
    const tokenId = props.tokenId;
    const increasingAmount = ref(0);

    const lockInfo = await veContract?.value?.locked(tokenId);
    const amountLocked = parseInt(formatUnits(lockInfo.amount)).toFixed(4);
    const endTimestamp = (lockInfo.end as BigNumber).toNumber() * 1000;
    const date = new Date(endTimestamp);
    const endDate = date.toLocaleString();
    const claimableInfo = await distContract?.value?.claimable(tokenId);

    async function increaseAmount(){
      const amount = (increasingAmount.value * 1e18).toFixed();
      await veContract?.value?.increase_amount(tokenId, amount);
    }

    async function claimRewards(){
      await distContract?.value?.claim(tokenId);
    }

    return {
      userAddress,
      isDeployer,
      tokenId,
      amountLocked, 
      endDate,
      increasingAmount,
      increaseAmount,
      claimRewards,
      claimableInfo
    };
  },
});
</script>

<style>
@import 'bulma/css/bulma.css';
.card {
  width: 240px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: white;
  margin-top: 10px; 
  margin-bottom: 10px;
}
</style>
