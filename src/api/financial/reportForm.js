import request from "@/router/axios";

// 财务收入明细报表
export const getFinancialIncomeDetailsReport = params => {
    return request({
        url: "/api/blade-finance/bill/getFinancialIncomeDetailsReport",
        method: "get",
        params
    })
}
// 财务收入明细报表导出
export const exportFinancialIncomeDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-finance/bill/exportFinancialIncomeDetailsReport",
        method: "get",
        params
    })
}
//财务收入明细报表PDF导出
export const getFinancialIncomeDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-finance/bill/getFinancialIncomeDetailsReportPDF",
        method: "get",
        params
    })
}
// 财务支出明细报表
export const getFinancialExpenditureDetailsReport = params => {
    return request({
        url: "/api/blade-finance/bill/getFinancialExpenditureDetailsReport",
        method: "get",
        params
    })
}
// 财务支出明细报表导出
export const exportFinancialExpenditureDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-finance/bill/exportFinancialExpenditureDetailsReport",
        method: "get",
        params
    })
}
//财务支出明细报表PDF导出
export const getFinancialExpenditureDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-finance/bill/getFinancialExpenditureDetailsReportPDF",
        method: "get",
        params
    })
}
