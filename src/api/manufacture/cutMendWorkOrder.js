import request from "@/router/axios";

//获取列表
export const getCutMendWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/cutMendWorkOrder/getCutMendWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            current: params.current,
            size: params.size
        }
    })
}

//获取列表
export const getCutMendWorkOrderDetails = params => {
    return request({
        url: "/api/blade-mes/cutMendWorkOrder/details",
        method: "post",
        params
    })
}


//报工
export const cutMendWorkOrderUpdate = data => {
    return request({
        url: "/api/blade-mes/cutMendWorkOrder/update",
        method: "post",
        data
    })
}

// 导出
export const getCutMendWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/cutMendWorkOrder/getCutMendWorkOrderExport",
        method: "get",
        params
    })
}