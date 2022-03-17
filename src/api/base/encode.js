import request from '@/router/axios';

// 查询接口
export const getList = (params) => {
  return request({
    url: '/api/blade-base/enCode/list',
    method: 'get',
    params: params
  })
}

// 新增接口
export const submit = (data) => {
  return request({
    url: '/api/blade-base/enCode/submit',
    method: 'post',
    data: data
  })
}

// 修改接口
export const update = (data) => {
  return request({
    url: `/api/blade-base/enCode/update?codeId=${data.codeId}`,
    method: 'put',
    data: data.enCode
  })
}

// 删除接口
export const remove = (codeId) => {
  return request({
    url: `/api/blade-base/enCode/remove`,
    method: 'put',
    params: {
      codeId
    }
  })
}

// 查询详情
export const getDetail = (codeId) => {
  return request({
    url: '/api/blade-base/enCode/getEncode',
    method: 'get',
    params: {
      codeId
    }
  })
}

// 新增接口
export const getEncodePreview = (data) => {
  return request({
    url: '/api/blade-base/enCode/getEncodePreview',
    method: 'post',
    data: data
  })
}

// 获取类型
export const getFormatList = () => {
  return request({
    url: '/api/blade-base/enCode/getFormatList',
    method: 'get',
  })
}