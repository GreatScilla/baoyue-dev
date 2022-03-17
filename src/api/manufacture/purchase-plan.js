import request from "@/router/axios";

// 采购计划分页
export const getProcurementPlanList =  params => {
  return request({
    url: "/api/blade-mes/procurementplan/page",
    method: "get",
    params
  });
};
//采购计划列表
export const procurementPlanSelect =  params => {
  return request({
    url: "/api/blade-mes/procurementplan/select",
    method: "get",
    params
  });
};


// 新增
export const save =  (data,params) => {
  return request({
    url: "/api/blade-mes/procurementplan/save",
    method: "post",
    data,
    params
  });
};

// 删除
export const remove =  params => {
  return request({
    url: "/api/blade-mes/procurementplan/remove",
    method: "post",
    params
  });
};


// 审核
export const audit =  params => {
  return request({
    url: "/api/blade-mes/procurementplan/audit",
    method: "post",
    params
  });
};

// 修改
export const update =  data => {
  return request({
    url: "/api/blade-mes/procurementplan/update",
    method: "post",
    data
  });
};

// 详情
export const procurementplanDetail =  params => {
  return request({
    url: "/api/blade-mes/procurementplan/detail",
    method: "get",
    params
  });
};
//采购计划单PDF导出
export const getProcurementPlanBillsReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/procurementplan/getProcurementPlanBillsReportPDF",
      method: "get",
      params
  })
}
