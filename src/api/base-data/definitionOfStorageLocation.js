import request from '@/router/axios';

//分页查询储位定义
export const getStoragePage = params => {
  return request({
    url: '/api/blade-base/storage/page',
    method: 'post',
    data:params
  })
}

//列表查询储位定义
export const getStorageList = params => {
  return request({
    url: '/api/blade-base/storage/list',
    method: 'post',
    params
  })
}

//新增修改储位定义
export const addEditStorage = params => {
  return request({
    url: '/api/blade-base/storage/submit',
    method: 'post',
    data:params
  })
}

// 详情储位定义
export const detailsStorage = params => {
  return request({
    url: '/api/blade-base/storage/details',
    method: 'post',
    params
  })
}

//删除储位定义
export const delStorage = params => {
  return request({
    url: '/api/blade-base/storage/remove',
    method: 'post',
    params:params
  })
}

//启用储位定义
export const enableStorage = params => {
  return request({
    url: '/api/blade-base/storage/onOff',
    method: 'post',
    params:params
  })
}

//获取价格级别
export const priceLevel = params => {
  return request({
    url: '/api/blade-base/priceLevel/list',
    method: 'post',
    params:params
  })
}








