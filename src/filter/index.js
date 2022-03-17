export default {
  install(Vue) {
    Vue.filter('erpStatus', val => { // 销售类型状态
      if (val === 0) {
        return '停用'
      } else if (val === 1) {
        return '启用'
      }
    })
    Vue.filter('deliveryStatus', val => { // 发货状态
      if (val === 0) {
        return '待出库'
      } else if (val === 1) {
        return '部分出库'
      } else if (val === 2) {
        return '已出库'
      } else if (val === 3) {
        return '部分发货'
      } else if (val === 4) {
        return '已发货'
      }
    })
    Vue.filter('outboundStatus', val => {
      if (val === 0) {
        return '未审核'
      } else if (val === 1) {
        return '已审核'
      } else if (val === 2) {
        return '已完成'
      } else if (val === 3) {
        return '已关闭'
      }
    })
    Vue.filter('inboundStatus', val => {
      if (val === 0) {
        return '待进货'
      } else if (val === 1) {
        return '部分进货'
      } else if (val === 2) {
        return '已进货'
      }
    })
    Vue.filter('taxTypeText', val => {
      if (val === 3) {
        return '专业发票'
      } else if (val === 1) {
        return '增值税专用发票'
      } else if (val === 2) {
        return '普通发票'
      } else if (val === 4) {
        return '其他'
      }
    })
    Vue.filter('customerStatus', val => { // 往来单位状态
      if (val === 1) {
        return '正常'
      } else if (val === 2) {
        return '停用'
      }
    })
    Vue.filter('category', val => { // 往来单位名称
      if (val === 1) {
        return '供应商'
      } else if (val === 2) {
        return '客户'
      }
    })
    Vue.filter('checkStatus', val => { // 检验类型
      if (val === 0) {
        return '待检验'
      } else if (val === 1) {
        return '部分检验'
      } else if (val === 2) {
        return '已检验'
      }
    })
    Vue.filter('isGift', val => { // 是否赠品
      if (val === 0) {
        return '普通商品'
      } else if (val === 1) {
        return '赠品'
      }
    })
    Vue.filter('orderTypeText', val => { // 订单类型
      if (val === 0) {
        return '采购入库'
      } else if (val === 1) {
        return '采购'
      } else if (val === 2) {
        return '采购退货'
      }
      else if (val === 5) {
        return '销售出库'
      } else if (val === 6) {
        return '销售退货'
      }
    })
    Vue.filter('approvalName', val => { // 审批流程状态
      if (val == 0) {
        return '未提交'
      } else if (val == 1) {
        return '待审核'
      } else if (val == 2) {
        return '已审核'
      } else if (val == 3) {
        return '审核未通过'
      } else if (val == 4) {
        return '反审核'
      }
    })

  }
}