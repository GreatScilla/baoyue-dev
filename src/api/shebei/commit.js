import request from '@/router/axios';

// 部门list
export const deptList = data => {
  return request({
    url: '/api/blade-base/dept/lists',
    method: 'POST',
    data
  })
}
// 人员list
export const userList = params => {
  return request({
    url: '/api/blade-base/role/page',
    method: 'GET',
    params
  })
}
// 仓库list
export const depotList = data => {
  return request({
    url: '/api/blade-base/depot/list',
    method: 'POST',
    data
  })
}
// 供应商和客户通用,1供应商2客户category
export const contactList = data => {
  return request({
    url: '/api/blade-base/contactUnitBase/list',
    method: 'POST',
    data
  })
}
// 第一个echarts接口
export const echartsdata = params => {
  return request({
    url: '/api/blade-rcm/checkitem/temperatureTest',
    method: 'GET',
    params
  })
}
// 第一个brokenline
export const brokenline = params => {
  return request({
    url: '/api/blade-rcm/checkitem/brokenLine',
    method: 'GET',
    params
  })
}
