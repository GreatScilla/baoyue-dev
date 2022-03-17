import request from "@/router/axios";

//获取列表
export const getMeshWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/MeshWorkOrder/getMeshWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            current: params.current,
            size: params.size
        }
    })
}

//获取列表
export const getMeshWorkOrderDetails = params => {
    return request({
        url: "/api/blade-mes/MeshWorkOrder/details",
        method: "post",
        params
    })
}


//报工
export const meshWorkOrderUpdate = data => {
    return request({
        url: "/api/blade-mes/MeshWorkOrder/update",
        method: "post",
        data
    })
}

// 导出
export const getMeshWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/MeshWorkOrder/getMeshWorkOrderExport",
        method: "get",
        params
    })
}