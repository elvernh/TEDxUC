import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue';
import Login from '../views/LoginPage.vue';
import BuyTicket from '../views/BuyTicket.vue';
import MiniGame from '../views/MiniGamePage.vue';
// import SpeakerSchedule from '../views/SpeakerSchedule.vue';

// Event Pages
import PreEvent1 from '../views/events/PreEvent1.vue';
import PreEvent2 from '../views/events/PreEvent2.vue';
import PreEvent3 from '../views/events/PreEvent3.vue';
import MainEvent from '../views/events/MainEvent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Homepage },
    { path: '/buy-ticket', name: 'Buy Ticket', component: BuyTicket },
    { path: '/mini-game', name: 'Mini Game', component: MiniGame },
    // { path: '/speaker-schedule', name: 'Speaker & Schedule', component: SpeakerSchedule },
    { path: '/login', name: 'Login', component: Login },

    // Event Dropdown Routes
    { path: '/event/preevent1', name: 'Pre Event 1', component: PreEvent1 },
    { path: '/event/preevent2', name: 'Pre Event 2', component: PreEvent2 },
    { path: '/event/preevent3', name: 'Pre Event 3', component: PreEvent3 },
    { path: '/event/mainevent', name: 'Main Event', component: MainEvent },
  ],
});

export default router;
