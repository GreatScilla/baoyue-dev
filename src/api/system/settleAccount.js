import request from '@/router/axios';

export const submit = (params) => {
  return request({
    url: '/api/blade-finance/settlementaccount/submit',
    method: 'post',
    data: params
  })
}

export const del = (params) => {
  return request({
    url: '/api/blade-finance/settlementaccount/remove',
    method: 'post',
    params
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-finance/settlementaccount/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getFullList = (params) => {
  return request({
    url: '/api/blade-finance/settlementaccount/list',
    method: 'get',
    params
  })
}