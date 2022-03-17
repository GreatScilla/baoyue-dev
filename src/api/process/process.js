import request from "@/router/axios";

// 新增工序
export const saveProcess = data => {
  return request({
    url: "/api/blade-mes/process/save",
    method: "post",
    data
  });
};

// 删除工序
export const deleteProcess = ids => {
  return request({
    url: "/api/blade-mes/process/remove",
    method: "post",
    data: {
      ids
    }
  });
};

// 修改工序
export const updateProcess = data => {
  return request({
    url: "/api/blade-mes/process/update",
    method: "post",
    data
  });
};

// 查询单个工序
export const findOneProcess = id => {
  return request({
    url: "/api/blade-mes/process/detail",
    method: "post",
    params: {
      id
    }
  });
};

// 分页查询工序接口
export const findProcessList = params => {
  return request({
    url: "/api/blade-mes/process/page",
    method: "get",
    params
  });
};

// 工位树状图
export const getFactoryModelTree = params => {
  return request({
    url: "/api/blade-mes/factoryModel/treeFactoryModel",
    method: "get",
    params
  });
};