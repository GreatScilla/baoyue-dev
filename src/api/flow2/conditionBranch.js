import request from '@/router/axios';

//列表
export const getList = (params, data) => {
    return request({
        url: '/api/blade-base/approvalNodeCondition/list',
        method: 'get',
        params,
        data
    })
}
//新增
export const submit = (data) => {
    return request({
        url: '/api/blade-base/approvalNodeCondition/submit',
        method: 'post',
        data
    })
}
//修改
export const update = (data) => {
    return request({
        url: '/api/blade-base/approvalNodeCondition/update',
        method: 'put',
        data
    })
}
//删除
export const remove = (params) => {
    return request({
      url: '/api/blade-base/approvalNodeCondition/remove',
      method: 'put',
      params
    })
  }
