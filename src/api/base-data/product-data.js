// 产品数据
import request from "@/router/axios";

// 新增或修改
export const saveOrUpdateProduct = (data, params) => {
  return request({
    url: "/api/blade-base/product/saveOrUpdateProduct",
    method: "post",
    data,
    params
  });
};

// 分类产品
export const listProductByCate = params => {
  return request({
    url: "/api/blade-base/product/listProductByCate",
    method: "get",
    params
  });
};

// 单位列表
export const listUnit = params => {
  return request({
    url: "/api/blade-base/unit/listUnit",
    method: "get",
    params
  });
};

// 产品数据分页查询
export const listProductData = params => {
  return request({
    url: "/api/blade-base/product/list",
    method: "get",
    params
  });
};

// 产品单位树形查询
export const getUnitTree = params => {
  return request({
    url: "/api/blade-base/unit/treeListUnit",
    method: "get",
    params
  });
};

// 批量删除
export const delData = data => {
  return request({
    url: "/api/blade-base/product/remove",
    method: "post",
    data
  });
};
// 供应商
export const listSupplier = () => {
  return request({
    url: "/api/blade-base/contactUnitBase/list",
    method: "post",
    params: {
      category: 1
    }
  });
};

//产品详情
export const productDetail = params => {
  return request({
    url: "/api/blade-base/product/detail",
    method: "get",
    params
  })
}
