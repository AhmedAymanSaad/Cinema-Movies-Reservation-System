import Vue from "vue";
import App from "./App.vue";
import { routes } from "./routes";
import VueRouter from "vue-router";
import { store } from "./store/store";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
//import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000/api/";

Vue.use(Vuelidate);

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
