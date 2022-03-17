//设备盘点接口
import request from '@/router/axios';
//分页
export const inventPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentinventoryinfo/page',
    method: 'GET',
    params
  })
};
//生成盈亏金额数量
export const inwventPage = data => {
  return request({
    url: '/api/blade-rcm/equipmentinventoryinfo/getNumber',
    method: 'POST',
    data
  })
};
//带出盘点范围的表格
export const inventRange = params => {
  return request({
    url: '/api/blade-rcm/equipmentinventoryinfo//getEquipment',
    method: 'GET',
    params
  })
};
//带出盘点范围的表格
export const inventSave = data => {
  return request({
    url: '/api/blade-rcm/equipmentinventoryinfo/save',
    method: 'POST',
    data
  })
};
