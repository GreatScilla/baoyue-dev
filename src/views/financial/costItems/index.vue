// 费用项目
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.costItems_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/financial/costItems/add')"
        v-if="permission.costItems_add"
        >新 增</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.costItems_examine"
        >批量提交审核</el-button
      > -->
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDel"
        v-if="permission.costItems_delete"
        >批量删除</el-button
      >
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.costItems_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.costItems_print">打 印</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="costItemsTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | approvalName }}
          </template>
        </el-table-column>
        <el-table-column prop="receiptSn" label="单据编号" width="150">
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="150">
        </el-table-column>
        <el-table-column prop="feeType" label="费用类型">
          <template slot-scope="scope">
            {{ scope.row.feeType | feeType }}
          </template>
        </el-table-column>
        <el-table-column prop="applyUsername" label="申请人"> </el-table-column>
        <el-table-column prop="businessDeptName" label="申请部门">
        </el-table-column>
        <el-table-column prop="amount" label="金额"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
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
                v-if="permission.costItems_examine"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.costItems_examine && permission.costItems_edit"
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
                v-if="permission.costItems_edit"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.costItems_edit && permission.costItems_details"
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
                v-if="permission.costItems_details"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.costItems_details && permission.costItems_delete"
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
                @click="handleDel(scope.row)"
                v-if="permission.costItems_delete"
              >
              </el-button>
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
            v-model="searchForm.receiptSn"
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
        <el-form-item label="费用类型">
          <el-select
            size="small"
            v-model="searchForm.feeType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in costOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人">
          <el-select
            size="small"
            v-model="searchForm.applyUsername"
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
        <el-form-item label="申请部门">
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
        <el-form-item label="金额">
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
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  queryCostItemsPage,
  reviewCostItems,
  delCostItems,
} from "@/api/financial/costItems";
import { getEmployeeFileList } from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import paginationMixin from "@/mixins/pagination";
import search from "@/components/search/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  components: {
    search,
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
      costOptions: [
        {
          value: 1,
          label: "采购",
        },
        {
          value: 2,
          label: "项目",
        },
      ],
      searchForm: {},
      recordForm: {}, //暂存数据
      costItemsTableData: [],
      ids: [],
      tableRowData: [],
      billDate: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改费用项目" || from.name === "费用项目详情") {
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
    await this.handleList(this.searchForm);
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await queryCostItemsPage(params);
      this.costItemsTableData = res.data.data.records;
      this.total = res.data.data.total;
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
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的费用项目");
        return;
      }
      await this.$confirm("确定该费用项目提交审核吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      let res = await reviewCostItems({ ids: ids });
      if (res.data.success) {
        this.handleList();
        this.$message.success("操作成功");
      }
    },
    // 删除
    async handleDel(row) {
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
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的费用项目");
        return;
      }
      await this.$confirm("确定要删除该费用项目吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delCostItems({ ids: ids });
      if (res.data.success) {
        this.handleList();
        this.$message.success("操作成功");
      }
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
    // 跳转编辑
    toEdit(row) {
      this.$router.push({
        path: "/financial/costItems/edit",
        query: {
          data: row,
        },
      });
    },
    // 跳转
    toDetail(row) {
      this.$router.push({
        path: "/financial/costItems/detail",
        query: {
          data: row,
        },
      });
    },
  },
  filters: {
    billStatus: function (value) {
      if (value === 0) {
        return "待审核";
      } else {
        return "已审核";
      }
    },
    feeType: function (value) {
      if (value == 1) {
        return "采购";
      } else {
        return "项目";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
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
