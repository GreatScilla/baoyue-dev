import request from '@/router/axios';
//新增维修单
export const newly = params => {
  return request({
    url: '/api/blade-rcm/repairinfo/save',
    method: 'POST',
    params
  })
};
//删除维修单
export const delfix = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/remove",
    method:"POST",
    params
  })
};
//维修单详情
export const fixdetail = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/detail",
    method:"GET",
    params
  })
};
//工单指派
export const appoint = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/assign",
    method:"POST",
    params
  })
};
//条件分页
export const fixPage = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/page",
    method:"GET",
    params
  })
};
//获取部门人员接口
export const getDept = params=>{
  return request ({
    url:"/api/blade-user/page?current=1&size=10&deptId=1321324736503922690",
    method:"GET",
    params
  })
};
//设备维修工单条件分页
export const woPage = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/page",
    method:"GET",
    params
  })
};
//设备维修工单作废街接口
export const voidPage = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/toVoid",
    method:"POST",
    params
  })
};
//创建维修工单
export const creatFix = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/save",
    method:"POST",
    params
  })
};
//创建维修工单
export const outsourcing = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/save",
    method:"POST",
    params
  })
};
//创建维修工单
export const resultFeedback = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/resultFeedback",
    method:"POST",
    params
  })
};
//ceshi
export const testss = params=>{
  return request ({
    url:"/api/blade-rcm/equipmentcheckingplan/getFeedback",
    method:"GET",
    params
  })
};
//结果验收
export const acceptance = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/checkBeforeAcceptance",
    method:"POST",
    params
  })
};
//结果验收
export const uploadFix = params=>{
  return request ({
    url:"/api/blade-rcm/repairinfo/update",
    method:"POST",
    params
  })
};
//结果验收
export const fixFeedback = params=>{
  return request ({
    url:"/api/blade-rcm/maintenanceplan/getFeedback",
    method:"POST",
    params
  })
};
