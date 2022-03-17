import request from '@/router/axios';

// init数据
export const getShebei = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/page',
    method: 'GET',
    params
  })
}

// 新增
export const addsave = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/save',
    method: 'POST',
    params
  })
}

// 修改
export const updateData = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/update',
    method: 'POST',
    params
  })
}

// 残值率
export const updateResidual = params => {
  return request({
    url: '/api/blade-rcm/equipmentdepreciation/getData',
    method: 'GET',
    params
  })
}

// 详情
export const getIDdata = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/detail',
    method: 'GET',
    params
  })
}

// 删除
export const delList = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/remove',
    method: 'POST',
    params
  })
}

// 设备类别 （树）
export const selecTtree = () => {
  return request({
    url: '/api/blade-rcm/equipmenttree/selecttree',
    method: 'GET'
  })
}
// 下载模板
export const dowtemplate = params => {
  return request({
    url: '/api/blade-rcm/equipmentinfo/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}


