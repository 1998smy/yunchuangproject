// 定义常量的key
const KEY = 'mmtoken'

// 暴露 保存token的方法
export function setToken(token) {
  return window.sessionStorage.setItem(KEY, token)
}
// 暴露 获取token的方法
export function getToken(token) {
  return window.sessionStorage.getItem(KEY)
}
// 暴露 删除token的方法
export function removeToken(token) {
  return window.sessionStorage.removeItem(KEY)
}

