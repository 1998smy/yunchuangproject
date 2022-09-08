import axios from 'axios'
import store from '@/store/index.js'
import { Message } from 'element-ui'
import { getToken } from '@/utils/token.js'

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 5000,

  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(config => {
    // if (store.state.userInfo) {
    // 如果有用户信息，就携带token
    config.headers.Authorization = getToken()
    // }
    // 多用于登录时的cookies判断
    // nProgress.start()
    return config
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(response => {
    // 多用于登录时的cookies判断
    // nProgress.done()
    return response
  }, err => {
    console.log(err);
  })
  // 直接返回
  return instance(config)

}
