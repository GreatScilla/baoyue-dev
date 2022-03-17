import request from '@/router/axios';

// 设备init数据
export const sbpageList = params => {
  return request({
    url: '/api/blade-rcm/equipmentinventory/page',
    method: 'GET',
    params
  })
}

// 设备详情
export const getdetailinfo = params => {
  return request({
    url: '/api/blade-rcm/equipmentinventory/detail',
    method: 'GET',
    params
  })
}

// 设备导出
export const exportList = params => {
  return request({
    url: '/api/blade-rcm/equipmentinventory/export-inventory',
    method: 'GET',
    responseType: "blob",
    params
  })
}

// 备件

// 备件init数据
export const pageList = params => {
  return request({
    url: '/api/blade-rcm/equipmentpart/page',
    method: 'GET',
    params
  })
}

// 备件导出
export const bjexportList = params => {
  return request({
    url: '/api/blade-rcm/equipmentpart/export-inventory',
    method: 'GET',
    responseType: "blob",
    params
  })
}



export const getdetailPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentpart/page',
    method: 'GET',
    params
  })
}

// 备件详情
export const getdetails = params => {
  return request({
    url: '/api/blade-rcm/equipmentpart/detail',
    method: 'GET',
    params
  })
}


// 入库管理 新增
export const Gostorage = data => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/submitBean',
    method: 'POST',
    data: data
  })
}

// 入库管理 供应商
export const getContactUnitBase = (category) => {
  return request({
    url: `/api/blade-base/contactUnitBase/list?category=${category}`,
    method: 'post'
  })
}

// 入库管理 init 表格
export const pageTable = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/page',
    method: 'GET',
    params
  })
}

// 入库管理 扫码
export const getPurchaseOrderByNumber = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/getPurchaseOrderByNumber',
    method: 'GET',
    params
  })
}


// 入库管理 删除
export const delstorage = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/removeBean',
    method: 'POST',
    params
  })
}

// 入库管理 作废
export const InfoisVoid = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/isVoid',
    method: 'POST',
    params
  })
}

// 入库管理 转资产
export const InfoisAsset = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/isAsset',
    method: 'POST',
    params
  })
}


// 入库管理 审核
export const InfoAudit = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/updateSaleStatus',
    method: 'POST',
    params
  })
}


// 入库管理 详情
export const InfoDetailBean = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/detailBean',
    method: 'POST',
    params: params
  })
}

// 入库管理 导出
export const InfoExport = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/export',
    method: 'GET',
    responseType: "blob",
    params: params
  })
}


// 入库管理 导入
export const InfoImport = params => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/import',
    method: 'POST',
    params: params
  })
}


// 编辑（出入库，调拨）

export const InfoUpdate = data => {
  return request({
    url: '/api/blade-rcm/equipmentDepotHead/update',
    method: 'POST',
    data: data
  })
}

// 库存盘点 添加
export const addMakeStock = data => {
  return request({
    url: '/api/blade-rcm/stockHead/submitBean',
    method: 'POST',
    data: data
  })
}

// 库存盘点 编辑
export const stockHeadupdate = data => {
  return request({
    url: '/api/blade-rcm/stockHead/update',
    method: 'post',
    data: data
  })
}


// 库存盘点 分页
export const ininData = params => {
  return request({
    url: '/api/blade-rcm/stockHead/page',
    method: 'GET',
    params
  })
}

// 库存盘点 导出
export const outExport = params => {
  return request({
    url: '/api/blade-rcm/stockHead/export',
    method: 'GET',
    responseType:"blob",
    params
  })
}

// 库存盘点 作废
export const stockHeadIsVoid = params => {
  return request({
    url: '/api/blade-rcm/stockHead/isVoid',
    method: 'POST',
    params
  })
}

// 库存盘点 详情
export const stockHeadDetail = params => {
  return request({
    url: '/api/blade-rcm/stockHead/detailBean',
    method: 'post',
    params
  })
}

// 库存盘点 删除
export const stockHeadRemoveBean = params => {
  return request({
    url: '/api/blade-rcm/stockHead/removeBean',
    method: 'POST',
    params
  })
}

// 库存盘点 审核
export const updateSaleStatus = params => {
  return request({
    url: '/api/blade-rcm/stockHead/updateSaleStatus',
    method: 'POST',
    params
  })
}

// -------------
// 设备数据
export const deviceDatabase = params => {
  return request({
    url: '/api/blade-rcm/deviceDatabase/page',
    method: 'GET',
    params
  })
}

// 添加
export const addEviceDatabase = data => {
  return request({
    url: '/api/blade-rcm/deviceDatabase/save',
    method: 'POST',
    data: data
  })
}

//  详情
export const detailEviceDatabase = params => {
  return request({
    url: '/api/blade-rcm/deviceDatabase/detail',
    method: 'GET',
    params
  })
}

// 编辑
export const updateEviceDatabase = data => {
  return request({
    url: '/api/blade-rcm/deviceDatabase/update',
    method: 'POST',
    data: data
  })
}

// 删除
export const removeEviceDatabase = params => {
  return request({
    url: '/api/blade-rcm/deviceDatabase/removeBean',
    method: 'POST',
    params
  })
}


// -------------
// 备件数据

// init
export const initspareDatabase = params => {
  return request({
    url: '/api/blade-rcm/spareDatabase/page',
    method: 'GET',
    params
  })
}

// 添加
export const addSpareDatabase = data => {
  return request({
    url: '/api/blade-rcm/spareDatabase/save',
    method: 'POST',
    data: data
  })
}

// 详情
export const detailSpareDatabase = params => {
  return request({
    url: '/api/blade-rcm/spareDatabase/detail',
    method: 'GET',
    params
  })
}

// 编辑
export const updateSpareDatabase = data => {
  return request({
    url: '/api/blade-rcm/spareDatabase/update',
    method: 'POST',
    data: data
  })
}

// 删除
export const removeBeanSpareDatabase = params => {
  return request({
    url: '/api/blade-rcm/spareDatabase/removeBean',
    method: 'POST',
    params
  })
}
