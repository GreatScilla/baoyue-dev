
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
        <el-form-item label="工单单号:" prop="assetsRepairSn">
          <el-input
            placeholder="请输入"
            v-model="form.assetsRepairSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="工单名称:" prop="assetsRepairName">
          <el-input
            placeholder="请输入"
            v-model="form.assetsRepairName"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人:" prop="createUserName">
          <el-input
            placeholder="请输入"
            v-model="form.createUserName"
          ></el-input>
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
        v-if="permission.assetRepair_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.assetRepair_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.salesManage_contract_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      > -->
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter()"
        >打印</el-button
      >
      <el-button
        size="small"
        type="default"
        plain
        @click="handlePrinter('BillV1.02.1财务支出单.ureport')"
        >导出</el-button
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
        <el-table-column label="状态" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.assetsRepairStatus | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修状态" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.repairStatus | repairStatusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetsRepairSn" label="报修编号" width="160px">
        </el-table-column>
        <el-table-column prop="assetsRepairName" label="名称" width="160px">
        </el-table-column>
        <el-table-column prop="createTime" label="工单日期" width="150px">
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人" width="120px">
        </el-table-column>
        <el-table-column prop="errorDescription" label="描述">
        </el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.assetRepair_audit"
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
                :disabled="scope.row.assetsRepairStatus != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.assetRepair_audit"
              class="item"
              effect="dark"
              content="验收"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-thumb"
                @click="handleAcceptance(scope.row)"
                :disabled="scope.row.repairStatus != 2"
                
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.assetRepair_edit"
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
                :disabled="scope.row.assetsRepairStatus != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.assetRepair_detail"
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
              v-if="permission.assetRepair_delete"
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
                :disabled="scope.row.assetsRepairStatus != 0"
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
    <!-- 选择部门弹框 -->
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
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
      options: [],
    };
  },
  async created() {
    const data = await getDept({
      name: "",
      current: 100,
      size: 1,
    });
    this.options = data.data.records;
    this.handleList();
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
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: 0,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/assetRepair/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/assetRepair/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/assetRepair/detail",
        query: {
          data: row,
        },
      });
    },
    handleAcceptance(row) {
      // 验收
      this.$router.push({
        path: "/asset-management/repairOrder/edit",
        query: {
          data: row,
        },
      });
    },
    async handleAduit(row) {
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
          const arr = this.multipleSelection.filter((ele) => ele.status !== 0);
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
        const res = await updateStatusAssetsRepair(0, ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消审核");
      }
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
    repairStatusName(value) {
      //	维修状态 0 计划中 1 执行中 2 待验收 3 已完成
      if (value == 0) {
        value = "计划中";
      } else if (value == 1) {
        value = "维修中";
      } else if (value == 2) {
        value = "待验收";
      } else if (value == 3) {
        value = "已完成";
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
