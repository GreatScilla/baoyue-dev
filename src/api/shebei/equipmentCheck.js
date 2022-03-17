import request from '@/router/axios';
//点检计划分页
export const checkPlanPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/page',
    method: 'GET',
    params
  })
};
//点检计划新增
export const checkSave = params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/save',
    method: 'POST',
    params
  })
};
//点检计划删除
export const checkRemove = params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/remove',
    method: 'POST',
    params
  })
};
//点检计划指派
export const eqassignedPlan = params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/assign',
    method: 'POST',
    params
  })
};
//点检计划详情
export const checkPlanDetail= params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/detail',
    method: 'GET',
    params
  })
};
//根据编码查询计划标准
export const getEquipmentinfo= params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/getStandard',
    method: 'GET',
    params
  })
};
//新增点检项
export const addCheckItem= params => {
  return request({
    url: '/api/blade-rcm/checkitem/save',
    method: 'POST',
    params
  })
};
//新建点检标准
export const saveCheckStandard= params => {
  return request({
    url: '/api/blade-rcm/checkstandard/save',
    method: 'POST',
    params
  })
};
//点检标准条件分页
export const CheckStandardPage= params => {
  return request({
    url: '/api/blade-rcm/checkstandard/page',
    method: 'GET',
    params
  })
};
//编辑点检标准
export const editCheckStandard= params => {
  return request({
    url: '/api/blade-rcm/checkstandard/update',
    method: 'POST',
    params
  })
};
//设备点检详情
export const CheckStandardDetail= params => {
  return request({
    url: '/api/blade-rcm/checkstandard/detail',
    method: 'GET',
    params
  })
};
//删除点检标准
export const removeCheckStandardItem= params => {
  return request({
    url: '/api/blade-rcm/checkstandard/remove',
    method: 'POST',
    params
  })
};
//点检工单详情
export const checkOrderDetail= params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/detail',
    method: 'GET',
    params
  })
};
//点检工单标准详情
export const seeEquipmentinfo= params => {
  return request({
    url: '/api/blade-rcm/maintenancestandard/getStandard',
    method: 'GET',
    params
  })
};
//点检工单反馈详情
export const getChenkFeedback= params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/getFeedback',
    method: 'GET',
    params
  })
};
//点检工单修改
export const upCheckPlan= data => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/update',
    method: 'POST',
    data
  })
};
//点检工单反馈
export const CheckPlanBack= data => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/toFeedback',
    method: 'POST',
    dataType:"json",
    contentType:'application/json;charset=UTF-8',
    data
  })
};
//点检工单验收按钮
export const CheckPlanAcceptance= params => {
  return request({
    url: '/api/blade-rcm/equipmentcheckingplan/reCheckBeforeAcceptance',
    method: 'GET',
    params
  })
};

