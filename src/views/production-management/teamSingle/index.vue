// 班组工单
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
        <el-form-item label="工单号:">
          <el-input
            placeholder="请输入工单号"
            v-model="searchForm.jobSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:">
          <el-input
            placeholder="请输入客户名称"
            v-model="searchForm.organName"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产产线:">
          <el-select
            size="small"
            v-model="searchForm.productionLine"
            placeholder="请选择"
          >
            <el-option
              v-for="item of workshopOptions"
              :key="item.id"
              :label="item.factoryName"
              :value="item.factoryName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品编码:">
          <el-input
            placeholder="请输入产品编码"
            v-model="searchForm.materialSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称:">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchForm.materialName"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格型号:">
          <el-input
            placeholder="请输入规格型号"
            v-model="searchForm.materialSn"
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
        v-if="permission.teamSingle_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.teamSingle_join"
        size="small"
        type="primary"
        @click="handleAnalysis(1, '')"
        >批量交接</el-button
      >
      <el-button v-if="permission.teamSingle_delete" size="small" @click="handleDelete()"> 批量删除 </el-button>
     <el-button
     v-if="permission.teamSingle_export"
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
        <el-table-column prop="weight" label="权重等级">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.weight == '1'
                  ? 'danger'
                  : scope.row.weight == '2'
                  ? 'warning'
                  : ''
              "
              disable-transitions
              >{{ scope.row.weight | weightName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="jobSn"
          width="160"
          label="工单号"
        ></el-table-column>
        <el-table-column
          prop="materialName"
          width="120"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          prop="materialSn"
          width="130"
          label="产品编码"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column prop="inModel" label="并入规格"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="organName" label="客户名称"></el-table-column>
        <el-table-column
          width="120"
          prop="manufacturingShop"
          label="生产车间"
        ></el-table-column>
        <el-table-column
          width="120"
          prop="productionLine"
          label="生产产线"
        ></el-table-column>
        <el-table-column prop="job" label="班组号"></el-table-column>
        <!-- <el-table-column prop="sum" label="数量(方)"></el-table-column>
        <el-table-column prop="modulus" label="模数"></el-table-column>
        <el-table-column prop="wordCount" label="块数"></el-table-column> -->
        <el-table-column
          width="160"
          prop="startTime"
          label="计划开始时间"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          width="160"
          label="计划结束时间"
        ></el-table-column>
        <el-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.teamSingle_join">
              <el-tooltip
                class="item"
                effect="dark"
                content="交接"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-thumb"
                  @click="handleAnalysis(2, scope.row)"
                  :disabled="scope.row.status != 1"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.teamSingle_toIssued">
              <el-tooltip
                class="item"
                effect="dark"
                content="下发"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-set-up"
                  @click="toIssued(scope.row)"
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.teamSingle_edit">
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
                  @click="handleEdit(scope.row)"
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <router-link
              v-if="permission.teamSingle_detail"
              :to="{
                path: '/production-management/teamSingle/detail',
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
              v-if="permission.teamSingle_delete"
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
               <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.teamSingle_putSeal"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
                :disabled="scope.row.status == 0"
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
      :title="batchOperationTitle"
      width="40%"
      append-to-body
      :visible.sync="showBatchOperation"
      :before-close="handleClose"
    >
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="200px" class="form-footer">
        <el-form-item label="班组:">
          <el-select size="small" v-model="form.job" placeholder="请选择">
            <el-option
              v-for="item of teamList"
              :key="item.id"
              :label="item.className"
              :value="item.className"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="batchConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>
<script>
import { getWorkshopList } from "@/api/planning/workOrder";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { listProductData } from "@/api/base-data/product-data.js";
import {
  getScheduleWorkOrderByPage,
  splitScheduleWorkOrder,
  deleteScheduleWorkOrder,
} from "@/api/manufacture/scheduleSingle";
import {
  getJobWorkOrderByPage,
  splitJobWorkOrder,
  toSchedule,
  deleteJobWorkOrder,
  getJobWorkOrderExport
} from "@/api/manufacture/teamWorkOrder";
import { getProductBomList } from "@/api/product/product-bom.js";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit,exportMixin],
  data() {
    return {
      teamList: [],
      deleteApi: deleteJobWorkOrder,
      exportApi:getJobWorkOrderExport,
      pdfIdApi:'/mes/jobWorkOrder/getJobWorkOrderReportPDF',
      productFormulaList: [],
      scheduleDate: [], //排程日期
      rowId: "",
      ids: [], //id
      sum: "", //数量（方）
      volume: "", //单位体积
      singleModeVolume: "", //单模体积
      workshopOptions: [],
      formItemLable: "",
      batchOperationTitle: "",
      form: {},
      showBatchOperation: false,
      labelPosition: "right",
      planStatusList: [],
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    const res = await Promise.all([
      getWorkshopList(),
      getProductBomList({
        current: 1,
        size: 99999,
        status: 0,
      }),
      getShiftList({ current: 0, size: 10000, name: "" }),
    ]);
    this.workshopOptions = res[0].data.data;
    this.productFormulaList = res[1].data.data.records;
    this.teamList = res[2].data.data.records;
    this.handleList(this.searchForm);
  },
  methods: {
    //跳转下发
    async toIssued(row) {
      try {
        await this.$confirm("确定下发该条工单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await toSchedule({ id: row.id });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 交接
    async handleAnalysis(type, row) {
      if (type == 1) {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => ele.status !== "1"
          );
          if (arr.length > 0) {
            this.$message.warning("请选择已下发的单据");
            this.$refs.multipleTable.clearSelection();
            return;
          }
          this.ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      this.showBatchOperation = true;
      this.batchOperationTitle = "交接";
      this.ids = row.id.split(",");
    },
    //批量确认
    async batchConfirm() {
      if (this.batchOperationTitle == "交接") {
        const res = await splitJobWorkOrder({
          ids: this.ids.join(","),
          job: this.form.job,
        });
        if (res.data.code == 200) {
          this.$message.success("交接成功");
          this.form = {};
        } else {
          this.$message.warning("交接失败");
        }
      }
      this.handleList();
      this.showBatchOperation = false;
    },
    //取消
    cancel() {
      this.showBatchOperation = false;
      this.$message.info("已取消");
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //跳转编辑
    handleEdit(data) {
      this.$router.push({
        path: "/production-management/teamSingle/edit",
        query: { data: data },
      });
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getJobWorkOrderByPage(params);
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
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未下发";
      } else if (value == 1) {
        value = "已下发";
      } else if (value == 2) {
        value = "已交接";
      } else if (value == 3) {
        value = "已完成";
      }
      return value;
    },
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.splitInput {
  width: 50%;
}
</style>
