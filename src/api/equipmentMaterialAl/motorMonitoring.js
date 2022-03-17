import request from '@/router/axios';

//列表查询
export const getList = data => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/list',
        method: 'get',
        params: {
            current: data.pageNum,
            size: data.pageSize,
            paramPoint: data.paramPoint,
            deviceSn: data.deviceSn,
            position: data.position,
        }
    })
}

//参数点位
export const getParamlist = () => {
    return request({
        url: '/api/blade-rcm/tagIndex/getParamlist',
        method: 'get',
    })
}

//新增
export const submit = data => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/remove',
        method: 'post',
        params: { ids },
    })
}