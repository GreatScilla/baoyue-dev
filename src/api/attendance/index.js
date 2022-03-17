import request from '@/router/axios';

//考勤记录
export const getAllList = (params) => {
    return request({
        url: '/api/blade-hr/attendance/getAllList',
        method: 'get',
        params: params
    })
}
//获取考勤状态下拉框接口
export const getAttendanceStatusList = (params) => {
    return request({
        url: '/api/blade-hr/attendance/getAttendanceStatusList',
        method: 'get',
        params: params
    })
}
//修改考勤表数据
export const update = (data) => {
    return request({
        url: '/api/blade-hr/attendance/update',
        method: 'put',
        data
    })
}

// 条件查询员工所有签到记录(日历)
export const getList = (params) => {
    return request({
        url: '/api/blade-hr/attendance/getList',
        method: 'get',
        params: params
    })
}
//根据条件查询所有请假-加班统计信息（分页）
export const getByPage = (params) => {
    return request({
        url: '/api/blade-base/approvalList/getByPage',
        method: 'post',
        params
    })
}


//查询所有假期类型信息（分页)
export const leaveTypeGetPage = (data) => {
    return request({
        url: '/api/blade-hr/LeaveType/getPage',
        method: 'post',
        data
    })
}
//新增或修改假期类型
export const leaveTypeSubmit = (data) => {
    return request({
        url: '/api/blade-hr/LeaveType/submit',
        method: 'post',
        data
    })
}
//批量删除假期类型
export const leaveTypeDelete = (params) => {
    return request({
        url: '/api/blade-hr/LeaveType/delete',
        method: 'post',
        params
    })
}
//根据条件查询所有年假有效期信息（分页）
export const getPage = (params, data) => {
    return request({
        url: '/api/blade-hr/AnnualLeaveValidity/getPage',
        method: 'post',
        params,
        data
    })
}
//新增或修改年假有效期
export const submit = (data) => {
    return request({
        url: '/api/blade-hr/AnnualLeaveValidity/submit',
        method: 'post',
        data
    })
}
//批量删除年假有效期
export const validDelete = (params) => {
    return request({
        url: '/api/blade-hr/AnnualLeaveValidity/delete',
        method: 'post',
        params
    })
}
//查询所有年假期限信息（分页） 
export const periodGetPage = (params, data) => {
    return request({
        url: '/api/blade-hr/AnnualLeavePeriod/getPage',
        method: 'post',
        params,
        data
    })
}
//修改考勤表数据
export const periodSubmit = (data) => {
    return request({
        url: '/api/blade-hr/AnnualLeavePeriod/submit',
        method: 'post',
        data
    })
}
//批量删除年假有效期
export const periodDelete = (params) => {
    return request({
        url: '/api/blade-hr/AnnualLeavePeriod/delete',
        method: 'post',
        params
    })
}
//查询考勤统计(分页)
export const getAttendanceStatisticsPage = (params) => {
    return request({
        url: '/api/blade-base/approvalList/getAttendanceStatisticsPage',
        method: 'post',
        params
    })
}
//查询其他假期统计(分页)
export const getOtherHolidayStatisticsPage = (params) => {
    return request({
        url: '/api/blade-base/approvalList/getOtherHolidayStatisticsPage',
        method: 'post',
        params
    })
}
//查询年假统计(分页)
export const getAnnualLeavePage = (params) => {
    return request({
        url: '/api/blade-base/approvalList/getAnnualLeavePage',
        method: 'post',
        params
    })
}







