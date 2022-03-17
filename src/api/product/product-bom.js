// 产品BOM
import request from "@/router/axios";

// 分页
export const getProductBomList = params => {
  return request({
    url: "/api/blade-mes/productBom/list",
    method: "get",
    params
  });
};

// 删除
export const deleteProductBom = data => {
  return request({
    url: "/api/blade-mes/productBom/remove",
    method: "post",
    params: data
  });
};



// 新增或者修改产品bom
export const saveOrUpdateProductBom = data => {
  return request({
    url: "/api/blade-mes/productBom/saveOrUpdateProductBom",
    method: "post",
    data
  });
};

// 查询产品bom
export const listProductCateWithBom = params => {
  return request({
    url: "/api/blade-mes/productBom/listProductCateWithBom",
    method: "get",
    params
  });
};

// 通过产品ID查询产品bom
export const listProductBomByProductId = params => {
  return request({
    url: "/api/blade-mes/productBom/listProductBomByProductId",
    method: "get",
    params
  });
};

// 多阶查询产品Bom
export const moreProductBom = params => {
  return request({
    url: "/api/blade-mes/productBom/moreProductBom",
    method: "get",
    params
  });
};

// 查询树状产品Bom
export const treeProductBom = params => {
  return request({
    url: "/api/blade-mes/productBom/treeProductBom",
    method: "get",
    params
  });
};

// 查询单个
export const getProductBom = params => {
  return request({
    url: "/api/blade-mes/productBom/getProductBom",
    method: "get",
    params
  });
};

// 查询产品Bom子件
export const getChildProductBom = params => {
  return request({
    url: "/api/blade-mes/productBom/getChildProductBom",
    method: "get",
    params
  });
};
// 修改产品bom状态
export const productBomStatus = data => {
  return request({
    url: "/api/blade-mes/productBom/status",
    method: "post",
    params:data
  });
};
//配方记录单PDF导出
export const getFormulaRecordBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/productBom/getFormulaRecordBillsReportPDF",
      method: "get",
      params
  })
}
