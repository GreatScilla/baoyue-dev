import request from '@/router/axios';



export const submit = params => {
    return request({
        url: '/api/blade-erp/ProjectComplaints/submit',
        method: 'post',
        data: params,
        params
    })
}


export const del = params => {
    return request({
        url: '/api/blade-erp/ProjectComplaints/delete',
        method: 'post',
        data: params,
        params
    })
}

export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-erp/ProjectComplaints/getPage',
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