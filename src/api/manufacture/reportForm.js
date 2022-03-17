import request from "@/router/axios";

// 预生产计划报表
export const getPreProductionPlanReport = (params) => {
    return request({
        url: "/api/blade-mes/preproductionplan/getPreProductionPlanReport",
        method: "get",
        params
    });
};
//预生产计划导出
export const preproductExport = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/preproductionplan/export",
        method: "get",
        params
    });
};
//预生产计划报表PDF导出
export const getPreProductionPlanReportPDF = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/preproductionplan/getPreProductionPlanReportPDF",
        method: "get",
        params
    });
};

//生产计划报表
export const getProductionPlanReport = (params) => {
    return request({
        url: "/api/blade-mes/productionplan/getProductionPlanReport",
        method: "get",
        params
    });
};
//生产计划导出
export const productExport = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/productionplan/export",
        method: "get",
        params
    });
};
//生产计划报表PDF导出
export const getProductionPlanReportPDF = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/productionplan/getProductionPlanReportPDF",
        method: "get",
        params
    });
};
//生产报工报表
export const getJobBookingReport = (params) => {
    return request({
        url: "/api/blade-mes/jobBooking/getJobBookingReport",
        method: "get",
        params
    });
};
//生产报工导出
export const jobBookingExport = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/jobBooking/export",
        method: "get",
        params
    });
};
//生产报工报表PDF导出
export const getJobBookingReportPDF = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/jobBooking/getJobBookingReportPDF",
        method: "get",
        params
    });
};
//车间生产异常报表
export const getAbnormalWorkshopProductionReport = (params) => {
    return request({
        url: "/api/blade-mes/inputLog/getAbnormalWorkshopProductionReport",
        method: "get",
        params
    });
};
//车间生产异常报表导出
export const inputLogExport = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/inputLog/export",
        method: "get",
        params
    });
};
//车间生产异常报表PDF导出
export const getAbnormalWorkshopProductionReportPDF = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/inputLog/getAbnormalWorkshopProductionReportPDF",
        method: "get",
        params
    });
};

//生产计划报表
export const getProductionPlan = params => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/getProductionPlan",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

// 生产计划报表导出
export const getProductionPlanExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/qualityWorkOrder/getProductionPlanExport",
        method: "get",
        params
    })
}


//生产记录报表
export const getProductionQuality = params => {
    return request({
        url: "/api/blade-mes/qualityWorkOrder/getProductionQuality",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

// 生产计划报表导出
export const getProductionQualityExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/qualityWorkOrder/getProductionQualityExport",
        method: "get",
        params
    })
}
