import request from "@/router/axios";

//获取列表
export const getMeshPlanByPage = params => {
    return request({
        url: "/api/blade-mes/meshPlan/getMeshPlanByPage",
        method: "post",
        data: params,
        params: {
            current: params.current,
            size: params.size
        }
    })
}

//详情
export const getMeshPlanDetail = params => {
    return request({
        url: "/api/blade-mes/meshPlan/details",
        method: 'post',
        params
    })
}

// 审核
export const meshPlanUpdateStatus = ids => {
    return request({
        url: "/api/blade-mes/meshPlan/updateStatus",
        method: "post",
        params: {
            ids
          }
    });
};

//修改
export const meshPlanUpdate = data => {
    return request({
        url: "/api/blade-mes/meshPlan/update",
        method: "post",
        data
    })
}
//add
export const meshPlanSave = data => {
    return request({
        url: "/api/blade-mes/meshPlan/save",
        method: "post",
        data
    })
}

//下发
export const meshPlanUpdateDownStatus = params => {
    return request({
        url: "/api/blade-mes/meshPlan/updateDownStatus",
        method: "post",
        params
    })
}

// 删除
export const meshPlanRemove = ids => {
    return request({
        url: "/api/blade-mes/meshPlan/remove",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getMeshPlanExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/meshPlan/getMeshPlanExport",
        method: "get",
        params
    })
}