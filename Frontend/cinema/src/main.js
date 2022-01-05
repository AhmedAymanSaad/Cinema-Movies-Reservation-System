import Vue from 'vue'
import App from './App.vue'
import { routes } from "./routes"
import VueRouter from 'vue-router';
import { store } from './store/store';
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes ,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
