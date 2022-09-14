import { request } from "@/utils/request";

export function getAllSetting(params) {
  return request({
    url: '/permissions',
    method: 'get',
    params
  })
}

export function addSetting(data) {
  return request({
    url: '/permissions',
    method: 'post',
    data
  })
}

export function searchSetById(id, params) {
  return request({
    url: '/permissions/' + id,
    method: 'get',
    params
  })
}

export function editSet(id, data) {
  return request({
    url: '/permissions/' + id,
    method: 'put',
    data
  })
}

export function deleteSet(id, data) {
  return request({
    url: '/permissions/' + id,
    method: 'delete',
    data
  })
}


