const amountCal = { // 计算新增销售采购页面总金额，应收/付金额
  computed: {
    totalAmount () { // 总金额
      let total = 0
      this.tableData.forEach(item => {
        if (item.salePrice) {
          total = (+total + +item.salePrice).toFixed(2);
        }
      })
      return total
    },
    payAmount () { // 应收/付金额
      let price = 0
      price = (this.totalAmount - this.form.discountAmount).toFixed(2)
      return price
    }
  },
}

export default amountCal;