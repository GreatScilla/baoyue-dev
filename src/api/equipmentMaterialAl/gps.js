import request from '@/router/axios';

//列表查询
export const getList = data => {
    return request({
        url: '/api/blade-rcm/gps/list',
        method: 'get',
        params: {
            current: data.pageNum,
            size: data.pageSize,
            url: data.url
        }
    })
}
//新增
export const submit = data => {
    return request({
        url: '/api/blade-rcm/gps/submit',
        method: 'post',
        data: data
    })
}

//详情
export const detailList = id => {
    return request({
        url: '/api/blade-rcm/gps/details',
        method: 'post',
        params: { id },
    })
}
//删除
export const deleteList = ids => {
    return request({
        url: '/api/blade-rcm/gps/remove',
        method: 'post',
        params: { ids },
    })
}