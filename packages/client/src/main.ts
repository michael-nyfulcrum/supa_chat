import './assets/main.css'
import { createApp } from 'vue'
import App from "@/App.vue";
const app = createApp(App)

// Router
import router from './router'
app.use(router)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

// PrimeVue
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Button from "primevue/button"
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.use(PrimeVue);

app.mount('#app')
