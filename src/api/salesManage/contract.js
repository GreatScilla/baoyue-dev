import request from '@/router/axios';

// 查询合同号
export const getContractList = (params) => {
  return request({
    url: `/api/blade-erp/bpyContract/list`,
    method: 'post',
    data: params.data,
    params: {
      current: params.current,
      size: params.size
    }
  })
}

// 查询合同号明细
export const getDetail = (id) => {
  return request({
    url: `/api/blade-erp/bpyContract/getDetail`,
    method: 'get',
    params: id
  })
}

// 新增
export const submitContract = (params) => {
  return request({
    url: `/api/blade-erp/bpyContract/submit`,
    method: 'post',
    data: params
  })
}

// 修改
export const updateContract = (params) => {
  return request({
    url: `/api/blade-erp/bpyContract/update`,
    method: 'put',
    data: params
  })
}

// 删除订单
export const deleteApi = ids => {
  return request({
    url: '/api/blade-erp/bpyContract/remove',
    method: 'put',
    params: {
      ids
    }
  })
}

// 审核订单
export const audit = ids => {
  return request({
    url: '/api/blade-erp/bpyContract/audit',
    method: 'put',
    params: {
      ids
    }
  })
}