import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue';
import Login from "../views/LoginPage.vue";
import BuyTicket from "../views/BuyTicket.vue";
import QRScanner from "../views/QRScanner.vue"; 
import testing from "../views/testing.vue"; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
    },
    { path: '/buy-ticket', name: 'Buy Ticket', component: BuyTicket },
    // { path: '/gallery', name: 'Gallery', component: Gallery },
    // { path: '/mini-game', name: 'Mini-game', component: MiniGame },
    { path: '/login', name: 'Login', component: Login },
    { path: "/qr-scanner", name: 'QRScan', component: QRScanner },
    { path: "/testing", name: 'test', component: testing },
  ],
})

export default router
