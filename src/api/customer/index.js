import request from '@/router/axios';

//获取客户信息列表
export const getCustomerPage = params => {
  return request({
    url: '/api/blade-erp/crm/crmcustomer/page',
    method: 'get',
    params
  })
}

//
export const addCustomer = params => {
  return request({
    url: '/api/blade-erp/crm/crmcustomer/save',
    method: 'post',
    data:params
  })
}

