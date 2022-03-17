import request from "@/router/axios";

// 项目明细报表
export const getProjectDetailsReport = params => {
    return request({
        url: "/api/blade-erp/projectManager/getProjectDetailsReport",
        method: "get",
        params
    })
}
// 项目明细报表导出
export const exportProjectDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/projectManager/exportProjectDetailsReport",
        method: "get",
        params
    })
}
//项目明细报表PDF导出
export const getProjectDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/projectManager/getProjectDetailsReportPDF",
        method: "get",
        params
    })
}
// 项目托盘出入库统计报表
export const getItemPalletReport = params => {
    return request({
        url: "/api/blade-erp/projectManager/getItemPalletReport",
        method: "get",
        params
    })
}
// 项目托盘出入库统计报表导出
export const exportItemPalletReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/projectManager/exportItemPalletReport",
        method: "get",
        params
    })
}
//项目托盘出入库统计报表PDF导出
export const getItemPalletReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/projectManager/getItemPalletReportPDF",
        method: "get",
        params
    })
}
