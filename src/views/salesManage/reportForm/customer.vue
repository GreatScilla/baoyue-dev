//客户明细表
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
        <el-form-item label="客户">
          <el-input v-model="searchForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位电话">
          <el-input v-model="searchForm.phone" clearable></el-input>
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
        @click="exports(exportApi,searchForm)"
        size="small"
        icon="el-icon-download"
        >导出</el-button
      >
      <el-button @click="getPdf(pdfApi,searchForm)" size="small" icon="el-icon-printer"
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
        <el-table-column width="126" prop="name" label="客户">
        </el-table-column>
        <el-table-column prop="phone" label="单位电话"></el-table-column>
        <el-table-column prop="aAddress" label="单位地址"></el-table-column>
        <el-table-column prop="authorization_limit" label="授权额度"></el-table-column>
        <el-table-column prop="category" label="单位分类"></el-table-column>
        <el-table-column prop="mobile_phone" label="联系人手机"></el-table-column>
        <el-table-column prop="cAddress" label="联系人地址"></el-table-column>
        <el-table-column prop="settlement_contact_unit_name" label="结算方式"></el-table-column>
        <el-table-column prop="salesman_name" label="业务员"></el-table-column>
        <el-table-column prop="discount" label="折扣率(%)"></el-table-column>
        <el-table-column prop="dept_name" label="分管部门"></el-table-column>
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
  getContact,
  getContactExport,
} from "@/api/salesManage/reportForm";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],

  data() {
    return {
      searchForm: {
      },
      tableData: [],
      searchDialogVisible: false,
      multipleSelection: [],
      exportApi: getContactExport,
      pdfApi:'/base/contactUnitBase/getContactReportPDF',
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
      const res = await getContact(params);
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
</style>
