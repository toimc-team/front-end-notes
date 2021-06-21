import Vue from 'vue'
import Vuex from 'vuex'
import { getRights } from '@/api/user'
// import WebSocketClient from '@/utils/wsUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    qrcodeShow: false,
    rights: {}
  },
  mutations: {
    setCodeShow(state, value) {
      state.qrcodeShow = value || false
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setRefreshToken(state, value) {
      state.refreshToken = value
      localStorage.setItem('refreshToken', value)
    },
    // 设置用户的基本信息
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setAllRights(state, value) {
      state.rights = value
    }
  },
  getters: {
    isLogin: state =>
      state.userInfo && typeof state.userInfo.name !== 'undefined'
  },
  actions: {
    async getAuth({ commit }, payload) {
      console.log(payload)
      const result = await getRights(payload)
      console.log('🚀 ~ file: index.js ~ line 31 ~ getAuth ~ result', result)
      commit('setAllRights', result)
      return result
    }
  }
})
