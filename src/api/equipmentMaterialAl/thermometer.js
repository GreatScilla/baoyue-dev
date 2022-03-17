import request from '@/router/axios';

//列表查询
export const getList = data => {
    return request({
        url: '/api/blade-rcm/thermometer/list',
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
        url: '/api/blade-rcm/thermometer/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/thermometer/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/thermometer/remove',
        method: 'post',
        params: { ids },
    })
}

//
export const getBI = () => {
    return request({
        url: '/api/blade-rcm/thermometer/getBI',
        method: 'get',
    })
}

//
export const getBIDetail = id => {
    return request({
        url: '/api/blade-rcm/thermometer/getBIDetail',
        method: 'get',
        params: { id },
    })
}