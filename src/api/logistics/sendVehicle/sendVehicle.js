import request from '@/router/axios';

// 分页查询派车管理
export const getCarByPage = (params,data) => {
        return request({
            url: '/api/blade-erp/sendCar/getSendCarByPage',
            method: 'post',
            params,
            data
        })
    }
    
// 批量删除派车管理
export const deleteSendCarBatch = data => {
    return request({
        url: '/api/blade-erp/sendCar/deleteSendCarBatch',
        method: 'post',
        params:data,
    })
}


// 新增、修改派车管理
export const addOrUpdateSendCar = data => {
    return request({
        url: '/api/blade-erp/sendCar/addOrUpdateSendCar',
        method: 'post',
        data,
    })
}



// 查询派车详情
export const getSendCarById = data => {
    return request({
        url: '/api/blade-erp/sendCar/getSendCarById',
        method: 'post',
        params:data,
    })
}


// 查询派车类型
export const getCarType = data => {
    return request({
        url: '/api/blade-erp/sendCar/getCarType',
        method: 'post',
        params:data,
    })
}

// 新增派车类型
export const addCarType = data => {
    return request({
        url: '/api/blade-erp/sendCar/addOrUpdateCarType',
        method: 'post',
        data,
    })
}

// 获取项目列表
export const getProjectByPage = data => {
    return request({
        url: '/api/blade-erp/projectManager/getProjectByPage',
        method: 'post',
        data,
        params:{
            pageSize:data.pageSize,
            pageNum:data.pageNum
        }
    })
}

// 查询往来单位1：供应商 2：客户
export const dlg = params => {
    return request({
      url: '/api/blade-mes/preproductionplan/export',
      method: 'get',
      params,
      responseType: 'arraybuffer',
    //   headers: {
    //     'Content-Type': 'application/json'
    // }
    })
  }