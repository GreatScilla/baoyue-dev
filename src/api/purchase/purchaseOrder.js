import request from '@/router/axios';

// 新增采购订单
export const addOrUpdatePurchaseOrder = params => {
  return request({
    url: '/api/blade-erp/purchaseOrder/addOrUpdatePurchaseOrder',
    method: 'post',
    data: params.data,
    params: {codeName: params.codeName}
  })
}

// 查询采购订单
export const getPurchaseOrderByPage = (params) => {
  return request({
    url: `/api/blade-erp/purchaseOrder/getPurchaseOrderByPage?`,
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 删除订单
export const deleteApi = ids => {
  return request({
    url: '/api/blade-erp/purchaseOrder/deleteOrderBatch',
    method: 'post',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/purchaseOrder/updateOrderStatus',
    method: 'post',
    params: {
      ids
    }
  })
}
//采购订单PDF导出
export const getPurchaseOrderBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/purchaseOrder/getPurchaseOrderBillsReportPDF",
      method: "get",
      params
  })
}