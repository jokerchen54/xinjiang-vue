import request from '@/utils/request'
import qs from 'qs'
export function getList(params) {
  return request({
    url: '/communityAddress/findCommunityAddressListByPage',
    method: 'get',
    params
  })
}

export function saveOrUpdateCommunityAddress(params) {
  // params = qs.stringify(params)
  return request({
    url: '/communityAddress/saveOrUpdateCommunityAddress',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
