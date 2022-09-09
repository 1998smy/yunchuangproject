import { request } from "@/utils/request";

export function getUserList(params) {
  return request({
    url: 'users',
    method: 'get',
    params
  })
}

export function getSetName(params) {
  return request({
    url: '/permissions/simple',
    method: 'get',
    params
  })
}

export function getUserInfo(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

export function updateUserInfo(id, data) {
  return request({
    url: 'users/' + id,
    method: 'put',
    data
  })
}

export function deleteUserInfo(id, data) {
  return request({
    url: 'users/' + id,
    method: 'delete',
    data
  })
}