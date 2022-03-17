import request from '@/router/axios';

//获取用户列表
export const getUser = params => {
  return request({
    url: '/api/blade-mes/mesuser/page',
    method: 'get',
    params
  })
}


//新增/修改用户
export const addEditUser = params => {
  return request({
    url: '/api/blade-mes/mesuser/submit',
    method: 'post',
    data:params
  })
}

//用户详情
export const detailsUser = params => {
  return request({
    url: '/api/blade-mes/mesuser/detail',
    method: 'get',
    params
  })
}


// 删除用户
export const delUser = params => {
  return request({
    url: '/api/blade-mes/mesuser/remove',
    method: 'post',
    params
  })
}

// 重置密码
export const resetPassword = params => {
  return request({
    url: '/api/blade-user/resetPassword',
    method: 'post',
    params
  })
}
//修改密码
export const updatePassword = params => {
  return request({
    url: '/api/blade-user/update-password',
    method: 'post',
    params
  })
}


