import request from "@/router/axios";

// 销售订单明细报表
export const getPageShopOrderReport = params => {
    return request({
        url: "/api/blade-erp/shopOrder/getPageShopOrderReport",
        method: "get",
        params
    })
}
// 销售订单明细报表导出
export const getShopOrderExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/shopOrder/getShopOrderExport",
        method: "get",
        params
    })
}
//销售订单明细报表PDF导出
export const getShopOrderReportPDF = params => {
    return request({
        responseType: "arraybuffer",
        url: "/api/blade-erp/shopOrder/getShopOrderReportPDF",
        method: "get",
        params
    })
}
// 销售出库明细报表
export const getShopCome = params => {
    return request({
        url: "/api/blade-erp/shopOrder/getShopCome",
        method: "get",
        timeout: 60000,
        params
    })
}
// 销售出库明细报表导出
export const getShopComeExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/shopOrder/getShopComeExport",
        method: "get",
        params
    })
}
//销售出库明细报表PDF导出
export const getShopComeReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/shopOrder/getShopComeReportPDF",
        method: "get",
        params
    })
}
// 销售日报表
export const getShopDaily = params => {
    return request({
        url: "/api/blade-erp/shopOrder/getShopDaily",
        method: "get",
        params
    })
}
// 销售日报表导出
export const getShopDailyExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/shopOrder/getShopDailyExport",
        method: "get",
        params
    })
}
//销售日报表PDF导出
export const getShopDailyReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/shopOrder/getShopDailyReportPDF",
        method: "get",
        params
    })
}
// 销售退货明细报表
export const getShopReturnReport = params => {
    return request({
        url: "/api/blade-erp/orderReturn/getShopReturnReport",
        method: "get",
        params
    })
}
// 销售退货明细报表导出
export const getShopReturnExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/orderReturn/getShopReturnExport",
        method: "get",
        params
    })
}
//销售退货明细报表PDF导出
export const getShopReturnReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/orderReturn/getShopReturnReportPDF",
        method: "get",
        params
    })
}
// 对账单明细报表
export const getPageAccountStatementReport = params => {
    return request({
        url: "/api/blade-erp/accountStatement/getPageAccountStatementReport",
        method: "get",
        params
    })
}
// 对账单明细报表导出
export const getAccountStatementExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/accountStatement/getAccountStatementExport",
        method: "get",
        params
    })
}
//对账单明细报表PDF导出
export const getAccountStatementReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/accountStatement/getAccountStatementReportPDF",
        method: "get",
        params
    })
}
//客户明细报表
export const getContact = params => {
    return request({
        url: "/api/blade-base/contactUnitBase/getContact",
        method: "get",
        params
    })
}
// 客户明细报表导出
export const getContactExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-base/contactUnitBase/getContactExport",
        method: "get",
        params
    })
}
// 客户明细报表PDF导出
export const getContactReportPDF = params => {
    return request({
        responseType: "arraybuffer",
        url: "/api/blade-base/contactUnitBase/getContactReportPDF",
        method: "get",
        params
    })
}
//合同明细报表
export const getPageBpyContractReport = params => {
    return request({
        url: "/api/blade-erp/bpyContract/getPageBpyContractReport",
        method: "get",
        params
    })
}
// 合同明细报表导出
export const getBpyContractExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/bpyContract/getBpyContractExport",
        method: "get",
        params
    })
}
//合同明细报表PDF导出
export const getBpyContractReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/bpyContract/getBpyContractReportPDF",
        method: "get",
        params
    })
}

// 销售未对账明细表
export const getPageNotAccountStatementReport = params => {
    return request({
        url: "/api/blade-erp/accountStatement/getPageNotAccountStatementReport",
        method: "get",
        params
    })
}

// 销售未对账明细表导出
export const getNotAccountStatementExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/accountStatement/getNotAccountStatementExport",
        method: "get",
        params
    })
}
//销售未对账明细表PDF导出
export const getNotAccountStatementReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-erp/accountStatement/getNotAccountStatementReportPDF",
        method: "get",
        params
    })
}