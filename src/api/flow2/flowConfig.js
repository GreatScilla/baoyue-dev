import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-base/approvalProcess/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//请假类型
export const getProcessType = (params) => {
  return request({
    url: '/api/blade-base/approvalProcess/getProcessTypeList',
    method: 'get',
    params
  })
}


export const add = (params) => {
  return request({
    url: '/api/blade-base/approvalProcess/submit',
    method: 'post',
    data:params
  })
}


export const del = (params) => {
  return request({
    url: '/api/blade-base/approvalProcess/remove',
    method: 'put',
    params
  })
}
//开关
export const openOrClose = (params) => { 
  return request({
    url: '/api/blade-base/approvalProcess/openOrClose',
    method: 'post',
    params
  })
}
