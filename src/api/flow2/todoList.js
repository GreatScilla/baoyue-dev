import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-base/approvalProcess/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//分页查询项目审批数据(status 0待审批 1我发起的审批)
export const getApprovalList = (params) => {
  return request({
      url: "/api/blade-base/approvalList/list",
      method: 'get',
      params
  })
}
//审批
export const auditApproval= (params) => {
  return request({
      url: "/api/blade-base/approvalList/update",
      method: 'put',
      params
  })
}

//查询项目审批详细数据
export const listDetail= (params) => {
  return request({
      url: "/api/blade-base/approvalList/listDetail",
      method: 'get',
      params
  })
}
//已办结事务
export const getDoneList= (params) => {
  return request({
      url: "/api/blade-base/approvalList/pendingList",
      method: 'get',
      params
  })
}

//抄送事务
export const getCCList= (params) => {
  return request({
      url: "/api/blade-base/approvalList/ccList",
      method: 'get',
      params
  })
}