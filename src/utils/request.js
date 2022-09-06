import axios from 'axios'
import store from '@/store/index.js'
import { getToken } from '@/utils/auth.js'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  console.log(config);
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带token
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => response,
  error => {
    console.log('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export const createAPI = (url, method, data) => {
  let config = {}
  if ((method === 'get')) {
    config.params = data
  } else {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

export const createFormAPI = (url, method, data) => {
  let config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'json'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}