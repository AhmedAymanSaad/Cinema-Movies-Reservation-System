import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    auth: null,
    userType: "Guest",
  },
  getters: {
    getUserType: (state) => {
      return state.userType;
    },
  },
});
