import request from '@/router/axios';

// 设备init数据
export const getPurchase = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/getPurchaseStockByPage',
    method: 'GET',
    params
  })
}

// 请购添加
export const addOrPurchase = data => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/addOrUpdatePurchaseStockOrder',
    method: 'POST',
    data: data
  })
}

// 请购详情 编辑 
export const detailsOrPurchase = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/getPurchaseStockById',
    method: 'GET',
    params
  })
}

// 请购详情 删除 
export const deleteOrPurchase = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/deletePurchaseStockBatch',
    method: 'POST',
    params
  })
}

// 请购详情 审核 
export const updateStatus = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/updatePurchaseStockStatus',
    method: 'POST',
    params
  })
}
// 请购详情 反审核 
export const QGupdateOrderStatusUn = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/updateOrderStatusUn',
    method: 'POST',
    params
  })
}

// 请购详情 作废 
export const closePurchaseStock = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/closePurchaseStock',
    method: 'POST',
    params
  })
}

// 请购详情 导出 
export const PurchaseStockexport = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseStock/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}
// 核价单 导出 
export const PurchaseExport = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}

// 核价单 新增
export const addOrUpdatePriceList = data => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/addOrUpdatePriceList',
    method: 'POST',
    data: data
  })
}
// 核价单 init
export const getPriceListByPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/getPriceListByPage',
    method: 'GET',
    params
  })
}
// 核价单 删除
export const deletePriceListBatch = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/deletePriceListBatch',
    method: 'post',
    params
  })
}
// 核价单 审核
export const updatePriceListStatus = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/updatePriceListStatus',
    method: 'post',
    params
  })
}

// 核价单 审核
export const updateOrderStatusUn = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/updateOrderStatusUn',
    method: 'post',
    params
  })
}
// 核价单 详情
export const getPriceListById = params => {
  return request({
    url: '/api/blade-rcm/equipmentPriceList/getPriceListById',
    method: 'get',
    params
  })
}

// 采购 添加
export const addOrUpdatePurchaseOrder = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/addOrUpdatePurchaseOrder',
    method: 'POST',
    data: params
  })
}
// 采购 init
export const getPurchaseOrderByPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/getPurchaseOrderByPage',
    method: 'get',
    params
  })
}
// 采购 init
export const getPurchaseOrderById = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/getPurchaseOrderById',
    method: 'get',
    params
  })
}
// 采购 审核
export const OrderStatus = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/updateOrderStatus',
    method: 'post',
    params
  })
}
// 采购 反审核
export const OrderStatusUn = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/updateOrderStatusUn',
    method: 'post',
    params
  })
}
// 采购 作废
export const closeOrder = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/closeOrder',
    method: 'post',
    params
  })
}
// 采购 导出
export const closeOrderExport = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}
// 合同 导出
export const HTexport = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}
// 采购退货 导出
export const equipmentReturn = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/export',
    method: 'GET',
    responseType: "blob",
    params
  })
}
// 采购 删除
export const deleteOrderBatch = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/deleteOrderBatch',
    method: 'POST',
    params
  })
}

// 采购退货 init
export const getPurchaseReturnInfoByPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/getPurchaseReturnInfoByPage',
    method: 'get',
    params
  })
}
// 采购退货 新增
export const addOrUpdatePurchaseReturn = data => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/addOrUpdatePurchaseReturn',
    method: 'post',
    data: data
  })
}
// 采购退货 详情
export const ReturnOrderById = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/getPurchaseOrderById',
    method: 'get',
    params
  })
}
// 采购退货 审核
export const reviewPurchase = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/reviewPurchase',
    method: 'post',
    params
  })
}
// 采购退货 反审核
export const UnreviewPurchase = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/updateOrderStatusUn',
    method: 'post',
    params
  })
}
// 采购退货 作废
export const ReturncloseOrder = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/closeOrder',
    method: 'post',
    params
  })
}
// 采购退货 删除
export const deletePurchaseReturnById = params => {
  return request({
    url: '/api/blade-rcm/equipmentReturn/deletePurchaseReturnById',
    method: 'get',
    params
  })
}

// 合同 init
export const getContractOrderByPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/getContractOrderByPage',
    method: 'get',
    params
  })
}
// 合同 删除
export const HTdeleteOrderBatch = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/deleteOrderBatch',
    method: 'POST',
    params
  })
}
// 合同 审核
export const HTupdateOrderStatuspost = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/updateOrderStatuspost',
    method: 'POST',
    params
  })
}
// 合同 反审核
export const HTunupdateOrderStatuspost = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/updateOrderStatusUn',
    method: 'POST',
    params
  })
}
// 合同 作废
export const HTcloseOrder = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/closeOrder',
    method: 'POST',
    params
  })
}
// 合同 详情
export const HTgetContractOrderById = params => {
  return request({
    url: '/api/blade-rcm/equipmentContract/getContractOrderById',
    method: 'get',
    params
  })
}
// 合同 添加
export const addOrUpdateContractOrder = data => {
  return request({
    url: '/api/blade-rcm/equipmentContract/addOrUpdateContractOrder',
    method: 'POST',
    data: data
  })
}

// 发票-------------
// 发票  init
export const getInvoiceOrderByPage = params => {
  return request({
    url: '/api/blade-rcm/equipmentInvoice/getInvoiceOrderByPage',
    method: 'get',
    params
  })
}
// 发票  添加
export const FPaddOrUpdateInvoiceOrder = data => {
  return request({
    url: '/api/blade-rcm/equipmentInvoice/addOrUpdateInvoiceOrder',
    method: 'POST',
    data: data
  })
}
// 发票  详情
export const FPgetInvoiceOrderById = params => {
  return request({
    url: '/api/blade-rcm/equipmentInvoice/getInvoiceOrderById',
    method: 'get',
    params
  })
}
// 发票  删除
export const FPdeleteOrderBatch = params => {
  return request({
    url: '/api/blade-rcm/equipmentInvoice/deleteOrderBatch',
    method: 'post',
    params
  })
}

// 采购订单 设备
export const equipmentPurchaseOrderpage = params => {
  return request({
    url: '/api/blade-rcm/equipmentPurchaseOrder/page',
    method: 'get',
    params
  })
}

