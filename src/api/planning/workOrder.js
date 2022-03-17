import request from "@/router/axios";

// 模块编码ID获取
export const getId = params => {
  return request({
    url: "/api/blade-base/enCode/getId",
    method: "post",
    params
  });
};

//分页查询工单接口
export const getWorkOrderPage = params => {
  return request({
    url: "/api/blade-mes/productionOrders/list",
    method: "get",
    params
  });
};

//新增工单
export const addWorkOrder = params => {
  return request({
    url: "/api/blade-mes/productionOrders/submit",
    method: "post",
    data: params
  });
};

// 查询产品工艺路线
export const getProduct = params => {
  return request({
    url: `/api/blade-mes/productionOrders/getProduct`,
    method: "get",
    params
  });
};

//工单详情
export const detailsWorkOrder = params => {
  return request({
    url: `/api/blade-mes/productionOrders/getList?id=${params}`,
    method: "get"
  });
};

//修改工单
export const editWorkOrder = params => {
  return request({
    url: `/api/blade-mes/productionOrders/update?productionOrdersId=${params.productionOrdersId}`,
    method: "put",
    data: params
  });
};

// 删除工单
export const delWorkOrder = params => {
  return request({
    url: "/api/blade-mes/productionOrders/remove",
    method: "put",
    params
  });
};

// 工单状态
export const getWorkOrderState = params => {
  return request({
    url: "/api/blade-mes/productionOrders/productionOrdersStatusList",
    method: "get",
    params
  });
};

// 工单类型
export const getWorkOrderType = params => {
  return request({
    url: "/api/blade-mes/jobWorkOrder/getTypeDict",
    method: "get",
    params
  });
};

// 车间集合
export const getWorkshopList = params => {
  return request({
    url: "/api/blade-mes/factoryModel/queryWorkshop",
    method: "get",
    params
  });
};

// 物料集合
export const getMaterileList = params => {
  return request({
    url: "/api/blade-mes/materials/getMaterialsList",
    method: "get",
    params
  });
};

// 查询车间产线
export const workshopLine = params => {
  return request({
    url: `/api/blade-mes/factoryModel/queryWorkshopLine`,
    method: "get",
    params
  });
};

// 工单分配展示数据
export const stationOrderAllocation = params => {
  return request({
    url: `/api/blade-mes/productionOrders/getList?id=${params}`,
    method: "get"
  });
};

// 工单分配
export const workOrderDistribution = data => {
  return request({
    url: `/api/blade-mes/schedules/submit?codeName=${data.codeName}`,
    method: "post",
    data
  });
};

// 排程编码获取
export const getScheduleCode = codeName => {
  return request({
    url: `/api/blade-base/enCode/getId?codeName=${codeName}`,
    method: "post"
  });
};
