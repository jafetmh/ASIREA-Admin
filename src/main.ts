
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'boxicons'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app');

