import request from '@/router/axios';

// 查询往来单位1：供应商 2：客户
export const contactUnitBase = params => {
  return request({
    url: '/api/blade-base/contactUnitBase/page',
    method: 'post',
    data: params
  })
}

// 删除
export const deleteApi = ids => {
  return request({
    url: '/api/blade-base/contactUnitBase/remove',
    method: 'post',
    params: {
      ids
    }
  })
}