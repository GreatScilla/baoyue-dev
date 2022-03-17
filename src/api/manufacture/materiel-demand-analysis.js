import request from "@/router/axios";

// 自定义分页
export const getList = ( params) => {
  return request({
    url: "/api/blade-mes/reqAnalysis/page",
    method: "get",
    params
  });
};

// 转采购计划
export const transferPurchasingPlan = ( params) => {
  return request({
    url: "/api/blade-mes/reqAnalysis/transferPurchasingPlan",
    method: "post",
    params
  });
};

// 转生产计划
export const turnToProductionPlan = ( params) => {
  return request({
    url: "/api/blade-mes/reqAnalysis/turnToProductionPlan",
    method: "post",
    params
  });
};

// 删除操作
export const remove = ( params) => {
  return request({
    url: "/api/blade-mes/reqAnalysis/remove",
    method: "post",
    params
  });
};

