import request from "@/router/axios";

//分页查询计划排程接口
export const getSchedulePage = params => {
  return request({
    url: "/api/blade-mes/schedules/list",
    method: "get",
    params
  });
};

//新增计划排程
export const addSchedule = params => {
  return request({
    url: "/api/blade-mes/schedule/save",
    method: "post",
    data: params
  });
};

//计划排程详情
export const detailsSchedule = params => {
  return request({
    url: `/api/blade-mes/schedules/getList?id=${params}`,
    method: "get"
  });
};

//修改计划排程
export const editSchedule = data => {
  return request({
    url: `/api/blade-mes/schedules/update`,
    method: "put",
    data
  });
};

// 删除计划排程
export const delSchedule = params => {
  return request({
    url: "/api/blade-mes/schedules/remove",
    method: "put",
    params
  });
};

// 排程状态
export const getScheduleState = params => {
  return request({
    url: "/api/blade-mes/schedules/getScheduleStatusList",
    method: "get",
    params
  });
};

// 排程控制状态
export const getScheduleControlState = params => {
  return request({
    url: "/api/blade-mes/schedules/getScheduleControlStatusList",
    method: "get",
    params
  });
};

// 进度明细
export const getProgressPlanList = params => {
  return request({
    url: "/api/blade-mes/schedule/getProgressPlanList",
    method: "get",
    params
  });
};

// 批量下达
export const issued = params => {
  return request({
    url: "/api/blade-mes/schedules/issued",
    method: "put",
    params
  });
};

// 指派
export const designate = data => {
  return request({
    url: `/api/blade-mes/schedules/submitSchedules`,
    method: "post",
    data
  });
};

// 查询排程表工序工位人员
export const getLineProcess = params => {
  return request({
    url: `/api/blade-mes/schedules/getLineProcess`,
    method: "get",
    params
  });
};
