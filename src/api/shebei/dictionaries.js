import request from '@/router/axios';

// 出入库状态
export const getdeliveryStatus = params => {
  return request({
    url: '/api/blade-rcm/checkitem/deliveryStatus',
    method: 'GET',
    params
  })
}
// 出入库类别
export const rcmStorageStatus = params => {
  return request({
    url: '/api/blade-rcm/checkitem/rcmStorageStatus',
    method: 'GET',
    params
  })
}