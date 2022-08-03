<template>
  <div>Pools</div>
  <div>
    <p>Number of Pools: {{ poolLength }}</p>
  </div>
  <div>
    <div class="center-div">
      <Suspense>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 auto-rows-fr" style="margin-top: 20px;">
          <PoolCard
            v-for="(tokenAddr, index) in lpTokens"
            :key="parseInt((index.toString()))"
            :tokenAddr="tokenAddr"
            :infos="userInfos[index]"
            :pid="index"
          />
        </div>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useDataStore from 'src/store/data';
import useWalletStore from 'src/store/wallet';
import { commify, formatUnits } from 'src/utils/ethers';
import PoolCard from '../components/Pools/PoolCard.vue';

export default defineComponent({
  name: 'Pools',
  setup() {
    const { poolLength, pools, lpTokens, userInfos } = useDataStore();
    // const { userDisplayName, network } = useWalletStore();
    console.log(poolLength?.value);
    console.log(pools.value);
    console.log(lpTokens.value);
    console.log(userInfos.value);
    return { poolLength, lpTokens, userInfos };
  },
  components: { PoolCard },
});
</script>

<style>
  .center-div {
    margin-left: 100px;
    margin-right: 100px;
    display: inline-block;
  }

  .auto-rows-fr {
      grid-auto-rows: minmax(0,1fr);
  }
  .grid-cols-1 {
      grid-template-columns: repeat(auto,minmax(0,1fr));
  }
  .gap-y-8 {
      row-gap: 2rem;
  }
  .gap-x-8 {
      -webkit-column-gap: 2rem;
      column-gap: 2rem;
  }
  .grid {
      display: grid;
  }
</style>
