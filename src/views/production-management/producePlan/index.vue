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
        v-if="permission.producePlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        size="small"
        v-if="permission.producePlan_synchronization"
        type="primary"
        @click="synchronous"
        >同步</el-button
      >
      <el-button
        size="small"
        v-if="permission.producePlan_add"
        type="primary"
        icon="el-icon-plus"
        @click="add"
        >新增</el-button
      >
      <el-dropdown
        v-if="permission.producePlan_batchOperation"
        style="margin-left: 10px"
        @command="handleBatchOperation"
      >
        <el-button size="small"> 批量操作 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">配方设置</el-dropdown-item>
          <el-dropdown-item command="b">权重等级</el-dropdown-item>
          <el-dropdown-item command="c">MRP计算</el-dropdown-item>
          <el-dropdown-item command="d">批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        v-if="permission.producePlan_export"
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
        <el-table-column prop="planSn" width="160" label="计划号">
          <template slot-scope="scope">
            <el-link @click="handleDetail(scope.row)"
              >{{ scope.row.planSn }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          prop="materialName"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          prop="materialSn"
          width="140"
          label="产品编码"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="organName" label="客户名称"></el-table-column>
        <el-table-column prop="sum" label="数量(方)"></el-table-column>
        <el-table-column prop="modulus" label="模数"></el-table-column>
        <el-table-column prop="wordCount" label="块数"></el-table-column>
        <el-table-column
          width="120"
          prop="deliveryDate"
          label="交货日期"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="productionLine"
          label="生产产线"
        ></el-table-column>
        <el-table-column
          prop="orderSn"
          width="160"
          label="销售订单号"
        ></el-table-column>
        <el-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.producePlan_audits">
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
                  @click="handleAudit(scope.row)"
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.producePlan_split">
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
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.producePlan_scheduling">
              <el-tooltip
                class="item"
                effect="dark"
                content="排程"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-s-unfold"
                  @click="handleSchedule(scope.row)"
                  :disabled="scope.row.status != 2"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.producePlan_edits">
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
              v-if="permission.producePlan_details"
              :to="{
                path: '/production-management/producePlan/detail',
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
              v-if="permission.producePlan_deletes"
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
    <el-dialog
      :title="batchOperationTitle"
      width="40%"
      append-to-body
      v-if="showBatchOperation"
      :close-on-click-modal="false"
      :visible.sync="showBatchOperation"
      :before-close="handleClose1"
    >
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="200px" class="form-footer">
        <el-form-item
          v-if="
            batchOperationTitle != '拆分条件' && batchOperationTitle != '排程'
          "
          :label="formItemLable"
        >
          <el-select v-if="formItemLable == '权重等级:'" v-model="form.weight">
            <el-option
              v-for="item of weightList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select
            v-if="formItemLable == '产品配方:' || formItemLable == 'MRP计算:'"
            size="small"
            v-model="form.productFormula"
            placeholder="请选择"
            @change="handleChangeProductFormula"
          >
            <el-option
              v-for="item in productFormulaList"
              :key="item.id"
              :label="item.proBomName"
              :value="item.proBomName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="batchOperationTitle == '拆分条件'" label="模数:">
          <el-input
            class="splitInput"
            v-model="form.modulus"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            @input="handleKeyUp($event)"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="batchOperationTitle == '拆分条件'"
          label="数量(方):"
        >
          <el-input
            class="splitInput"
            placeholder="自动计算"
            disabled
            v-model="form.sum"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="batchOperationTitle == '拆分条件'" label="块数:">
          <el-input
            class="splitInput"
            disabled
            placeholder="自动带出"
            v-model="form.wordCount"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="batchOperationTitle == '排程'" label="排程日期:">
          <el-date-picker
            size="small"
            v-model="scheduleDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button
          size="small"
          :loading="auditLoading"
          type="primary"
          @click="batchConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getWorkshopList } from "@/api/planning/workOrder";
import paginationMixin from "@/mixins/pagination";
import {
  getProductionPlanByPage,
  synchronous,
  audit,
  setWeight,
  deleteProductionPlan,
  splitProductionPlan,
  toSchedule,
  setProductFormula,
  getProductionPlanExport,
} from "@/api/manufacture/producePlan";
import { listProductData } from "@/api/base-data/product-data.js";
import { getProductBomList } from "@/api/product/product-bom.js";
import { getProductBom } from "@/api/product/product-bom";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
import { number } from "echarts";
export default {
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      modulus: "",
      exportApi: getProductionPlanExport,
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
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    // //模数
    // modulus() {
    //   return Math.ceil(Number(this.form.sum) / this.singleModeVolume) || 0;
    // },
    //块数
    //   wordCount() {
    //     return Math.ceil(Number(this.form.sum * 1000000) / this.volume) || 0;
    //   },
  },
  async created() {
    Promise.all([
      getWorkshopList(),
      getProductBomList({ current: 1, size: 99999, status: 0 }),
    ]).then((res) => {
      this.workshopOptions = res[0].data.data;
      this.productFormulaList = res[1].data.data.records;
    });
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
    async handleChangeProductFormula(val) {
      let id = "";
      this.productFormulaList.map((el) => {
        if (val == el.proBomName) {
          id = el.id;
        }
      });
      // const res = await getProductBom({ id: id });
      // console.log("Bom", res.data.data);
      this.form.bomId = id;
    },
    //批量操作
    handleBatchOperation(command) {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        const arr = this.multipleSelection.filter((ele) => ele.status !== "0");
        if (arr.length > 0) {
          this.$message.warning("请选择未提交的单据");
          return;
        }
        this.ids = this.multipleSelection.map((ele) => ele.id);
      }
      this.showBatchOperation = true;
      if (command == "a") {
        this.formItemLable = "产品配方:";
        this.batchOperationTitle = "配方设置";
      } else if (command == "b") {
        this.formItemLable = "权重等级:";
        this.batchOperationTitle = "权重等级";
      } else if (command == "c") {
        this.formItemLable = "MRP计算:";
        this.batchOperationTitle = "MRP计算";
      } else if (command == "d") {
        this.formItemLable = "确认删除该条数据吗?";
        this.batchOperationTitle = "删除";
      }
    },
    //批量确认
    async batchConfirm() {
      if (!this.form.sum && this.batchOperationTitle == "拆分条件") {
        return this.$message.warning(`请填写拆分数量`);
      }
      if (this.batchOperationTitle == "配方设置" && !this.form.productFormula) {
        return this.$message.warning(`请选择产品配方`);
      }
      if (this.batchOperationTitle == "MRP计算" && !this.form.productFormula) {
        return this.$message.warning(`请选择产品配方`);
      }
      if (this.batchOperationTitle == "权重等级" && !this.form.weight) {
        return this.$message.warning(`请选择权重等级`);
      }
      this.auditLoading = true;
      if (this.batchOperationTitle == "配方设置") {
        const res = await setProductFormula({
          ids: this.ids.join(","),
          bomId: this.form.bomId,
        });
        if (res.data.code == 200) {
          this.$message.success("设置成功");
          this.auditLoading = false;
        } else {
          this.$message.warning("设置失败");
        }
      } else if (this.batchOperationTitle == "MRP计算") {
        const res = await setProductFormula({
          ids: this.ids.join(","),
          bomId: this.form.bomId,
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("MRP计算成功");
        } else {
          this.$message.warning("MRP计算失败");
        }
      } else if (this.batchOperationTitle == "权重等级") {
        const res = await setWeight({
          ids: this.ids.join(","),
          weight: this.form.weight,
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("设置成功");
        } else {
          this.$message.warning("设置失败");
        }
      } else if (this.batchOperationTitle == "删除") {
        const res = await deleteProductionPlan({
          ids: this.ids.join(","),
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("删除成功");
        } else {
          this.$message.warning("删除失败");
          this.auditLoading = false;
        }
      } else if (this.batchOperationTitle == "拆分条件") {
        const res = await splitProductionPlan({
          id: this.rowId,
          sum: this.form.sum,
          modulus: this.form.modulus,
          wordCount: this.form.wordCount,
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("拆分成功");
          this.form = {};
        } else {
          this.$message.warning("拆分失败");
        }
      } else if (this.batchOperationTitle == "排程") {
        const res = await toSchedule({
          planId: this.rowId,
          startTime: this.scheduleDate[0],
          endTime: this.scheduleDate[1],
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("排程成功");
          this.scheduleDate = [];
        } else {
          this.$message.warning("排程失败");
        }
      } else if (this.batchOperationTitle == "审核") {
        const res = await audit({
          ids: this.ids.join(","),
        });
        if (res.data.code == 200) {
          this.auditLoading = false;
          this.$message.success("审核成功");
          this.scheduleDate = [];
        } else {
          this.$message.warning("审核失败");
        }
      }
      this.handleList();
      this.form = {};
      this.showBatchOperation = false;
    },
    //取消
    cancel() {
      this.showBatchOperation = false;
      this.multipleSelection = [];
      this.$message.info("已取消");
      this.form = {};
      this.$refs.multipleTable.clearSelection();
    },
    handleClose1() {
      this.showBatchOperation = false;
      this.form = {};
    },
    //同步
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
      console.log(this.multipleSelection);
    },

    // 审核
    async handleAudit(row) {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].id != row.id) {
          this.$refs.multipleTable.clearSelection();
          return this.$message.warning("请勿批量操作");
        }
      }
      this.ids = row.id.split(",");
      this.formItemLable = "确定该数据提交审核吗?";
      this.batchOperationTitle = "审核";
      this.showBatchOperation = true;
    },
    //跳转编辑
    handleEdit(data) {
      this.$router.push({
        path: "/production-management/producePlan/edit",
        query: { data: data },
      });
    },
    //排程
    handleSchedule(row) {
      this.rowId = row.id;
      this.showBatchOperation = true;
      this.batchOperationTitle = "排程";
    },
    // 拆分
    async handleAnalysis(row) {
      console.log(row.modulus);
      this.modulus = row.modulus;
      this.showBatchOperation = true;
      this.batchOperationTitle = "拆分条件";
      const res = await listProductData({ productSn: row.materialSn });
      this.sum = row.sum;
      this.rowId = row.id;
      this.singleModeVolume = res.data.data.records[0].singleModeVolume;
      this.volume = res.data.data.records[0].volume;
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getProductionPlanByPage(params);
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
    // 单行删除
    handleDelete(row) {
      this.ids = row.id.split(",");
      this.formItemLable = "确认删除该条数据吗?";
      this.batchOperationTitle = "删除";
      this.showBatchOperation = true;
    },
    // 跳转新增
    add() {
      this.$router.push("/production-management/producePlan/add");
    },
    //跳转详情
    handleDetail(row) {
      this.$router.push({
        path: "/production-management/producePlan/detail",
        query: { data: row },
      });
    },
  },
  filters: {
    statusName(value) {
      //	状态 0 未提交 1 待审核 2 已通过 3 未通过
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "已通过";
      } else if (value == 3) {
        value = "未通过";
      } else if (value == 4) {
        value = "已转排程";
      } else if (value == 5) {
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
