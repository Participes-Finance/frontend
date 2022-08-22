<template>
  <div class="title is-4 text-black" style="margin-bottom: 5px;"> Create New Lock</div>
  <button class="button with-margins bg-white text-black" @click="approve">Approve VeNFT Contract</button>
  <div>
    <div class="center-div">
      <!-- <q-btn color="white" text-color="black" label="Standard"></q-btn> -->
      <div>
        <div id="container">
          <div id="left">
            <p>Deposit Amount:</p>
            <input
              v-model="depositAmount"
              class="input is-link bg-white text-black"
              type="text"
              placeholder="Deposit amount"
            />
          </div>
          <div id="right">
            <p>Lock Time (seconds):</p>
            <input
              v-model="lockTime"
              class="input is-link bg-white text-black"
              type="text"
              placeholder="Lock Time"
            />
          </div>
        </div>
      </div>
      <button class="button with-margins bg-white text-black" @click="createLock">Create New Lock</button>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 auto-rows-fr" style="margin-top: 20px;">
        <Suspense>
          <LockCard v-for="id in locks" :key="id" :tokenId="id" />
        </Suspense>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import useDataStore from 'src/store/data';
  import useWalletStore from 'src/store/wallet';
  import { commify, formatUnits } from 'src/utils/ethers';
  import LockCard from 'src/components/LocksNRewards/LockCard.vue';
  const { veContract, numLocks, approveContract} = useDataStore();
  const { userAddress, signer } = useWalletStore();

  export default defineComponent({
    name: 'LocksNRewards',
    setup() {
      const depositAmount = ref(0);
      const lockTime = ref(0);
      const locks = numLocks.value;
      console.log('num of locks: ', locks);

      async function approve() {
        const token = await veContract?.value?.token();
        console.log(token);
        await approveContract(token, signer.value, veContract?.value?.address);
      }

      async function createLock(){
        console.log("creating new lock...");
        const amount = (depositAmount.value*1e18).toFixed();
        console.log(amount);
        console.log(lockTime.value);
        await veContract?.value?.create_lock(amount, lockTime.value);
      }

      return { 
        locks, 
        depositAmount, 
        lockTime, 
        createLock,
        approve
      };
    },
    components: { LockCard },
  });
</script>

<style>
  .with-margins{
    margin-top: 10px;
    margin-bottom: 10px;
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

  #container {
    display: flex;                  /* establish flex container */
    flex-direction: row;            /* default value; can be omitted */
    flex-wrap: nowrap;              /* default value; can be omitted */
    /*justify-content: space-between; /* switched from default (flex-start, see below) */
    justify-content: center; /* switched from default (flex-start, see below) */
  }
</style>