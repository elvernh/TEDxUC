import { createRouter, createWebHistory } from 'vue-router'
import BuyTicket from "../views/BuyTicket.vue";
import PaymentMethod from "../views/PaymentMethod.vue"
import ConfirmationPage from '../views/ConfirmationPage.vue'
import QRScanner from "../views/QRScanner.vue"; 
import testing from "../views/testing.vue"; 
import { createRouter, createWebHistory } from 'vue-router';

// Core Pages
import Homepage from '../views/Homepage.vue';
import Login from '../views/LoginPage.vue';
import MiniGame from '../views/MiniGamePage.vue';

// Event Pages
import PreEvent1 from '../views/events/PreEvent1.vue';
import PreEvent2 from '../views/events/PreEvent2.vue';
import PreEvent3 from '../views/events/PreEvent3.vue';
import MainEvent from '../views/events/MainEvent.vue';

// Registration Pages
import PreEvent1Regist from '../views/register/BuyTicketPre1.vue';
import PreEvent3Regist from '../views/register/BuyTicketPre3.vue';
import MainEventRegist from '../views/register/BuyTicketMain.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // General Routes
    { path: '/', name: 'Home', component: Homepage },
    { path: '/login', name: 'Login', component: Login },
    { path: "/qr-scanner", name: 'QRScan', component: QRScanner },
    { path: "/testing", name: 'test', component: testing },
    { path: '/mini-game', name: 'Mini Game', component: MiniGame },

    // Event Routes
    { path: '/event/preevent1', name: 'Pre Event 1', component: PreEvent1 },
    { path: '/event/preevent2', name: 'Pre Event 2', component: PreEvent2 },
    { path: '/event/preevent3', name: 'Pre Event 3', component: PreEvent3 },
    { path: '/event/mainevent', name: 'Main Event', component: MainEvent },

    // Registration Routes
    { path: '/register/preevent1', name: 'Pre Event 1 Register', component: PreEvent1Regist },
    { path: '/register/preevent3', name: 'Pre Event 3 Register', component: PreEvent3Regist },
    { path: '/register/mainevent', name: 'Main Event Register', component: MainEventRegist },
  ],
})
  

export default router;
