//浇注明细表
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
        <!-- <el-form-item label="规格型号">
          <el-input v-model="searchForm.model" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="开始时间">
          <el-date-picker
            value-format="yyyy-MM-dd 00:00:00"
            v-model="searchForm.startTime"
            type="date"
            placeholder="请选择"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            value-format="yyyy-MM-dd 23:59:59"
            v-model="searchForm.endTime"
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
        <el-table-column label="模号" prop="id"> </el-table-column>
        <el-table-column label="日期" prop="date1"> </el-table-column>
        <el-table-column label="时间" prop="time1"> </el-table-column>
        <el-table-column label="班组" prop="team"> </el-table-column>
        <el-table-column label="石灰" prop="lime"> </el-table-column>
        <el-table-column label="水泥" prop="cement"> </el-table-column>
        <el-table-column label="料浆" prop="slurry"> </el-table-column>
        <el-table-column label="废浆" prop="wastePulp"> </el-table-column>
        <el-table-column label="石膏浆" prop="gypsumSlurry"> </el-table-column>
        <el-table-column label="浇注1温度" prop="pouringTemOne">
        </el-table-column>
        <el-table-column label="浇注2温度" prop="pouringTemTwo">
        </el-table-column>
        <el-table-column label="料浆补水" prop="slurryMakeUp">
        </el-table-column>
        <el-table-column label="废浆补水" prop="wasteSlurryMakeUp">
        </el-table-column>
        <el-table-column
          label="石膏浆补水"
          prop="gypsumSlurryWaterReplenishment"
        >
        </el-table-column>
        <el-table-column label="铅粉1设定值" prop="aluminumPowderSetPointOne">
        </el-table-column>
        <el-table-column label="铅粉2设定值" prop="aluminumPowderSetPointTwo">
        </el-table-column>
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
  plGetTwoReport,
  getPlReportExport,
} from "@/api/shebei/reportForm";
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
      exportApi: getPlReportExport,
      pdfApi: "/rcm/pl/getReportPDF",
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
      // console.log("...",arg);
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await plGetTwoReport(params);
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
      // this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
