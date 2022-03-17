import request from '@/router/axios';

// 查询销售退货列表
export const getOrderReturn = params => {
  return request({
    url: '/api/blade-erp/orderReturn/getOrderReturnInfoByPage',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 新增销售退货
export const addOrUpdateOrderReturn = params => {
  return request({
    url: '/api/blade-erp/orderReturn/addOrUpdateOrderReturn',
    method: 'post',
    data: params.data,
    params: {codeName: params.codeName}
  })
}

// 获取详情子订单
export const getOrderById = id => {
  return request({
    url: '/api/blade-erp/shopOrder/getOrderById',
    method: 'get',
    params: id
  })
}

// 根据源单号查询详情定单
export const selectDepotHeadDetail = id => {
  return request({
    url: '/api/blade-erp/depotHead/selectDepotHeadDetail',
    method: 'post',
    params: id
  })
}

// 删除订单
export const deleteApi = ids => {
  return request({
    url: '/api/blade-erp/orderReturn/deleteReturnOrderById',
    method: 'get',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/orderReturn/reviewOrder',
    method: 'post',
    params: {
      ids
    }
  })
}
// 查询退货订单详情
export const getOrderReturnInfoDetail = params => {
  return request({
    url: '/api/blade-erp/orderReturn/getOrderReturnInfoDetail',
    method: 'get',
    params
  })
}
// 退货类型
export const getReturnType = () => {
  return request({
    url: '/api/blade-erp/orderReturn/getReturnType',
    method: 'get'
  })
}