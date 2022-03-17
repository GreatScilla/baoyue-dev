import request from '@/router/axios';
//新增维修单
export const maintainPlanPage = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/page',
    method: 'GET',
    params
  })
};
//保养计划指派
export const maintainAssign = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/assign',
    method: 'POST',
    params
  })
};
//保养计划详情
export const maintainDetail = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/detail',
    method: 'GET',
    params
  })
};
//保养计划修改
export const maintenanceplanUpdate = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/update',
    method: 'POST',
    params
  })
};
//保养计划反馈信息
export const maintenanceGetBack = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/getFeedback',
    method: 'GET',
    params
  })
};
