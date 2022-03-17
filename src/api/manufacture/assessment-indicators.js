import request from "@/router/axios";

// 考核指标分页
export const getAssessmentIndicatorsList = (data, params) => {
    return request({
        url: "/api/blade-mes/Evaluation/getByPage",
        method: "post",
        data, params
    });
};

//新增或修改考核指标
export const EvaluationSubmit = (data) => {
    return request({
      url: '/api/blade-mes/Evaluation/submit',
      method: 'post',
      data
    })
  }

//新增或修改考核指标
export const updateEvaluationSubmit = (data) => {
    return request({
      url: '/api/blade-mes/Evaluation/submit',
      method: 'post',
      data
    })
  }


//根据年份月份查询考核指标编辑数据
export const EvaluationGetByYear = (data) => {
    return request({
      url: '/api/blade-mes/Evaluation/getByYear',
      method: 'post',
      data
    })
  }

//根据年份月份查询当前月份的每天的数据
export const EvaluationGetDate = (data) => {
    return request({
      url: '/api/blade-mes/Evaluation/getDate',
      method: 'post',
      data
    })
  }


//根据年份月份查询当前月份的每天的数据
export const EvaluationGetById = id => {
    return request({
      url: '/api/blade-mes/Evaluation/getById',
      method: 'post',
      params:id
    })
  }


//查询参考标准
export const getByReferenceStandard = () => {
    return request({
      url: '/api/blade-mes/ReferenceStandard/getByReferenceStandard',
      method: 'post',
      
    })
  }


//新增或修改参考标准
export const ReferenceStandardSubmit = data => {
    return request({
      url: '/api/blade-mes/ReferenceStandard/submit',
      method: 'post',
      data
      
    })
  }


