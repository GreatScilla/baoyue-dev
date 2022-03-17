import request from "@/router/axios";

// 新增工艺路线
export const saveOrUpdateCraftRoute = data => {
  return request({
    url: "/api/blade-mes/line/saveOrUpdateLine",
    method: "post",
    data
  });
};

// 查询工艺路线
export const getLine = data => {
  return request({
    url: "/api/blade-mes/line/getLine",
    method: "get",
    data
  });
};
// 查询路线列表
export const getLineList = params => {
  return request({
    url: "/api/blade-mes/line/listLine",
    method: "get",
    params
  });
};

// 查询路线列表
export const deleteRoute = data => {
  return request({
    url: "/api/blade-mes/line/remove",
    method: "post",
    data
  });
};