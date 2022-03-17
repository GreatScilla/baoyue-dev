import request from '@/router/axios';
//证照库
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/assetBorrow/getAssetBorrowByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
    })
}

// 详情  
export const borrowReturnDetail = data => {
    return request({
        url: '/api/blade-rcm/assetBorrow/getAssetBorrowByPage',
        method: 'post',
        data
    })
}

export const addOrUpdateAssetBorrow = (data) => {
    return request({
        url: '/api/blade-rcm/assetBorrow/addOrUpdateAssetBorrow',
        method: 'post',
        data
    })
}

// 审核
export const updateStatus = (params) => {
    return request({
        url: '/api/blade-rcm/assetBorrow/updateStatus',
        method: 'post',
        params
    })
}

// 归还
export const UpdateAssetBorrow = (data) => {
    return request({
        url: '/api/blade-rcm/assetBorrow/UpdateAssetBorrow',
        method: 'post',
        data
    })
}

//删除
export const deleteAssetBorrowBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/assetBorrow/deleteAssetBorrowBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}