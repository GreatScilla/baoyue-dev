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
        <el-form-item label="单据编号:" prop="assetBorrowSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.assetBorrowSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="借用部门:" prop="borrowDepartment">
          <el-select v-model="form.borrowDepartment" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.deptName"
              :label="item.deptName"
              :value="item.deptName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据日期:">
          <el-date-picker
            type="date"
            v-model="form.date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
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
        v-if="permission.borrowReturn_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.borrowReturn_add"
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
        <el-table-column label="状态" prop="statusName" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.status | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetBorrowSn" label="单据编号">
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期"> </el-table-column>
        <el-table-column prop="borrowDepartment" label="借用部门">
        </el-table-column>
        <el-table-column prop="borrower" label="借用人"> </el-table-column>
        <el-table-column prop="returnDate" label="预计归还日期">
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.borrowReturn_audit"
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
                :disabled="scope.row.status != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.borrowReturn_edit"
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
                :disabled="scope.row.status != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.borrowReturn_return"
              class="item"
              effect="dark"
              content="归还"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-thumb"
                @click="handleReturn(scope.row)"
                :disabled="
                  scope.row.status == 0 ||
                  scope.row.status == 1 ||
                  scope.row.status == 3 ||
                  scope.row.status == 5
                "
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.borrowReturn_detail"
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
              v-if="permission.borrowReturn_delete"
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
                :disabled="scope.row.status != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.borrowReturn_return"
              class="item"
              effect="dark"
              content="归还"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-sort"
                @click="revert(scope.row)"
                :disabled="scope.row.status != 2 || scope.row.status != 4"
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
let recordObj = "";
import { getDept } from "@/api/common";
import { deleteApi, audit } from "@/api/salesManage/contract";
import {
  getList,
  updateStatus,
  deleteAssetBorrowBatch,
} from "@/api/asset-management/borrowReturn.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {
        branch: "",
        billNo: "",
        billDate: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteAssetBorrowBatch,
      auditApi: audit,
      options: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑合同" || from.name === "合同详情") {
      recordObj = JSON.parse(sessionStorage.getItem("recordForm"));
      next();
    } else {
      recordObj = "";
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.form = recordObj.data;
    }
    const data = await getDept({
      name: "",
      current: 1,
      size: 100,
    });
    this.options = data.data.data.records;
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //归还
    handleReturn(row) {
      this.$router.push({
        path: "/asset-management/borrowReturn/return",
        query: {
          data: row,
        },
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
      this.recordForm = params;
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/borrowReturn/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/borrowReturn/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/borrowReturn/detail",
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
        const res = await updateStatus({ ids: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消审核");
      }
    },
    // 归还
    revert(row) {
      this.$router.push({
        path: "/asset-management/borrowReturn/detail",
        query: {
          data: row,
          go: 1,
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
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "待归还";
      } else if (value == 3) {
        value = "审核未通过";
      } else if (value == 4) {
        value = "部分归还";
      } else if (value == 5) {
        value = "已归还";
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
