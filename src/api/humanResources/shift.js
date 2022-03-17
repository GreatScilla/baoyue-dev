import request from "@/router/axios";

//获取班次列表
export const getShiftList = params => {
  return request({
    url: "/api/blade-hr/mesClass/list",
    method: "post",
    params
  });
};

//新增班次
export const addShift = data => {
  return request({
    url: "/api/blade-hr/mesClass/submitMesClass",
    method: "post",
    data
  });
};

//修改班次
export const updateShift = data => {
  return request({
    url: "/api/blade-hr/mesClass/updateMesClass",
    method: "post",
    data
  });
};

// 删除
export const deleteShift = ids => {
  return request({
    url: "/api/blade-hr/mesClass/removeMesClass",
    method: "post",
    data: {
      ids
    }
  });
};

// 修改状态
export const updateState = params => {
  return request({
    url: "/api/blade-hr/mesClass/updateStatus",
    method: "post",
    params:params
  });
};

