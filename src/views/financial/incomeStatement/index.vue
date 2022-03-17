// 收入单
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.incomeStatement_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/financial/incomeStatement/add')"
        v-if="permission.incomeStatement_add"
        >新 增</el-button
      >
      <el-button
        size="small"
        type="primary"
        @click="transAll"
        v-if="permission.incomeStatement_trans"
        >转总账</el-button
      >
      <el-button
        size="small"
        type="primary"
        @click="auditAll"
        v-if="permission.incomeStatement_trans"
        >审核</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.incomeStatement_examine"
        >批量提交审核</el-button
      > -->
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelInboundManage"
        v-if="permission.incomeStatement_delete"
        >批量删除</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('BillV1.3.1财务收入单.ureport')"
        v-if="permission.incomeStatement_print"
        >导出</el-button
      > -->
      <!-- <el-button
        size="small"
        type="default"
        plain
        @click="handleDelInboundManage"
        v-if="permission.incomeStatement_export"
        >导出</el-button
    
      <el-button
        size="small"
        type="default"
        plain
        @click="handleDelInboundManage"
        v-if="permission.incomeStatement_print"
        >打印</el-button
      >
        > -->
      <!-- <el-button
        size="small"
        icon="el-icon-upload2"
        type="success"
        plain
        v-if="permission.incomeStatement_export"
        >导 出</el-button
      > -->
    </el-row>
    <el-divider></el-divider>
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="incomeListData"
      border
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | approvalName }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="转总账状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.ledgerState | ledgerStatus }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="transStatus" label="转总账状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.ledgerState | ledgerStatus }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="workshopName" label="附件"> </el-table-column> -->
      <el-table-column prop="billSn" label="单据编号" width="150">
        <template slot-scope="scope">
          <el-tooltip :manual="true" v-model="scope.row.showIndex">
            <div slot="content" style="font-size: 14px">
              <div style="padding: 0 0 10px 0; font-size: 16px">产品信息</div>
              <table
                border="1px solid #dedede"
                id="Aclass"
                cellpadding="1"
                cellspacing="1"
                align="center"
                bgcolor="#303133"
              >
                <tr bgcolor="#303133">
                  <td>结算账号</td>
                  <td>收款金额</td>
                  <td>结算方式</td>
                  <td>结算号</td>
                </tr>
                <tr v-if="scope.row.billAccountAmountList.length == 0">
                  <td colspan="4" style="text-align: center">暂无内容</td>
                </tr>
                <tr
                  v-else
                  bgcolor="#303133"
                  v-for="(item, index) in scope.row.billAccountAmountList"
                  :key="index"
                >
                  <td width="auto">{{ item.payAccount }}</td>
                  <td width="auto">{{ item.amount }}</td>
                  <td width="auto">{{ item.payType }}</td>
                  <td width="auto">{{ item.paySn }}</td>
                </tr>
              </table>
              <div style="padding: 10px 0; font-size: 14px">
                摘要:{{ scope.row.remark }}
              </div>
            </div>
            <div
              @mouseenter="mouseenter(scope.row.id)"
              @mouseleave="mouseLeave"
            >
              {{ scope.row.billSn }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="单据日期" width="150">
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="organName" label="客户名称"></el-table-column>
      <!-- <el-table-column prop="handsUsername" label="经手人"></el-table-column> -->
      <el-table-column prop="amount" label="收款金额"></el-table-column>
      <el-table-column prop="businessUsername" label="业务员">
      </el-table-column>
      <el-table-column prop="businessDeptName" label="业务部门">
      </el-table-column>
      <el-table-column prop="createUsername" label="制单人"> </el-table-column>
      <el-table-column prop="auditUsername" label="审核人"> </el-table-column>
      <el-table-column prop="fvoucherID" label="凭证ID"> </el-table-column>
      <el-table-column width="150" label="操作" fixed="right">
        <template slot-scope="scope">
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
              :disabled="scope.row.status === 1"
              @click="examine(scope.row)"
              v-if="permission.incomeStatement_examine"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.incomeStatement_examine &&
              permission.incomeStatement_edit
            "
          ></el-divider>
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
              :disabled="scope.row.status === 1"
              @click="toEdit(scope.row)"
              v-if="permission.incomeStatement_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.incomeStatement_edit &&
              permission.incomeStatement_details
            "
          ></el-divider>
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
              @click="toDetail(scope.row)"
              v-if="permission.incomeStatement_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.incomeStatement_details &&
              permission.incomeStatement_delete
            "
          ></el-divider>
          <span v-if="permission.incomeStatement_delete">
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
                :disabled="scope.row.status === 1"
                @click="handleDelInboundManage(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>
          <el-tooltip
            v-if="permission.incomeStatement_print"
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
    <!-- 分页 -->
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
      >
      </el-pagination>
    </el-row>
    <!-- 查询 -->
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.billSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
          <el-date-picker
            v-model="billDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            placeholder="请输入项目名称"
            v-model="searchForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input
            placeholder="请输入客户名称"
            v-model="searchForm.organName"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款金额">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.amountType"
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
              v-model="searchForm.amount"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="业务员">
          <el-select
            size="small"
            v-model="searchForm.businessUser"
            placeholder="请选择"
          >
            <el-option
              v-for="item in applyUsernameOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务部门">
          <el-select
            size="small"
            v-model="searchForm.businessDept"
            placeholder="请选择"
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.deptName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.makeBillUsername"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input
            placeholder="请输入审核人"
            v-model="searchForm.auditUsername"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <dialog-select-subject
      :visible.sync="subjectDialogVisible"
      @selected="onSelectSubject"
    ></dialog-select-subject>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  queryIncomeAndExpenditurePage,
  del,
  review,
  transLedger,
  detailsIncomeAndExpenditure,
} from "@/api/financial/financial";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
import { getEmployeeFileList } from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import dialogSelectSubject from "@/components/dialog-select/subject";
export default {
  mixins: [paginationMixin, exportMixin],
  components: {
    dialogSelectSubject,
  },
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      deptOptions: [],
      applyUsernameOptions: [],
      searchForm: {},
      recordForm: {}, //暂存数据
      pdfIdApi: "/finance/bill/getIncomeBillsReportPDF",
      incomeListData: [],
      ids: [],
      tableRowData: [],
      billDate: [],
      subjectDialogVisible: false,
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改收入管理" || from.name === "收入管理详情") {
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
    const res = await getEmployeeFileList({ current: 1, size: 99999 });
    this.applyUsernameOptions = res.data.data.pages.records;
    const res1 = await getDepartmentList();
    this.deptOptions = res1.data.data;
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  filters: {
    billStatus: function (value) {
      if (value == 0) {
        return "未审核";
      } else if (value == 1) {
        return "已审核";
      }
    },
    ledgerStatus: function (value) {
      if (value == 0) {
        return "待转";
      } else if (value == 1) {
        return "已转";
      }
    },
  },
  methods: {
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.tableRowData.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status 0待审核;1已审核;2已完成;3已关闭
      let flag = this.tableRowData.filter((item) => {
        return item.status === 2;
      });
      // 未审核：0  已审核  1
      if (flag.length <= 0 || flag.length != this.tableRowData.length) {
        this.$message.warning("请选择已审核的数据导出");
        return;
      }
      ids = this.tableRowData.map((ele) => ele.id);
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        //  页面跳转
        ids = ids.join(",");
        var win = window.open(
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 获取列表
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        type:2
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await queryIncomeAndExpenditurePage(params);
      res.data.data.records.forEach((item) => {
        item.showIndex = false;
      });
      this.incomeListData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async mouseenter(id) {
      this.incomeListData.map((item, index) => {
        if (id == item.id) {
          console.log(id);
          item.showIndex = true;
          detailsIncomeAndExpenditure({ id: id }).then((res) => {
            this.incomeListData[index].billAccountAmountList =
              res.data.data.billAccountAmountList;
          });
        }
      });
    },

    mouseLeave() {
      this.incomeListData.map((item) => {
        item.showIndex = false;
      });
    },
    // 查询
    onSearch() {
      this.currentPage = 1;
      if (this.billDate) {
        this.searchForm.startTime = this.billDate[0];
        this.searchForm.endTime = this.billDate[1];
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.billDate = [];
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 选择表格
    handleSelectionChange(value) {
      this.tableRowData = value;
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 审核
    async auditAll(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      let flag = this.tableRowData.filter((item) => {
        return item.status != 0;
      });
      console.log("sh", flag);
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的单据");
        return;
      }
      await this.$confirm("确定该收入单提交审核吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      let res = await review({ ids: ids });
      if (res.data.success) {
        this.handleList();
        this.$message.success("操作成功");
      }
    },
    // 转总账
    async transAll() {
      let ids = this.tableRowData.map((x) => x.id);
      if (this.tableRowData.length != 1)
        return this.$message.warning("只能选择一条单据");
      let flag = this.tableRowData.filter((item) => {
        return item.status != 2 || item.ledgerState != 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择已审核且未转总账的单据");
        return;
      }
      this.subjectDialogVisible = true;
      this.doingIds = ids;
    },
    async onSelectSubject(e) {
      console.log('123',e);
      await this.$confirm("确定要对选中单据进行转总账操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      let ids = this.doingIds;
      let res = await transLedger({
        id: ids[0],
        token: e.token,
        lender: JSON.stringify({
          FNumber: e.picked[0].FNumber,
          FName: e.picked[0].FName,
          FAccountID: e.picked[0].FAccountID,
        }),
        borrower: JSON.stringify({
          FNumber: e.picked[1].FNumber,
          FName: e.picked[1].FName,
          FAccountID: e.picked[1].FAccountID,
        }),
        FName: e.picked[2].FName,
        FGroupID: e.picked[2].FGroupID,
        menuName: "收入管理",
      });
      if (res.data.Data) this.$message.success(res.data.Data);
      else this.$message.error(res.data.Message);
      this.handleList();
    },
    // 删除
    async handleDelInboundManage(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      console.log(this.tableRowData);
      let flag = this.tableRowData.filter((item) => {
        return item.status != 0;
      });
      console.log(flag);
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据");
        return;
      }
      await this.$confirm("确定要删除该收入单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await del({ ids: ids });
      if (res.data.success) {
        this.handleList();
        this.$message.success("操作成功");
      }
    },
    toEdit(row) {
      this.$router.push({
        path: "/financial/incomeStatement/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/financial/incomeStatement/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#Aclass {
  font-size: 14px;
  td {
    padding: 5px;
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
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
