import request from '@/router/axios';

export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-hr/laborContract/getLaborContractByPage',
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

export const getContractType = (params) => {
    return request({
        url: '/api/blade-hr/laborContract/getContractType',
        method: 'post',
        data: {
            ...params
        }
    })
}
export const addContractType = (params) => {
    return request({
        url: '/api/blade-hr/laborContract/addOrUpdateContractType',
        method: 'post',
        data: {
            ...params
        }
    })
}

export const submit = ( params) => {
    return request({
        url: '/api/blade-hr/laborContract/submit',
        method: 'post',
        data:params
    })
}

export const del = (params) => {
    return request({
        url: '/api/blade-hr/laborContract/deleteLaborContracts',
        method: 'post',
        params
    })
}