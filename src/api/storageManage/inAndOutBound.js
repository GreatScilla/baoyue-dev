import request from "@/router/axios";

// 出入库分页
export const getInAndOutBoundPage = params => {
  return request({
    url: "/api/blade-erp/depotHead/pageBean",
    method: "post",
    data:params
  })
}

//新增/修改出入库管理
export const addEditInAndOutBoundPage = params => {
  return request({
    url: "/api/blade-erp/depotHead/submitBean",
    method: "post",
    data:params
  })
}


// 删除出入库
export const delInAndOutBoundPage = params => {
  return request({
    url: "/api/blade-erp/depotHead/removeBean",
    method: "post",
    params
  })
}

// 审核出入库
export const examineInAndOutBoundPage = params => {
  return request({
    url: "/api/blade-erp/depotHead/audits",
    method: "post",
    params
  })
}

// 产品类别
export const getProductList = params => {
  return request({
    url: "/api/blade-base/product/list",
    method: "get",
    params
  })
}


// 查看详情
export const detailsInAndOutBoundPage = params => {
  return request({
    url: "/api/blade-erp/depotHead/detailBean",
    method: "post",
    params
  })
}
//仓库入库单PDF导出
export const getWarehousingBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/depotHead/getWarehousingBillsReportPDF",
      method: "get",
      params
  })
}
//仓库出库单PDF导出
export const getDeliveryBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/depotHead/getDeliveryBillsReportPDF",
      method: "get",
      params
  })
}