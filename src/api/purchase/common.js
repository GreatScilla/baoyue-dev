import request from '@/router/axios';

// 根据源单号获取详情子订单
export const getPurchaseOrderById = id => {
  return request({
    url: '/api/blade-erp/purchaseOrder/getPurchaseOrderById',
    method: 'get',
    params: id
  })
}