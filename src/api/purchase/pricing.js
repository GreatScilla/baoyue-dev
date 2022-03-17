import request from '@/router/axios';

// 新增核价
export const addPricingManage = params => {
  return request({
    url: '/api/blade-erp/pricing/addPricingManage',
    method: 'post',
    data: params.data,
    params: { codeName: params.codeName }
  })
}
// 编辑核价
export const updatePricingManage = params => {
  return request({
    url: '/api/blade-erp/pricing/updatePricingManage',
    method: 'post',
    data: params.data
  })
}

// 查询核价
export const getOrderByPage = params => {
  return request({
    url: '/api/blade-erp/pricing/getOrderByPage',
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
    url: '/api/blade-erp/pricing/deletePricingBatch',
    method: 'post',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/pricing/updatePricingStatus',
    method: 'post',
    params: {
      ids
    }
  })
}
//反审核
export const updatePricingStatus = params => {
  return request({
    url: '/api/blade-erp/pricing/updateNotPricingStatus',
    method: 'post',
    params
  })
}

//校验时间是否重叠
export const check = params => {
  return request({
    url: '/api/blade-erp/pricing/check',
    method: 'post',
    data: params.data
  })
}
//查询核价单详情
export const getPricingDetail = (params) => {
  return request({
    url: `/api/blade-erp/pricing/getOrderDetail`,
    method: 'get',
    params: params
  })
}
//采购核价单PDF导出
export const getPricingBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/pricing/getPricingBillsReportPDF",
      method: "get",
      params
  })
}