import Vue from 'vue'
import App from './App.vue'
import { routes } from "./routes"
import VueRouter from 'vue-router';
import { store } from './store/store';
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource';


Vue.use(VueResource);

Vue.use(Vuelidate)

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
