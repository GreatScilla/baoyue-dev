// 资产管理
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
      <el-form ref="form" :model="form" label-width="90px" class="form-footer">
        <el-form-item label="备件名称:" prop="partName">
          <el-input
            placeholder="请输入备件名称"
            v-model="form.partName"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件ID:" prop="partId">
          <el-input placeholder="请输入备件ID" v-model="form.partId"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库:" prop="warehouse">
          <el-select v-model="form.warehouse" placeholder="请选择仓库名称">
            <el-option
              v-for="item in depotList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="handleReset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row class="operation-function">
      <el-button
        v-if="permission.sparePartsManagement_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <!-- <el-button size="small" plain>导出</el-button> -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="productName" label="备件名称"> </el-table-column>
        <el-table-column prop="productSpecificationName" label="规格型号">
        </el-table-column>
        <el-table-column prop="productNumber" label="备件编号">
        </el-table-column>
        <el-table-column prop="depotName" label="所属仓库"> </el-table-column>
        <el-table-column prop="stock" label="备件数量"> </el-table-column>
        <el-table-column prop="stockUnitName" label="单位"> </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper margin-bottom-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import { getContractList, deleteApi, audit } from "@/api/salesManage/contract";
import { getPartList } from "@/api/asset-management/sparePartsManagement.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {
        partName: "",
        partId: "",
        warehouse: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: "",
      auditApi: audit,
      depotList: [],
    };
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    this.handleList();
    this.getWarehouse();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      const params = {
        current: this.currentPage,
        size: this.pageSize,
        productName: this.form.partName,
        productId: this.form.partId,
        depotId: this.form.warehouse,
      };
      this.recordForm = params;
      const res = await getPartList(params);
      console.log(res);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async getWarehouse() {
      const res = await getWarehouseList();
      this.depotList = res.data.data;
      console.log(res);
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    changeTime(val) {
      // 选择时间
      if (val !== null) {
        this.form.contractStartDate = `${val[0]}`;
        this.form.contractEndDate = `${val[1]}`;
      } else {
        this.form.contractStartDate = this.form.contractEndDate = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-dialog {
  .el-form-item__content {
    height: 37px !important;
  }
  .el-form-item {
    padding-left: 80px !important;
  }
  .el-form-item__label {
    line-height: 37px !important;
  }
  .el-input,
  .el-select,
  .el-date-editor {
    width: 320px !important;
  }
  .search-footer {
    text-align: right;
  }
  .form-footer {
    padding-bottom: 8px;
  }
}
</style>
