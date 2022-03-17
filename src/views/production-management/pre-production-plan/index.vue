// 预生产计划
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
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="预计划编号">
          <el-input
            placeholder="请输入预计划编号"
            v-model="searchForm.planNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售订单号">
          <el-input
            placeholder="请输入销售订单号"
            v-model="searchForm.sourceName"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="100" label="生产计划状态">
          <el-select
            size="small"
            v-model="searchForm.stateProductionPlan"
            placeholder="请选择"
          >
            <el-option
              v-for="item in planStatusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="searchForm.minNum"
            ></el-input>
            <div style="text-algin: center;color:#dddfe7; padding: 0 10px">一</div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.maxNum"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="交货日期">
          <el-date-picker
            size="small"
            v-model="searchDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.makingPeople"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input
            placeholder="请输入审核人"
            v-model="searchForm.reviewerName"
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
        v-if="permission.preProductionPlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        size="small"
        v-if="permission.preProductionPlan_synchro"
        type="primary"
        @click="synchronous"
        >同步</el-button
      >
      <el-button
        size="small"
        v-if="permission.preProductionPlan_add"
        type="primary"
        @click="add"
        >新增</el-button
      >
      <el-button
        size="small"
        v-if="permission.preProductionPlan_analysis"
        type="primary"
        @click="handleAnalysis()"
        >转物料分析</el-button
      >
      <!-- <el-button
        plain
        size="small"
        v-if="permission.preProductionPlan_audit"
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <!--      <el-button size="small" type="danger" plain @click="handleDelRole"-->
      <!--      >导出-->
      <!--      </el-button-->
      <!--      >-->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="productName" label="产品名称"></el-table-column>-->
        <el-table-column prop="documentsStateName" label="状态">
          <template slot-scope="scope">
            {{ scope.row.documentsState | approvalName }}
          </template>
        </el-table-column>
        <el-table-column prop="planNumber" label="单据编号"></el-table-column>
        <el-table-column prop="sourceName" label="销售订单号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column
          prop="stateProductionPlanName"
          label="生产计划状态"
        ></el-table-column>
        <el-table-column
          prop="memberUserName"
          label="客户名称"
        ></el-table-column>
        <el-table-column prop="numberOf" label="总数量"></el-table-column>
        <el-table-column prop="deliveryDate" label="交货日期"></el-table-column>
        <el-table-column prop="makingPeople" label="制单人"></el-table-column>
        <el-table-column prop="reviewerName" label="审核人"></el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.preProductionPlan_audit">
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
                  :disabled="scope.row.documentsState !== '0'"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.preProductionPlan_analysis">
              <el-tooltip
                class="item"
                effect="dark"
                content="转物料分析"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-s-unfold"
                  @click="handleAnalysis(scope.row)"
                  :disabled="
                    !(scope.row.documentsState === '2') ||
                    scope.row.materialStatus === '1'
                  "
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.preProductionPlan_edit">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.documentsState !== '0'"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  @click="handleEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <router-link
              v-if="permission.preProductionPlan_detail"
              :to="{
                path: '/production-management/pre-production-plan/detail',
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
                  @click="handleDetail(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <el-tooltip
              v-if="permission.preProductionPlan_delete"
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
                :disabled="scope.row.documentsState !== '0'"
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
let recordObj = "";
import {
  getPreProductionPlan,
  audit,
  remove,
  synchronous,
  analysis,
} from "@/api/manufacture/pre-production-plan";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchDate: [],
      labelPosition: "right",
      planStatusList: [],
      searchForm: {
        deliveryDate: "",
        planNumber: "", //预计划编号
        productName: "", //产品名称
        sourceName: "", //产品名称
        stateProductionPlan: "",
        minNum: "",
        maxNum: "",
        deliveryStartDate: "",
        deliveryEndDate: "",
      },
      recordForm: {}, //暂存数据
      tableData: [],
      options: [
        {
          value: 0,
          label: "未生产",
        },
        {
          value: 1,
          label: "生产完毕",
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading:false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑预生产计划" || from.name === "预生产计划详情") {
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
    async synchronous() {
      const res = await synchronous();
      if (res.data.code === 200) {
        this.handleList(this.searchForm);
        this.$message.success("同步成功");
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 审核
    async handleAudit(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => ele.documentsState !== "0"
          );
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
        this.auditLoading = true
        const res = await audit({ subIdList: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          this.auditLoading = false
          await this.handleList();
        }
      } catch (error) {
        this.auditLoading =false
        console.log(error);
      }
    },
    //跳转编辑
    handleEdit(data) {
      this.$router.push({
        path: "/production-management/pre-production-plan/edit",
        query: { data: data },
      });
    },

    // 转物料分析
    async handleAnalysis(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => !(ele.documentsState === "2") || ele.materialStatus === "1"
          );
          if (arr.length > 0) {
            this.$message.warning("当前数据无法转物料分析!");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定分析该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await analysis({ subIdList: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      const getPreProductionPlanRes = await getPreProductionPlan(params);
      this.tableData = getPreProductionPlanRes.data.data.records;
      this.total = getPreProductionPlanRes.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      if (this.searchDate) {
        this.searchForm.deliveryStartDate = this.searchDate[0];
        this.searchForm.deliveryEndDate = this.searchDate[1];
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchDate = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove({ preProductionPlanIds: ids })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole(row.id);
    },
    // 多行删除
    handleDelRole() {
      this.funDelRole(this.ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/production-management/pre-production-plan/add");
    },
  },
};
</script>

<style lang="scss" scoped>
.allNum {
  display: flex;
  /deep/.el-input {
    width: 80px !important;
  }
}
</style>
