import request from "@/router/axios";

//获取列表
export const getScheduleWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/getScheduleWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

// 批量删除
export const deleteScheduleWorkOrder = ids => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/deleteScheduleWorkOrder",
        method: "post",
        params: {
            ids
        }
    });
};

// 拆分
export const splitScheduleWorkOrder = data => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/splitScheduleWorkOrder",
        method: "post",
        data
    });
};
// 并模
export const updateMerge = params => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/updateMerge",
        method: "post",
        params
    });
};

//修改
export const updateScheduleWorkOrder = data => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/updateScheduleWorkOrder",
        method: "post",
        data
    })
}

//下达
export const toSchedule = data => {
    return request({
        url: "/api/blade-mes/jobWorkOrder/toSchedule",
        method: "post",
        data
    })
}

// 导出
export const getScheduleWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/scheduleWorkOrder/getScheduleWorkOrderExport",
        method: "get",
        params
    })
}