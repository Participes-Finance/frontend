<template>
  <header class="bg-white">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-gray-300 lg:border-none">
        <div class="flex items-center">
          <a href="/">
            <img class="h-10 w-auto" src="../assets/logo.png" alt="logo" />
          </a>
          <div class="hidden ml-10 space-x-8 lg:block">
            <router-link
              v-for="link in navigation"
              :key="link.name"
              :to="link.href"
              active-class="font-bold"
              exact
              class="font-medium text-gray-500 hover:text-gray-900"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
        <div class="ml-10 space-x-4">
          <!-- <img class="h-10 w-auto" src="../assets/logo.png" alt="logo" /> -->
          <!-- <p v-if="partsBalance">{{ partsBalance }}</p> -->
          <div v-if="userDisplayName">{{ userDisplayName }}</div>
          <div v-else-if="!isSupportedNetwork" class="flex items-center">
            <ExclamationIcon class="h-5 w-5 text-yellow-500 mr-2" />
            <div class="text-gray-500">Unsupported network</div>
          </div>
          <button v-else @click="connectWallet" class="btn btn-secondary">Connect Wallet</button>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <router-link
          v-for="link in navigation"
          :key="link.name"
          :to="link.href"
          active-class="font-bold"
          exact
          class="font-medium text-gray-500 hover:text-gray-900"
        >
          {{ link.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useWalletStore from 'src/store/wallet';
import useDataStore from 'src/store/data';

// const { getERC20Balance } = useDataStore();
const { connectWallet, isSupportedNetwork, userDisplayName, provider, network } = useWalletStore();
import { ExclamationIcon } from '@heroicons/vue/solid';
// import { formatUnits } from '@ethersproject/units';
// import { PARTS_ADDRESSES } from 'src/utils/constants';

// Header menu bar items
const navigation = [
  { name: 'Home', href: '/interface-build' },
  { name: 'Pools', href: '/interface-build/pools' },
  { name: 'Locks and Rewards', href: '/interface-build/locksnrewards' },
  { name: 'Faucet', href: '/interface-build/faucet' },
];

export default defineComponent({
  name: 'LayoutHeader',
  components: { ExclamationIcon },
  async setup() {
    // const chainId = (network?.value?.chainId)?.toString();
    // const partsTokenAddr = PARTS_ADDRESSES?.get(chainId as string);
    // console.log(partsTokenAddr);
    // const partsBalance = parseInt(formatUnits(await getERC20Balance(partsTokenAddr, provider.value))).toFixed(4);
    return { connectWallet, isSupportedNetwork, navigation, userDisplayName };
  },
});
</script>
