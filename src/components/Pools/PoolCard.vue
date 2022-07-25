<template>
  <div class="card bg-white">
    <div class="card-content bg-white">
      <div class="media bg-white">
        <div class="media-content bg-white">
          <p v-if="tokenName" class="title is-4 text-black">{{ tokenName }}({{ tokenTicker }}) Farm</p>
          <p v-if="tokenAddr" class="subtitle is-7 text-black">{{ tokenAddr }}</p>
          <p v-if="tokenBalance" class="subtitle is-6 text-black">Balance: {{ tokenBalance }}</p>
          <p v-if="deposited" class="subtitle is-6 text-black">Deposited: {{ deposited }}</p>
          <p v-if="deposited" class="subtitle is-6 text-black">Claimable PARTS: {{ claimable }}</p>
          <input
            v-model="depositAmount"
            class="input is-link bg-white text-black"
            type="text"
            placeholder="Deposit amount"
          />
        </div>
      </div>
    </div>
    <button class="button bg-white text-black" @click="deposit">Deposit</button>
    <button class="button bg-white text-black" @click="approve">Approve</button>
    <div></div>
    <button v-if="isDeployer" class="button bg-white text-black" @click="harvest">Harvest</button>
    <button v-if="isDeployer" class="button bg-white text-black" @click="harvestFromMasterChef">AdminHarvest</button>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import useWalletStore from 'src/store/wallet';
import useDataStore from 'src/store/data';

import { BigNumber } from '@ethersproject/bignumber';
const { provider, userAddress, signer } = useWalletStore();
const { masterChefV2, getERC20Balance, approveContract } = useDataStore();
import { commify, formatUnits, Contract } from 'src/utils/ethers';
import { abi as erc20abi } from 'src/utils/contracts/ERC20.json';

export default defineComponent({
  name: 'PoolCard',
  props: ['tokenAddr', 'infos', 'pid'],
  async setup(props) {
    const depositAmount = ref(0);
    const pid = props.pid;
    console.log(signer.value);
    const tokenAddr = props.tokenAddr;
    const tokenBalance = commify(formatUnits(await getERC20Balance(tokenAddr, provider.value)));
    const tokenContract = new Contract(tokenAddr, JSON.stringify(erc20abi), provider.value);
    const tokenName = await tokenContract.name();
    const tokenTicker = await tokenContract.symbol();
    const deposited = parseInt(formatUnits(props.infos.amount as BigNumber)).toFixed(4);
    const claimable = parseInt(formatUnits((await pendingParts()) as BigNumber)).toFixed(4);

    // [TODO]: GET THIS TO WORK DAMMIT!!!
    // const approved = computed(() => {
    //   return getAllowance(tokenAddr, provider.value).then((data) =>{
    //     var allowance = parseInt(formatUnits(data));
    //     console.log(allowance);
    //     return (allowance >= depositAmount);
    //   });
    // })

    const isDeployer = true;

    async function deposit() {
      await masterChefV2?.value?.deposit(pid, (depositAmount.value * 1e18).toFixed(), userAddress.value);
    }

    async function approve() {
      await approveContract(tokenAddr, signer.value, masterChefV2?.value?.address);
    }

    async function harvestFromMasterChef() {
      await masterChefV2?.value?.harvestFromMasterChef();
    }

    async function harvest() {
      await masterChefV2?.value?.harvest(pid, userAddress.value);
    }

    async function pendingParts() {
      return await masterChefV2?.value?.pendingParts(pid, userAddress.value);
    }

    return {
      tokenAddr,
      tokenBalance,
      tokenName,
      tokenTicker,
      deposited,
      pid,
      depositAmount,
      userAddress,
      claimable,
      isDeployer,
      deposit,
      approve,
      harvestFromMasterChef,
      harvest,
      pendingParts,
    };
  },
});
</script>

<style>
@import 'bulma/css/bulma.css';
.card {
  width: 280px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: white;
}
</style>
