<template>
  <div>Farms</div>
  <div>
    <p>Number of Pools: {{ poolLength }}</p>
  </div>
  <div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import useDataStore from 'src/store/data';
  import useWalletStore from 'src/store/wallet';
  import { commify, formatUnits } from 'src/utils/ethers';

  export default defineComponent({
    name: "Farms",
    setup() {
        const { lastBlockNumber, lastBlockTimestamp, ethBalance, masterChefV2, poolLength, addr, pools } = useDataStore();
        // const { userDisplayName, network } = useWalletStore();
        console.log(poolLength?.value);
        console.log(masterChefV2?.value);
        console.log(addr.value);
        const blockNumber = computed(() => commify(lastBlockNumber.value));
        const date = computed(() => new Date(lastBlockTimestamp.value * 1000).toLocaleString());
        const balance = computed(() => (ethBalance.value ? Number(formatUnits(ethBalance.value)).toFixed(4) : 0));
        return { blockNumber, date, balance, formatUnits, poolLength };
    }
});
</script>
