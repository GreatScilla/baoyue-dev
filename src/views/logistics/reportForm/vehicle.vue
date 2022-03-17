//车辆明细表
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
        <el-form-item label="车牌号">
          <el-input v-model="searchForm.licenseNumber"></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="searchForm.carType"></el-input>
        </el-form-item>
        <el-form-item label="承重">
          <el-input v-model="searchForm.heavy"></el-input>
        </el-form-item>
        <el-form-item label="司机">
          <el-input v-model="searchForm.driverName"></el-input>
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
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column width="120" prop="licenseNumber" label="车牌号">
        </el-table-column>
        <el-table-column prop="carType" label="车型"></el-table-column>
        <el-table-column prop="maxVolume" label="最大体积"></el-table-column>
        <el-table-column prop="heavy" label="载重"></el-table-column>
        <el-table-column prop="passPerson" label="载人数"></el-table-column>
        <el-table-column
          width="180"
          prop="transport"
          label="运输证有效期"
        ></el-table-column>
        <el-table-column
          prop="contractCompany"
          label="承保公司"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="compulsory"
          label="交强险有效期"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="business"
          label="商业险有效期"
        ></el-table-column>
        <el-table-column prop="carHeavy" label="空车重量"></el-table-column>
        <el-table-column prop="driverName" label="司机"></el-table-column>
        <el-table-column prop="driverPhone" label="联系电话"></el-table-column>
        <el-table-column width="120" prop="area" label="区域"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
  getPageCarManagerReport,
  getCarManagerExport,
} from "@/api/logistics/reportForm";
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
      exportApi: getCarManagerExport,
      pdfApi: "/erp/carManager/getCarManagerReportPDF",
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
      const res = await getPageCarManagerReport(params);
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
