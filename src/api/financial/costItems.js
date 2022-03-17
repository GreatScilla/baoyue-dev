import request from '@/router/axios';

// 查询分页
export const queryCostItemsPage = params => {
  return request({
    url: '/api/blade-finance/feeApply/getPage',
    method: 'get',
    params
  })
}

//新增 /修改
export const addEditCostItems = params => {
  return request({
    url: '/api/blade-finance/feeApply/addOrUpdate',
    method: 'post',
    data:params
  })
}

// 删除
export const delCostItems = params => {
  return request({
    url: '/api/blade-finance/feeApply/delete',
    method: 'get',
    params
  })
}

// 审核
export const reviewCostItems = params => {
  return request({
    url: '/api/blade-finance/feeApply/verify',
    method: 'get',
    params
  })
}


//详情
export const detailsCostItems = params => {
  return request({
    url: '/api/blade-finance/feeApply/getById',
    method: 'get',
    params
  })
}






