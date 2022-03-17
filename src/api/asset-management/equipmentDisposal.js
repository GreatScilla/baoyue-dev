import request from '@/router/axios';
//设备处置
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/assetsDisposal/getAssetsDisposalByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
    })
}

// 列表详情   
export const equipmentDisposalDetail = data => {
    return request({
        url: '/api/blade-rcm/assetsDisposal/getAssetsDisposalByPage',
        method: 'post',
        data
    })
}
// 新增修改
export const addOrUpdateAssetsDisposal = (data) => {
    return request({
        url: '/api/blade-rcm/assetsDisposal/addOrUpdateAssetsDisposal',
        method: 'post',
        data
    })
}

// 审核
export const updateStatus = (params) => {
    return request({
        url: '/api/blade-rcm/assetsDisposal/updateStatus',
        method: 'post',
        params
    })
}

//删除
export const deleteAssetsDisposalBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/assetsDisposal/deleteAssetsDisposalBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}
