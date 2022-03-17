import request from '@/router/axios';

//获取销售类型接口
export const getErpSubList = params => {
  return request({
    url: '/api/blade-erp/erpSubType/selectErpSubType',
    method: 'post',
    data: {
      type: params.type
    },
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 销售采购订单获取类型
export const erpTypeSelect = params => {
  return request({
    url: '/api/blade-erp/erpSubType/erpTypeSelect',
    method: 'post',
    data: {
      type: params.type
    },
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

// 新增销售类型1采购/2采购退货/3销售/销4售退货/5调拨
export const addErpSubType = params => {
  return request({
    url: '/api/blade-erp/erpSubType/addOrUpdateSubType',
    method: 'post',
    data: params
  })
}

// 查看销售类型
export const selectDetailById = id => {
  return request({
    url: `/api/blade-erp/erpSubType/selectDetailById?id=${id}`,
    method: 'post'
  })
}

// 删除销售类型
export const deleteStatus = params => {
  return request({
    url: `/api/blade-erp/erpSubType/deleteStatus`,
    method: 'post',
    data: params
  })
}
// 批量删除销售类型
export const batchDeleteStatus = ids => {
  return request({
    url: `/api/blade-erp/erpSubType/deleteSubTypeBatch`,
    method: 'post',
    params: {
      ids
    }
  })
}

// 批量启用销售类型
export const batchUpdateStatus = (ids, status) => {
  return request({
    url: `/api/blade-erp/erpSubType/updateStatus`,
    method: 'post',
    params: {
      ids,
      status
    }
  })
}