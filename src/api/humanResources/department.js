import request from '@/router/axios';

//获取部门列表树状
export const getDepartmentTree = params => {
  return request({
    url: '/api/blade-base/dept/tree',
    method: 'get',
    params
  })
}

//获取部门列表
export const getDepartmentList = params => {
  return request({
    url: '/api/blade-base/dept/lists',
    method: 'post',
    params
  })
}

//新增/修改部门
export const addEditDepartment = params => {
  return request({
    url: '/api/blade-base/dept/submit',
    method: 'post',
    data:params
  })
}

//部门详情
export const detailsDepartment = params => {
  return request({
    url: '/api/blade-base/dept/detail',
    method: 'get',
    params
  })
}


// 删除
export const delDepartMent = params => {
  return request({
    url: '/api/blade-base/dept/remove',
    method: 'post',
    params
  })
}


