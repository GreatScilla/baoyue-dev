import request from '@/router/axios';

//获取工厂模型列表
export const getFactoryModelList = params => {
  return request({
    url: '/api/blade-mes/factoryModel/treeFactoryModel',
    method: 'get',
    params
  })
}

//获取上一级
export const getUpOneLevel = params => {
  return request({
    url: '/api/blade-mes/factoryModel/queryPrincipals',
    method: 'post',
    params
  })
}

//新增工厂模型
export const addFactoryModel = params => {
  return request({
    url: '/api/blade-mes/factoryModel/submitFactoryModel',
    method: 'post',
    data:params
  })
}

// 锁定
export const lockState = params => {
  return request({
    url: '/api/blade-mes/factoryModel/batchSetStatus',
    method: 'post',
    params
  })
}

// 解锁
export const unLockState = params => {
  return request({
    url: '/api/blade-mes/factoryModel/unlockStatus',
    method: 'post',
    params
  })
}

// 删除
export const delModel = params => {
  return request({
    url: '/api/blade-mes/factoryModel/removeFactoryModel',
    method: 'post',
    params
  })
}

//修改保存
export const editFactoryModel = params => {
  return request({
    url: '/api/blade-mes/factoryModel/updateFactoryModel',
    method: 'post',
    data:params
  })
}



// 编辑查询接口
export const editModelGetData = params => {
  return request({
    url: '/api/blade-mes/factoryModel/treeParentId',
    method: 'post',
    params
  })
}

// 状态改变
export const enabledState = params => {
  return request({
    url: '/api/blade-mes/factoryModel/updateStatus',
    method: 'post',
    params
  })
}

// 工位
export const station = params => {
  return request({
    url: '/api/blade-mes/factoryModel/queryWorkshopLineAndStation',
    method: 'get',
    params
  })
}



