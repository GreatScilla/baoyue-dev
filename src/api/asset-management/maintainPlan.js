import request from '@/router/axios';
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/getMaintenanceScheduleByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}

//详情
export const getMaintenanceScheduleByPageDetail = (data) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/getMaintenanceScheduleByPage',
        method: 'post',
        data
    })
}

export const maintainPlanDetails = (params) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/getMaintenanceScheduleByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data: params.data
    })
}

// 添加
export const addOrUpdateMaintenanceSchedule = (data) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/addOrUpdateMaintenanceSchedule',
        method: 'post',
        data
    })
}

// 删除
export const deleteMaintenanceSchedule = (ids) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/deleteMaintenanceSchedule',
        method: 'post',
        params: {
            ids,
        }
    })
}

// 审核
export const updateStatusMaintenanceSchedule = (params) => {
    return request({
        url: '/api/blade-rcm/maintenanceSchedule/updateStatusMaintenanceSchedule',
        method: 'post',
        params
    })
}