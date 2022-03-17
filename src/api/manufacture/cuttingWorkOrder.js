import request from "@/router/axios";

//获取列表
export const getCuttingWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/getCuttingWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//获取列表
export const getPouringWorkOrderByPageBI = params => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/getPouringWorkOrderByPageBI",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//获取列表
export const getCuttingWorkOrder = params => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/getCuttingWorkOrder",
        method: "post",
        params
    })
}
//报工撤销
export const submitCuttingWork = params => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/submit",
        method: "post",
        params
    })
}

// 批量删除
export const deleteCuttingWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/deleteCuttingWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getCutMendPlanExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/cutMendPlan/getCutMendPlanExport",
        method: "get",
        params
    })
}