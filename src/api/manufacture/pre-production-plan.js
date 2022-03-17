import request from "@/router/axios";

// 新增预生产计划
export const savePreProductionPlan = (data, params) => {
  return request({
    url: "/api/blade-mes/preproductionplan/save",
    method: "post",
    data,
    params
  });
};

// 同步销售订单数据到生产计划
export const synchronous = () => {
  return request({
    url: "/api/blade-mes/preproductionplan/synchronous",
    method: "post",

  });
};

// 自定义分页
export const getPreProductionPlan = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/page",
    method: "get",
    params
  });
};

// 转物料分析
export const analysis = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/analysis",
    method: "post",
    params
  });
};

// 审核
export const audit = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/audit",
    method: "post",
    params
  });
};

// 删除
export const remove = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/remove",
    method: "post",
    params
  });
};

// 编辑
export const update = data => {
  return request({
    url: "/api/blade-mes/preproductionplan/update",
    method: "post",
    data
  });
};

// 详情
export const detail = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/detail",
    method: "get",
    params
  });
};
//获取销售订单下拉
export const orderList = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/orderList",
    method: "get",
    params
  });
};
//获取状态下拉
export const getPreProductionPlanStatusList = params => {
  return request({
    url: "/api/blade-mes/preproductionplan/getPreProductionPlanStatusList",
    method: "get",
    params
  });
};



