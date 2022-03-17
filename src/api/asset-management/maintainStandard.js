import request from '@/router/axios';
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/maintenanceStandard/getMaintenanceStandardByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}

export const addOrUpdateMaintenanceStandard = (data) => {
    return request({
        url: '/api/blade-rcm/maintenanceStandard/addOrUpdateMaintenanceStandard',
        method: 'post',
        data
    })
}

// 删除
export const deleteMaintenanceStandard = (ids) => {
    return request({
        url: '/api/blade-rcm/maintenanceStandard/deleteMaintenanceStandard',
        method: 'post',
        params: {
            ids,
        }
    })
}