import './assets/main.css'
import {createApp} from 'vue'
import App from "@/App.vue";
// Router
import router from './router'
// Pinia
import {createPinia} from 'pinia'
// PrimeVue
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Button from "primevue/button"
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.directive('tooltip', Tooltip);
app.use(PrimeVue);

app.mount('#app')
