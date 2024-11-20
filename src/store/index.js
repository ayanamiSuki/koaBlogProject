import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      email: '',
      avatar: '',
    },
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
