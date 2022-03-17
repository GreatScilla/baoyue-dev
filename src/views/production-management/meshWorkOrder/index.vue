// 网片工单
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
        <el-form-item label="工单号:">
          <el-input
            placeholder="请输入工单号"
            v-model="searchForm.meshPlanSn"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="原规格型号:">
          <el-input
            placeholder="请输入原规格型号"
            v-model="searchForm.irigamaSn"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="网片规格:">
          <el-input
            placeholder="请输入网片规格"
            v-model="searchForm.model"
          ></el-input>
        </el-form-item>
        <el-form-item label="班组:">
          <el-select
            size="small"
            v-model="searchForm.jobId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in teamList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
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
        v-if="permission.meshWorkOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button size="small" @click="handleDelete()"> 批量删除 </el-button> -->
     <el-button
     v-if="permission.meshWorkOrder_export"
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
        <el-table-column
          prop="meshWorkOrderSn"
          width="160"
          label="工单号"
        ></el-table-column>
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
          prop="materialName"
          width="160"
          label="网片名称"
        ></el-table-column>
        <el-table-column
          prop="materialSn"
          width="160"
          label="网片编码"
        ></el-table-column>
        <el-table-column
          prop="model"
          width="160"
          label="网片规格"
        ></el-table-column>
        <el-table-column
          prop="qualifiedSum"
          width="160"
          label="合格数量(片)"
        ></el-table-column>
        <el-table-column
          prop="scrapSum"
          width="160"
          label="不合格数量(片)"
        ></el-table-column>
        <el-table-column
          prop="jobSn"
          width="160"
          label="班组号"
        ></el-table-column>
        <el-table-column width="80" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.meshWorkOrder_detail"
              :to="{
                path: '/production-management/meshWorkOrder/detail',
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
import { getMeshWorkOrderByPage,getMeshWorkOrderExport } from "@/api/manufacture/meshWorkOrder.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit,exportMixin],
  data() {
    return {
      deleteApi: "",
      exportApi:getMeshWorkOrderExport,
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
      const res = await getMeshWorkOrderByPage(params);
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
