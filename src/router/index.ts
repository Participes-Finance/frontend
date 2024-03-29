import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

// For info on using Vue Router with the Composition API, see https://next.router.vuejs.org/guide/advanced/composition-api.html

const routes: Array<RouteRecordRaw> = [
  {
    path: '/interface-build',
    name: 'Home',
    component: Home,
  },
  {
    path: '/interface-build/pools',
    name: 'Pools',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pools.vue'),
  },
  {
    path: '/interface-build/locksnrewards',
    name: 'LocksNRewards',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LocksNRewards.vue'),
  },
  {
    path: '/interface-build/faucet',
    name: 'Faucet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Faucet.vue'),
  },
  // Fallback route for handling 404s
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/Error404.vue') },
];

const router = createRouter({
  // If app is not hosted at the domain root, make sure to pass the `base` input here: https://next.router.vuejs.org/api/#parameters
  history: createWebHistory(),
  routes,
});

export default router;
