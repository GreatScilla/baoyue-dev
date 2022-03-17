import request from '@/router/axios';

//列表查询
export const getList = data => {
  return request({
    url: '/api/blade-erp/FolderManager/getPage',
    method: 'post',
    data: data.data,
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}
//新增,修改
export const submit = data => {
  return request({
    url: '/api/blade-erp/FolderManager/submit',
    method: 'post',
    data: data
  })
}
//加入回收站
export const recycle = ids => {
  return request({
    url: '/api/blade-erp/FolderManager/recycle',
    method: 'post',
    params: ids
  })
}
//删除
export const remove = ids => {
  return request({
    url: '/api/blade-erp/FolderManager/remove',
    method: 'post',
    params: ids
  })
}
//下载
export const getInternetRes = url => {
  return request({
    url: '/api/blade-base/file/getInternetRes',
    method: 'post',
    params: { filePath: url }
  })
}
//回收站列表
export const getRecycleList = data => {
  return request({
    url: '/api/blade-erp/FolderManager/getRecyclePage',
    method: 'post',
    data: data.data,
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}
//还原
export const restore = data => {
  return request({
    url: '/api/blade-erp/FolderManager/restore',
    method: 'post',
    data
  })
}
