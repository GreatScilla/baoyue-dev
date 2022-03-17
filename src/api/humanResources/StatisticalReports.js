import request from '@/router/axios';

//门禁记录表
export const StatisticalReportsList = (params) => {
    return request({
        url: '/kaoqinapi/api/transaction/listAttTransaction',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            ...params
        }
    })
}
//考勤记录表
export const AccessControlRecordSheetList = (params) => {
    return request({
        url: '/kaoqinapi/api/transaction/device/CKUX211560058',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            ...params
        }
    })
}


//考勤数据导出接口  /api/blade-base/egaData/exportKao  传入返回的json就行了
export const exportKaoList = (params) => {
    return request({
        url: '/api/blade-base/egaData/exportKao',
        method: 'post',
        headers: {
            'responseType': 'blob'
        },
        params: {
            ...params
        }
    })
}