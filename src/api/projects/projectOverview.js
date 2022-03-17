import request from '@/router/axios';


// 分页查询项目管理
export const queryProjectOverviewPage = params => {
  return request({
    url: '/api/blade-erp/projectManager/getProjectByPage',
    method: 'post',
    data: params.data,
    params: {
        pageNum: params.current,
        pageSize: params.size
    }
  })
}

// 新增编辑项目管理
export const addEditProjectOverview = params => {
  return request({
    url: '/api/blade-erp/projectManager/addOrUpdateProject',
    method: 'post',
    data: params
  })
}

// 详情
export const detailProjectOverview = params => {
  return request({
    url: '/api/blade-erp/projectManager/getProjectById',
    method: 'get',
    params
  })
}


// 删除
export const delProjectOverview = params => {
  return request({
    url: '/api/blade-erp/projectManager/deleteProjectBatch',
    method: 'post',
    params
  })
}


export const getProductData = params => {
  return request({
    url: '/api/blade-erp/shopOrder/getOrder',
    method: 'get',
    params
  })
}
export const getProjectStatus = params => {
  return request({
    url: '/api/blade-erp/projectManager/getProjectStatus',
    method: 'get',
    params
  })
}






