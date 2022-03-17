import request from "@/router/axios";

//获取员工班次列表
export const getEmployeeShift = params => {
  return request({
    url: "/api/blade-hr/userClass/selectUserClassPage",
    method: "post",
    params
  });
};

//新增-修改班次
export const addEmployeeShift = params => {
  return request({
    url: "/api/blade-hr/userClass/addOrUpdateUserClass",
    method: "post",
    data:params
  });
};


// 删除员工班次
export const deleteEmployeeShift = params => {
  return request({
    url: "/api/blade-hr/userClass/removeUserClass",
    method: "post",
    params:params
  });
};

// 详情
export const detailsEmployeeShift = params => {
  return request({
    url: "/api/blade-hr/userClass/selectUserClassById",
    method: "post",
    params:params
  });
};

