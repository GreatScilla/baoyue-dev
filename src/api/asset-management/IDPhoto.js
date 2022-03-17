import request from '@/router/axios';
//证照库
// 列表   
export const getList = (data) => {
    return request({
        url: '/api/blade-rcm/licenseBank/getLicenseBankByPage',
        method: 'post',
        data
    })
}

export const addOrUpdateLicenseBank = (data) => {
    return request({
        url: '/api/blade-rcm/licenseBank/addOrUpdateLicenseBank',
        method: 'post',
        data
    })
}
export const deleteLicenseBankBatch = (ids) => {
    return request({
        url: '/api/blade-rcm/licenseBank/deleteLicenseBankBatch',
        method: 'post',
        params: {
            ids,
        }
    })
}