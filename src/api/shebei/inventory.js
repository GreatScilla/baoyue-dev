import request from '@/router/axios';
//点检计划分页
export const inventoryPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/page',
    method: 'GET',
    params
  })
};
//点检计划新增
export const inventoryAdd = data => {
  return request({
    url: '/api/blade-rcm/equipmentinventoryinfo/save',
    method: 'POST',
    data
  })
};
