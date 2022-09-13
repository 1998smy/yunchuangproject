import { request } from "@/utils/request";

export function getAllSetting(params) {
  return request({
    url: '/permissions',
    method: 'get',
    params
  })
}

