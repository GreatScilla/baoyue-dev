import request from '@/router/axios';

//获取结算方式列表
export const getSettlementMethod = params => {
  return request({
    url: '/api/blade-base/paymentType/getPageList',
    method: 'get',
    params
  })
}

//新增/修改结算方式
export const addEditSettlementMethod = params => {
  return request({
    url: '/api/blade-base/paymentType/saveOrUpdatePaymentType',
    method: 'post',
    data:params
  })
}

//启用/停用
export const enableSettlementMethod = params => {
  return request({
    url: '/api/blade-base/paymentType/updateStatusById',
    method: 'get',
    params
  })
}


// 删除
export const delSettlementMethod = params => {
  return request({
    url: '/api/blade-base/paymentType/remove',
    method: 'post',
    params
  })
}


