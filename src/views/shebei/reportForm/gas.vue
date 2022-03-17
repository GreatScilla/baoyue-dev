//燃气明细表
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
        <el-form-item label="燃气表">
          <el-input v-model="searchForm.position" clearable></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="searchForm.time"
            type="date"
            placeholder="请选择"
            clearable
          >
          </el-date-picker>
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
        @click="exports(exportApi, searchForm)"
        size="small"
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
        <!-- <el-table-column prop="name1" label="燃气表1"> </el-table-column>
        <el-table-column prop="name2" label="燃气表2"> </el-table-column> -->
        <el-table-column prop="position" label="燃气表"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <!-- <el-table-column
          prop="cumulativeFlowUnderWorkingConditions1"
          label="燃气表1工况累积流量"
        ></el-table-column>
        <el-table-column
          prop="cumulativeFlowUnderWorkingConditions2"
          label="燃气表2工况累积流量"
        ></el-table-column> -->
        <el-table-column
          prop="cumulativeFlowUnderWorkingConditions"
          label="工况累积流量"
        ></el-table-column>
        <!-- <el-table-column
          prop="gasConsumption1"
          label="燃气表1用气量"
        ></el-table-column>
        <el-table-column
          prop="gasConsumption2"
          label="燃气表2用气量"
        ></el-table-column>
        <el-table-column
          prop="gasConsumptionSum"
          label="用气总量"
        ></el-table-column> -->
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
import { gasGetTwoReport, getGasReportExport } from "@/api/shebei/reportForm";
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
      exportApi: getGasReportExport,
      pdfApi: "/rcm/gas/getReportPDF",
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.nowDate = year + "-" + month + "-" + day;
    this.searchForm.time = this.nowDate;
    this.handleList(this.searchForm);
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
      const res = await gasGetTwoReport(params);
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
      this.searchForm.time = this.nowDate;
      this.handleList(this.searchForm);
      // this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
