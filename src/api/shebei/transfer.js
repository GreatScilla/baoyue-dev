import request from '@/router/axios';
//备件领用分页
export const collectPage = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/page',
    method: 'GET',
    params
  })
};
//备件领用审核接口
export const collectAudit = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/approval',
    method: 'POST',
    params
  })
};
//备件领用新增接口
export const addCollect = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/save',
    method: 'POST',
    params
  })
};
//作废领用接口
export const invalidCollect = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/toVoid',
    method: 'POST',
    params
  })
};
//删除领用接口
export const removeCollect = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/remove',
    method: 'POST',
    params
  })
};
//设备归还分页
export const revertPage = params => {
  return request({
    url: '/api/blade-rcm/loanreturn/page',
    method: 'GET',
    params
  })
};
//设备归还审批
export const revertAudit = params => {
  return request({
    url: '/api/blade-rcm/loanreturn/approval',
    method: 'POST',
    params
  })
};
//设备归还审批
export const invalidRever = params => {
  return request({
    url: '/api/blade-rcm/loanreturn/toVoid',
    method: 'POST',
    params
  })
};
//设备归还审批
export const addrevert = params => {
  return request({
    url: '/api/blade-rcm/loanreturn/save',
    method: 'POST',
    params
  })
};
//设备处置分页
export const disposePage = params => {
  return request({
    url: '/api/blade-rcm/equipmentdisposal/page',
    method: 'GET',
    params
  })
};
//申请处置单
export const applydispose = params => {
  return request({
    url: '/api/blade-rcm/equipmentdisposal/page',
    method: 'GET',
    params
  })
};
//申请处置单详情
export const disposeDetail = params => {
  return request({
    url: '/api/blade-rcm/equipmentdisposal/detail',
    method: 'GET',
    params
  })
};
//申请处置单详情
export const collectDetail = params => {
  return request({
    url: '/api/blade-rcm/lendinfo/detail',
    method: 'GET',
    params
  })
};
//申请处置单详情
export const revertDetail = params => {
  return request({
    url: '/api/blade-rcm/loanreturn/detail',
    method: 'GET',
    params
  })
};
//申请处置单详情
export const equipmentdisposal = data => {
  return request({
    url: '/api/blade-rcm/equipmentdisposal/save',
    method: 'POST',
    data
  })
};
