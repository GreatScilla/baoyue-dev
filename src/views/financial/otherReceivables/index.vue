// 其他应收
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.otherReceivables_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/financial/otherReceivables/add')"
        v-if="permission.otherReceivables_add"
        >新 增</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.otherReceivables_examine"
        >批量提交审核</el-button
      > -->
      <el-button
        size="small"
        type="primary"
        @click="transAll"
        v-if="permission.otherReceivables_trans"
        >转总账</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelInboundManage"
        v-if="permission.otherReceivables_delete"
        >批量删除</el-button
      >
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.otherReceivables_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.otherReceivables_print">打 印</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="otherReceivablesListData"
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
                  <td>收支项目</td>
                  <td>金额</td>
                  <td>备注</td>
                </tr>
                <tr v-if="scope.row.billAccountAmountList.length == 0">
                  <td colspan="3" style="text-align: center">暂无内容</td>
                </tr>
                <tr
                  v-else
                  bgcolor="#303133"
                  v-for="(item, index) in scope.row.billAccountAmountList"
                  :key="index"
                >
                  <td width="auto">{{ item.type| payType}}</td>
                  <td width="auto">{{ item.amount }}</td>
                  <td width="auto">{{ item.remark }}</td>
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
      <el-table-column prop="businessName" label="业务类型" width="150">
      </el-table-column>
      <el-table-column prop="createTime" label="单据日期" width="150">
      </el-table-column>
      <el-table-column prop="organName" label="客户名称"></el-table-column>
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
              :disabled="!(scope.row.status === 0)"
              @click="examine(scope.row)"
              v-if="permission.otherReceivables_examine"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.otherReceivables_examine &&
              permission.otherReceivables_edit
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
              :disabled="!(scope.row.status === 0)"
              @click="toEdit(scope.row)"
              v-if="permission.otherReceivables_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.otherReceivables_edit &&
              permission.otherReceivables_detail
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
              v-if="permission.otherReceivables_detail"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.otherReceivables_detail &&
              permission.otherReceivables_delete
            "
          ></el-divider>
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
              :disabled="!(scope.row.status === 0)"
              @click="handleDelInboundManage(scope.row)"
              v-if="permission.otherReceivables_delete"
            >
            </el-button>
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
        <el-form-item label="业务类型:">
          <el-select
            size="small"
            v-model="searchForm.businessType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in businessTypeOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
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
import { mapGetters } from "vuex";
import search from "@/components/search/index";
import { getDictionary } from "@/api/system/dictbiz";
import { getEmployeeFileList } from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import dialogSelectSubject from "@/components/dialog-select/subject";
export default {
  mixins: [paginationMixin],
  components: {
    search,
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
      businessTypeOptions: [], // 业务类型
      searchForm: {},
      recordForm: {}, //暂存数据
      otherReceivablesListData: [],
      ids: [],
      tableRowData: [],
      billDate: [],
      subjectDialogVisible: false,
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改其他应收" || from.name === "其他应收详情") {
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
    const res2 = await getDictionary({ code: "business_type" });
    this.businessTypeOptions = res2.data.data;
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
    payType: function (value) {
      if (value == 2) {
        return "借入";
      } else if (value == 3) {
        return "项目收入";
      }
    },
  },
  methods: {
    getDetail() {
      console.log(12);
    },
    // 获取列表
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        type: 4,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await queryIncomeAndExpenditurePage(params);
      res.data.data.records.forEach((item) => {
        item.showIndex = false;
      });
      this.otherReceivablesListData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async mouseenter(id) {
      this.otherReceivablesListData.map((item, index) => {
        if (id == item.id) {
          console.log(id);
          item.showIndex = true;
          detailsIncomeAndExpenditure({ id: id }).then((res) => {
            this.otherReceivablesListData[index].billAccountAmountList =
              res.data.data.billOtherItemList;
          });
        }
      });
    },
    mouseLeave() {
      this.otherReceivablesListData.map((item) => {
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
    async examine(row) {
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
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的单据");
        return;
      }
      await this.$confirm("确定该其他应收单提交审核吗?", "提示", {
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
      let flag = this.tableRowData.filter((item) => {
        return item.status != 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据");
        return;
      }
      await this.$confirm("确定要删除该其他应收单吗?", "提示", {
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
        path: "/financial/otherReceivables/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/financial/otherReceivables/detail",
        query: {
          data: row,
        },
      });
    },
    // 转总账
    async transAll(row) {
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
      console.log(e);
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
