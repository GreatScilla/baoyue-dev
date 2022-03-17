import request from '@/router/axios';


export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-erp/shopOrder/getOrderProgress',
        method: 'post',
        params: {
            pageNum,
            pageSize,
            ...params,
        },
        data:{
            ...params
        }
    })
}