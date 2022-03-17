import request from "@/router/axios";

//获取列表
export const getSteelWireByPage = params => {
    return request({
        url: "/api/blade-mes/steelWire/getSteelWireByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//详情
export const getSteelWireByPageDetail = params => {
    return request({
        url: "/api/blade-mes/steelWire/details",
        method: 'post',
        params
    })
}

// 审核
export const steelWireUpdateStatus = ids => {
    return request({
        url: "/api/blade-mes/steelWire/updateStatus",
        method: "post",
        params: {
            ids
        }
    });
};


// 删除
export const steelWireRemove = ids => {
    return request({
        url: "/api/blade-mes/steelWire/remove",
        method: "post",
        params: {
            ids
        }
    });
};

//修改
export const steelWireUpdate = data => {
    return request({
        url: "/api/blade-mes/steelWire/update",
        method: "post",
        data
    })
}
//add
export const steelWireSave = data => {
    return request({
        url: "/api/blade-mes/steelWire/save",
        method: "post",
        data
    })
}

// 导出
export const getSteelWireExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/steelWire/getSteelWireExport",
        method: "get",
        params
    })
}