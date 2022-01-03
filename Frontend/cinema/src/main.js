import { createApp } from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
import { routes } from './routes';
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { store } from './store/store.js'

const storage = createStore(store)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.use(storage)
app.mount('#app')

