import request from "@/router/axios";

// 库存预警分页
export const getEarlyWarningPage = params => {
  return request({
    url: "/api/blade-erp/stockWarning/page",
    method: "get",
    params
  })
}

// 查看详情
export const detailsAdjustment = params => {
  return request({
    url: "/api/blade-erp/depotProductStock/findDepotAndStockByProductId",
    method: "post",
    params
  })
}

// 产品分类
export const getProductList = params => {
  return request({
    url: "/api/blade-base/productCate/getProductCateList",
    method: "post",
    params
  })
}
