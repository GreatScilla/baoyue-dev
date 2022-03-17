const deleteOrAuditData = {
  data() {
    return {
      multipleSelection: [], // 已选择数据
    }
  },
  methods: {
    async handleDelete(row) { // 删除通用方法api统一取名deleteApi
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return
        } else {
          const arr = this.multipleSelection.filter(ele => ele.status != 0)
          if (arr.length > 0) {
            this.$message.warning("请选择未审核的单据")
            return
          }
          ids = this.multipleSelection.map(ele => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        ids = ids.join(',')
        console.log(ids)
        const res = await this.deleteApi(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error)
        // this.$message.error("已取消删除");
      }
    },
    async handleAudit(row) { // 审核通用方法api统一取名aduit
      console.log("审核", row);
      let ids = [];
      if (row) { // 单选
        ids.push(row.id);
      } else { // 批量处理
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(ele => ele.status !== 0)
          if (arr.length > 0) {
            this.$message.warning("请选择未提交的单据")
            return
          }
          ids = this.multipleSelection.map(ele => ele.id);
        }
      }
      try {
        await this.$confirm("确定该数据提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        ids = ids.join(',')
        this.auditLoading = true
        const res = await this.auditApi(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          this.auditLoading = false
          await this.handleList();
        }
      } catch (error) {
        this.auditLoading = false
        //  this.$message.error("已取消审核");
      }
    },
    handleSelectionChange(val) { // 已选择数据
      this.multipleSelection = val
    },
    selectable(row, index) { // 控制表格已审核时可选
      // if (row.status !== 0) {
      //   return false
      // } else {
      //   return true
      // }
    }
  }
}
export default deleteOrAuditData
