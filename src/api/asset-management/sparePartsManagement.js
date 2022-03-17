import request from '@/router/axios';

//备件管理列表
export const getPartList = (data) => {
    return request({
        url: '/api/blade-erp/depotProductStock/pageAssetPrepare',
        method: 'post',
        data
    })
};
