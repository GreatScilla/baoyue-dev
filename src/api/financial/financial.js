import request from '@/router/axios';

// 查询分页
export const queryIncomeAndExpenditurePage = params => {
  return request({
    url: '/api/blade-finance/bill/getBillPage',
    method: 'post',
    params
  })
}

//新增 /修改
export const addEditIncomeAndExpenditure = params => {
  return request({
    url: '/api/blade-finance/bill/addOrUpdateBill',
    method: 'post',
    data:params
  })
}

// 删除
export const del = params => {
  return request({
    url: '/api/blade-finance/bill/delete',
    method: 'get',
    params
  })
}

// 审核
export const review = params => {
  return request({
    url: '/api/blade-finance/bill/verify',
    method: 'get',
    params
  })
}


// 结算方式
export const settlementMethod = params => {
  return request({
    url: '/api/blade-base/paymentType/getPaymentTypeList',
    method: 'get',
    params
  })
}

//详情
export const detailsIncomeAndExpenditure = params => {
  return request({
    url: '/api/blade-finance/bill/getBillById',
    method: 'get',
    params
  })
}

// // 有订单的客户
// export const getOrderCustomerGroup = params => {
//   return request({
//     url: '/api/blade-erp/shopOrder/getOrderMemberId',
//     method: 'get',
//     params
//   })
// }

// //客户的订单
// export const getCustomerOrder = params => {
//   return request({
//     url: '/api/blade-erp/shopOrder/getOrderListByMemberId',
//     method: 'get',
//     params
//   })
// }

// 供应商
export const getOrderCustomerGroup = params => {
  return request({
    url: 'api/blade-base/contactUnitBase/list',
    method: 'post',
    params:{
      category:1,
      current:1,
      size:9999
    },
    data:params
  })
}

//供应商的订单
export const getCustomerOrder = params => {
  return request({
    url: '/api/blade-erp/accountStatement/getAccountStatementByPage',
    method: 'post',
    params:{
      pageNum:1,
      pageSize:9999,
    },
    data:params
  })
}

// 费用科目列表
export const getSubjects = params => {
  return request({
    url: '/api/blade-base/subjects/getList',
    method: 'get',
    params
  })
}


// 获取项目列表
export const selectProjectAndCustomerDisList = params => {
  return request({
    url: '/api/blade-erp/accountStatement/selectProjectAndCustomerDisList',
    method: 'get',
    params
  })
}


//项目的订单
export const listProjectAllMoney = params => {
  return request({
    url: '/api/blade-erp/accountStatement/listProjectAllMoney',
    method: 'get',
    params
  })
}

//获取信用信息
export const getProjectBySn = params => {
  return request({
    url: '/api/blade-erp/projectManager/getProjectBySn',
    method: 'get',
    params
  })
}



//获取token
export const getFinancialToken = params => {
  return request({
    url: '/api/blade-finance/k3wise/getToken',
    method: 'get',
    params
  })
}



//获取科目列表
export const getFinancialSubject = params => {
  return request({
    url: '/api/blade-finance/k3wise/getList',
    method: 'post',
    params
  })
}


//获取科目列表
export const getVoucher = params => {
  return request({
    url: '/api/blade-finance/k3wise/voucherGroupGetList',
    method: 'post',
    params
  })
}





//转总账
export const transLedger = params => {
  return request({
    url: '/api/blade-finance/bill/toGeneralLedger',
    method: 'post',
    params:params,
    data:params
  })
}
//收入单PDF导出
export const getIncomeBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-finance/bill/getIncomeBillsReportPDF",
      method: "get",
      params
  })
}
//支出单PDF导出
export const getExpendBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-finance/bill/getExpendBillsReportPDF",
      method: "get",
      params
  })
}



