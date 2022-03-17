import request from '@/router/axios';
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/maintainWorkOrder/getMaintainWorkOrderByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
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
export const deleteMaintenanceWorkOrder = (ids) => {
    return request({
        url: '/api/blade-rcm/maintainWorkOrder/deleteMaintainWorkOrder',
        method: 'post',
        params: {
            ids,
        }
    })
}

// 指派
export const designate = (data,type) => {
    return request({
        url: '/api/blade-rcm/maintainWorkOrder/designate',
        method: 'post',
        data,
        params:{
            type:type
        }
    })
}
// 保存
export const UpdateMaintenanceWorkOrder = (data) => {
    return request({
        url: '/api/blade-rcm/maintainWorkOrder/addOrUpdateMaintainWorkOrder',
        method: 'post',
        data
    })
}
// 提交
export const commit = (data) => {
    return request({
        url: '/api/blade-rcm/maintainWorkOrder/commit',
        method: 'post',
        data
    })
}