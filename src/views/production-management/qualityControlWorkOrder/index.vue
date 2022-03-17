// 质检工单
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
        <el-form-item label="质检工单号:">
          <el-input
            placeholder="请输工单号"
            v-model="searchForm.qualitySn"
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
        v-if="permission.qualityControlWorkOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button  v-if="permission.qualityControlWorkOrder_delete" size="small" @click="handleDelete()"> 批量删除 </el-button>
      <el-button
       v-if="permission.qualityControlWorkOrder_export"
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
          prop="qualitySn"
          width="160"
          label="质检工单号"
        ></el-table-column>
        <el-table-column
          prop="still"
          width="160"
          label="釜号"
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
          prop="intoStillTime"
          label="入釜时间"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="comeStillTime"
          label="出釜时间"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="sum"
          label="釜数量(方)"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="qualifiedSum"
          label="合格数量"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="scrapSum"
          label="报废数量"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="repairedSum"
          label="待修补数量"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="downGradeSum"
          label="降等级品数量"
        ></el-table-column>
        <el-table-column width="80" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.qualityControlWorkOrder_detail"
              :to="{
                path: '/production-management/qualityControlWorkOrder/detail',
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
              v-if="permission.qualityControlWorkOrder_delete"
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
  getQualityWorkOrderByPage,
  deleteQualityWorkOrder,
  getQualityWorkOrderExport,
} from "@/api/manufacture/qualityControlWorkOrder";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      deleteApi: deleteQualityWorkOrder,
      exportApi: getQualityWorkOrderExport,
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
      const res = await getQualityWorkOrderByPage(params);
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
