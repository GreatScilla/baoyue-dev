// 获取合同编号
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="contactDialogVisible"
      :before-close="handleClose"
    >
       <el-form
      :inline="true"
      :model="inboundManageForm"
      ref="setUpForm"
    >
      <el-form-item label="日期:">
        <el-date-picker
          v-model="value1"
          size="small"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeBillDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="100px" label="合同名称:">
        <el-input
          size="small"
          v-model="form.contractName"
          placeholder="请输入合同名称">
        </el-input>
      </el-form-item>
       <el-form-item label-width="100px" label="客户名称:">
        <el-input
          size="small"
          v-model="form.memberName"
          placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
       <el-form-item label-width="100px" label="销售员名称:">
        <el-input
          size="small"
          v-model="form.salesMan"
          placeholder="请输入销售员名称">
        </el-input>
      </el-form-item>
    
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
      <el-table highlight-current-row :data="tableData" @row-click="clickRow">
        <el-table-column prop="contractNumber" label="合同编号"></el-table-column>
        <el-table-column prop="contractName" label="合同名称"></el-table-column>
        <el-table-column prop="memberName" label="客户"></el-table-column>
        <el-table-column prop="salesMan" label="销售员"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getContractList } from "@/api/salesManage/contract";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    contactDialogVisible: Boolean,
    title: String
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      searchParams: "",
      value1:'',
      form: {
        contractName: "",
        memberName: "",
        salesMan: "",
        contractStartDate: "",
        contractEndDate: ""
      }
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        data: this.form
      };
      let res = await getContractList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.pages.total;
    },
    //查询
    query(){
     this.handleList();
    },
    // 单击选择人员
    clickRow(row) {
      this.clickRowDate = row;
    },
    // 搜索人员
    async search() {
      let res = await getContractList({
        current: this.currentPage,
        size: this.pageSize,
        name: this.searchParams
      });
      if (res.data.success) {
        this.tableData = res.data.data.pages.records;
      }
    },
    // 确定
    confim() {
      if (this.clickRowDate) {
        this.$emit("on-selected-contact", this.clickRowDate);
        this.$emit("update:contactDialogVisible", false);
      } else {
        this.$message.info("请选择人员");
      }
    },
    // 取消
    cancel() {
      this.closeDialog();
    },
    // 关闭
    handleClose() {
      this.closeDialog();
    },
    // 表单初始
    closeDialog() {
      this.$emit("on-selected-personnel", false);
      this.$emit("update:contactDialogVisible", false);
    },
     // 选择单据日期
    changeBillDate(value){
      this.form.contractStartDate = value[0]
      this.form.contractEndDate = value[1]
    },
  },
  filters: {
    status: function(value) {
      if (value === 2) {
        value = "兼职";
      } else if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>