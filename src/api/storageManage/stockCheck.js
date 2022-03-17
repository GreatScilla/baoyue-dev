import request from "@/router/axios";

// 库存查看列表
export const getStockCheckPage = params => {
  return request({
    url: "/api/blade-erp/depotProductStock/page",
    method: "post",
    data:params
  })
}

// 查看详情
export const detailsStockCheckPage = params => {
  return request({
    url: "/api/blade-erp/depotProductStock/pageDetail",
    method: "post",
    data:params
  })
}
