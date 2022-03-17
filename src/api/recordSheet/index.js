import request from '@/router/axios';

//制浆岗位列表
export const pulpingPostPage = (params, data) => {
  return request({
    url: '/api/blade-mes/PulpingPositionRecord/getByPage',
    method: 'post',
    params,
    data
  })
}
//新增或修改制浆岗位操作记录
export const pulpingPostSubmit = (data) => {
  return request({
    url: '/api/blade-mes/PulpingPositionRecord/submit',
    method: 'post',
    data
  })
}

//批量删除制浆岗位操作记录
export const pulpingPostDel = (params) => {
  return request({
    url: '/api/blade-mes/PulpingPositionRecord/delete',
    method: 'post',
    params
  })
}
//制浆岗位操作记录PDF导出
export const getPulpingPositionRecordReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/PulpingPositionRecord/getPulpingPositionRecordReportPDF",
      method: "get",
      params
  })
}
//根据条件查询浇注岗位操作记录(分页)
export const pouringPostPage = (params, data) => {
  return request({
    url: '/api/blade-mes/PourPositionRecord/getByPage',
    method: 'post',
    params,
    data
  })
}
//新增或修改浇注岗位操作记录
export const pouringPostSubmit = (data) => {
  return request({
    url: '/api/blade-mes/PourPositionRecord/submit',
    method: 'post',
    data
  })
}
//批量删除浇注岗位操作记录
export const pouringPostDel = (params) => {
  return request({
    url: '/api/blade-mes/PourPositionRecord/delete',
    method: 'post',
    params
  })
}
//浇注岗位操作记录PDF导出
export const getPourPositionRecordReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/PourPositionRecord/getPourPositionRecordReportPDF",
      method: "get",
      params
  })
}
//根据条件查询静停摆渡车岗位操作记录(分页)
export const shuttleBusPositionPage = (params, data) => {
  return request({
    url: '/api/blade-mes/ShuttleBusPositionRecord/getByPage',
    method: 'post',
    params,
    data
  })
}
//新增或修改静停摆渡车岗位操作记录
export const shuttleBusPositionSubmit = (data) => {
  return request({
    url: '/api/blade-mes/ShuttleBusPositionRecord/submit',
    method: 'post',
    data
  })
}
//批量删除静停摆渡车岗位操作记录
export const shuttleBusPositionDel = (params) => {
  return request({
    url: '/api/blade-mes/ShuttleBusPositionRecord/delete',
    method: 'post',
    params
  })
}
//静停摆渡车岗位操作记录PDF导出
export const getShuttleBusPositionRecordReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/ShuttleBusPositionRecord/getShuttleBusPositionRecordReportPDF",
      method: "get",
      params
  })
}
//根据条件查询切割岗位记录表(分页)
export const cuttingPostPage = (params, data) => {
  return request({
    url: '/api/blade-mes/CuttingPositionRecord/getByPage',
    method: 'post',
    params,
    data
  })
}
//新增或修改切割岗位记录表
export const cuttingPostSubmit = (data) => {
  return request({
    url: '/api/blade-mes/CuttingPositionRecord/submit',
    method: 'post',
    data
  })
}
//批量删除切割岗位记录表
export const cuttingPostDel = (params) => {
  return request({
    url: '/api/blade-mes/CuttingPositionRecord/delete',
    method: 'post',
    params
  })
}
//切割岗位记录PDF导出
export const getCuttingPositionRecordReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/CuttingPositionRecord/getCuttingPositionRecordReportPDF",
      method: "get",
      params
  })
}
//根据条件查询蒸养配气岗位操作记录(分页)
export const pipePositionPage = (params, data) => {
  return request({
    url: '/api/blade-mes/PipePositionRecord/getByPage',
    method: 'post',
    params,
    data
  })
}
//新增或修改蒸养配气岗位操作记录
export const pipePositionSubmit = (data) => {
  return request({
    url: '/api/blade-mes/PipePositionRecord/submit',
    method: 'post',
    data
  })
}
//批量删除蒸养配气岗位操作记录
export const pipePositionDel = (params) => {
  return request({
    url: '/api/blade-mes/PipePositionRecord/delete',
    method: 'post',
    params
  })
}
//蒸养配气岗位操作记录PDF导出
export const getPipePositionRecordReportPDF = params => {
  return request({
      responseType: "blob",
      url: "/api/blade-mes/PipePositionRecord/getPipePositionRecordReportPDF",
      method: "get",
      params
  })
}