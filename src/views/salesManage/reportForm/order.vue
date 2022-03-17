//订单明细表
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
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.member_user_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.order_sn" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="searchForm.project_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.product_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品编码">
          <el-input v-model="searchForm.product_sn" clearable></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="searchForm.model" clearable></el-input>
        </el-form-item>
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
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="member_user_name" label="客户名称">
        </el-table-column>
        <el-table-column
          width="135"
          prop="order_sn"
          label="订单编号"
        ></el-table-column>
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="contact_sn" label="合同编号"></el-table-column>
        <el-table-column
          width="135"
          prop="expect_receive_date"
          label="交货日期"
        ></el-table-column>
        <el-table-column prop="sales_man" label="销售员"></el-table-column>
        <el-table-column
          width="135"
          prop="product_sn"
          label="产品编码"
        ></el-table-column>
        <el-table-column prop="product_name" label="产品名称"></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column
          prop="product_quantity"
          label="订单数量"
        ></el-table-column>
        <el-table-column prop="sp1" label="单位"></el-table-column>
        <el-table-column prop="real_amount" label="单价"></el-table-column>
        <el-table-column prop="sale_price" label="销售金额"></el-table-column>
        <el-table-column prop="discount" label="折扣金额"></el-table-column>
        <el-table-column prop="check_person" label="审核人"></el-table-column>
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
  getPageShopOrderReport,
  getShopOrderExport
} from "@/api/salesManage/reportForm";
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
      exportApi: getShopOrderExport,
      pdfApi: "/erp/shopOrder/getShopOrderReportPDF",
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
      const res = await getPageShopOrderReport(params);
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
