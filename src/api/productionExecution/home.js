import request from "@/router/axios";

// 操作执行主页面接口
export const getExecuteDetail = params => {
  return request({
    url: "/api/blade-mes/execute/getExecuteDetail",
    method: "get",
    params
  })
}
// //主页下拉
// export const getWorkStation = params => {
//   return request({
//     url: "/api/blade-mes/execute/getWorkStation",
//     method: "get",
//     params
//   })
// }

// 排程工序物料列表
export const getSchedulesMaterialList = params => {
  return request({
    url: "/api/blade-mes/execute/getSchedulesMaterialList",
    method: "get",
    params
  })
}

// 扫码
export const scanCode = params => {
  return request({
    url: "/api/blade-mes/execute/scanCode",
    method: "get",
    params
  })
}
//检验
export const Check = params => {
  return request({
    url: "/api/blade-mes/execute/Check",
    method: "put",
    params
  })
}
