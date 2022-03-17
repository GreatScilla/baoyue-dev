// 排程工单
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
        <el-form-item label="项目名称:">
          <el-input
            placeholder="请输入项目名称"
            v-model="searchForm.projectName"
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
            v-model="searchForm.model"
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
        v-if="permission.scheduleSingle_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.scheduleSingle_delete"
        size="small"
        @click="handleDelete()"
      >
        批量删除
      </el-button>
      <el-button
        v-if="permission.scheduleSingle_export"
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
          prop="scheduleSn"
          width="160"
          label="排程号"
        ></el-table-column>
        <el-table-column prop="modulus" label="模数"></el-table-column>
        <el-table-column
          width="120"
          prop="completedModulus"
          label="已完成模数"
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
        <el-table-column prop="sum" label="数量(方)"></el-table-column>

        <el-table-column prop="wordCount" label="块数"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeName }}</span>
          </template>
        </el-table-column>
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
            <span v-if="permission.scheduleSingle_split">
              <el-tooltip
                class="item"
                effect="dark"
                content="拆分"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-scissors"
                  @click="handleAnalysis(scope.row)"
                  :disabled="
                    scope.row.status != 0 ||
                    scope.row.outNum > 0 ||
                    scope.row.modulus <= 0 ||
                    scope.row.inNum > 0
                  "
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.scheduleSingle_split">
              <el-tooltip
                class="item"
                effect="dark"
                content="并模"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-guide"
                  @click="handleMergeModule(scope.row)"
                  :disabled="
                    scope.row.inNum >= 2 ||
                    scope.row.outNum > 0 ||
                    scope.row.status == 1 ||
                    scope.row.modulus <= 0 ||
                    tableData.length <= 1
                  "
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.scheduleSingle_toDistribution">
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
                  @click="toDistribution(scope.row)"
                  :disabled="scope.row.status != 0 || scope.row.modulus <= 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.scheduleSingle_edit">
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
                  :disabled="scope.row.status != 0 || scope.row.modulus <= 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <router-link
              v-if="permission.scheduleSingle_detail"
              :to="{
                path: '/production-management/scheduleSingle/detail',
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
              v-if="permission.scheduleSingle_delete"
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
                :disabled="scope.row.status != 0 || scope.row.modulus <= 0"
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
        <el-form-item label="模数:">
          <el-input
            class="splitInput"
            v-model="form.modulus"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            @input="handleKeyUp($event)"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量(方):">
          <el-input
            class="splitInput"
            placeholder="自动计算"
            disabled
            v-model="form.sum"
          ></el-input>
        </el-form-item>

        <el-form-item label="块数:">
          <el-input
            class="splitInput"
            disabled
            placeholder="自动带出"
            v-model="form.wordCount"
          ></el-input>
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
    <el-dialog
      title="并模"
      width="70%"
      append-to-body
      v-if="showMergeModule"
      :visible.sync="showMergeModule"
      :before-close="handleClose1"
    >
      <el-divider></el-divider>
      <el-row>
        <el-form label-width="100px" class="zw-criterion">
          <el-row>
            <el-col :span="6">
              <el-form-item label="产品编码">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="mergeModuleForm.materialSn"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="mergeModuleForm.materialName"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="规格型号">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="mergeModuleForm.model"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="search-footer">
                <el-button @click="reset1('form')" size="small">重置</el-button>
                <el-button type="primary" size="small" @click="searchRole1"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          :data="tableData1"
          ref="multipleTable"
          border
          style="width: 100%; margin-bottom: 20px"
          @row-click="rowClick"
        >
          <el-table-column
            prop="scheduleSn"
            width="160"
            label="排程号"
          ></el-table-column>
          <el-table-column prop="modulus" label="模数"></el-table-column>
          <el-table-column
            width="120"
            prop="completedModulus"
            label="已完成模数"
          ></el-table-column>
          <el-table-column
            prop="materialName"
            width="120"
            label="产品名称"
          ></el-table-column>
          <el-table-column
            prop="materialSn"
            width="140"
            label="产品编码"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="model"
            label="规格型号"
          ></el-table-column>
          <el-table-column
            width="140"
            prop="projectName"
            label="项目名称"
          ></el-table-column>
          <el-table-column
            width="140"
            prop="organName"
            label="客户名称"
          ></el-table-column>
          <el-table-column
            width="140"
            prop="manufacturingShop"
            label="生产车间"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="productionLine"
            label="生产产线"
          ></el-table-column>
          <el-table-column prop="sum" label="数量(方)"></el-table-column>

          <el-table-column prop="wordCount" label="块数"></el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeName }}</span>
            </template>
          </el-table-column>
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
        </el-table>
      </el-row>
      <el-row class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="pageSizes1"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
          background
        ></el-pagination>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form
            ref="inModulusForm"
            :model="inModulusForm"
            label-width="100px"
            class="form-footer"
          >
            <el-form-item label="并入模数:">
              <el-input
                class="splitInput"
                placeholder="可编辑"
                oninput="value=value.replace(/[^0-9.]/g,'')"
                v-model="inModulusForm.inModulus"
                @input="changeMergeModuleNum($event)"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel1">取 消</el-button>
        <el-button size="small" type="primary" @click="batchConfirm1"
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
  getScheduleWorkOrderExport,
  updateMerge,
} from "@/api/manufacture/scheduleSingle";
import { getProductBomList } from "@/api/product/product-bom.js";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      modulus: "",
      deleteApi: deleteScheduleWorkOrder,
      exportApi: getScheduleWorkOrderExport,
      productFormulaList: [],
      scheduleDate: [], //排程日期
      rowId: "",
      ids: [], //id
      sum: "", //数量（方）
      volume: "", //单位体积
      singleModeVolume: "", //单模体积
      weightList: [
        { code: 1, name: "A" },
        { code: 2, name: "B" },
        { code: 3, name: "C" },
      ],
      workshopOptions: [],
      formItemLable: "产品配方:",
      batchOperationTitle: "配方设置",
      form: {},
      showBatchOperation: false,
      labelPosition: "right",
      planStatusList: [],
      searchForm: {},
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading: false,
      showMergeModule: false,
      mergeModuleForm: {},
      rowModulus: "",
      currentPage1: 1,
      pageSize1: 5,
      total1: 0,
      pageSizes1: [5, 10, 15, 20, 25],
      mainId: "",
      inModulusForm: {},
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    //模数
    // modulus() {
    //   return Math.ceil(Number(this.form.sum) / this.singleModeVolume) || 0;
    // },
    //块数
    // wordCount() {
    //   return Math.ceil(Number(this.form.sum * 1000000) / this.volume) || 0;
    // },
  },
  async created() {
    const res = await getWorkshopList();
    this.workshopOptions = res.data.data;
    const res1 = await getProductBomList({
      current: 1,
      size: 99999,
      status: 0,
    });
    this.productFormulaList = res1.data.data.records;
    this.handleList(this.searchForm);
  },
  methods: {
    handleKeyUp(e) {
      if (e >= Number(this.modulus)) {
        this.form = {};
        return this.$message.warning(`拆分模数不能大于等于${this.modulus}`);
      }
      this.form.sum = (Number(e) * this.singleModeVolume).toFixed(4);
      this.form.wordCount = Math.ceil(
        Number(this.form.sum * 1000000) / this.volume
      );

      // if (e >= Number(this.sum)) {
      //   this.form = {};
      //   return this.$message.warning(`拆分数量不能大于等于${this.sum}`);
      // }
    },
    // 查询角色
    async handleList1(...arg) {
      let params = {
        current: this.currentPage1,
        size: this.pageSize1,
        mainId: this.mainId,
        inNum: 0,
        status: 0,
        modulus: 0,
        locationId: 0,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getScheduleWorkOrderByPage(params);
      this.tableData1 = res.data.data.records;
      this.total1 = res.data.data.total;
    },
    async handleSizeChange1(pageSize) {
      this.pageSize1 = pageSize;
      this.page1 = 1;
      await this.handleList1(this.mergeModuleForm);
    },
    async handleCurrentChange1(currentPage) {
      this.currentPage1 = currentPage;
      await this.handleList1(this.mergeModuleForm);
    },
    // 搜素
    searchRole1() {
      this.currentPage1 = 1;
      this.handleList1(this.mergeModuleForm);
    },
    //重置
    reset1() {
      this.mergeModuleForm = {};
      this.handleList1(this.mergeModuleForm);
    },

    //跳转下发
    toDistribution(data) {
      if (!data.location) {
        return this.$message.error(`请完善信息!`);
      }
      this.$router.push({
        path: "/production-management/scheduleSingle/distribution",
        query: { row: data },
      });
    },
    //并模
    rowClick(row) {
      this.$set(this.inModulusForm, "inModulus", row.modulus);
      // this.inModulusForm.mergeModuleNum = row.modulus;
      this.inModulusForm.mergeId = row.id;
      this.rowModulus = row.modulus;
    },
    //并模
    handleMergeModule(row) {
      this.rowModulus = row.modulus;
      this.inModulusForm.id = row.id;
      this.mainId = row.id;
      this.handleList1(this.mergeModuleForm);
      this.showMergeModule = true;
    },
    cancel1() {
      this.inModulusForm = {};
      this.showMergeModule = false;
    },
    //并模
    async batchConfirm1() {
      if (!this.inModulusForm.mergeId) {
        return this.$message.warning("请选择并模单据");
      }
      const res = await updateMerge(this.inModulusForm);
      if (res.data.code == 200) {
        this.$message.success("并模成功");
        this.showMergeModule = false;
        this.inModulusForm = {};
        this.handleList(this.searchForm);
      } else {
        this.$message.warning("并模失败");
      }
    },
    changeMergeModuleNum(e) {
      if (e > Number(this.rowModulus)) {
        this.inModulusForm.inModulus = this.rowModulus;
        return this.$message.error(`输入的模数不能大于当前模数`);
      }
    },
    // 拆分
    async handleAnalysis(row) {
      this.showBatchOperation = true;
      this.batchOperationTitle = "拆分条件";
      const res = await listProductData({ productSn: row.materialSn });
      this.sum = row.sum;
      this.modulus = row.modulus;
      this.rowId = row.id;
      this.singleModeVolume = res.data.data.records[0].singleModeVolume;
      this.volume = res.data.data.records[0].volume;
    },

    //批量确认
    async batchConfirm() {
      if (this.form.sum > this.sum) {
        return this.$message.warning(`拆分数量不能大于${this.sum}`);
      }
      if (this.batchOperationTitle == "拆分条件") {
        const res = await splitScheduleWorkOrder({
          id: this.rowId,
          sum: Number(this.form.sum),
          modulus: Number(this.form.modulus),
          wordCount: Number(this.form.wordCount),
        });
        if (res.data.code == 200) {
          this.$message.success("拆分成功");
          this.form = {};
          // this.modulus = "";
          // this.wordCount = "";
        } else {
          this.$message.warning("拆分失败");
        }
      }
      this.handleList();
      this.showBatchOperation = false;
    },
    //取消
    cancel() {
      this.form = {};
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
        path: "/production-management/scheduleSingle/edit",
        query: { data: data },
      });
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getScheduleWorkOrderByPage(params);
      this.tableData = res.data.data.records;
      console.log("length", this.tableData.length);

      this.total = res.data.data.total;
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
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未下发";
      } else if (value == 1) {
        value = "已下发";
      }
      return value;
    },
    typeName(value) {
      if (value == 1) {
        value = "量产";
      } else if (value == 2) {
        value = "返工";
      } else if (value == 3) {
        value = "试制";
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
