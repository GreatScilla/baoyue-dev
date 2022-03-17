import request from '@/router/axios';


export const getProjectList = params => {
    return request({
        url: '/api/blade-erp/projectManager/getProjectList',
        method: 'post',
        data: params,
        params
    })
}

export const getProjectType = params => {
    return request({
        url: '/api/blade-erp/ProjectPersonnel/getProjectType',
        method: 'post',
        data: params,
        params
    })
}

export const addProjectType = params => {
    return request({
        url: '/api/blade-erp/ProjectPersonnel/addOrUpdateProjectType',
        method: 'post',
        data: params,
        params
    })
}

export const submit = params => {
    return request({
        url: '/api/blade-erp/ProjectPersonnel/submit',
        method: 'post',
        data: params,
        params
    })
}


export const del = params => {
    return request({
        url: '/api/blade-erp/ProjectPersonnel/delete',
        method: 'post',
        data: params,
        params
    })
}

export const getList = (pageNum, pageSize, params) => {
    return request({
        url: '/api/blade-erp/ProjectPersonnel/getPage',
        method: 'post',
        params: {
            pageNum,
            pageSize,
        },
        data:{
            ...params
        }
    })
}