import request from "@/router/axios";

// 库存调整分页
export const getAdjustmentPage = params => {
  return request({
    url: "/api/blade-erp/stockTaking/page",
    method: "post",
    data:params
  })
}

//新增/修改 库存调整管理
export const addEditAdjustment = params => {
  return request({
    url: "/api/blade-erp/stockTaking/submit",
    method: "post",
    data:params
  })
}


// 删除 库存调整
export const delAdjustment = params => {
  return request({
    url: "/api/blade-erp/stockTaking/remove",
    method: "post",
    params
  })
}

// 审核出入库
export const examineAdjustment = params => {
  return request({
    url: "/api/blade-erp/stockTaking/audits2",
    method: "post",
    params
  })
}

// 查看详情
export const detailsAdjustment = params => {
  return request({
    url: "/api/blade-erp/stockTaking/detailBean",
    method: "post",
    params
  })
}