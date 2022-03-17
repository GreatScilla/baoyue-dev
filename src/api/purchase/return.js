import request from '@/router/axios';

// 新增采购退货
export const addOrUpdatePurchaseReturn = params => {
  return request({
    url: '/api/blade-erp/purchaseReturn/addOrUpdatePurchaseReturn',
    method: 'post',
    data: params.orderReturnRequest,
    params: {codeName: params.codeName}
  })
}

// 查询采购退货
export const getPurchaseReturnInfoByPage = (params) => {
  return request({
    url: `/api/blade-erp/purchaseReturn/getPurchaseReturnInfoByPage`,
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
    url: '/api/blade-erp/purchaseReturn/deletePurchaseReturnById',
    method: 'get',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/purchaseReturn/reviewPurchase',
    method: 'post',
    params: {
      ids
    }
  })
}
//查询采购退货订单详情
export const getPurchaseReturnInfoDetail = (params) => {
  return request({
    url: `/api/blade-erp/purchaseReturn/getPurchaseReturnInfoDetail`,
    method: 'get',
    params: params
  })
}
//采购退货单PDF导出
export const getPurchaseReturnBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/purchaseReturn/getPurchaseReturnBillsReportPDF",
      method: "get",
      params
  })
}