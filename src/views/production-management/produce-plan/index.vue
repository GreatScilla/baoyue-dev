// 生产计划
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
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.receiptNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
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
    <el-row style="margin: 20px 0">
      <el-button
        v-if="permission.producePlan_expore"
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <!-- <el-button
        v-if="permission.producePlan_audit"
        plain
        size="small"
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.producePlan_delete"
        size="small"
        @click="handleDelete()"
        >批量删除
      </el-button>
      <!-- <el-button
        v-if="permission.producePlan_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('MesProductionPlanV1.2.1生产计划单.ureport')"
        >导出</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="documentsStateName" label="状态">
          <template slot-scope="scope">
            {{ scope.row.documentsState | approvalName }}
          </template>
        </el-table-column>
        <el-table-column prop="receiptNo" label="单据编号"> </el-table-column>
        <el-table-column prop="deliveryDate" label="交货日期">
        </el-table-column>
        <el-table-column prop="makingPeople" label="制单人"> </el-table-column>
        <el-table-column prop="reviewerName" label="审核人"> </el-table-column>
        <el-table-column width="210" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.producePlan_audit">
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
                  :disabled="scope.row.documentsState !== '0'"
                  @click="handleAudit(scope.row)"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.producePlan_edit">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  :disabled="scope.row.documentsState !== '0'"
                  icon="el-icon-edit-outline"
                  @click="toEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <span v-if="permission.producePlan_analysis">
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
                  :disabled="!(scope.row.documentsState === '2')"
                  @click="handleAnalysis(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <router-link
              v-if="permission.producePlan_detail"
              :to="{
                path: '/production-management/produce-plan/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button type="text" size="small" icon="el-icon-tickets">
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <span v-if="permission.producePlan_delete">
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
                  :disabled="scope.row.documentsState !== '0'"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <el-tooltip
              v-if="permission.producePlan_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                :disabled="!(scope.row.documentsState == 2)"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
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
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getProducePlanList,
  remove,
  audit,
} from "@/api/manufacture/produce-plan";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      searchDate: [],
      pdfIdApi: "/mes/productionplan/getProductionPlanBillsReportPDF",
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      multipleSelection: [],
      productionTypeStatusList: [],
      searchDialogVisible: false, //查询
      auditLoading:false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑生产计划" || from.name === "生产计划详情") {
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
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status
      let flag = this.multipleSelection.filter((item) => {
        return item.documentsState === "2";
      });
      console.log(flag);
      //   已审核  2
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
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
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
        this.auditLoading =true
        const res = await audit({ subIdList: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
          this.auditLoading =false
        }
      } catch (error) {
        console.log(error);
        this.auditLoading =false
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      getProducePlanList(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜素
    searchRole() {
      if (this.searchDate) {
        this.searchForm.deliveryStartDate = this.searchDate[0];
        this.searchForm.deliveryEndDate = this.searchDate[1];
      }
      this.currentPage = 1;
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
    //跳转编辑
    toEdit(data) {
      this.$router.push({
        path: "/production-management/produce-plan/edit",
        query: { data: data },
      });
    },
    //跳转物料分析
    handleAnalysis() {
      this.$router.push("/production-management/materiel-demand-analysis");
    },
    //删除角色
    async handleDelete(row) {
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
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await remove({ productionPlanIds: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error);
        // this.$message.error("已取消删除");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
