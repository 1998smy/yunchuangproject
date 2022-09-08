import Vue from 'vue'
import Vuex from 'vuex'

// 全局使用
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
  state: {
    userInfo: undefined
  },
  getters: {
  },
  mutations: {
    SETINFO(state, info) {
      state.userInfo = info
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
