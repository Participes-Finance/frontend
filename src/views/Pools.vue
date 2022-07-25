<template>
  <div>Pools</div>
  <div>
    <p>Number of Pools: {{ poolLength }}</p>
  </div>
  <div>
    <div class="center-div">
    <Suspense>
        <PoolCard v-for="(tokenAddr, index) in lpTokens" :key="index" :tokenAddr="tokenAddr" :infos="userInfos[index]" :pid="index"/>
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
    name: "Pools",
    setup() {
        const { poolLength, pools, lpTokens, userInfos} = useDataStore();
        // const { userDisplayName, network } = useWalletStore();
        console.log(poolLength?.value);
        console.log(pools.value);
        console.log(lpTokens.value);
        console.log(userInfos.value);
        return {poolLength, lpTokens, userInfos};
    },
    components: { PoolCard }
});
</script>

<style>
.center-div{
  margin-left: 100px;
  margin-right: 100px;
  display: inline-block;
}
</style>
