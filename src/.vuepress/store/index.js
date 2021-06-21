import Vue from 'vue'
import Vuex from 'vuex'
import { getRights } from '@/api/user'
// import createLogger from 'vuex/dist/logger'
// import WebSocketClient from '@/utils/wsUtils'

Vue.use(Vuex)

export const myStore =
  typeof sessionStorage !== 'undefined'
    ? sessionStorage
    : (process.$local = {
        setItem: (key, value) => {
          process.$local[key] = value
        },
        getItem: key => process.$local[key]
      })

export default new Vuex.Store({
  state: {
    // token: '',
    // refreshToken: '',
    // userInfo: {},
    token: myStore.getItem('token') || '',
    refreshToken: myStore.getItem('refreshToken') || '',
    userInfo: JSON.parse(myStore.getItem('userInfo') || '{}'),
    qrcodeShow: false,
    rights: {}
  },
  mutations: {
    setCodeShow(state, value) {
      state.qrcodeShow = value || false
    },
    setToken(state, value) {
      state.token = value
      myStore.setItem('token', value)
    },
    setRefreshToken(state, value) {
      state.refreshToken = value
      myStore.setItem('refreshToken', value)
    },
    // 设置用户的基本信息
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信
      myStore.setItem('userInfo', JSON.stringify(value))
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
  },
  plugins: []
  // plugins: [createLogger()]
})
