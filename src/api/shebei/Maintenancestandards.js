import request from '@/router/axios';
//保养标准分页
export const MaintenancestandardsPage = params => {
  return request({
    url: '/api/blade-rcm/maintenancestandard/page',
    method: 'GET',
    params
  })
};
//新增保养标准分页
export const addMaintenancestandards = params => {
  return request({
    url: '/api/blade-rcm/maintenancestandard/save',
    method: 'POST',
    params
  })
};
// //保养标准详情
export const MaintenancestandardsDetail = params => {
  return request({
    url: '/api/blade-rcm/maintenancestandard/detail',
    method: 'GET',
    params
  })
};
