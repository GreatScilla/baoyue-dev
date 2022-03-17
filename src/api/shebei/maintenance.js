import request from '@/router/axios';
//这是保养工单分页？？？？？？？？？？
//新增
export const addMaintenanceplan = params => {
  return request({
    url: '/api/blade-rcm/maintenanceplan/save',
    method: 'POST',
    params
  })
};
// export const addMaintenanceplan = params => {
//   return request({
//     url: '/api/blade-rcm/maintenanceplan/save',
//     method: 'POST',
//     params
//   })
// };
