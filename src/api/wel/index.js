import request from '@/router/axios';

// 获取首页生产模块数据
export const getHomePageSelectResp = params => {
    return request({
        url: "/api/blade-mes/productionplan/getHomePageSelectResp",
        method: "get",
        params
    });
};
//首页代办数据
export const indexList = params => {
    return request({
        url: "/api/blade-base/approvalList/indexList",
        method: "get",
        params
    });
};
//获取首页销售模块数据
export const getHomePageShopOrder = params => {
    return request({
        url: "/api/blade-erp/shopOrder/getHomePageShopOrder",
        method: "get",
        params
    });
};
//首页查询收付款数据统计
export const queryHomeBill = params => {
    return request({
        url: "/api/blade-finance/bill/queryHomeBill",
        method: "get",
        params
    });
};

//首页生产
export const getProductionPlanHomePage = params => {
    return request({
        url: "/api/blade-mes/productionPlan/getProductionPlanHomePage",
        method: "post",
        params
    });
};

