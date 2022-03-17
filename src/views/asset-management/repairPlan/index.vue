// 报修计划
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
        <el-form-item label="单据编号:" prop="maintainPlanSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.maintainPlanSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人:" prop="createUserName">
          <el-input
            placeholder="请输入制单人"
            v-model="form.createUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="报修名称:" prop="assetsRepairName">
          <el-input
            placeholder="请输入报修名称"
            v-model="form.assetsRepairName"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="计划日期:" prop="memberName">
          <el-date-picker
            type="date"
            v-model="form.purchaseDate"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item> -->
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
        v-if="permission.repairPlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
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
        <el-table-column label="状态" prop="maintainPlanStatus" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.maintainPlanStatus | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetsRepairSn" label="工单单号">
        </el-table-column>
        <el-table-column prop="assetsRepairName" label="工单名称">
        </el-table-column>
        <el-table-column prop="createTime" label="工单日期"> </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="errorDescription" label="描述">
        </el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.repairPlan_audit"
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
                :disabled="scope.row.maintainPlanStatus != 0"
              ></el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.repairPlan_set"
              class="item"
              effect="dark"
              content="操作"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-setting"
                @click="operateDetail(scope.row)"
                :disabled="
                  scope.row.maintainPlanStatus != 0 ||
                  scope.row.maintainPlanStatus == 2
                "
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
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
                :disabled="
                  scope.row.maintainPlanStatus == 2
                "
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider> -->
            <el-tooltip
              v-if="permission.repairPlan_detail"
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
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.repairPlan_delete"
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
                :disabled="scope.row.maintainPlanStatus == 2"
              >
              </el-button>
            </el-tooltip>
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
import { getDept } from "@/api/common";
import { audit } from "@/api/salesManage/contract";
import {
  getList,
  deleteAssetsRepair,
  updateStatusAssetsRepair,
} from "@/api/asset-management/repairPlan.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {},
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteAssetsRepair,
      auditApi: audit,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  mounted() {
    this.handleList();
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
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: 1,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    async handleAudit(row) {
      console.log(row);
      if (!row.failureCause) {
        return this.$message.warning("未选择故障类型!");
      }
      // 审核
      let ids = [];
      if (row) {
        // 单选
        ids.push(row.id);
      } else {
        // 批量处理
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => ele.maintainPlanStatus !== 0
          );
          if (arr.length > 0) {
            this.$message.warning("请选择未审核的单据");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定该数据提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");

        const res = await updateStatusAssetsRepair(1, ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消审核");
      }
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/repairPlan/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/repairPlan/detail",
        query: {
          data: row,
        },
      });
    },
    operateDetail(row) {
      // 操作
      this.$router.push({
        path: "/asset-management/repairPlan/edit",
        query: {
          data: row,
          val: 1,
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
    // 关闭指派弹框
    assignClose() {
      this.assignShow = false;
    },
    //指派
    assign() {},
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "已通过";
      } else if (value == 3) {
        value = "未通过";
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
