// 核价管理
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
      <el-form ref="form" :model="form" :inline="true" label-width="90px">
        <el-form-item label="产品名称">
          <el-input
            placeholder="请输入产品名称"
            v-model="form.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.pricingSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input
            placeholder="请输入供应商名称"
            v-model="form.supplierName"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="form.createUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input
            placeholder="请输入审核人"
            v-model="form.checkPerson"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
          <el-date-picker
            v-model="date"
            type="daterange"
            @change="changeTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="handleReset()" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.pricing_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        size="small"
        v-if="permission.pricing_add"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <el-button
        size="small"
        v-if="permission.pricing_audit"
        icon="el-icon-s-check"
        type="success"
        plain
        :loading="auditLoading"
        @click="handleAudit()"
        >审核</el-button
      >
      <el-button
        size="small"
        v-if="permission.pricing_delete"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >删除</el-button
      >
      <!-- <el-button
        size="small"
        v-if="permission.pricing_printer"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('PricingManageV1.6.5采购核价单.ureport')"
        >导出</el-button
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
        <el-table-column label="状态" prop="statusName" width="160px">
          <template slot-scope="{ row }">
            <span class="margin-right-20">{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
        ></el-table-column>
        <el-table-column prop="createTime" label="单据日期"></el-table-column>
        <el-table-column prop="createUserName" label="制单人"></el-table-column>
        <el-table-column prop="checkPerson" label="审核人"></el-table-column>
        <el-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.pricing_audit"
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
                :disabled="
                  scope.row.status === 1 ||
                  scope.row.status === 2 ||
                  scope.row.status === 3
                "
              ></el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.pricing_audit"
              direction="vertical"
            ></el-divider>
            <span>
              <!-- <i class="icon-mes-fanshen"></i> -->
              <el-tooltip
                v-if="permission.pricing_audit"
                class="item"
                effect="dark"
                content="反审核"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-place"
                  @click="deAudit(scope.row.id)"
                  :disabled="scope.row.status !== 2"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.pricing_edit"
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
                :disabled="scope.row.status === 2"
              ></el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.pricing_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.pricing_detail"
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
              v-if="permission.pricing_detail"
              direction="vertical"
            ></el-divider>
            <span v-if="permission.pricing_delete">
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
              v-if="permission.pricing_printer"
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
  getOrderByPage,
  deleteApi,
  audit,
  updatePricingStatus,
} from "@/api/purchase/pricing";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  props: {
    type: {
      type: String,
      default: "sale",
    },
  },
  name: "cunstomerManage",
  data() {
    return {
      pdfIdApi: "/erp/pricing/getPricingBillsReportPDF",
      form: {
        pricingSn: "",
        supplierName: "",
        startTime: "",
        endTime: "",
        productName: "",
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
    if (from.name === "编辑核价管理" || from.name === "核价管理详情") {
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
          this.$report +
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
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: {
          ...this.form,
        },
      };
      this.recordForm = params;
      const res = await getOrderByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    //反审核
    async deAudit(id) {
      try {
        await this.$confirm("确定反审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        const res = await updatePricingStatus({ id: id });
        if (res.data.code === 200) {
          this.handleList();
        }
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/purchaseManage/pricing/add",
      });
    },
    handleEdit(row) {
      // 编辑
      this.$router.push({
        path: "/purchaseManage/pricing/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/purchaseManage/pricing/detail",
        query: {
          data: row,
        },
      });
    },
    handleReset() {
      // 重置
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    changeTime(value) {
      if (value !== null) {
        this.form.startTime = value[0];
        this.form.endTime = value[1];
      } else {
        this.form.startTime = this.form.endTime = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
