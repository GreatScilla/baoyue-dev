
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
        <el-form-item label="计划单号:">
          <el-input v-model="form.standardSn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="计划名称:">
          <el-input v-model="form.standardName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="计划部门:">
          <el-input v-model="form.maintainType" placeholder="请输入"></el-input>
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
        v-if="permission.checkingPlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.checkingPlan_set"
        size="small"
        icon="el-icon-setting"
        type="primary"
        @click="checkSet"
      >
        点检参数设置
      </el-button>
      <!-- <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="状态" prop="planStatus" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.planStatus | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="spotCheckPlanSn" label="计划单号" width="150px">
        </el-table-column>
        <el-table-column prop="spotCheckName" label="计划名称">
        </el-table-column>
        <el-table-column
          prop="spotCheckDepartment"
          label="点检部门"
          width="130px"
        >
        </el-table-column>
        <el-table-column prop="createTime" label="点检时间"> </el-table-column>
        <el-table-column prop="planningCycle" label="计划周期">
          <template slot-scope="{ row }">
            <span>{{ row.planningCycle }}/{{ row.planningCycleUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
             v-if="permission.checkingPlan_audit"
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                @click="handleAduit(scope.row)"
                :disabled="scope.row.planStatus != 0"
              >
              </el-button>
            </el-tooltip>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
              >
              </el-button>
            </el-tooltip> -->
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
             v-if="permission.checkingPlan_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="handleDetail(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <!-- <el-divider direction="vertical"></el-divider>
            <el-tooltip
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
                :disabled="scope.row.planStatus != 0"
              >
              </el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
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
import {
  getList,
  deleteSpotCheck,
  updateStatusSpotCheck,
} from "@/api/asset-management/checkingPlan.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      form: {
        billNo: "",
        person: "",
        data: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteSpotCheck,
    };
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    checkSet() {
      this.$router.push({
        path: "/asset-management/checkingPlan/set",
      });
    },
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/checkingPlan/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/checkingPlan/edit",
        query: {
          data: row,
        },
      });
    },
    // 详情
    handleDetail(data) {
      this.$router.push({
        path: "/asset-management/checkingPlan/detail",
        query: {
          data,
        },
      });
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
    // 审核
    async handleAduit(row) {
      try {
        await this.$confirm("确定该数据提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await updateStatusSpotCheck({ ids: row.id });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消删除");
      }
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "审核通过";
      } else if (value == 3) {
        value = "审核未通过";
      }
      return value;
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
