// 合同管理
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
        <el-form-item label="合同编号:" prop="contractNumber">
          <el-input
            placeholder="请输入合同编号"
            v-model="form.contractNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="合同名称:" prop="contractName">
          <el-input
            placeholder="请输入合同名称"
            v-model="form.contractName"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:" prop="memberName">
          <el-input
            placeholder="请输入客户名称"
            v-model="form.memberName"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售员:" prop="salesMan">
          <el-input
            placeholder="请输入销售员"
            v-model="form.salesMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期:">
          <el-date-picker
            @change="changeTime"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
        v-if="permission.salesManage_contract_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.salesManage_contract_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.salesManage_contract_audit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.salesManage_contract_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter()"
        >打印</el-button
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
        <el-table-column label="单据状态" prop="statusName" width="160px">
          <template slot-scope="{ row }">
            <span>{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="附件" prop="pic"> </el-table-column> -->
        <el-table-column prop="contractNumber" label="合同编号" width="160px">
        </el-table-column>
        <el-table-column prop="contractName" label="合同名称" width="160px">
        </el-table-column>
        <el-table-column
          prop="contractStartDate"
          label="签订日期"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="memberName" label="客户名称" width="120px">
        </el-table-column>
        <el-table-column prop="depotName" label="部门名称" width="120px">
        </el-table-column>
        <el-table-column prop="salesMan" label="销售员" width="120px">
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.salesManage_contract_audit"
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
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.salesManage_contract_audit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.salesManage_contract_edit"
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
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.salesManage_contract_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.salesManage_contract_detail"
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
            <el-divider
              v-if="permission.salesManage_contract_detail"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.salesManage_contract_delete"
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
                :disabled="scope.row.status !== 0"
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
let recordObj = "";
import { getContractList, deleteApi, audit } from "@/api/salesManage/contract";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {
        contractName: "",
        memberName: "",
        salesMan: "",
        contractStartDate: "",
        contractEndDate: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
                auditLoading:false,
      deleteApi: deleteApi,
      auditApi: audit,
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
        current: this.currentPage,
        size: this.pageSize,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getContractList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/salesManage/contract/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/salesManage/contract/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/salesManage/contract/detail",
        query: {
          data: row,
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
