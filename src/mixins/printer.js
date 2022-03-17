const printer = {
  methods: {
    handlePrinter () {
      this.$confirm('此功能暂未开放', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    }
  }
}

export default printer