import request from '@/router/axios';
// 列表   
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/spotCheck/getPollingByPage',
        method: 'post',
        data: params.data,
        params: {
            pageNum: params.pageNum,
            type: 1,
            pageSize: params.pageSize
        }
    })
}