import request from "@/router/axios";

// 产品明细报表
export const getProductReport = (params) => {
    return request({
        url: "/api/blade-base/product/getProductReport",
        method: "get",
        params
    });
};
//产品明细报表导出
export const productExport = (params) => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/product/export",
        method: "get",
        params
    });
};
//产品明细报表PDF打印
export const getProductReportPDF = (params) => {
    return request({
        responseType: "arraybuffer",
        url: "/api/blade-base/product/getProductReportPDF",
        method: "get",
        params
    });
};
