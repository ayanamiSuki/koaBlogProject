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
    getUserInfo({ commit }, { req }) {
      console.log('[ req ] >', req)
      if (req.ctx.session.passport == undefined) {
        return false
      } else if (req.ctx.session.passport.user == undefined) {
        return false
      } else if (req.ctx.session.passport.user.username == '') {
        return false
      } else {
        commit('SET_USER', req.ctx.session.passport.user)
      }
    },
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
