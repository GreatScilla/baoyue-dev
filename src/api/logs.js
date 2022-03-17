import request from '@/router/axios';

export const getUsualList = (current, size) => {
  return request({
    url: '/api/blade-log/usual/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

export const getApiList = (current, size) => {
  return request({
    url: '/api/blade-log/logApi/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

export const getErrorList = (params) => {
  return request({
    url: '/api/blade-log/error/list',
    method: 'get',
    params
  })
}


export const getUsualLogs = (id) => {
  return request({
    url: '/api/blade-log/usual/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getApiLogs = (id) => {
  return request({
    url: '/api/blade-log/logApi/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getErrorLogs = (id) => {
  return request({
    url: '/api/blade-log/error/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
//操作日志分页条件查询
export const getOperationList = (params) => {
  return request({
    url: '/api/blade-log/logApi/page',
    method: 'get',
    params
  })
}
//获取清除日志下拉框接口
export const getTimeList = (params) => {
  return request({
    url: '/api/blade-log/logApi/getTimeList',
    method: 'get',
    params
  })
}
//操作日志删除
export const deleteOperationLogs = (params) => {
  return request({
    url: '/api/blade-log/logApi/delete',
    method: 'delete',
    params
  })
}
//操作日志查询详细
export const getOperationDetail = (params) => {
  return request({
    url: '/api/blade-log/logApi/getDetail',
    method: 'get',
    params
  })
}
//日志导出
export const getLogExport = (params) => {
  return request({
    responseType: "blob",
    url: '/api/blade-log/logApi/getLogExport',
    method: 'get',
    params
  })
}