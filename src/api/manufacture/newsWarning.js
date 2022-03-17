import request from "@/router/axios";

//获取列表
export const getInfoWarnByPage = params => {
    return request({
        url: "/api/blade-erp/infoWarn/getInfoWarnByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//详情
export const infoWarnDetails = params => {
    return request({
        url: "/api/blade-erp/infoWarn/details",
        method: 'post',
        params
    })
}


// 删除
export const infoWarnRemove = ids => {
    return request({
        url: "/api/blade-erp/infoWarn/remove",
        method: "post",
        params: {
            ids
        }
    });
};

//修改
export const infoWarnUpdate = data => {
    return request({
        url: "/api/blade-erp/infoWarn/update",
        method: "post",
        data
    })
}
//add
export const infoWarnSave = data => {
    return request({
        url: "/api/blade-erp/infoWarn/save",
        method: "post",
        data
    })
}