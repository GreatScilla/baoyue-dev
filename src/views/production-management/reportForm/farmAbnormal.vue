//车间生产异常统计
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="选择月份">
          <el-select v-model="searchForm.month" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin: 10px 0">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      >
      <el-button
        size="small"
        @click="exports(exportApi, searchForm)"
        icon="el-icon-download"
        >导出</el-button
      >
      <el-button
        @click="getPdf(pdfApi, searchForm)"
        size="small"
        icon="el-icon-printer"
        >打印</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          width="160"
          prop="createTime"
          label="日期"
        ></el-table-column>
        <el-table-column prop="productSn" label="产品编号"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column
          prop="schedulesNumber"
          label="生产数量"
        ></el-table-column>
        <el-table-column prop="num" label="不良数量"></el-table-column>
        <el-table-column prop="description" label="异常描述"></el-table-column>
        <el-table-column
          prop="anlagenzustand"
          label="异常工时"
        ></el-table-column>
        <el-table-column
          prop="anlagenzustand"
          label="损失金额"
        ></el-table-column>
        <el-table-column prop="createUsername" label="责任人"></el-table-column>
        <el-table-column prop="badCode" label="异常原因分析"></el-table-column>
        <el-table-column prop="remark" label="纠正预防措施"></el-table-column>
        <el-table-column prop="deptName" label="责任部门"></el-table-column>
      </el-table>
    </el-row>
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
  </basic-container>
</template>

<script>
import {
  getAbnormalWorkshopProductionReport,
  inputLogExport
} from "@/api/manufacture/reportForm";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      searchForm: {},
      tableData: [],
      searchDialogVisible: false,
      multipleSelection: [],
      exportApi: inputLogExport,
      pdfApi: "/mes/inputLog/getAbnormalWorkshopProductionReportPDF",
      options: [
        {
          value: "1",
          label: "当月",
        },
        {
          value: "2",
          label: "上月",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    this.handleList();
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },

    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getAbnormalWorkshopProductionReport(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
</style>
