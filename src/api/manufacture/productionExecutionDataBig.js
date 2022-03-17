import request from "@/router/axios";
//浇注列表
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
//切割列表
export const getCuttingWorkOrderByPageBI = params => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/getCuttingWorkOrderByPageBI",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}
//质检列表
export const getQualityWorkOrderByPageBI = params => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/getQualityWorkOrderByPageBI",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//钢丝列表
export const getSteelWireByPageBI = params => {
    return request({
        url: "/api/blade-mes/steelWire/getSteelWireByPageBI",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//切割未入釜列表
export const getCuttingWorkOrderByPageBITwo = params => {
    return request({
        url: "/api/blade-mes/cuttingWorkOrder/getCuttingWorkOrderByPageBITwo",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}