import request from "@/router/axios";

// 新增物料
export const saveMaterial = data => {
  return request({
    url: "/api/blade-mes/materials/saveOrUpdateMaterials",
    method: "post",
    data
  });
};

// 删除物料
export const deleteMaterial = ids => {
  return request({
    url: "/api/blade-mes/materials/remove",
    method: "post",
    data: {
      ids
    }
  });
};

// 查询单个物料
export const findSingleMaterial = id => {
  return request({
    url: "/api/blade-mes/materials/getMaterials",
    method: "post",
    params: {
      id
    }
  });
};

// 分页查询物料接口
export const findMaterialList = params => {
  return request({
    url: "/api/blade-mes/materials/page",
    method: "get",
    params
  });
};
