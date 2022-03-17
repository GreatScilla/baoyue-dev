import request from "@/router/axios";

// 分页查询
export const getReturnGoodsPage = params => {
  return request({
    url: "/api/blade-erp/returnManagement/page",
    method: "post",
    data:params
  })
}


// 新增修改退货管理
export const addEditReturnGoods = params => {
  return request({
    url: "/api/blade-erp/returnManagement/submit",
    method: "post",
    data:params
  })
}

// 查看详情
export const detailsReturnGoods = params => {
  return request({
    url: "/api/blade-erp/returnManagement/detailBean",
    method: "post",
    params
  })
}

// 删除
export const deleteReturnGoods = params => {
  return request({
    url: "/api/blade-erp/returnManagement/remove",
    method: "post",
    params
  })
}

// 审核
export const auditsReturnGoods = params => {
  return request({
    url: "/api/blade-erp/returnManagement/audits",
    method: "post",
    params
  })
}
