import request from '@/router/axios';

//资产管理
export const getList = (params) => {
    return request({
        url: '/api/blade-rcm/assetBook/getAssetBookByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
        data:
            params.data,
    })
}

//资产管理
export const getEquipmentRecordByPage = (params) => {
    return request({
        url: '/api/blade-rcm/equipmentRecord/getEquipmentRecordByPage',
        method: 'post',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
            bookType: params.type,
            bookSn: params.bookSn
        },

    })
}
//新增资产管理
export const addOrUpdateAssetBook = (data) => {
    return request({
        url: '/api/blade-rcm/assetBook/addOrUpdateAssetBook',
        method: 'post',
        data
    })
}

//删除资产管理
export const deleteAssetBookBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/assetBook/deleteAssetBookBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}
//资产卡
export const getAssetBookReportPDF = (id) => {
    return request({
        url: '/api/blade-rcm/assetBook/getAssetBookReportPDF',
        method: 'get',
        responseType: 'blob',
        params: {
            id: id
        }
    })
}