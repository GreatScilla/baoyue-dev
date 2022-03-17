import request from '@/router/axios';

// 查询采购进货
export const getPurchaseStockByPage = params => {
  return request({
    url: '/api/blade-erp/purchaseStock/getPurchaseStockByPage',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 新增采购进货
export const addOrUpdatePurchaseStockOrder = params => {
  return request({
    url: '/api/blade-erp/purchaseStock/addOrUpdatePurchaseStockOrder',
    method: 'post',
    data: params.purchaseOrderAddRequest,
    params: {codeName: params.codeName}
  })
}

// // 获取采购类型源单号
// export const getBasicPurchaseInfoByType = (type) => {
//   return request({
//     url: `/api/blade-erp/purchaseOrder/getBasicPurchaseInfoByType?type=${type}`,
//     method: 'get'
//   })
// }

// 采购进货查询源订单号
export const getBasicPurchaseInfoByType = (params) => {
  return request({
    url: `/api/blade-erp/purchaseOrder/getBasicPurchaseInfoByType`,
    method: 'get',
    params: params
  })
}

// 删除订单
export const deleteApi = ids => {
  return request({
    url: '/api/blade-erp/purchaseStock/deletePurchaseStockBatch',
    method: 'post',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/purchaseStock/updatePurchaseStockStatus',
    method: 'post',
    params: {
      ids
    }
  })
}

// 检验
export const addOrUpdatePurchaseCheckOrder = params => {
  return request({
    url: '/api/blade-erp/purchaseCheck/addOrUpdatePurchaseCheckOrder',
    method: 'post',
    data: params.data,
    params: {codeName: params.codeName}
  })
}
//根据id查询采购进货订单表明细
export const getPurchaseStockById = (params) => {
  return request({
    url: `/api/blade-erp/purchaseStock/getPurchaseStockById`,
    method: 'get',
    params: params
  })
}
//采购进货单PDF导出
export const getPurchaseStockBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/purchaseStock/getPurchaseStockBillsReportPDF",
      method: "get",
      params
  })
}
