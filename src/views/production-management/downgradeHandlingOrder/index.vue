// 降级处理单
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
        <el-form-item label="计划单号:">
          <el-input
            placeholder="请输入计划单号"
            v-model="searchForm.planSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库单据号:">
          <el-input
            placeholder="请输入入库单据号"
            v-model="searchForm.depotSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="原产品名称:">
          <el-input
            placeholder="请输入原产品名称"
            v-model="searchForm.materialName"
          ></el-input>
        </el-form-item>
        <el-form-item label="原规格型号:">
          <el-input
            placeholder="请输入原规格型号"
            v-model="searchForm.model"
          ></el-input>
        </el-form-item>
        <el-form-item label="现产品名称:">
          <el-input
            placeholder="请输入现产品名称"
            v-model="searchForm.materialNameNew"
          ></el-input>
        </el-form-item>
        <el-form-item label="现规格型号:">
          <el-input
            placeholder="请输入现规格型号"
            v-model="searchForm.modelNew"
          ></el-input>
        </el-form-item>
        <el-form-item label="质检班组:">
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
        v-if="permission.downgradeHandlingOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button size="small" @click="handleDelete()"> 批量删除 </el-button> -->
      <el-button
      v-if="permission.downgradeHandlingOrder_export"
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
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column prop="planSn" label="计划单号"></el-table-column>
        <el-table-column prop="createTime" label="质检日期"></el-table-column>
        <el-table-column prop="job" label="生产班组"></el-table-column>
        <el-table-column prop="depotSn" label="入库单据号"></el-table-column>
        <el-table-column prop="materialSn" label="产品编码"></el-table-column>
        <el-table-column
          prop="materialName"
          label="原产品名称"
        ></el-table-column>
        <el-table-column prop="model" label="原规格型号"></el-table-column>
        <el-table-column prop="sum" label="数量(方)"></el-table-column>
        <el-table-column
          prop="materialNameNew"
          label="修正产品名称"
        ></el-table-column>
        <el-table-column prop="checkPerson" label="审核人"></el-table-column>

        <el-table-column width="100" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.downgradeHandlingOrder_audit">
              <el-tooltip
                class="item"
                effect="dark"
                content="提交审核"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-s-check"
                  :loading="auditLoading"
                  @click="handleAudit(scope.row)"
                  :disabled="
                    scope.row.status != 0 || scope.row.updateStatus == 0
                  "
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <router-link
              v-if="permission.downgradeHandlingOrder_edit"
              :to="{
                path: '/production-management/downgradeHandlingOrder/edit',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              v-if="permission.downgradeHandlingOrder_detail"
              :to="{
                path: '/production-management/downgradeHandlingOrder/detail',
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
              v-if="permission.downgradeHandlingOrder_delete"
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
import { getWorkshopList } from "@/api/planning/workOrder";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { deleteIrigamaWorkOrder } from "@/api/manufacture/IntoKettleWorkOrder";
import {
  getDemotionWorkOrderByPage,
  updateStatus,
  getDemotionWorkOrderExport,
} from "@/api/manufacture/downgradeHandlingOrder";
import { getShiftList } from "@/api/humanResources/shift";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      deleteApi: deleteIrigamaWorkOrder,
      auditApi: updateStatus,
      exportApi: getDemotionWorkOrderExport,
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
      const res = await getDemotionWorkOrderByPage(params);
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
      //status	审核状态 0 未提交 1 待审核 2 已审核 3 审核未通过
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "已审核";
      } else if (value == 3) {
        value = "审核未通过";
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
