import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/auth.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => {
      return state.user;
    },
    userName: state => {
      return AuthService.getUserName(state.user);
    }
  },
  mutations: {
    setUser: (state, newUser) => {
      state.user = newUser;
    }
  },
  actions: {
    refreshUser: ({ commit }) => {
      var user = AuthService.getUser();
      commit("setUser", user);
    }
  },
  modules: {}
});
