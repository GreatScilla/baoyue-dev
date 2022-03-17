import request from "@/router/axios";

//获取列表
export const getProductionPlanByPage = params => {
    return request({
        url: "/api/blade-mes/productionPlan/getProductionPlanByPage",
        method: "post",
        data: params,
        params: {
            pageNum: params.current,
            pageSize: params.size
        }
    })
}

//详情
export const getProductionPlanByPageDetail = data => {
    return request({
        url: '/api/blade-mes/productionPlan/getProductionPlanByPage',
        method: 'post',
        data
    })
}

// 同步
export const synchronous = () => {
    return request({
        url: "/api/blade-mes/productionPlan/synchronous",
        method: "post",

    });
};

//新增
export const addOrUpdateProductionPlan = data => {
    return request({
        url: "/api/blade-mes/productionPlan/addOrUpdateProductionPlan",
        method: "post",
        data
    })
}

// 审核
export const audit = params => {
    return request({
        url: "/api/blade-mes/productionPlan/updateStatus",
        method: "post",
        params
    });
};


// 工艺路线
export const getRouting = params => {
    return request({
        url: "/api/blade-mes/productionPlan/getRouting",
        method: "post",
        params
    });
};

// 批量设置权重等级
export const setWeight = params => {
    return request({
        url: "/api/blade-mes/productionPlan/setWeight",
        method: "post",
        params
    });
};

// 批量删除
export const deleteProductionPlan = params => {
    return request({
        url: "/api/blade-mes/productionPlan/deleteProductionPlan",
        method: "post",
        params
    });
};

// 拆分
export const splitProductionPlan = data => {
    return request({
        url: "/api/blade-mes/productionPlan/splitProductionPlan",
        method: "post",
        data
    });
};

// 排程
export const toSchedule = data => {
    return request({
        url: "/api/blade-mes/scheduleWorkOrder/toSchedule",
        method: "post",
        data
    });
};

// 排程
export const setProductFormula = (params) => {
    return request({
        url: "/api/blade-mes/productionPlan/setProductFormula",
        method: "post",
        params
    });
};

// 导出
export const getProductionPlanExport = params => {
    return request({
        responseType: "blob",
        url: "/api/blade-mes/productionPlan/getProductionPlanExport",
        method: "get",
        params
    })
}