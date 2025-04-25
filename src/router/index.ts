import { createRouter, createWebHistory } from 'vue-router';
import ConfirmationPage from '../views/ConfirmationPage.vue';
import QRScanner from "../views/adminView/QRScanner.vue"; 


// Core Pages
import Homepage from '../views/Homepage.vue';
import Login from '../views/LoginPage.vue';
// import MiniGame from '../views/MiniGamePage.vue';
import SpeakerPage from '../views/SpeakerAndSchedulePage.vue';

// Event Pages
import PreEvent1 from '../views/events/PreEvent1.vue';
import PreEvent2 from '../views/events/PreEvent2.vue';
import PreEvent3 from '../views/events/PreEvent3.vue';
import MainEvent from '../views/events/MainEvent.vue';

// Registration Pages
import PreEvent1Register from '../views/register/BuyTicketPre1.vue';
import PreEvent3Register from '../views/register/BuyTicketPre3.vue';
import MainEventRegister from '../views/register/BuyTicketMain.vue';

// Payment Pages
import PreEvent3Payment from '../views/transaction-page/TrfPreEvent3.vue';
import MainEventPayment from '../views/transaction-page/TrfMainEvent.vue';


import Emailto from '../views/adminView/EmailToBulk.vue';
import makeqr from '../views/adminView/MakeQR.vue';
import dashboard from '../views/adminView/Dashboard.vue';
import createEvent from '../views/adminView/CreateEvent.vue';
import GalleryView from '../views/GalleryView.vue'

// Error Page
import ErrorPage from '../views/error/ErrorPage.vue';  // Import the error page

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Core Pages
    { path: '/', name: 'Home', component: Homepage },
    { path: '/login', name: 'Login', component: Login },
    { path: "/qr-scanner", name: 'QR Scanner', component: QRScanner },
    // { path: '/mini-game', name: 'Mini Game', component: MiniGame },
    { path: '/speaker-schedule', name: 'Speaker & Schedule', component: SpeakerPage },

    // Event Pages
    { path: '/event/preevent1', name: 'PreEvent1', component: PreEvent1 },
    { path: '/event/preevent2', name: 'PreEvent2', component: PreEvent2 },
    { path: '/event/preevent3', name: 'PreEvent3', component: PreEvent3 },
    { path: '/event/mainevent', name: 'MainEvent', component: MainEvent },

    // Registration Pages
    { path: '/register/preevent1', name: 'PreEvent1 Register', component: PreEvent1Register },
    { path: '/register/preevent3', name: 'PreEvent3 Register', component: PreEvent3Register },
    { path: '/register/mainevent', name: 'MainEvent Register', component: MainEventRegister },

    // Payment Pages
    { path: '/register/preevent3/transaction', name: 'PreEvent3 Payment', component: PreEvent3Payment, meta: { keepAlive: true } },
    { path: '/register/mainevent/transaction', name: 'MainEvent Payment', component: MainEventPayment },

    // Confirmation Page
    { path: '/confirmation-page', name: 'Confirmation Page', component: ConfirmationPage },

    // Error Page (Wildcard Route - Must be the last entry)
    { path: '/:pathMatch(.*)*', name: 'ErrorPage', component: ErrorPage },
    { path: '/gallery', name: 'gallery', component: GalleryView},

    //ADMIN
    { path: '/Emailto', name: 'emailto', component: Emailto },
    { path: '/makeqr', name: 'makeqr', component: makeqr },
    { path: '/dashboard', name: 'dashboard', component: dashboard },
    { path: '/create-event', name: 'createEvent', component: createEvent },
  ],
});

export default router;
