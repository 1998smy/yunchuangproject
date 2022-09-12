import { request } from "@/utils/request";

export function getAllCompanys(params) {
  return request({
    url: '/companys',
    method: 'get',
    params
  })
}

export function getCompList(id, params) {
  return request({
    url: '/companys/' + id,
    method: 'get',
    params
  })
}

export function addCompany(data) {
  return request({
    url: '/companys',
    method: 'post',
    data
  })
}

export function updateComp(id, data) {
  return request({
    url: '/companys/' + id,
    method: 'put',
    data
  })
}

export function updateState(id, data) {
  return request({
    url: '/companys/' + id + '/state',
    method: 'post',
    data
  })
}

export function deleteComp(id, data) {
  return request({
    url: '/companys/' + id,
    method: 'delete',
    data
  })
}