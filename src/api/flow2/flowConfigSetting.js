import request from '@/router/axios';

export const getList = (params) => {
    return request({
        url: '/api/blade-base/approvalNode/list',
        method: 'put',
        params
    })
}

export const getRole = (current, size, params) => {
    return request({
        url: '/api/blade-base/approval/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}


export const add = (params) => {
    return request({
        url: '/api/blade-base/approvalNode/submit',
        method: 'post',
        data: params
    })
}

export const update = (params) => {
    return request({
        url: '/api/blade-base/approvalNode/update',
        method: 'put',
        data: params
    })
}

export const updateSort = (nodeId, beforeAfter) => {
    return request({
        url: '/api/blade-base/approvalNode/updateBeforeAfter',
        method: 'put',
        params: {
            beforeAfter,
            nodeId
        }
    })
}


export const del = (params) => {
    return request({
        url: '/api/blade-base/approvalNode/remove',
        method: 'put',
        params
    })
}
//条件分支下拉
export const conditionsNameList = (params) => {
    return request({
        url: '/api/blade-base/approvalNodeCondition/conditionsNameList',
        method: 'get',
        params
    })
}

