import request from "@/router/axios";

//获取列表
export const getDemotionWorkOrderByPage = params => {
    return request({
        url: "/api/blade-mes/demotionWorkOrder/getDemotionWorkOrderByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//详情
export const getDemotionWorkOrderByPageDetail = params => {
    return request({
        url: "/api/blade-mes/demotionWorkOrder/details",
        method: 'post',
        params
    })
}

// 审核
export const updateStatus = ids => {
    return request({
        url: "/api/blade-mes/demotionWorkOrder/updateStatus",
        method: "post",
        params: {
            ids
          }
    });
};

//修改
export const demotionWorkOrderUpdate = data => {
    return request({
        url: "/api/blade-mes/demotionWorkOrder/update",
        method: "post",
        data
    })
}
///blade-mes/demotionWorkOrder/getDemotionWorkOrderExport
// 导出
export const getDemotionWorkOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/demotionWorkOrder/getDemotionWorkOrderExport",
        method: "get",
        params
    })
}