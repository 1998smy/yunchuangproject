import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // 获取指定名称的cookie
  return Cookies.get(TokenKey)
}

export function setToken() {
  // 创建一个名称为TokenKey，对应值为token的cookie，由于没有设置失效时间，默认失效时间为该网站关闭时
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // 删除指定名称的cookie
  return Cookies.remove(TokenKey)
}