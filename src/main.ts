import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import parallax from './directives/parallax';

const app = createApp(App)

app.directive('parallax', parallax)
app.use(router)

app.mount('#app')
