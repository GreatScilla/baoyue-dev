import request from "@/router/axios";

// 人员明细报表
export const getPersonnelDetailsReport = params => {
    return request({
        url: "/api/blade-hr/personnelFileBase/getPersonnelDetailsReport",
        method: "get",
        params
    })
}
// 人员明细报表导出
export const exportPersonnelDetailsReport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-hr/personnelFileBase/exportPersonnelDetailsReport",
        method: "get",
        params
    })
}
//人员明细报表PDF导出
export const getPersonnelDetailsReportPDF = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-hr/personnelFileBase/getPersonnelDetailsReportPDF",
        method: "get",
        params
    })
}