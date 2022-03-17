import request from '@/router/axios';

// 蒸压釜报表数据
export const autoclaveGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/autoclave/getTwoReport',
        method: 'GET',
        params
    })
}

// 温度计报表数据
export const thermometerGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/thermometer/getTwoReport',
        method: 'GET',
        params
    })
}

// 电机监控报表数据
export const motorMonitoringGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/motorMonitoring/getTwoReport',
        method: 'GET',
        params
    })
}

// 燃气报表数据
export const gasGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/gas/getTwoReport',
        method: 'GET',
        params
    })
}

// 水表报表数据
export const waterMeterGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/waterMeter/getTwoReport',
        method: 'GET',
        params
    })
}

// 电表报表数据
export const ammeterDataGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/ammeterData/getTwoReport',
        method: 'GET',
        params
    })
}


// 浇注报表数据
export const plGetTwoReport = params => {
    return request({
        url: '/api/blade-rcm/pl/getTwoReport',
        method: 'GET',
        params
    })
}

// 电表报表数据报表导出
export const getAmmeterDataReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/ammeterData/getReportExport",
        method: "get",
        params
    })
}

// 燃气报表数据报表导出
export const getGasReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/gas/getReportExport",
        method: "get",
        params
    })
}

// 温度计报表数据报表导出
export const getThermometerReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/thermometer/getReportExport",
        method: "get",
        params
    })
}

// 电机监控报表数据报表导出
export const getMotorMonitoringReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/motorMonitoring/getReportExport",
        method: "get",
        params
    })
}

// 蒸压釜报表数据报表导出
export const getAutoclaveReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/autoclave/getReportExport",
        method: "get",
        params
    })
}

// 浇注报表数据报表导出
export const getPlReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/pl/getReportExport",
        method: "get",
        params
    })
}

// 水报表数据报表导出
export const getWaterMeterReportExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-rcm/waterMeter/getReportExport",
        method: "get",
        params
    })
}