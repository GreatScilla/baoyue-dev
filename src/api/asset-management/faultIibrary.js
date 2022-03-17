import request from '@/router/axios';   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/faultDatabase/getFaultDatabaseByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}

export const addOrUpdateFaultDatabase = (data) => {
    return request({
        url: '/api/blade-rcm/faultDatabase/addOrUpdateFaultDatabase',
        method: 'post',
        data
    })
}
export const deleteFaultDatabase = (ids) => {
    return request({
        url: '/api/blade-rcm/faultDatabase/deleteFaultDatabase',
        method: 'post',
        params: {
            ids,
        }
    })
}