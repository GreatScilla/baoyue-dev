// 销售对账单
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
        <!-- <el-form-item label="单据编号:" prop="accountStaSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.accountStaSn"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="项目名称:" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="form.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:" prop="customerName">
          <el-input
            placeholder="请输入客户名称"
            v-model="form.customerName"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单量:">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.orderAllNumType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="form.orderAllNum"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="总数量:">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.detailAllNumType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="form.detailAllNum"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="总金额:">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.allMoneyType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input placeholder="请输入" v-model="form.allMoney"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="结算方式:" prop="paymentType">
          <el-input
            placeholder="请输入结算方式"
            v-model="form.paymentType"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单时间:">
          <el-date-picker
            @change="changeTime"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
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
        v-if="permission.statement_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.statement_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.statement_audit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.statement_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.statement_printer"
        size="small"
        icon="el-icon-download"
        plain
        @click="handExport"
        >导出</el-button
      > -->
      <el-button
        v-if="permission.statement_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('AccountStatementV.1.2.05销售对账单.ureport')"
        >导出</el-button
      >
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="单据状态" prop="status" width="100px">
          <template slot-scope="{ row }">
            <span class="margin-right-20">{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="附件" prop="pic"> </el-table-column> -->
        <el-table-column
          prop="accountStaSn"
          label="单据编号"
          width="160px"
        ></el-table-column>
        <el-table-column
          prop="customerName"
          label="客户"
          width="120px"
        ></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="100px">
        </el-table-column>
        <!-- <el-table-column prop="contractSn" label="关联合同">
        </el-table-column>
        <el-table-column prop="sendAddress" label="客户地区">
        </el-table-column>-->
        <el-table-column
          prop="orderAllNum"
          label="订单量"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="detailAllNum"
          label="总数量"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="allMoney"
          label="总金额"
          width="120px"
        ></el-table-column>
        <!-- <el-table-column prop="paymentType" label="结算方式" width="120px">
        </el-table-column>-->
        <el-table-column
          prop="createTime"
          label="制单时间"
          width="160px"
        ></el-table-column>
        <el-table-column prop="createUserName" label="制单人"></el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.statement_audit"
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
              ></el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.statement_audit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.statement_edit"
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
              ></el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.statement_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.statement_detail"
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
              ></el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.statement_detail"
              direction="vertical"
            ></el-divider>
            <span v-if="permission.statement_delete">
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
                  :disabled="scope.row.status !== 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.statement_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                :disabled="!(scope.row.status == 2)"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
              ></el-button>
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
      ></el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getAccountStatementByPage,
  deleteApi,
  audit,
} from "@/api/salesManage/statement";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      pdfIdApi: "/erp/accountStatement/getShopAccountBillsReportPDF",
      form: {
        accountStaSn: "",
        customerName: "",
        startDay: "",
        endDay: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading: false,
      deleteApi: deleteApi,
      auditApi: audit,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑销售对账单" || from.name === "销售对账单详情") {
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
      this.currentPage = recordObj.pageNum;
      this.pageSize = recordObj.pageSize;
      delete recordObj.pageNum;
      this.form = recordObj.data;
    }
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //导出
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status 0待审核;1已审核;2已完成;3已关闭
      let flag = this.multipleSelection.filter((item) => {
        return item.status === 2;
      });
      // 未审核：0  已审核  1
      if (flag.length <= 0 || flag.length != this.multipleSelection.length) {
        this.$message.warning("请选择已审核的数据导出");
        return;
      }
      ids = this.multipleSelection.map((ele) => ele.id);
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // debugger;
        //  页面跳转
        ids = ids.join(",");
        var win = window.open(
          this.$report1 +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      if (this.form.orderAllNumType && !this.form.orderAllNum) {
        return this.$message.warning("请输入订单量");
      }
      if (this.form.detailAllNumType && !this.form.detailAllNum) {
        return this.$message.warning("请输入总数量");
      }
      if (this.form.allMoneyType && !this.form.allMoney) {
        return this.$message.warning("请输入总金额");
      }
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: {
          ...this.form,
          type: 0,
        },
      };
      this.recordForm = params;
      const res = await getAccountStatementByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/salesManage/statement/add",
      });
    },
    handleEdit(row) {
      // 编辑
      this.$router.push({
        path: "/salesManage/statement/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/salesManage/statement/detail",
        query: {
          data: row,
        },
      });
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    changeTime(value) {
      if (value !== null) {
        this.form.startDay = value[0];
        this.form.endDay = value[1];
      } else {
        this.form.startDay = this.form.endDay = "";
      }
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
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
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>
