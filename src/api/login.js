import { request } from "@/utils/request";

export function login(data) {
  return request({
    url: '/frame/login',
    method: 'post',
    data
  })
}