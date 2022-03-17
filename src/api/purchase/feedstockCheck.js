import request from '@/router/axios';

// 查询进料检查
export const getPurchaseCheckByPage = params => {
  return request({
    url: '/api/blade-erp/purchaseCheck/getPurchaseCheckByPage',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.current,
      pageSize: params.size
    }
  })
}

// 删除订单
export const deleteApi = ids => {
  return request({
    url: '/api/blade-erp/purchaseCheck/deletePurchaseCheckBatch',
    method: 'post',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/purchaseCheck/updatePurchaseCheckStatus',
    method: 'post',
    params: {
      ids
    }
  })
}
// 根据id查询采购进货检验订单表明细
export const getPurchaseCheckById = params => {
  return request({
    url: '/api/blade-erp/purchaseCheck/getPurchaseCheckById',
    method: 'get',
    params
  })
}
//进料检验单PDF导出
export const getPurchaseCheckBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/purchaseCheck/getPurchaseCheckBillsReportPDF",
      method: "get",
      params
  })
}
