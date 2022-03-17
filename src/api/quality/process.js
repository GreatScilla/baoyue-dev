import request from '@/router/axios';

//质检计划列表
export const planPage = (params,data) => {
  return request({
    url: '/api/blade-quality/plan/planPage',
    method: 'post',
    params,
    data
  })
}
//增改质检计划
export const saveOrUpdatePlan = (tag, data) => {
    return request({
      url: '/api/blade-quality/plan/saveOrUpdatePlan',
      method: 'post',
      params: { tag: tag },
      data
    })
  }
  //删除质检计划
  export const removePlan = (data) => {
    return request({
      url: '/api/blade-quality/plan/removePlan',
      method: 'post',
      data
    })
  }
  //计划签收/退回
  export const operation = params => {
    return request({
      url: '/api/blade-quality/plan/operation',
      method: 'post',
      params
    })
  }
  //根据化验室ID查询化验类别
export const selectCategoryList = (id) => {
    return request({
      url: '/api/blade-quality/assayCategory/selectCategoryList',
      method: 'post',
      params:id
    })
  }
  //下发任务
  export const createTask = (id, data) => {
    return request({
      url: '/api/blade-quality/plan/createTask',
      method: 'post',
      params: { planId: id },
      data
    })
  }
  //质检任务列表
export const taskPage = (params,data) => {
  return request({
    url: '/api/blade-quality/task/taskPage',
    method: 'post',
    params,
    data
  })
}
//增改质检任务
export const saveOrUpdateTask = (tag, data) => {
  return request({
    url: '/api/blade-quality/task/saveOrUpdateTask',
    method: 'post',
    params: { tag: tag },
    data
  })
}
 //删除质检任务
 export const removeTask = (data) => {
  return request({
    url: '/api/blade-quality/task/removeTask',
    method: 'post',
    data
  })
}
 //任务签收/退回
 export const taskOperation = params => {
  return request({
    url: '/api/blade-quality/task/operation',
    method: 'post',
    params
  })
}
 //下发工单
 export const createWorkOrder = (id, executeUserId) => {
  return request({
    url: '/api/blade-quality/task/createWorkOrder',
    method: 'post',
    params: { taskId: id,executeUserId:executeUserId },
  })
}
 //质检工单列表
 export const workOrderPage = (params,data) => {
  return request({
    url: '/api/blade-quality/workOrder/workOrderPage',
    method: 'post',
    params,
    data
  })
}
//增改质检工单
export const saveOrUpdateWorkOrder = (tag, data) => {
  return request({
    url: '/api/blade-quality/workOrder/saveOrUpdateWorkOrder',
    method: 'post',
    params: { tag: tag },
    data
  })
}
//删除质检工单
export const removeWorkOrder = (data) => {
  return request({
    url: '/api/blade-quality/workOrder/removeWorkOrder',
    method: 'post',
    data
  })
}
 //工单签收/退回
 export const workOrderOperation = params => {
  return request({
    url: '/api/blade-quality/workOrder/operation',
    method: 'post',
    params
  })
}
//生成报工单
export const createReport = (id, data) => {
  return request({
    url: '/api/blade-quality/workOrder/createReport',
    method: 'post',
    params: { workOrderId: id },
    data
  })
}
//根据工单编号查询报工详情

export const workReportDetails = params => {
  return request({
    url: '/api/blade-quality/workOrder/workReportDetails',
    method: 'post',
    params
  })
}
//质检工单PDF导出
export const getWorkReportBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-quality/workOrder/getWorkReportBillsReportPDF",
      method: "get",
      params
  })
}
//质检报工列表
export const reportPage = (params,data) => {
  return request({
    url: '/api/blade-quality/report/reportPage',
    method: 'post',
    params,
    data
  })
}
//质检报工编辑
export const updateReport = (data) => {
  return request({
    url: '/api/blade-quality/report/updateReport',
    method: 'post',
    data
  })
}
//质检报工详情
export const reportDetails = (id) => {
  return request({
    url: '/api/blade-quality/report/reportDetails',
    method: 'post',
    params: { reportId: id },
  })
}
//报工是否合格
export const isQualified = (params) => {
  return request({
    url: '/api/blade-quality/report/isQualified',
    method: 'post',
    params
  })
}
//质检报工PDF导出
export const getReportReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-quality/report/getReportReportPDF",
      method: "get",
      params
  })
}


