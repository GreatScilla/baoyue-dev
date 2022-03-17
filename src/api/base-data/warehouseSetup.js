import request from '@/router/axios';

//获取仓库分页
export const getWarehousePage = params => {
  return request({
    url: '/api/blade-base/depot/page',
    method: 'post',
    data:params
  })
}

// 获取仓库列表
export const getWarehouseList = params => {
  return request({
    url: "/api/blade-base/depot/list",
    method: "post",
    params
  })
}

//详情
export const detailsWarehouseList = params => {
  return request({
    url: '/api/blade-base/depot/details',
    method: 'post',
    params
  })
}


// 删除
export const delWarehouse = params => {
  return request({
    url: '/api/blade-base/depot/remove',
    method: 'post',
    params
  })
}

//新增修改
export const addeditWarehouse = params => {
  return request({
    url: '/api/blade-base/depot/submit',
    method: 'post',
    data:params
  })
}

//开启停用
export const onOffWarehouse = params => {
  return request({
    url: '/api/blade-base/depot/onOff',
    method: 'post',
    params
  })
}

// 设为默认
export const setDefaultWarehouse = params => {
  return request({
    url: '/api/blade-base/depot/setDefault',
    method: 'post',
    params
  })
}

// 设置是否允许为负库存
export const setIsMinusWarehouse = params => {
  return request({
    url: '/api/blade-base/depot/setIsMinus',
    method: 'post',
    params
  })
}






