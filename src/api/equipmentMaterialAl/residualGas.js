import request from '@/router/axios';

//列表查询
export const getList = data => {
    return request({
        url: '/api/blade-rcm/residualGas/list',
        method: 'get',
        params: {
            current: data.pageNum,
            size: data.pageSize,
            paramPoint: data.paramPoint,
            deviceSn: data.deviceSn,
            operatorLow: data.operatorLow,
            operatorTop: data.operatorTop,
            pressureLow: data.pressureLow,
            pressureTop: data.pressureTop,
            position: data.position,
        }
    })
}

//参数点位
export const getOperatorList = () => {
    return request({
        url: '/api/blade-rcm/residualGas/getOperatorList',
        method: 'get',
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
        url: '/api/blade-rcm/residualGas/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/residualGas/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/residualGas/remove',
        method: 'post',
        params: { ids },
    })
}