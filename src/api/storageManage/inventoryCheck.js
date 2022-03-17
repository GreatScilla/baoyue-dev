import request from "@/router/axios";

// 根据仓库查询对应的商品
export const findProductByDepot = params => {
  return request({
    url: "/api/blade-erp/depotProductStock/findProductByDepot",
    method: "post",
    params
  })
}

// 盘点单审核
export const audits = params => {
  return request({
    url: "/api/blade-erp/stockTaking/audits",
    method: "post",
    params
  })
}

// 查看盘点单详情 传单据主表id
export const detailBean = params => {
  return request({
    url: "/api/blade-erp/stockTaking/detailBean",
    method: "post",
    params
  })
}

// 分页查询
export const page = data => {
  return request({
    url: "/api/blade-erp/stockTaking/page",
    method: "post",
    data
  })
}

// 删除库存盘点接口，根据主键ID删除，多个ID使用英文逗号分割
export const remove = params => {
  return request({
    url: "/api/blade-erp/stockTaking/remove",
    method: "post",
    params
  })
}

// 新增或修改库存盘点
export const submit = data => {
  return request({
    url: "/api/blade-erp/stockTaking/submit",
    method: "post",
    data
  })
}
