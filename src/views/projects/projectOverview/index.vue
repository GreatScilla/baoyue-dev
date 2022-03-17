// 项目概览
<template>
  <basic-container>
    <!-- 搜索条件弹窗 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <!-- 搜索 -->
      <el-form
        :model="projectOverviewForm"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="项目编号">
          <el-input
            size="small"
            v-model="projectOverviewForm.projectSn"
            placeholder="请输入项目编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            size="small"
            v-model="projectOverviewForm.projectName"
            placeholder="请输入项目名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目负责人">
          <el-input
            size="small"
            v-model="projectOverviewForm.projectLead"
            placeholder="请输入项目负责人"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="关联合同">
          <el-input
            size="small"
            v-model="projectOverviewForm.contractSn"
            placeholder="请输入关联合同"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="计划工期">
          <el-input
            size="small"
            v-model="projectOverviewForm.planPeriod"
            placeholder="请输入计划工期"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input
            size="small"
            v-model="projectOverviewForm.customer"
            placeholder="请输入客户名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="客户联系人">
          <el-input
            size="small"
            v-model="projectOverviewForm.customerLead"
            placeholder="请输入客户联系人"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            size="small"
            v-model="projectOverviewForm.creationTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 操作栏 -->
    <el-row style="margin-bottom: 20px">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.project_overview_search"
      >
        查询
      </el-button>
      <el-button
        v-if="permission.project_overview_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
      >
        新增
      </el-button>
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete"
        v-if="permission.project_overview_delete"
      >
        批量删除
      </el-button>
    </el-row>

    <!-- 表格table -->
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      @selection-change="handleSelectionChange"
      :data="projectOverviewTableData"
      border
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <!-- <el-table-column prop="projectStage" label="项目阶段">
            </el-table-column> -->
      <el-table-column prop="projectSn" label="项目编号"> </el-table-column>
      <el-table-column prop="projectName" label="项目名称"> </el-table-column>
      <el-table-column prop="contractSn" label="合同编号"> </el-table-column>
      <el-table-column prop="contractSn" label="状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="0"
            disabled
            :inactive-value="1"
            active-color="#319b36"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="contractSn" label="发货限制">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="0"
            disabled
            :inactive-value="1"
            active-color="#319b36"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="projectLead" label="项目负责人"> </el-table-column>
      <el-table-column prop="planPeriod" label="计划工期" align="center">
        <template slot-scope="{ row }">
          {{ row.planPeriod ? row.planPeriod + "月" : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="项目需求描述" width="110">
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称"> </el-table-column>
      <el-table-column prop="customerLead" label="客户联系人">
      </el-table-column>
      <el-table-column width="150" label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{
              path: '/projects/projectOverview/edit',
              query: { data: scope.row },
            }"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit-outline"
              title="编辑"
              v-if="permission.project_overview_edit"
            />
          </router-link>
          <router-link
            :to="{
              path: '/projects/projectOverview/detail',
              query: { data: scope.row },
            }"
            style="margin: 0 8px"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-tickets"
              title="详情"
            />
          </router-link>

          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
            icon="el-icon-delete"
            title="删除"
            v-if="permission.project_overview_delete"
          />
          <!-- <el-button
                        type="text"
                        size="small"
                        @click="handleDelSettlementMethod(scope.row)"
                        icon="el-icon-s-operation"
                        title="进度"
                    /> -->
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
  </basic-container>
</template>

<script>
let recordObj = "";
import { mapGetters } from "vuex";
import {
  queryProjectOverviewPage,
  delProjectOverview,
} from "@/api/projects/projectOverview";
import paginationMixin from "@/mixins/pagination";
import code from "@/mixins/code";
export default {
  mixins: [paginationMixin, code],
  data() {
    return {
      value: true,
      projectOverviewForm: {},
      recordForm: {}, //暂存数据
      projectOverviewTableData: [],
      creationTime: [],
      ids: [],
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑项目概览" || from.name === "项目概览详情") {
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
      this.projectOverviewForm = recordObj.data;
    }
    this.handleList();
  },
  methods: {
    changeType() {},
    // 选择单据日期
    // changeDate(value){
    //   this.projectOverviewForm.beginTime = value[0]
    //   this.palletForm.endTime = value[1]
    // },
    // 获取列表
    async handleList() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        data: this.projectOverviewForm,
      };
      this.recordForm = params;
      let res = await queryProjectOverviewPage(params);
      this.searchDialogVisible = false;
      this.projectOverviewTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.projectOverviewForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    // 选择表格
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 删除
    async handleDelete(row) {
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
      try {
        await this.$confirm("确定要删除该项目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delProjectOverview({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        } else {
          this.$message.warning(res.data.msg);
        }
      } catch (error) {
        console.log(error, "error");
        this.$message.info("已取消删除");
      }
    },
    add() {
      this.$router.push("/projects/projectOverview/add");
    },
  },
  computed: {
    ...mapGetters(["permission", "userInfo"]),
  },
  filters: {
    status: function (value) {
      if (value === 0) {
        value = "正常";
      } else if (value === 1) {
        value = "停用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
.normalColor {
  color: #13ce66;
}
.setOutColor {
  color: #ff4949;
}
</style>