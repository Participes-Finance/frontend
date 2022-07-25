<template>
    <div class="card bg-white">
      <div class="card-content bg-white">
        <div class="media bg-white">
          <div class="media-content bg-white">
            <p v-if="tokenId" class="title is-4 text-black"> Lock #{{tokenId}}</p>
          </div>
        </div>
        </div>
        <button class="button bg-white text-black" @click="deposit">Deposit</button>
        <button v-if="isDeployer" class="button bg-white text-black" @click="harvest">Harvest</button>
        <button v-if="isDeployer" class="button bg-white text-black" @click="harvestFromMasterChef">AdminHarvest</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref} from 'vue';
import useWalletStore from 'src/store/wallet';
import useDataStore from 'src/store/data';

import { BigNumber } from '@ethersproject/bignumber';
const { provider, userAddress, signer} = useWalletStore();
const { veContract, distContract, getERC20Balance, approveContract} = useDataStore();
import { commify, formatUnits, Contract } from 'src/utils/ethers';
import { abi as erc20abi } from 'src/utils/contracts/ERC20.json';

export default defineComponent({
  name: 'LockCard',
  props: ['tokenId'],
  async setup(props) {
    const isDeployer = true;
    const tokenId = props.tokenId;


    return {
      userAddress, 
      isDeployer,
      tokenId
    };
  },
})
</script>

<style>
  @import 'bulma/css/bulma.css';
  .card{
    width: 280px;
    outline-style: solid;
    outline-width: 1px;
    outline-color: white;
  }

</style>
