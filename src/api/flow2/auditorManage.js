import request from '@/router/axios';

export const getList = (current, size, params) => {
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
        url: '/api/blade-base/approval/submit',
        method: 'post',
        data: params
    })
}


export const put = (params) => {
    return request({
        url: '/api/blade-base/approval/update',
        method: 'put',
        data:params.data,
        params:params.params
    })
}

export const del = (params) => {
    return request({
        url: '/api/blade-base/approval/remove',
        method: 'put',
        params
    })
}