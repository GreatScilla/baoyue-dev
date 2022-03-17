import request from '@/router/axios';
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/spotCheck/getPollingByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            type: 0,
            pageSize: params.pageSize
        }
    })
}

// 详情   
export const getPollingByPageDetails = (data) => {
    return request({
        url: '/api/blade-rcm/spotCheck/getPollingByPage?type=0',
        method: 'post',
        data
    })
}

// 审核
export const updateStatusSpotCheck = ids => {
    return request({
        url: '/api/blade-rcm/spotCheck/updateStatusSpotCheck',
        method: 'post',
        params:
            ids
    })
}

// 删除
export const deleteSpotCheck = ids => {
    return request({
        url: '/api/blade-rcm/spotCheck/deleteSpotCheck',
        method: 'post',
        params: {
            ids
        }
    })
}

//设置
export const setPollingById = data => {
    return request({
        url: '/api/blade-rcm/spotCheck/setPollingById',
        method: 'post',
        data
    })
}

//获取设置
export const getPollingById = () => {
    return request({
        url: '/api/blade-rcm/spotCheck/getPollingById',
        method: 'post'
    })
}