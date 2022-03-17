import request from "@/router/axios";

//获取列表
export const getQualityWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/getQualityWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//获取列表
export const getQualityWorkOrder = params => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/getQualityWorkOrder",
        method: "post",
        params
    })
}
//报工
export const submitQualityWork = data => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/submit",
        method: "post",
        data
    })
}

// 批量删除
export const deleteQualityWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/deleteQualityWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getQualityWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/qualityWorkOrder/getQualityWorkOrderExport",
        method: "get",
        params
    })
}