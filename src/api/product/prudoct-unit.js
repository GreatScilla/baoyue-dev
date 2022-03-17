// 产品单位
import request from "@/router/axios";

// 新增或修改产品单位
export const saveOrUpdateUnit = data => {
  return request({
    url: "/api/blade-base/unit/saveOrUpdateUnit",
    method: "post",
    data
  });
};

// 新增或修改产品分组
export const saveOrUpdateGroup = data => {
  return request({
    url: "/api/blade-base/unitGroup/saveOrUpdateUnitGroup",
    method: "post",
    data
  });
};

// 删除产品单位
export const deleteUnits = data => {
  return request({
    url: "/api/blade-base/unit/remove",
    method: "post",
    data
  });
};

// 查询产品单位
export const getUnits = params => {
  return request({
    url: "/api/blade-base/unit/listUnit",
    method: "get",
    params
  });
};

// 查询产品单位
export const getGroup = params => {
  return request({
    url: "/api/blade-base/unitGroup/listUnitGroup",
    method: "get",
    params
  });
};
