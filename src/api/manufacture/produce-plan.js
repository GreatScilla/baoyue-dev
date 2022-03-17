import request from "@/router/axios";

// 获取生产类型下拉框接口
export const getProductionTypeStatusList =  () => {
  return request({
    url: "/api/blade-mes/productionplan/getProductionTypeStatusList",
    method: "get",
  });
};


// 车间
export const queryWorkshop =  () => {
  return request({
    url: "/api/blade-mes/factoryModel/queryWorkshop",
    method: "get",
  });
};

// 获取物料分析状态下拉框接口
export const getScheduleAnalysisStatusList =  () => {
  return request({
    url: "/api/blade-mes/productionplan/getScheduleAnalysisStatusList",
    method: "get",
  });
};

// 新增
export const save =  (data,params) => {
  return request({
    url: "/api/blade-mes/productionplan/save",
    method: "post",
    params,
    data
  });
};

// 修改
export const update =  data => {
  return request({
    url: "/api/blade-mes/productionplan/update",
    method: "post",
    data
  });
};

// 详情
export const productionplanDetail =  params => {
  return request({
    url: "/api/blade-mes/productionplan/detail",
    method: "get",
    params
  });
};

// 生产计划分页
export const getProducePlanList =  params => {
  return request({
    url: "/api/blade-mes/productionplan/page",
    method: "get",
    params
  });
};

// 删除
export const remove =  params => {
  return request({
    url: "/api/blade-mes/productionplan/remove",
    method: "post",
    params
  });
};

// 审核
export const audit =  params => {
  return request({
    url: "/api/blade-mes/productionplan/audit",
    method: "post",
    params
  });
};
//生产计划单PDF导出
export const getProductionPlanBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/productionplan/getProductionPlanBillsReportPDF",
      method: "get",
      params
  })
}
