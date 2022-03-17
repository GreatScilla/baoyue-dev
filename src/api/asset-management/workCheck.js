import request from '@/router/axios';
// 列表   
export const getSpotCheckByPage = (params) => {
    return request({
        url: '/api/blade-rcm/spotCheck/getSpotCheckByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            type: 1,
            pageSize: params.pageSize
        }
    })
}

//指派
export const designate = (data,type) => {
    return request({
        url: '/api/blade-rcm/spotCheck/designate',
        method: 'post',
        data: data,
        params:{
            type:type
        }

    })
}

//保存
export const addOrUpdateSpotCheck = (data) => {
    return request({
        url: '/api/blade-rcm/spotCheck/addOrUpdateSpotCheck',
        method: 'post',
        data: data
    })
}
//提交
export const commit = (data) => {
    return request({
        url: '/api/blade-rcm/spotCheck/commit',
        method: 'post',
        data: data
    })
}