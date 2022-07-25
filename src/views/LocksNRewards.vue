<template>
  <div>Locks and Rewards</div>
  <div>
  </div>
  <div>
    <div class="center-div">
      <!-- <q-btn color="white" text-color="black" label="Standard"></q-btn> -->
      <Suspense>
        <LockCard v-for="id in locks" :key="id" :tokenId="id" />
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import useDataStore from 'src/store/data';
  import useWalletStore from 'src/store/wallet';
  import { commify, formatUnits } from 'src/utils/ethers';
  import LockCard from 'src/components/LocksNRewards/LockCard.vue';
  const { veContract, numLocks } = useDataStore();
  const { userAddress } = useWalletStore();

  export default defineComponent({
    name: "LocksNRewards",
    setup() {
      const locks = numLocks.value;
      console.log("num of locks: ", locks);

      return {locks}
    },
    components: { LockCard }
});
</script>

<style>
.center-div{
  margin-left: 100px;
  margin-right: 100px;
  display: inline-block;
}
</style>
