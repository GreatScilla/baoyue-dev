import request from '@/router/axios';

//检验项目列表
export const selectInspectionItemPage = (params,data) => {
  return request({
    url: '/api/blade-quality/inspectionItem/selectInspectionItemPage',
    method: 'post',
    params,
    data
  })
}
//新增修改
export const saveInspectionItem = (tag, data) => {
  return request({
    url: '/api/blade-quality/inspectionItem/saveInspectionItem',
    method: 'post',
    params: { tag: tag },
    data
  })
}
//删除
export const removeInspectionItem = (data) => {
  return request({
    url: '/api/blade-quality/inspectionItem/removeInspectionItem',
    method: 'post',
    data
  })
}
//化验类别维护列表
export const assayCategoryPage = (params,data) => {
  return request({
    url: '/api/blade-quality/assayCategory/assayCategoryPage',
    method: 'post',
    params,
    data
  })
}
//增改化验类别维护
export const saveOrUpdateAssayCategory = (tag, data) => {
  return request({
    url: '/api/blade-quality/assayCategory/saveOrUpdateAssayCategory',
    method: 'post',
    params: { tag: tag },
    data
  })
}
//根据产品编号查询 检验项目
export const queryItemByCategoryId = params => {
  return request({
    url: '/api/blade-quality/inspectionItem/queryItemByCategoryId',
    method: 'get',
    params
  })
}
//删除化验类别维护
export const removeAssayCategory = (data) => {
  return request({
    url: '/api/blade-quality/assayCategory/removeAssayCategory',
    method: 'post',
    data
  })
}
//不合格特征维护列表
export const selectFailTraitPage = (params,data) => {
  return request({
    url: '/api/blade-quality/failTrait/selectFailTraitPage',
    method: 'post',
    params,
    data
  })
}
//增改不合格特征维护
export const saveOrUpdateFailTrait = (tag, data) => {
  return request({
    url: '/api/blade-quality/failTrait/saveOrUpdateFailTrait',
    method: 'post',
    params: { tag: tag },
    data
  })
}
//删除不合格特征维护
export const removeFailTrait = (data) => {
  return request({
    url: '/api/blade-quality/failTrait/removeFailTrait',
    method: 'post',
    data
  })
}
//化验室管理下拉列表
export const selectLabNameList = (data) => {
  return request({
    url: '/api/blade-quality/laboratoryManagement/selectLabNameList',
    method: 'post',
    data
  })
}
//化验室管理分页列表
export const selectLaboratoryManagementPage = params => {
  return request({
    url: '/api/blade-quality/laboratoryManagement/selectLaboratoryManagementPage',
    method: 'post',
    data: params.data,
    params: {
      current: params.current,
      size: params.size
    }
  })
}
//增改化验室管理
export const saveOrUpdateLab = (tag, data) => {
  return request({
    url: '/api/blade-quality/laboratoryManagement/saveOrUpdateLab',
    method: 'post',
    params: { tag: tag },
    data
  })
  }
  //删除化验室管理
export const removeLaboratoryManagement = (data) => {
  return request({
    url: '/api/blade-quality/laboratoryManagement/removeLaboratoryManagement',
    method: 'post',
    data
  })
}
