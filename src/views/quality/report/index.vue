// 质检报工
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
        label-width="100px"
        class="form-footer"
      >
        <!-- <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.reportNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属工单">
          <el-input
            placeholder="请输入所属工单"
            v-model="searchForm.workOrderNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select
            v-model="searchForm.executeUserId"
            placeholder="请选择执行人"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报工人">
          <el-select v-model="searchForm.doneUserId" placeholder="请选择报工人">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        v-if="permission.qualityReport_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button
        v-if="permission.qualityReport_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('WorkOrderV.1.5.1化验单.ureport')"
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="80" prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="reportNo"
          width="130"
          label="单据编号"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="workOrderNo"
          label="所属工单"
        ></el-table-column>
        <el-table-column width="130" prop="productSn" label="产品编号">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="model" label="规格型号"> </el-table-column>
        <el-table-column
          prop="executeUserName"
          label="执行人"
        ></el-table-column>
        <el-table-column prop="hour" label="实际工时"></el-table-column>
        <el-table-column prop="doneUserName" label="报工人"></el-table-column>
        <el-table-column
          width="150"
          prop="remark"
          label="备注"
        ></el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.qualityReport_audit">
              <el-tooltip
                class="item"
                effect="dark"
                content="审核"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-s-check"
                  :disabled="scope.row.status !== 0"
                  @click="check(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <router-link
              v-if="permission.qualityReport_edit"
              :to="{
                path: '/quality/report/edit',
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
                :disabled="scope.row.status == 1||scope.row.status == 2"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              v-if="permission.qualityReport_detail"
              :to="{
                path: '/quality/report/detail',
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
              v-if="permission.qualityReport_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                :disabled="scope.row.status == 0"
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
    <el-dialog
      title="审核弹窗"
      class="search-dialog"
      :before-close="handleClose"
      append-to-body
      width="500px"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item>
          <el-radio v-model="status" :label="1">合格</el-radio>
          <el-radio v-model="status" :label="2">不合格</el-radio>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="dialogFormVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="lssue">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import { getEmployeeFileList } from "@/api/humanResources/employeeFile";
import {
  reportPage,
  isQualified,
} from "@/api/quality/process";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
import { getUser } from "@/api/base-data/user.js";
export default {
  mixins: [paginationMixin, exportMixin],

  data() {
    return {
      options1: [],
      options2: [],
      pdfIdApi: "/quality/report/getReportReportPDF",
      id: "",
      status: "",
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      searchDialogVisible: false,
      dialogFormVisible: false, //审核弹窗
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改质检报工" || from.name === "质检报工详情") {
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
      this.currentPage = recordObj.params.pageNum;
      this.pageSize = recordObj.params.pageSize;
      delete recordObj.params.pageNum;
      this.searchForm = recordObj.data;
    }
    this.handleList();
    const res = await getUser({ current: 1, size: 9999 });
    this.options1 = res.data.data.records;
    const res1 = await getEmployeeFileList({ current: 1, size: 9999 });
    this.options2 = res1.data.data.pages.records;
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status
      let flag = this.multipleSelection.filter((item) => {
        return item.status !== 0;
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
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
      let data = this.searchForm;
      this.recordForm = { params, data };
      const res = await reportPage(params, data);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(val) {
      if (val === 0) {
        return (val = "待审核");
      }
      if (val === 1) {
        return (val = "合格");
      }
      if (val === 2) {
        return (val = "不合格");
      }
    },
    planTypeName(val) {
      switch (val) {
        case 1:
          return "送样检验";

        case 2:
          return "进料检验";

        case 3:
          return "生产入库检验";

        case 4:
          return "销退检验";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
</style>
