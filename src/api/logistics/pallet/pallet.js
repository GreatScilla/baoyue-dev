import request from '@/router/axios';


// 分页查询托盘管理
export const queryPalletPage = params => {
  return request({
    url: '/api/blade-erp/logisticsTray/page',
    method: 'post',
    params
  })
}

// 删除
export const delPallet = params => {
  return request({
    url: '/api/blade-erp/logisticsTray/remove',
    method: 'post',
    params
  })
}
//托盘信息
export const getLogisticsTray = params => {
  return request({
    url: '/api/blade-erp/logisticsTrayRecovery/getLogisticsTray',
    method: 'post',
    params
  })
}






