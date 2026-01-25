import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './base.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router).mount('#app')
// createApp(App).use(router).mount('#app')
