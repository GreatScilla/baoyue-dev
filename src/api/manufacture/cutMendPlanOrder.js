import request from "@/router/axios";

//获取列表
export const getCutMendPlanByPage = params => {
    return request({
        url: "/api/blade-mes/cutMendPlan/getCutMendPlanByPage",
        method: "post",
        data: params,
        params: {
            current: params.current,
            size: params.size
        }
    })
}

//详情
export const getCutMendPlanByPageDetail = params => {
    return request({
        url: "/api/blade-mes/cutMendPlan/details",
        method: 'post',
        params
    })
}

// 审核
export const cutMendPlanUpdateStatus = ids => {
    return request({
        url: "/api/blade-mes/cutMendPlan/updateStatus",
        method: "post",
        params: {
            ids
          }
    });
};

//修改
export const cutMendPlanUpdate = data => {
    return request({
        url: "/api/blade-mes/cutMendPlan/update",
        method: "post",
        data
    })
}

//修改
export const cutMendPlanUpdateDownStatus = params => {
    return request({
        url: "/api/blade-mes/cutMendPlan/updateDownStatus",
        method: "post",
        params
    })
}

// 导出
export const getCutMendPlanExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/cutMendPlan/getCutMendPlanExport",
        method: "get",
        params
    })
}