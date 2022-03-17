import request from '@/router/axios';
//盘点计划
// 列表
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/assetInventoryPlanning/getAssetBookRequestByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}
//详情
export const getAssetBookRequestByPageDetail = data => {
    return request({
        url: '/api/blade-rcm/assetInventoryPlanning/getAssetBookRequestByPage',
        method: 'post',
        data
    })
}
// 新增  
export const addOrUpdateAssetInventoryPlanning = (data) => {
    return request({
        url: '/api/blade-rcm/assetInventoryPlanning/addOrUpdateAssetInventoryPlanning',
        method: 'post',
        data
    })
}

// 删除  
export const deleteAssetInventoryPlanningBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/assetInventoryPlanning/deleteAssetInventoryPlanningBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}

// 审核
export const updateOrderStatus = ids => {
    return request({
      url: '/api/blade-rcm/assetInventoryPlanning/updateOrderStatus',
      method: 'post',
      params: {
        ids
      }
    })
  }


//盘点范围
export const deptList = (data) => {
    return request({
        url: '/api/blade-base/dept/lists',
        method: 'POST',
        data
      })
}