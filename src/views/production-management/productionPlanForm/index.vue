// 生产计划
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
        :label-position="labelPosition"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="项目名称:">
          <el-input
            placeholder="请输入项目名称"
            v-model="searchForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:">
          <el-input
            placeholder="请输入客户名称"
            v-model="searchForm.organName"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品类型:">
          <el-input
            placeholder="请输入产品类型"
            v-model="searchForm.productCategoryName"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称:">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchForm.materialName"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理方式:">
                       <el-select
                size="small"
                v-model="searchForm.type"
                placeholder="请选择"
               
              >
                <el-option
                  v-for="item in workOrderType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.preProductionPlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button size="small" @click="handleDelete()"> 批量删除 </el-button> -->
      <el-button
        v-if="permission.changeWireForm_export"
        style="margin-left: 10px"
        size="small"
        plain
        @click="exports(exportApi, searchForm)"
      >
        导出
      </el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="projectName"
          width="160"
          label="项目名称"
        ></el-table-column>
        <el-table-column
          prop="organName"
          width="160"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          prop="productCategoryName"
          width="160"
          label="产品类型"
        ></el-table-column>
        <el-table-column  width="160" prop="materialName" label="产品名称"></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column prop="intensity" label="强度"></el-table-column>
        <el-table-column prop="density" label="密度"></el-table-column>
        <el-table-column  width="160" prop="productFormula" label="BOM配方"></el-table-column>
        <el-table-column prop="sum" label="数量(方)"></el-table-column>
        <el-table-column prop="modulus" label="模数"></el-table-column>
        <el-table-column prop="wordCount" label="块数"></el-table-column>
        <el-table-column  width="160" prop="deliveryDate" label="交货日期"></el-table-column>
        <el-table-column prop="typeName" label="处理方式"></el-table-column>
        <el-table-column width="80" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.preProductionPlan_detail"
              :to="{
                path: '/production-management/productionPlanForm/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                ></el-button>
              </el-tooltip>
              <!-- <el-divider direction="vertical"></el-divider> -->
            </router-link>
            <!-- <el-tooltip
              v-if="permission.preProductionPlan_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip> -->
          </template>
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
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { getWorkOrderType } from "@/api/planning/workOrder";
import {
  getProductionPlan,
  getProductionPlanExport,
} from "@/api/manufacture/reportForm";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      workOrderType:[],
      deleteApi: "",
      exportApi: getProductionPlanExport,
      ids: [], //id
      teamList: [],
      reportingWorksOptions: [
        { code: "0", name: "未报工" },
        { code: "1", name: "已报工" },
      ],
      undoOptions: [
        { code: "0", name: "未撤销" },
        { code: "1", name: "已撤销" },
      ],
      form: {},
      labelPosition: "right",
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
      getWorkOrderType(),
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.workOrderType = res[1].data.data;
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
      const res = await getProductionPlan(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未报工";
      } else if (value == 1) {
        value = "已报工";
      } else if (value == 2) {
        value = "已交接";
      }
      return value;
    },
    repealName(value) {
      if (value == 0) {
        value = "未撤销";
      } else if (value == 1) {
        value = "已撤销";
      } else if (value == 2) {
        value = "已交接";
      }
      return value;
    },
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
