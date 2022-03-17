import request from '@/router/axios';

//资产调剂新增
export const addOrUpdateAssetAdjust = (data) => {
    return request({
        url: '/api/blade-rcm/assetAdjust/addOrUpdateAssetAdjust',
        method: 'post',
        data
    })
};
//资产调剂列表 
export const getAssetAdjustByPage = (params) => {
    return request({
        url: '/api/blade-rcm/assetAdjust/getAssetAdjustByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
};
//详情
export const assetswapDetail = data => {
    return request({
        url: '/api/blade-rcm/assetAdjust/getAssetAdjustByPage',
        method: 'post',
        data
    })
}
//资产调剂审核
export const updateOrderStatus = (params) => {
    return request({
        url: '/api/blade-rcm/assetAdjust/updateOrderStatus',
        method: 'post',
        params
    })
};


// 删除  
export const deleteAssetAdjustBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/assetAdjust/deleteAssetAdjustBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}