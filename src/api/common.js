import request from '@/router/axios';

// 获取编码
export const getCode = params => {
  return request({
    url: "/api/blade-base/enCode/getId",
    method: "post",
    params
  });
};

// 查询商品分类
export const getProductByCate = (keywords) => {
  return request({
    url: '/api/blade-base/product/listProductByCate',
    method: 'get',
    params: {
      keywords
    }
  })
}

// 查询商品分类分页
export const getProductByCateIds = (params) => {
  return request({
    url: '/api/blade-base/product/getProductByCateIds',
    method: 'get',
    params: params
  })
}

// 获取字典
export const getDictionary = (code) => {
  return request({
    url: '/api/blade-system/dict-biz/dictionary',
    method: 'get',
    params: code
  })
}

// 获取往来单位
export const getContactUnitBase = (params) => {
  return request({
    url: `/api/blade-base/contactUnitBase/list`,
    method: 'post',
    params: params
  })
}

// 获取部门
export const getDept = (params) => {
  return request({
    url: `/api/blade-base/dept/lists`,
    method: 'post',
    params: params
  })
}

// 获取用户
export const getUserList = () => {
  return request({
    url: `/api/blade-base/getUserList`,
    method: 'post'
  })
}

// 根据部门查询用户：采购员销售员
export const getByDept = (params) => {
  return request({
    url: `/api/blade-hr/personnelFileBase/getByDept`,
    method: 'post',
    params: params
  })
}

// 获取仓库
export const getDepot = () => {
  return request({
    url: `/api/blade-base/depot/list`,
    method: 'post'
  })
}

// 根据产品id获取仓库(销售出库采购退货使用)
export const findDepotByProductId = (productId) => {
  return request({
    url: `/api/blade-erp/depotProductStock/findDepotByProductId`,
    method: 'post',
    params: {
      productId
    }
  })
}

// 获取支付方式列表
export const getPaymentTypeList = () => {
  return request({
    url: `/api/blade-base/paymentType/getPaymentTypeList`,
    method: 'get'
  })
}

// 根据仓库和产品获取库存
export const findStockByDepotIdAndProductId = (data) => {
  return request({
    url: `/api/blade-erp/depotProductStock/findStockByDepotIdAndProductId`,
    method: 'post',
    data: data
  })
}

// 获取订单编码
export const getId = (codeName) => {
  return request({
    url: `/api/blade-base/enCode/getId`,
    method: 'post',
    params: codeName
  })
}
// 业务字典-下拉框新增单个类型
export const selectAddType = params => {
  return request({
    url: '/api/blade-system/dict-biz/insertProperties',
    method: 'post',
    params
  })
}

// 上传接口
export const upload = (fd) => {
  return request({
    url: '/api/blade-base/file/upload',
    method: 'post',
    data: fd
  })
}
//删除上传接口
export const deleteFile = (params) => {
  return request({
    url: '/api/blade-base/file/deleteFile',
    method: 'post',
    params
  })
}


// 
export const getXml = (url) => {
  return request({
    url,
    method: 'get'
  })
}


//结算账号列表
export const getPaymentAccountList = params => {
  return request({
    url: '/api/blade-base/paymentAccount/getPaymentAccountList',
    method: 'get',
    params
  })
}
//查询仓库及对应的库位编码
export const findDepotAndStorageById = id => {
  return request({
    url: '/api/blade-base/depot/findDepotAndStorageById',
    method: 'post',
    params: id
  })
}
//根据供应商产品查询价格
export const getPriceByProductId = data => {
  return request({
    url: '/api/blade-erp/pricing/getPriceByProductId',
    method: 'post',
    data
  })
}


//获取库存
export const getStock = data => {
  return request({
    url: '/api/blade-erp/depotProductStock/page',
    method: 'post',
    data: {
      ...data,
      current: 1,
      size: 10,
    },
    params: {
      current: 1,
      size: 10,
    }
  })
}

//访问记录
export const getAccessRecords = params => {
  return request({
    url: '/api/blade-base/accessRecord/addOrUpdateAccessRecord',
    method: 'get',
    params: params
  })
}
//常用功能
export const getCommonlyUsedFunctions = () => {
  return request({
    url: '/api/blade-base/accessRecord/select',
    method: 'get',
  })
}

