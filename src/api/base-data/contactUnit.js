import request from '@/router/axios';

//分页查询往来单位
export const getContactUnitPage = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/page',
    method: 'post',
    data:params
  })
}

//列表查询往来单位
export const getContactUnitList = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/list',
    method: 'post',
    params
  })
}

//新增修改往来单位
export const addEditContactUnit = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/submit',
    method: 'post',
    data:params
  })
}

// 详情
export const detailsContactUnit = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/details',
    method: 'post',
    params
  })
}

//删除往来单位
export const delContactUnit = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/remove',
    method: 'post',
    params:params
  })
}

//启用往来单位
export const enableContactUnit = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/onOff',
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








