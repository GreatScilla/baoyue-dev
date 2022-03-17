import request from '@/router/axios';

// 查询源订单号
export const getBasicInfoByType = (type) => {
  return request({
    url: `/api/blade-erp/shopOrder/getBasicInfoByType?type=${type}`,
    method: 'get'
  })
}

// 销售出库查询源订单号
export const getBasicInfoByOutbound = (params) => {
  return request({
    url: `/api/blade-erp/shopOrder/getBasicInfoByType`,
    method: 'get',
    params: params
  })
}

// 销售退货查询源订单号
export const getBasicDepotHeadInfoByType = (params) => {
  console.log(params)
  return request({
    url: `/api/blade-erp/depotHead/getBasicDepotHeadInfoByType`,
    method: 'post',
    params
    // data: params.data,
    // params: {
    //   pageNum: params.pageNum,
    //   pageSize: params.pageSize
    // }
  })
}

// 根据源单号获取详情子订单
export const getOrderById = id => {
  return request({
    url: '/api/blade-erp/shopOrder/getOrderById',
    method: 'get',
    params: id
  })
}