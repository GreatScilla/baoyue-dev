// 产品分类
import request from "@/router/axios";

// 新增或修改产品分类
export const saveOrUpdateProductCate = data => {
  return request({
    url: "/api/blade-base/productCate/saveOrUpdateProductCate",
    method: "post",
    data
  });
};

// 获取部门人员树状表
export const getAllDeptUsers = data => {
  return request({
    url: "/api/blade-base/getAllDeptUsers",
    method: "post",
    data
  });
};

// 查询产品分类
export const getProductCates = params => {
  return request({
    url: "/api/blade-base/productCate/listProductCate",
    method: "get",
    params
  });
};

// 删除产品分类
export const deleteCate = data => {
  return request({
    url: "/api/blade-base/productCate/remove",
    method: "post",
    data
  });
};
