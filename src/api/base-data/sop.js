import request from '@/router/axios';

// SOP分页
export const getListPage = params => {
  return request({
    url: '/api/blade-mes/sopFile/getListPage',
    method: 'get',
    params
  })
}
