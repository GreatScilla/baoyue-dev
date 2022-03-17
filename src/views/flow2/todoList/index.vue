//待办事务
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
        label-width="130px"
        class="form-footer"
      >
        <el-form-item label="流程名称">
          <el-input placeholder="请输入流程名称" v-model="searchForm.processName"></el-input>
        </el-form-item>
        <el-form-item label="审批项目是否完成">
          <el-select
            v-model="searchForm.processFinishStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in processFinishStatusData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
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
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          min-width="100"
          prop="processType"
          label="流程名称"
        ></el-table-column>
        <el-table-column
          min-width="100"
          prop="currentNodeName"
          label="当前步骤"
        ></el-table-column>
        <el-table-column
          min-width="100"
          prop="currentNodeApproverName"
          label="审批人"
        >
        </el-table-column>
        <el-table-column min-width="100" prop="byTheTime" label="申请时间">
        </el-table-column>
        <el-table-column min-width="50" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              :to="{
                path: '/flow2/todoList/edit',
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
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              :to="{
                path: '/flow2/todoList/detail',
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
            </router-link>
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
let recordObj = "";
import { getApprovalList } from "@/api/flow2/todoList.js";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],

  data() {
    return {
      billDate: [],
      processFinishStatusData: [
        { value: 0, label: "发起" },
        { value: 1, label: "审批中" },
        { value: 2, label: "驳回" },
        { value: 3, label: "完成" },
        { value: 4, label: "撤销" },
        { value: 5, label: "同意" },
      ],
      id: "",
      status: "",
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      searchDialogVisible: false,
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "处理待办事务" || from.name === "待办事务详情") {
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
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //打开审核弹窗
    check(id) {
      this.status = "";
      this.id = id;
      this.dialogFormVisible = true;
    },
    //审核
    async lssue() {
      if (this.status) {
        let form = {
          reportId: Number(this.id),
          status: this.status,
        };
        let res = await isQualified(form);
        if (res.data.code === 200) {
          this.$message.success("审核成功");
          this.dialogFormVisible = false;
          this.handleList();
        }
      } else {
        this.$message.info("内容不能为空");
      }
    },
    // 查询角色
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        status: 0,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      const res = await getApprovalList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.$store.commit("SET_UNREADNUM", this.total);
    },
    // 搜索
    searchRole() {
      if (this.billDate) {
        this.searchForm.startDay = this.billDate[0];
        this.searchForm.endDay = this.billDate[1];
      } else {
        this.searchForm.startDay = "";
        this.searchForm.endDay = "";
      }
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.billDate = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
</style>
