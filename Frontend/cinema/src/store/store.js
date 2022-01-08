import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
//import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    auth: null,
    userType: "Guest",
    moviesList: [],
    eventsList: []
  },
  getters: {
    getUserType: (state) => {
      return state.userType;
    },
  },
  mutations:{
    setAuth(state,authToken){
      state.auth= authToken
    },
    setUserType(state,type){
      state.userType = type
    },
    logOutUser(state){
      state.auth = null
      state.userType = 'Guest'
    },
  },
  plugins: [createPersistedState({})],
});
