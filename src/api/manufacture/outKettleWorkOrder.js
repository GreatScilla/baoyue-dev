import request from "@/router/axios";

//获取列表
export const getOutletWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/irigamaWorkOrder/getOutletWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//获取列表
export const getOutletWorkOrder = params => {
    return request({
        url: "/api/blade-mes/irigamaWorkOrder/getOutletWorkOrder",
        method: "post",
        params
    })
}
//报工撤销
export const submitIrigamaWork = params => {
    return request({
        url: "/api/blade-mes/irigamaWorkOrder/submit",
        method: "post",
        params
    })
}

// 批量删除
export const deleteIrigamaWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/irigamaWorkOrder/deleteIrigamaWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getIrigamaWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/irigamaWorkOrder/getIrigamaWorkOrderExport",
        method: "get",
        params
    })
}