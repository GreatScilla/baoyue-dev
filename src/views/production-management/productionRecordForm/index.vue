// 生产记录
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
        <el-form-item label="计划号:">
          <el-input
            placeholder="请输入计划号"
            v-model="searchForm.planSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="排程号:">
          <el-input
            placeholder="请输入排程号"
            v-model="searchForm.scheduleSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="浇注工单号:">
          <el-input
            placeholder="请输入浇注工单号"
            v-model="searchForm.pouringSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="切割工单号:">
          <el-input
            placeholder="请输入切割工单号"
            v-model="searchForm.cuttingSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="入釜工单号:">
          <el-input
            placeholder="请输入入釜工单号"
            v-model="searchForm.irigamaSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="质检工单号:">
          <el-input
            placeholder="请输入质检工单号"
            v-model="searchForm.qualitySn"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库工单号:">
          <el-input
            placeholder="请输入入库工单号"
            v-model="searchForm.qualitySn"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称:">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchForm.materialName"
          ></el-input>
        </el-form-item>
        <el-form-item label="釜号:">
          <el-input
            placeholder="请输入釜号"
            v-model="searchForm.still"
          ></el-input>
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
          prop="planSn"
          width="160"
          label="计划号"
        ></el-table-column>
        <el-table-column
          prop="scheduleSn"
          width="160"
          label="排程号"
        ></el-table-column>
        <el-table-column
          prop="pouringSn"
          width="160"
          label="浇注工单号"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="cuttingSn"
          label="切割工单号"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="irigamaSn"
          label="入釜工单号"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="qualitySn"
          label="质检工单号"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="qualitySn"
          label="入库工单号"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="productCategoryName"
          label="产品类型"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="materialName"
          label="产品名称"
        ></el-table-column>
        <el-table-column prop="still" label="釜号"></el-table-column>
        <el-table-column
          width="160"
          prop="comeStillTime"
          label="出釜时间"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="intoStillTime"
          label="入釜时间"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column
          width="160"
          prop="sum"
          label="釜数量(方)"
        ></el-table-column>
        <el-table-column prop="qualifiedSum" label="合格数量"></el-table-column>
        <el-table-column prop="location" label="预进库位"></el-table-column>
        <el-table-column prop="location" label="实进库位"></el-table-column>
        <el-table-column prop="scrapSum" label="报废数量"></el-table-column>
        <el-table-column
          width="160"
          prop="repairedSum"
          label="待修补数量"
        ></el-table-column>
        <el-table-column
          prop="cuttingCreateUserName"
          label="切割员"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="intoFambeTime"
          label="入窑时间"
        ></el-table-column>
        <el-table-column
          prop="irigamaCreateUserName"
          label="蒸养员"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="intoStillTime"
          label="进釜时间"
        ></el-table-column>
        <el-table-column prop="createUserName" label="品检员"></el-table-column>
        <el-table-column
          width="160"
          prop="placingTime"
          label="浇注时间"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="pouringCreateUserName"
          label="浇注操作员"
        ></el-table-column>
        <el-table-column width="100" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.preProductionPlan_detail"
              :to="{
                path: '/production-management/productionRecordForm/detail',
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
import {
  getProductionQuality,
  getProductionQualityExport,
} from "@/api/manufacture/reportForm";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      // deleteApi: deleteIrigamaWorkOrder,
      exportApi: getProductionQualityExport,
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
    ]); //班组
    this.teamList = res[0].data.data.records;
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
      const res = await getProductionQuality(params);
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
