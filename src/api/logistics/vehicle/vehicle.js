import request from '@/router/axios';
// 分页查询车辆管理
export const getCarByPage = params => {
  return request({
    url: '/api/blade-erp/carManager/getCarByPage',
    method: 'post',
    data: params.data,
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}
//新增编辑车辆管理
export const addOrUpdateShopCar = params => {
  return request({
    url: '/api/blade-erp/carManager/addOrUpdateShopCar',
    method: 'post',
    data: params
  })
}
//删除车辆管理
export const deleteCarBatch = ids => {
  return request({
    url: '/api/blade-erp/carManager/deleteCarBatch',
    method: 'post',
    params: {
      ids
    }
  })
}
//修改车辆状态
export const updateCarUsable = params => {
  return request({
    url: '/api/blade-erp/carManager/updateCarUsable',
    method: 'post',
     params
  })
}
