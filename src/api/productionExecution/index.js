import request from "@/router/axios";

//任务开始列表
export const startTaskt = params => {
  return request({
    url: "/api/blade-mes/execute/startTaskt",
    method: "get",
    params:params
  })
}
//获取排程状态下拉框接口
export const getScheduleStatusList = params => {
  return request({
    url: "/api/blade-mes/schedules/getScheduleStatusList",
    method: "get",
    params:params
  })
}
// 新增不良品录入
export const addBadRecord = params => {
  return request({
    url: "/api/blade-mes/inputLog/submit",
    method: "post",
    data:params
  })
}

// 分页查询
export const badRecordPage = params => {
  return request({
    url: "/api/blade-mes/inputLog/page",
    method: "post",
    data:params
  })
}

// 新增报工
export const addReportWork = params => {
  return request({
    url: "/api/blade-mes/jobBooking/submit",
    method: "post",
    data:params
  })
}

// 查询选择工位
export const stationSelectionList = params => {
  return request({
    url: "/api/blade-mes/mesuser/findMesUserStation",
    method: "post",
    data:params
  })
}

// 切换工位
export const checkStation = params => {
  return request({
    url: "/api/blade-mes/mesuser/checkStation",
    method: "post",
    params
  })
}
//获取图文档查询
export const getSopListByLine = params => {
  return request({
    url: "/api/blade-mes/execute/getSopListByLine",
    method: "get",
    params:params
  })
}



