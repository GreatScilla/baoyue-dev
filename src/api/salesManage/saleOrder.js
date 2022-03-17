import request from '@/router/axios';

// 新增销售订单
export const addOrUpdateShopOrder = params => {
  return request({
    url: '/api/blade-erp/shopOrder/addOrUpdateShopOrder',
    method: 'post',
    data: params.data,
    params: { codeName: params.codeName }
  })
}

// 查询销售订单
export const getOrderByPage = params => {
  return request({
    url: '/api/blade-erp/shopOrder/getOrderByPage',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 删除接口
export const deleteOrderBatch = ids => {
  return request({
    url: '/api/blade-erp/shopOrder/deleteOrderBatch',
    method: 'post',
    params: {
      ids
    }
  })
}
// 审核接口
export const updateOrderStatus = params => {
  return request({
    url: '/api/blade-erp/shopOrder/updateOrderStatus',
    method: 'post',
    params: params
  })
}

// 销售出库
export const saleOutCheck = params => {
  return request({
    url: '/api/blade-erp/shopOrder/saleOutCheck',
    method: 'post',
    data: params
  })
}

// 查询出库记录
export const getOrderInfoByOrderId = id => {
  return request({
    url: `/api/blade-erp/shopOrder/getOrderInfoByOrderId?orderId=${id}`,
    method: 'get'
  })
}