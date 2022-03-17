import request from '@/router/axios';

//列表查询
export const getCameraList = data => {
    return request({
        url: '/api/blade-rcm/camera/list',
        method: 'get',
        params: {
            current: data.pageNum,
            size: data.pageSize,
            deviceSn: data.deviceSn,
            name: data.name,
            position: data.position,
        }
    })
}

//新增
export const submit = data => {
    return request({
        url: '/api/blade-rcm/camera/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/camera/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/camera/remove',
        method: 'post',
        params: { ids },
    })
}