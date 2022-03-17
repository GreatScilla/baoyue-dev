// 获取项目名称
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="projectDialogVisible"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="inboundManageForm" ref="setUpForm">
        <el-form-item label-width="100px" label="项目名称:">
          <el-input
            size="small"
            v-model="form.projectName"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="合同名称:">
          <el-input
            size="small"
            v-model="form.contractName"
            placeholder="请输入合同名称"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-left: 20px; margin-top: -1px">
          <el-button size="small" type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table highlight-current-row :data="tableData" @row-click="clickRow">
        <el-table-column prop="projectSn" label="项目编号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="contractSn" label="合同编号"></el-table-column>
        <el-table-column prop="contractName" label="合同名称"></el-table-column>
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
import {
  queryProjectOverviewPage,
  getProjectStatus,
} from "@/api/projects/projectOverview";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    projectDialogVisible: Boolean,
    title: String,
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      searchParams: "",
      value1: "",
      form: {
        projectName: "",
        contractName: "",
        customerId: "",
      },
    };
  },
  created() {
    this.handleList();
  },
  watch: {
    projectDialogVisible() {
      if (this.projectDialogVisible) {
        this.form.customerId = this.id;
        this.handleList();
      }
    },
  },
  methods: {
    // 获取资源
    async handleList() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        data: this.form,
      };
      let res = await queryProjectOverviewPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.$emit("on-created-contact", res);
    },
    //查询
    query() {
      this.handleList();
    },
    // 单击选择人员
    async clickRow(row) {
      var params = {
        projectSn: row.projectSn,
      };
      const res = await getProjectStatus(params);
      if (res.data.code == 400) {
        return;
      } else {
        this.clickRowDate = row;
      }
    },
    // 搜索人员
    async search() {
      let res = await queryProjectOverviewPage({
        current: this.currentPage,
        size: this.pageSize,
        name: this.searchParams,
      });
      if (res.data.success) {
        this.tableData = res.data.data.pages.records;
      }
    },
    // 确定
    confim() {
      if (this.clickRowDate) {
        this.$emit("on-selected-contact", this.clickRowDate);
        this.$emit("update:projectDialogVisible", false);
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
      this.$emit("update:projectDialogVisible", false);
    },
    // 选择单据日期
    changeBillDate(value) {
      this.form.contractStartDate = value[0];
      this.form.contractEndDate = value[1];
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>