import request from '@/router/axios';

export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-hr/SalaryManagement/getByPage',
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

export const submit = ( params) => {
    return request({
        url: '/api/blade-hr/SalaryManagement/submit',
        method: 'post',
        data:params
    })
}

export const del = (params) => {
    return request({
        url: '/api/blade-hr/SalaryManagement/delete',
        method: 'post',
        params
    })
}