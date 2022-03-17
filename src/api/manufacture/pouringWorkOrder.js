import request from "@/router/axios";

//获取列表
export const getPouringWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/getPouringWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//获取列表
export const getPouringWorkOrder = params => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/getPouringWorkOrder",
        method: "post",
        params
    })
}
//获取列表
export const submitPouringWork = params => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/submit",
        method: "post",
        params
    })
}

// 批量删除
export const deletePouringWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/deletePouringWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getPouringWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/pouringWorkOrder/getPouringWorkOrderExport",
        method: "get",
        params
    })
}