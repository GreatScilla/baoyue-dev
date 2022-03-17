import request from '@/router/axios';
//盘点工单
// 列表
export const getInventoryWorkByPage = (params) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/getInventoryWorkByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}

//获取资产盘点明细信息
export const getInventoryWorkSubunit = (data) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/getInventoryWorkSubunit',
        method: 'post',
        data
    })
}
// 修改
export const addOrUpdateInventoryWork = (data) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/addOrUpdateInventoryWork',
        method: 'post',
        data
    })
}
// 提交盘点结果
export const UpdateInventoryWork = (data) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/UpdateInventoryWork',
        method: 'post',
        data
    })
}

// 删除  
export const deleteAssetInventoryWork = (ids) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/deleteAssetInventoryWork',
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


//指派
export const designate = (data) => {
    return request({
        url: '/api/blade-rcm/inventoryWork/designate',
        method: 'post',
        data: data

    })
}