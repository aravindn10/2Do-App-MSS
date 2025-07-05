import './assets/main.css'

import { createApp, Transition } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'

const app = createApp(App)
app.use(Toast,{
    Transition: "vue-toastification-slide",
    maxToasts: 20,
    newestOnTop: true
});
app.mount('#app')
