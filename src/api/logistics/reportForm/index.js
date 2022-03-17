import request from '@/router/axios';

// 分页查询报表托盘库存数据
export const getPageTrayInventoryReport = (params) => {
  return request({
    url: '/api/blade-erp/depotHead/getPageTrayInventoryReport',
    method: 'get',
    params
  })
}
//托盘库存明细报表导出
export const getTrayInventoryExport = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/depotHead/getTrayInventoryExport",
      method: "get",
      params
  });
};
//托盘库存PDF数据
export const getTrayInventoryPDF = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/depotHead/getTrayInventoryPDF",
      method: "get",
      params
  });
};
//分页查询报表派车管理数据
export const getPageSendCarReport = (params) => {
  return request({
    url: '/api/blade-erp/sendCar/getPageSendCarReport',
    method: 'get',
    params
  })
}
//派车管理报表导出
export const getSendCarExport = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/sendCar/getSendCarExport",
      method: "get",
      params
  });
};
//派车管理PDF数据
export const getSendCarPDF = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/sendCar/getSendCarPDF",
      method: "get",
      params
  });
};
//分页查询报表车辆管理数据
export const getPageCarManagerReport = (params) => {
  return request({
    url: '/api/blade-erp/carManager/getPageCarManagerReport',
    method: 'get',
    params
  })
}
//车辆管理明细报表导出
export const getCarManagerExport = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/carManager/getCarManagerExport",
      method: "get",
      params
  });
};
//车辆管理PDF数据
export const getCarManagerReportPDF = (params) => {
  return request({
      responseType: "blob",
      url: "/api/blade-erp/carManager/getCarManagerReportPDF",
      method: "get",
      params
  });
};


