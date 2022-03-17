import request from "@/router/axios";

// 供应商明细报表
export const getSupplier = params => {
    return request({
        url: "/api/blade-base/contactUnitBase/getSupplier",
        method: "get",
        params
    })
}
// 供应商明细报表导出
export const getSupplierExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/contactUnitBase/getSupplierExport",
        method: "get",
        params
    })
}
// 供应商明细报表PDF导出
export const getSupplierReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/contactUnitBase/getSupplierReportPDF",
        method: "get",
        params
    })
}
// 采购订单明细报表
export const getPagePurchaseOrderReport = params => {
    return request({
        url: "/api/blade-erp/purchaseOrder/getPagePurchaseOrderReport",
        method: "get",
        params
    })
}
// 采购订单明细报表导出
export const getPurchaseOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseOrder/getPurchaseOrderExport",
        method: "get",
        params
    })
}
// 采购订单明细报表PDF导出
export const getPurchaseOrderReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseOrder/getPurchaseOrderReportPDF",
        method: "get",
        params
    })
}
// 采购进货明细报表
export const getPagePurchaseStockReport = params => {
    return request({
        url: "/api/blade-erp/purchaseStock/getPagePurchaseStockReport",
        method: "get",
        params
    })
}
// 采购进货明细报表导出
export const getPurchaseStockExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseStock/getPurchaseStockExport",
        method: "get",
        params
    })
}
//采购进货明细报表PDF导出
export const getPurchaseStockReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseStock/getPurchaseStockReportPDF",
        method: "get",
        params
    })
}
// 进料检验明细报表
export const getPagePurchaseCheckReport = params => {
    return request({
        url: "/api/blade-erp/purchaseCheck/getPagePurchaseCheckReport",
        method: "get",
        params
    })
}
// 进料检验明细报表导出
export const getPurchaseCheckExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseCheck/getPurchaseCheckExport",
        method: "get",
        params
    })
}
//进料检验明细报表PDF导出
export const getPurchaseCheckReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseCheck/getPurchaseCheckReportPDF",
        method: "get",
        params
    })
}
//采购退货明细报表
export const getPagePurchaseReturnReport = params => {
    return request({
        url: "/api/blade-erp/purchaseReturn/getPagePurchaseReturnReport",
        method: "get",
        params
    })
}
// 采购退货明细报表导出
export const getPurchaseReturnExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseReturn/getPurchaseReturnExport",
        method: "get",
        params
    })
}
//采购退货明细报表PDF导出
export const getPurchaseReturnReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/purchaseReturn/getPurchaseReturnReportPDF",
        method: "get",
        params
    })
}
//核价管理明细报表
export const getPagePricingReport = params => {
    return request({
        url: "/api/blade-erp/pricing/getPagePricingReport",
        method: "get",
        params
    })
}

//核价管理明细报表导出
export const getPricingExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/pricing/getPricingExport",
        method: "get",
        params
    })
}
// 核价管理明细报表PDF导出 
export const getPricingReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/pricing/getPricingReportPDF",
        method: "get",
        params
    })
}