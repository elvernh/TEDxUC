import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import BuyTicket from '../views/BuyTicket.vue'
import PaymentMethod from "../views/PaymentMethod.vue"
import ConfirmationPage from '../views/ConfirmationPage.vue'
import Login from "../views/LoginPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
    },
    
    // { path: '/gallery', name: 'Gallery', component: Gallery },
    // { path: '/mini-game', name: 'Mini-game', component: MiniGame },
    { path: '/login', name: 'Login', component: Login },
    { path: '/buy-ticket', name: 'Buy Ticket', component: BuyTicket },
    { path: '/payment-method', name: 'Payment Method', component: PaymentMethod,  meta: { keepAlive: true }   },
    { path: '/confirmation-page', name: 'Confirmation Page', component: ConfirmationPage },
  ],
})

export default router
