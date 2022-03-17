// 报工
import request from "@/router/axios";

// 通过工艺路线ID查询工序和产品
export const getReporting = params => {
  return request({
    url: "/api/blade-mes/jobBooking/list",
    method: "get",
    params
  });
};

// 查询工位接口
export const queryWorkshop = params => {
  return request({
    url: "/api/blade-mes/jobBooking/queryWorkshop",
    method: "get",
    params
  });
};

// 通过名字模糊查询工序
export const getListByName = params => {
  return request({
    url: "/api/blade-mes/process/getListByName",
    method: "get",
    params
  });
};
//生产报工单PDF导出
export const getJobBookingBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/jobBooking/getJobBookingBillsReportPDF",
      method: "get",
      params
  })
}