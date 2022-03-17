import request from "@/router/axios";

//获取列表
export const getJobWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/jobWorkOrder/getJobWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}
//修改
export const updateJobWorkOrder = data => {
    return request({
        url: "/api/blade-mes/jobWorkOrder/updateJobWorkOrder",
        method: "post",
        data
    })
}

//交接
export const splitJobWorkOrder = params => {
    return request({
        url: "/api/blade-mes/jobWorkOrder/splitJobWorkOrder",
        method: "post",
        params
    })
}

//下发
export const toSchedule = params => {
    return request({
        url: "/api/blade-mes/pouringWorkOrder/toSchedule",
        method: "post",
        params
    })
}

// 批量删除
export const deleteJobWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/jobWorkOrder/deleteJobWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 导出
export const getJobWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/jobWorkOrder/getJobWorkOrderExport",
        method: "get",
        params
    })
}