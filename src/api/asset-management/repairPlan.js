import request from '@/router/axios';
// 列表   
export const getList = params => {
    return request({
        url: '/api/blade-rcm/assetsRepair/getAssetsRepairByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
            type: params.type
        },
        data: params.data
    })
}

// 详情  
export const getAssetsRepairByPageDetails = (data) => {
    return request({
        url: '/api/blade-rcm/assetsRepair/getAssetsRepairByPage?type=0',
        method: 'post',
        data
    })
}

// 维修详情  
export const getMaintainDetails = (data) => {
    return request({
        url: '/api/blade-rcm/assetsRepair/getAssetsRepairByPage?type=1',
        method: 'post',
        data
    })
}

// 新增  
export const addOrUpdateAssetsRepair = (data, type) => {
    return request({
        url: '/api/blade-rcm/assetsRepair/addOrUpdateAssetsRepair',
        method: 'post',
        data,
        params: {
            type: type
        }
    })
}


// 审核  
export const updateStatusAssetsRepair = (type, ids) => {
    return request({
        url: '/api/blade-rcm/assetsRepair/updateStatusAssetsRepair',
        method: 'post',
        params: {
            type: type,
            ids: ids
        }
    })
}
// 删除
export const deleteAssetsRepair = (ids) => {
    return request({
        url: '/api/blade-rcm/assetsRepair/deleteAssetsRepair',
        method: 'post',
        params: {
            ids: ids
        }
    })
}