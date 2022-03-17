// 切割工单
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
        <el-form-item label="切割工单号:">
          <el-input
            placeholder="请输入工单号"
            v-model="searchForm.cuttingSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="班组:">
          <el-select size="small" v-model="searchForm.job" placeholder="请选择">
            <el-option
              v-for="item in teamList"
              :key="item.id"
              :label="item.className"
              :value="item.className"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报工状态:">
          <el-select
            size="small"
            v-model="searchForm.artisanStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item of reportingWorksOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤销状态:">
          <el-select
            size="small"
            v-model="searchForm.repealStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item of undoOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
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
        v-if="permission.cuttingWorkOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button v-if="permission.cuttingWorkOrder_delete" size="small" @click="handleDelete()"> 批量删除 </el-button>
      <el-button
      v-if="permission.cuttingWorkOrder_export"
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
        <el-table-column label="报工状态">
          <template slot-scope="scope">
            {{ scope.row.artisanStatus | statusName }}
          </template>
        </el-table-column>
        <el-table-column label="撤销状态">
          <template slot-scope="scope">
            {{ scope.row.repealStatus | repealName }}
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重等级">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.weight == '1'
                  ? 'danger'
                  : scope.row.weight == '2'
                  ? 'warning'
                  : ''
              "
              disable-transitions
              >{{ scope.row.weight | weightName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="cuttingSn"
          width="160"
          label="切割工单号"
        ></el-table-column>
        <el-table-column
          prop="fambe"
          width="160"
          label="窑号"
        ></el-table-column>
        <el-table-column
          prop="materialName"
          width="120"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          prop="materialSn"
          width="130"
          label="产品编码"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="organName" label="客户名称"></el-table-column>
        <el-table-column
          width="160"
          prop="artisanTime"
          label="报工时间"
        ></el-table-column>
        <el-table-column
          width="120"
          prop="manufacturingShop"
          label="生产车间"
        ></el-table-column>
        <el-table-column
          width="120"
          prop="productionLine"
          label="生产产线"
        ></el-table-column>
        <el-table-column prop="job" label="班组号"></el-table-column>
        <el-table-column
          width="165"
          prop="startTime"
          label="计划开始时间"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          width="160"
          label="计划结束时间"
        ></el-table-column>
        <el-table-column width="100" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.cuttingWorkOrder_detail"
              :to="{
                path: '/production-management/cuttingWorkOrder/detail',
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
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <el-tooltip
              v-if="permission.cuttingWorkOrder_delete"
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
                :disabled="scope.row.artisanStatus != 0"
              ></el-button>
            </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.cuttingWorkOrder_putSeal"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
                :disabled="scope.row.artisanStatus == 0"
              ></el-button>
            </el-tooltip>
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
import { getWorkshopList } from "@/api/planning/workOrder";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import {
  getCuttingWorkOrderByPage,
  deleteCuttingWorkOrder,
  getCutMendPlanExport,
} from "@/api/manufacture/cuttingWorkOrder";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      deleteApi: deleteCuttingWorkOrder,
      exportApi: getCutMendPlanExport,
      pdfIdApi:"/mes/cuttingWorkOrder/getCuttingWorkOrderReportPDF",
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
      const res = await getCuttingWorkOrderByPage(params);
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
