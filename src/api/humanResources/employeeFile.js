import request from '@/router/axios';

//分页查询员工档案
export const getEmployeeFileList = params => {
  return request({
    url: '/api/blade-hr/personnelFileBase/page',
    method: 'post',
    data:params
  })
}

// 获取全部员工列表
export const getEmployeeList = params => {
  return request({
    url: "/api/blade-hr/personnelFileBase/list",
    method: "post",
    params:params
  });
};


//新增员工档案
export const addEmployeeFile = params => {
  return request({
    url: '/api/blade-hr/personnelFileBase/add',
    method: 'post',
    data:params
  })
}

// 详情
export const detailsEmployeeFile = params => {
  return request({
    url: '/api/blade-hr/personnelFileBase/details',
    method: 'post',
    params
  })
}

// 获取职位列表
export const getDutiesList = params => {
  return request({
    url: '/api/blade-system/post/list',
    method: 'get',
    params
  })
}

// 获取上级员工
export const getSuperior = params => {
  return request({
    url: '/api/blade-user/page',
    method: 'get',
    params
  })
}

//修改员工档案
export const editEmployeeFile = params => {
  return request({
    url: '/api/blade-hr/personnelFileBase/submit',
    method: 'post',
    data:params
  })
}

// 删除员工档案
export const delEmployeeFile = params => {
  return request({
    url: '/api/blade-hr/personnelFileBase/remove',
    method: 'post',
    params
  })
}







