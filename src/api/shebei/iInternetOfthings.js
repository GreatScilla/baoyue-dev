import request from '@/router/axios';
//温度计分页
export const thermometerPage = params => {
  return request({
    url: '/api/blade-rcm/checkitem/wdList',
    method: 'GET',
    params
  })
};
//温度计删除
export const thermometerDelet = params => {
  return request({
    url: '/api/blade-rcm/checkitem/deleteWsd',
    method: 'POST',
    params
  })
};
//温度计新增
export const thermometerAdd = params => {
  return request({
    url: '/api/blade-rcm/checkitem/addWdtest',
    method: 'POST',
    params
  })
};
//温度计删除
export const wsdDetail = params => {
  return request({
    url: '/api/blade-rcm/checkitem/wsdDetail',
    method: 'GET',
    params
  })
};
//温度计删除
export const wsdEdit = data => {
  return request({
    url: '/api/blade-rcm/checkitem/updateWsdtest',
    method: 'POST',
    data
  })
};
//摄像头分页
export const cameraList = params => {
  return request({
    url: '/api/blade-rcm/cameradatabase/list',
    method: 'GET',
    params
  })
};
//摄像头删除
export const cameraRemove = data => {
  return request({
    url: '/api/blade-rcm/cameradatabase/remove',
    method: 'POST',
    data
  })
};
//摄像头新增
export const cameraAdd = data => {
  return request({
    url: '/api/blade-rcm/cameradatabase/save',
    method: 'POST',
    data
  })
};
//摄像头修改
export const cameraUpdate = data => {
  return request({
    url: '/api/blade-rcm/cameradatabase/update',
    method: 'POST',
    data
  })
};
//摄像头修改
export const cameraDetail = params => {
  return request({
    url: '/api/blade-rcm/cameradatabase/detail',
    method: 'GET',
    params
  })
};
