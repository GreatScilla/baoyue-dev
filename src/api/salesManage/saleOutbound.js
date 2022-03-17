import request from '@/router/axios';

// 查询销售出库列表
export const selectDepotHeadInfo = params => {
  return request({
    url: '/api/blade-erp/depotHead/selectDepotHeadInfo',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 查询销售出库子单列表
export const getOrderByPage = data => {
  return request({
    url: '/api/blade-erp/shopOrder/getOrderByPage',
    method: 'post',
    data
    // params: {
    //   pageNum: params.pageNum,
    //   pageSize: params.pageSize
    // }
  })
}

// 添加销售出库
export const saleOutCheck = params => {
  return request({
    url: '/api/blade-erp/depotHead/saleOutCheck',
    method: 'post',
    data: params.data,
    params: {codeName: params.codeName}
  })
}

// 修改销售出库
export const updateSaleOutCheck = params => {
  return request({
    url: '/api/blade-erp/depotHead/updateSaleOutCheck',
    method: 'post',
    data: params.data,
    params: {codeName: params.codeName}
  })
}
// 回执
export const documentReceipt = params => {
  return request({
    url: '/api/blade-erp/depotHead/documentReceipt',
    method: 'post',
    params
  })
}

// 删除销售出库
export const deleteDepotHead = depotHeadIds => {
  return request({
    url: `/api/blade-erp/depotHead/deleteDepotHead?depotHeadIds=${depotHeadIds}`,
    method: 'post'
  })
}

// 审核销售出库
export const updateSaleStatus = depotHeadIds => {
  return request({
    url: `/api/blade-erp/depotHead/updateSaleStatus?depotHeadId=${depotHeadIds}`,
    method: 'post'
  })
}
//销售出库单PDF导出
export const getShopDeliveryBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/depotHead/getShopDeliveryBillsReportPDF",
      method: "get",
      params
  })
}
