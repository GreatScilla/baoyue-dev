// 工艺BOM
import request from "@/router/axios";

// 通过工艺路线ID查询工序和产品
export const getProcessByLineId = params => {
  return request({
    url: "/api/blade-mes/bom/getProcessByLineId",
    method: "get",
    params
  });
};

// 查询工序组件
export const getProcessComponentList = params => {
  return request({
    url: "/api/blade-mes/bom/getProcessComponentList",
    method: "get",
    params
  });
};

// 查询SOP
export const getProcessSopListByProcess = params => {
  return request({
    url: "/api/blade-mes/bom/getProcessSopListByProcess",
    method: "get",
    params
  });
};

// 删除工序sop
export const deleteProcessSop = params => {
  return request({
    url: "/api/blade-mes/bom/deleteProcessSop",
    method: "get",
    params
  });
};



// 删除工序组件
export const removeProcessComponent = params => {
  return request({
    url: "/apiblade-mes/bom/removeProcessComponent",
    method: "get",
    params
  });
};
// 通过工序ID查询工序产品
export const getProcessProductByProcessId = params => {
  return request({
    url: "/api/blade-mes/bom/getProcessProductByProcessId",
    method: "get",
    params
  });
};

// 新增工艺路线bom关联产品（工序关联产品）
export const saveProcessProduct = data => {
  return request({
    url: "/api/blade-mes/bom/saveProcessProduct",
    method: "post",
    data
  });
};

// 新增工艺路线bom关联SOP（工序关联SOP）
export const saveProcessSop = data => {
  return request({
    url: "/api/blade-mes/bom/saveProcessSop",
    method: "post",
    data
  });
};

// 新增工艺路线bom关联产品（工序关联产品）
export const saveProcessComponents = data => {
  return request({
    url: "/api/blade-mes/bom/saveProcessComponents",
    method: "post",
    data
  });
};
