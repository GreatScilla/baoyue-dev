import request from '@/router/axios';



export const submit = params => {
    return request({
        url: '/api/blade-erp/ProjectLockout/submit',
        method: 'post',
        data: params,
        // params
    })
}


export const del = params => {
    return request({
        url: '/api/blade-erp/ProjectLockout/delete',
        method: 'post',
        data: params,
        params
    })
}

export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-erp/ProjectLockout/getPage',
        method: 'post',
        params: {
            pageNum,
            pageSize,
        },
        data:{
            ...params
        }
    })
}