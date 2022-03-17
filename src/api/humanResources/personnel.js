import request from '@/router/axios';

//获取员工列表
export const getPersonnel = params => {
  return request({
    url: '/api/blade-base/page',
    method: 'get',
    params
  })
}


//新增员工
export const addPersonnel = params => {
  return request({
    url: '/api/blade-base/submit',
    method: 'post',
    data:params
  })
}

//员工详情
export const detailsPersonnel = params => {
  return request({
    url: '/api/blade-base/detail',
    method: 'get',
    params
  })
}

//修改员工
export const editPersonnel = params => {
  return request({
    url: '/api/blade-base/update',
    method: 'post',
    data:params
  })
}


// 删除员工
export const delPersonnel = params => {
  return request({
    url: '/api/blade-base/remove',
    method: 'post',
    params
  })
}

// 计划排程选择员工
export const schedulingStaff = params => {
  return request({
    url: '/api/blade-base/getList',
    method: 'get',
    params
  })
}





