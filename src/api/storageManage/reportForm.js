import request from "@/router/axios";

// 库存盘点明细报表
export const getInventoryCountReport = params => {
    return request({
        url: "/api/blade-base/depot/getInventoryCountReport",
        method: "get",
        params
    })
}
// 库存盘点明细报表导出
export const depotExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/depot/export",
        method: "get",
        params
    })
}
//库存盘点明细报表PDF导出
export const getInventoryCountReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/depot/getInventoryCountReportPDF",
        method: "get",
        params
    })
}

// 出入库明细报表
export const getReceiptIssueDetailsReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getReceiptIssueDetailsReport",
        method: "get",
        params
    })
}
// 出入库明细报表导出
export const stockTakingExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/export",
        method: "get",
        params
    })
}
//出入库明细报表PDF导出
export const getReceiptIssueDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getReceiptIssueDetailsReportPDF",
        method: "get",
        params
    })
}

// 库存汇总明细报表
export const getInventorySummaryReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getInventorySummaryReport",
        method: "get",
        params
    })
}
//库存汇总明细报表导出
export const exportInventorySummaryReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/exportInventorySummaryReport",
        method: "get",
        params
    })
}
//库存汇总报表PDF导出
export const getInventorySummaryReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getInventorySummaryReportPDF",
        method: "get",
        params
    })
}
// 入库明细报表
export const getWarehousingDetailsReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getWarehousingDetailsReport",
        method: "get",
        params
    })
}
//入库明细报表导出
export const exportWarehousingDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/exportWarehousingDetailsReport",
        method: "get",
        params
    })
}
//入库明细报表PDF导出
export const getWarehousingDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getWarehousingDetailsReportPDF",
        method: "get",
        params
    })
}
// 出库明细报表
export const getDeliveryDetailsReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getDeliveryDetailsReport",
        method: "get",
        params
    })
}
//出库明细报表导出
export const exportDeliveryDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/exportDeliveryDetailsReport",
        method: "get",
        params
    })
}
//出库明细报表PDF导出
export const getDeliveryDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getDeliveryDetailsReportPDF",
        method: "get",
        params
    })
}
// 库存调拨明细报表
export const getInventoryTransferDetailsReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getInventoryTransferDetailsReport",
        method: "get",
        params
    })
}
//库存调拨报表导出
export const exportInventoryTransferDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/exportInventoryTransferDetailsReport",
        method: "get",
        params
    })
}
//库存调拨明细报表表PDF导出
export const getInventoryTransferDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getInventoryTransferDetailsReportPDF",
        method: "get",
        params
    })
}

// 库存调整明细报表
export const getInventoryAdjustmentDetailsReport = params => {
    return request({
        url: "/api/blade-erp/stockTaking/getInventoryAdjustmentDetailsReport",
        method: "get",
        params
    })
}
//库存调整明细报表导出
export const exportInventoryAdjustmentDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/exportInventoryAdjustmentDetailsReport",
        method: "get",
        params
    })
}
//库存调整明细报表PDF导出
export const getInventoryAdjustmentDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/stockTaking/getInventoryAdjustmentDetailsReportPDF",
        method: "get",
        params
    })
}