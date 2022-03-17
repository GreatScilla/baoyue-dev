import request from '@/router/axios';

// 导入销售对账单
export const selectUsableImportOrder = params => {
  return request({
    url: '/api/blade-erp/accountStatement/selectUsableImportOrder',
    method: 'post',
    data: params
  })
}


// 新增销售对账单
export const addOrUpdatePurchaseOrder = params => {
  return request({
    url: '/api/blade-erp/accountStatement/addOrUpdatePurchaseOrder',
    method: 'post',
    data: params.accountStatement,
    params: {
      codeName: params.codeName
    }
  })
}

// 查询销售对账单
export const getAccountStatementByPage = params => {
  return request({
    url: '/api/blade-erp/accountStatement/getAccountStatementByPage',
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
    url: '/api/blade-erp/accountStatement/deleteOrderBatch',
    method: 'post',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/accountStatement/updateOrderStatus',
    method: 'post',
    params: {
      ids
    }
  })
}
//根据id查询对账单明细
export const getStatementInfo = params => {
  return request({
    url: '/api/blade-erp/accountStatement/getPurchaseOrderById',
    method: 'get',
    params
  })
}
//销售对账单PDF导出
export const getShopAccountBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/accountStatement/getShopAccountBillsReportPDF",
      method: "get",
      params
  })
}
//采购对账单PDF导出
export const getPurchaseAccountBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/accountStatement/getPurchaseAccountBillsReportPDF",
      method: "get",
      params
  })
}