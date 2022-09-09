import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/token.js';

// 全局使用
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
  state: {
    userName: sessionStorage.getItem('userName') || '',
    token: getToken() || '',
  },
  getters: {
  },
  mutations: {
    SETUSERNAME(state, name) {
      state.userName = name;
      sessionStorage.setItem('userName', name);
    },
    SETTOKEN(state, val) {
      state.token = val;
      setToken(val);
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
