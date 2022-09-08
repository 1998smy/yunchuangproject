// 获取用户信息
import { request } from "@/utils/request";
import { getToken } from '@/utils/token.js'

export function getUserInfo(data) {
  return request({
    url: '/frame/profile',
    method: 'post',
    headers: {
      token: getToken()
    },
    data
  })
}