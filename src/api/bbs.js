import request from '@/utils/request'

export function lookSensitive () {
  return request({
    url: 'user/lookAllSensitive',
    method: 'get'
  })
}
export function deleteBbs (req) {
  return request({
    url: 'user/deleteTake',
    method: 'get',
    params: req
  })
}
export function deleteComment (req) {
  return request({
    url: 'user/deleteTakeInfo',
    method: 'get',
    params: req
  })
}

export function reportBbs (req) {
  return request({
    url: 'user/reportTake',
    method: 'get',
    params: req
  })
}
export function reportComment (req) {
  return request({
    url: 'user/reportTakeInfo',
    method: 'get',
    params: req
  })
}
