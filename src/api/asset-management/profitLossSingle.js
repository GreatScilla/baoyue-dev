import request from '@/router/axios';
//盘盈盘亏单
// 列表
export const getInventorySurplusLossesByPage = (params) => {
  return request({
    url: '/api/blade-rcm/inventorySurplusLosses/getInventorySurplusLossesByPage',
    method: 'post',
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    },
    data: params.data
  })
}
//详情
export const profitLossSingleDetail = data=> {
  return request({
    url: '/api/blade-rcm/inventorySurplusLosses/getInventorySurplusLossesByPage',
    method: 'post',
    data
  })
}
// 审核
export const updateStatus = ids => {
  return request({
    url: '/api/blade-rcm/inventorySurplusLosses/updateStatus',
    method: 'post',
    params: {
      ids
    }
  })
}

// 保存
export const UpdateInventorySurplusLosses = data => {
  return request({
    url: '/api/blade-rcm/inventorySurplusLosses/UpdateInventorySurplusLosses',
    method: 'post',
    data
  })
}