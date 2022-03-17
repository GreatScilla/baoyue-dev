import request from '@/router/axios';

//分页查询角色列表
export const getRoles = params => {
  return request({
    url: '/api/blade-base/role/page',
    method: 'get',
    params
  })
}

//树状查询角色
export const getRolesTree = params => {
  return request({
    url: '/api/blade-base/role/tree',
    method: 'post',
    params
  })
}


// 多条角色列表
export const getMultipleRoles = params => {
  return request({
    url: '/api/blade-base/role/list',
    method: 'get',
    params
  })
}

// 查询角色树形结构
export const getSystemRoleTree = params => {
  return request({
    url: '/api/blade-base/role/treeInfo',
    method: 'get',
    params
  })
}

//新增角色
export const addRole = params => {
  return request({
    url: '/api/blade-base/role/save',
    method: 'post',
    data:params
  })
}

//角色详情
export const detailsRole = params => {
  return request({
    url: `/api/blade-base/role/detail/${params}`,
    method: 'get'
  })
}

//修改角色
export const editRole = params => {
  return request({
    url:  `/api/blade-base/role/update/${params.id}`,
    method: 'post',
    data:params
  })
}


// 删除角色
export const delRole = params => {
  return request({
    url: '/api/blade-base/role/remove',
    method: 'post',
    params
  })
}

// 资源类型
export const getResourceType = params => {
  return request({
    url: '/api/blade-base/role/getResourceDict',
    method: 'get',
    params
  })
}

// 角色类型
export const getRoleType = params => {
  return request({
    url: '/api/blade-base/role/getRoleTypeDict',
    method: 'get',
    params
  })
}

// 菜单权限
export const getMenuTree = params => {
  return request({
    url: '/api/blade-system/menu/tree',
    method: 'get',
    params
  })
}

// 角色拥有的菜单权限
export const getRoleMenuTree = params => {
  return request({
    url: '/api/blade-system/menu/role-tree-keys',
    method: 'get',
    params
  })
}







