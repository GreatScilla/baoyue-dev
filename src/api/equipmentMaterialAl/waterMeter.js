import request from '@/router/axios';

//列表查询
export const getList = data => {
    return request({
        url: '/api/blade-rcm/waterMeter/list',
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
        url: '/api/blade-rcm/waterMeter/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/waterMeter/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/waterMeter/remove',
        method: 'post',
        params: { ids },
    })
}
//水表BI
export const getBI = () => {
    return request({
        url: '/api/blade-rcm/waterMeter/getBI',
        method: 'get',
    })
}
//电表BI
export const getBITwo = () => {
    return request({
        url: '/api/blade-rcm/ammeterData/getBITwo',
        method: 'get',
    })
}
//气表BI
export const getGasBI = () => {
    return request({
        url: '/api/blade-rcm/gas/getBI',
        method: 'get',
        timeout: 3 * 60000,
    })
}

//气表BI近七天
export const getGasBITwo = () => {
    return request({
        url: '/api/blade-rcm/gas/getBITwo',
        method: 'get',
    })
}

//电表BI近七天
export const getAmmeterBITwo = () => {
    return request({
        url: '/api/blade-rcm/ammeterData/getBI',
        method: 'get',
    })
}

//水表BI近七天
export const getWaterMeterBITwo = () => {
    return request({
        url: '/api/blade-rcm/waterMeter/getBITwo',
        method: 'get',
    })
}

//电机BI近七天
export const getMotorMonitoringBITwo = () => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/getBI',
        method: 'get',
    })
}

//w温湿度BI近七天
export const getThermometerBITwo = () => {
    return request({
        url: '/api/blade-rcm/thermometer/getBITwo',
        method: 'get',
    })
}


export const getAutoclaveBITwo = () => {
    return request({
        url: '/api/blade-rcm/autoclave/getBITwo',
        method: 'get',
    })
}
//科达
export const getPlSelectBIResp = () => {
    return request({
        url: '/api/blade-rcm/pl/getPlSelectBIResp',
        method: 'get',
    })
}