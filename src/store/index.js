import Vuex from 'vuex'
import Vue from 'vue'
import { removeToken } from '@/common/auth'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      email: '',
      avatar: '',
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_USER(state, val) {
      const { username, email, avatar } = val
      state.userInfo = {
        username,
        email,
        avatar,
      }
    },
  },
  actions: {
    loginUser({ commit }, val) {
      commit('SET_USER', val)
    },
    exitUser({ commit }) {
      let userInfo = {
        username: '',
        email: '',
        avatar: '',
      }
      commit('SET_USER', userInfo)
    },
  },
})
