import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    // { path: '/buy-ticket', name: 'buy-ticket', component: BuyTicket },
    // { path: '/gallery', name: 'gallery', component: Gallery },
    // { path: '/mini-game', name: 'mini-game', component: MiniGame },
    // { path: '/login', name: 'login', component: Login },
  ],
})

export default router
