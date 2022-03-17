import request from '@/router/axios';

//系统初始化
export const initStock = params => {
  return request({
    url: '/api/blade-base/systemInit/initStock',
    method: 'post',
    params
  })
}






