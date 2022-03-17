import request from '@/router/axios';

//获取科目列表
export const getAccountList = params => {
  return request({
    url: '/api/blade-base/subjects/list',
    method: 'get',
    params
  })
}

// 新增科目
export const addAccount = params => {
  return request({
    url: '/api/blade-base/subjects/submit',
    method: 'post',
    data:params
  })
}

//修改科目
export const editAccount = (params,subjectsId) => {
  return request({
    url: `/api/blade-base/subjects/update?subjectsId=${subjectsId}`,
    method: 'put',
    data:params
  })
}

// 删除科目
export const delAccount = params => {
  return request({
    url: '/api/blade-base/subjects/remove',
    method: 'put',
    params
  })
}






