import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import course from './course'
import profile from './profile'
import blog from './blog'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snack: {},
  },
  getters: {
  },
  mutations: {
    showSnack(state, data) {
      state.snack = data;
    },
  },
  actions: {
    showSnack({ commit }, data) {
      commit("showSnack", data);
    },
  },
  modules: {
    auth,
    course,
    profile,
    blog
  }
})
