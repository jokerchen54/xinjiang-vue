import request from '@/utils/request'
import qs from 'qs'
import md5 from 'js-md5'
export function login(data) {
  data.type = 0 // 网页登录类型为0
  data.password = md5(data.password)
  data = qs.stringify(data)
  return request({
    url: '/login',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
