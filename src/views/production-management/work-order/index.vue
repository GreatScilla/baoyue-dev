// 工单管理
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
      <el-form ref="form" label-width="90px" class="form-footer">
        <el-form-item label="工单号">
          <el-input
            size="small"
            v-model="workOrderForm.productionOrdersEncode"
            placeholder="请输入工单号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="车间">
          <el-input
            size="small"
            v-model="workOrderForm.workShop"
            placeholder="请输入车间"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="制造数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.minNum"
            ></el-input>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              -
            </div>
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.maxNum"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select
            size="small"
            v-model="workOrderForm.productionOrdersStatusId"
            placeholder="请选择"
            @change="changeResourceType"
          >
            <el-option
              v-for="item in workOrder"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工单类型">
          <el-input
            size="small"
            v-model="workOrderForm.productionOrdersTypeName"
            placeholder="请输入工单类型"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="时间">
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
        <el-form-item label="已分配数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.minNumAssignedQuantity"
            ></el-input>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              -
            </div>
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.maxNumAssignedQuantity"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="未分配数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.minNumUnallocatedQuantity"
            ></el-input>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              -
            </div>
            <el-input
              placeholder="请输入"
              v-model="workOrderForm.maxNumUnallocatedQuantity"
            ></el-input>
          </div>
        </el-form-item>
        <!-- <el-form-item label="产品">
          <el-input
            placeholder="请输入编码或名称"
            v-model="workOrderForm.productNoAndProductName"
            size="small"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchWorkOrder"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.workOrder_expore"
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <!-- <el-button size="small" @click="synchronous" type="primary"
        >同步</el-button
      > -->
      <el-button
        v-if="permission.workOrder_add"
        size="small"
        type="primary"
        @click="add"
        >新增</el-button
      >
      <el-button
        v-if="permission.workOrder_delete"
        size="small"
        plain
        @click="handleDelWorkOrder"
        >批量删除</el-button
      >
      <!-- <el-button size="small">导出</el-button>
      <el-button size="small">打印</el-button> -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="workOrderTableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="productionOrdersEncode" label="工单号">
        </el-table-column>
        <el-table-column prop="factoryName" label="车间"> </el-table-column>
        <!-- <el-table-column prop="productEncode" label="产品编码">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column> -->
        <el-table-column label="制造数量">
          <template slot-scope="scope">
            {{ scope.row.planNumber || "无" }}
          </template>
        </el-table-column>
        <el-table-column label="计划开始时间">
          <template slot-scope="scope">
            {{ scope.row.planStartTime || "无" }}
          </template>
        </el-table-column>
        <el-table-column label="计划结束时间">
          <template slot-scope="scope">
            {{ scope.row.planEndTime || "无" }}
          </template>
        </el-table-column>
        <el-table-column label="工单状态">
          <template slot-scope="scope">
            {{ scope.row.productionOrdersStatusName || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="productionOrdersTypeName" label="工单类型">
        </el-table-column>
        <el-table-column prop="assignedQuantity" label="已分配数量">
        </el-table-column>
        <el-table-column prop="unallocatedQuantity" label="未分配数量">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.workOrder_distribution">
              <el-tooltip
                class="item"
                effect="dark"
                content="分配"
                placement="bottom"
              >
                <el-button
                  :disabled="
                    scope.row.unallocatedQuantity === '0' ||
                    scope.row.productionOrdersStatusName === '下达'
                  "
                  type="text"
                  size="small"
                  icon="el-icon-copy-document"
                  @click="toDistribution(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.workOrder_edit">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  :disabled="
                    scope.row.unallocatedQuantity === '0' ||
                    scope.row.productionOrdersStatusName === '下达'
                  "
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  @click="toEidt(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <router-link
              v-if="permission.workOrder_detail"
              :to="{
                path: '/production-management/work-order/detail',
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
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import { synchronous } from "@/api/manufacture/pre-production-plan";
import {
  getWorkOrderPage,
  delWorkOrder,
  getWorkOrderState,
} from "@/api/planning/workOrder";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      workOrderTableData: [],
      workOrderForm: {
        productionOrdersEncode: "",
        productNoAndProductName: "",
        planStartTime: "",
        planEndTime: "",
        productionOrdersStatusId: "",
      },
      recordForm: {}, //暂存数据
      ids: [],
      workOrder: [],
      searchDialogVisible: false,
      searchDate: "", //时间
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "工单分配" || from.name === "编辑工单"|| from.name === "工单详情") {
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
  created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.workOrderForm = recordObj;
    }
    this.handleList(this.workOrderForm);
    this.initWorkOrderState();
  },
  methods: {
    //跳转分配
    toDistribution(data) {
      this.$router.push({
        path: "/production-management/work-order/distribution",
        query: { row: data },
      });
    },
    //跳转编辑
    toEidt(data) {
      this.$router.push({
        path: "/production-management/work-order/edit",
        query: { data: data },
      });
    },
    async synchronous() {
      const res = await synchronous();
      if (res.data.code === 200) {
        this.$message.success("同步成功");
      }
    },
    // 工单状态
    initWorkOrderState() {
      getWorkOrderState()
        .then((res) => {
          this.workOrder = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 分页查询工单
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      getWorkOrderPage(params)
        .then((res) => {
          this.workOrderTableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 多行删除
    handleDelWorkOrder() {
      if (this.ids.length === 0) {
        return this.$message.warning("请选择至少一条数据");
      }
      this.$confirm("确定要删除该工单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delWorkOrder({ productionOrdersIdList: this.ids })
            .then((res) => {
              if (res.data.success) {
                this.handleList(this.workOrderForm);
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
    // 工单搜索
    searchWorkOrder() {
      if (this.searchDate) {
        this.workOrderForm.planStartTime = this.searchDate[0];
        this.workOrderForm.planEndTime = this.searchDate[1];
      } else {
        this.workOrderForm.planStartTime = "";
        this.workOrderForm.planEndTime = "";
      }
      this.currentPage = 1;
      this.handleList(this.workOrderForm);
      this.searchDialogVisible = false;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 重置
    reset() {
      this.workOrderForm={productionOrdersStatusId: 0}
      this.handleList(this.workOrderForm);
       this.searchDialogVisible = false;
    },
    // 跳转
    // /production-management/work-order/workOrderDetail
    add() {
      this.$router.push("/production-management/work-order/add");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
.el-date-editor {
  width: 190px;
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 80px !important;
  }
}
</style>
