// 换钢丝
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
        :label-position="labelPosition"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="规格型号1:">
          <el-input
            placeholder="请输入规格型号1"
            v-model="searchForm.modelOne"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格型号2:">
          <el-input
            placeholder="请输入规格型号2"
            v-model="searchForm.modelTwo"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格型号3:">
          <el-input
            placeholder="请输入规格型号3"
            v-model="searchForm.modelThree"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作员:">
          <el-input
            placeholder="请输入操作员"
            v-model="searchForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批员:">
          <el-input
            placeholder="请输入审批员"
            v-model="searchForm.checkPerson"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        size="small"
        v-if="permission.changeWireForm_add"
        type="primary"
        @click="add"
        icon="el-icon-plus"
        >新增</el-button
      >
      <el-button
        v-if="permission.changeWireForm_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button  v-if="permission.changeWireForm_delete" size="small" @click="handleDelete()"> 批量删除 </el-button>
     <el-button
      v-if="permission.changeWireForm_export"
        style="margin-left: 10px"
        size="small"
        plain
        @click="exports(exportApi, searchForm)"
      >
        导出
      </el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column prop="steelWireTime" label="日期"></el-table-column>
        <el-table-column prop="modelOne" label="规格型号1"></el-table-column>
        <el-table-column prop="modelTwo" label="规格型号2"></el-table-column>
        <el-table-column prop="modelThree" label="规格型号3"></el-table-column>
        <el-table-column prop="userName" label="操作员"></el-table-column>
        <el-table-column prop="checkPerson" label="审核人"></el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.changeWireForm_audit">
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
                  :loading="auditLoading"
                  @click="handleAudit(scope.row)"
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <router-link
              v-if="permission.changeWireForm_edit"
              :to="{
                path: '/production-management/changeWireForm/edit',
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
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              v-if="permission.changeWireForm_detail"
              :to="{
                path: '/production-management/changeWireForm/detail',
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
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <el-tooltip
              v-if="permission.changeWireForm_delete"
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
              ></el-button>
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
      ></el-pagination>
    </el-row>
  </basic-container>
</template>
<script>
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import {
  getSteelWireByPage,
  steelWireUpdateStatus,
  steelWireRemove,
  getSteelWireExport
} from "@/api/manufacture/changeWireForm.js";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit,exportMixin],
  data() {
    return {
      dateValue: [],
      auditApi: steelWireUpdateStatus,
      deleteApi: steelWireRemove,
      exportApi:getSteelWireExport,
      ids: [], //id
      teamList: [],
      form: {},
      labelPosition: "right",
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.handleList(this.searchForm);
  },
  methods: {
    // 选择单据日期
    changeDate(value) {
      this.searchForm.steelWireTimeStart = value[0];
      this.searchForm.steelWireTimeEnd = value[1];
    },
    // 跳转新增
    add() {
      this.$router.push("/production-management/changeWireForm/add");
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getSteelWireByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.dateValue = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(value) {
      //status	审核状态 0 未提交 1 待审核 2 已审核 3 审核未通过
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "已审核";
      } else if (value == 3) {
        value = "审核未通过";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
