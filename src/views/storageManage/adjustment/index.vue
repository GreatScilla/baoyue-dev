// 库存调整
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.adjustment_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        v-if="permission.adjustment_add"
        >新 增</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.adjustment_examine"
        >批量提交审核</el-button
      > -->
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDel"
        v-if="permission.adjustment_delete"
        >批量删除</el-button
      >
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.adjustment_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.adjustment_print">打 印</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="adjustmentTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="单据状态">
          <template slot-scope="scope">
            {{ scope.row.status | approvalName }}
          </template>
        </el-table-column>
        <el-table-column prop="number" label="单据编号">
          <template slot-scope="scope">
            <el-tooltip :manual="true" v-model="scope.row.showIndex">
              <div slot="content" style="font-size: 14px">
                <div style="padding: 0 0 10px 0; font-size: 16px">产品信息</div>
                <table
                  border="1px solid #dedede"
                  id="Aclass"
                  cellpadding="1"
                  cellspacing="1"
                  align="center"
                  bgcolor="#303133"
                >
                  <tr bgcolor="#303133">
                    <td>产品编码</td>
                    <td>产品名称</td>
                    <td>规格型号</td>
                    <td>单位</td>
                    <td>仓库</td>
                    <td>库存</td>
                    <td>调整后数量</td>
                    <td>盈亏数量</td>
                    <td>单价</td>
                    <td>盈亏总金额</td>
                  </tr>
                  <tr v-if="scope.row.stockTakingItems.length == 0">
                    <td colspan="10" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.stockTakingItems"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.unit }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.paperQuantity }}</td>
                    <td width="auto">{{ item.takingQuantity }}</td>
                    <td width="auto">{{ item.profitLossQuantity }}</td>
                    <td width="auto">{{ item.unitPrice }}</td>
                    <td width="auto">{{ item.unitTotalPrice }}</td>
                  </tr>
                </table>
              </div>
              <div
                @mouseenter="mouseenter(scope.row.id)"
                @mouseleave="mouseLeave"
              >
                {{ scope.row.number }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="receiptsTypeName" label="单据类型" width="150">
        </el-table-column>
        <!-- <el-table-column prop="depotName" label="盘点仓库" width="150">
        </el-table-column> -->
        <el-table-column prop="newTime" label="盘点日期"> </el-table-column>
        <!-- <el-table-column prop="processTypeName" label="产品名称">
        </el-table-column>
        <el-table-column prop="processTypeName" label="产品编码">
        </el-table-column>
        <el-table-column prop="processTypeName" label="产品分类">
        </el-table-column>
        <el-table-column prop="processTypeName" label="规格型号">
        </el-table-column>
        <el-table-column prop="processTypeName" label="计量单位">
        </el-table-column>
        <el-table-column prop="createUser" label="账面数量">
        </el-table-column>
        <el-table-column prop="checkPerson" label="盈亏数量">
        </el-table-column>
        <el-table-column prop="processTypeName" label="成本单价">
        </el-table-column>
        <el-table-column prop="createUser" label="盈亏成本">
        </el-table-column> -->
        <!-- <el-table-column prop="sourceNumber" label="源单号">
        </el-table-column> -->
        <el-table-column width="140" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.adjustment_examine"
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                @click="examine(scope.row)"
                :disabled="!(scope.row.status === 0)"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.adjustment_edit && permission.adjustment_details"
            ></el-divider>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/adjustment/edit',
                  query: {
                    data: scope.row,
                  },
                }"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  :disabled="!(scope.row.status === 0)"
                  v-if="permission.adjustment_edit"
                >
                </el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.adjustment_edit && permission.adjustment_details"
            ></el-divider>
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/adjustment/detail',
                  query: {
                    data: scope.row,
                  },
                }"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                  v-if="permission.adjustment_details"
                >
                </el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="
                permission.adjustment_details && permission.adjustment_delete
              "
            ></el-divider>
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
                :disabled="!(scope.row.status === 0)"
                @click="handleDel(scope.row)"
                v-if="permission.adjustment_delete"
              >
              </el-button>
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
    <!-- 查询 -->
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
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select v-model="searchForm.type" placeholder="请选择">
            <el-option
              v-for="item in documentType"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点仓库">
          <el-select v-model="searchForm.depotId" placeholder="请选择">
            <el-option
              v-for="item in depotList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点日期">
          <el-date-picker
            v-model="billDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchForm.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input
            placeholder="请输入规格型号"
            v-model="searchForm.model"
          ></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input
            placeholder="请输入计量单位"
            v-model="searchForm.unit"
          ></el-input>
        </el-form-item>
        <el-form-item label="账面数量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.paperQuantityType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.paperQuantity"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="盈亏数量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.profitLossQuantityType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.profitLossQuantity"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="成本单价">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.unitPriceType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.unitPrice"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="盈亏成本">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.unitTotalPriceType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.unitTotalPrice"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getAdjustmentPage,
  examineAdjustment,
  delAdjustment,
  detailsAdjustment,
} from "@/api/storageManage/adjustment";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { getDictionary } from "@/api/system/dictbiz";
import paginationMixin from "@/mixins/pagination";
import search from "@/components/search/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      documentType: [],
      searchForm: {},
      recordForm: {}, //暂存数据
      adjustmentTableData: [],
      ids: [],
      tableRowData: [],
      billDate: [],
      searchDialogVisible: false,
      depotList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑库存调整" || from.name === "库存调整详情") {
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
    const res = await getDictionary({ code: "receipts_type_name" });
    this.documentType = res.data.data;
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
    this.initSearchCondition();
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize, type: 2 };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getAdjustmentPage(params);
      res.data.data.records.forEach((item) => {
        item.stockTakingItems = [];
        item.showIndex = false;
        if (item.file) {
          item.file = item.file.split(",");
        }
      });
      this.adjustmentTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async mouseenter(id) {
      this.adjustmentTableData.map((item, index) => {
        if (id == item.id) {
          // console.log(id);
          item.showIndex = true;
          detailsAdjustment({ id: id }).then((res) => {
            this.adjustmentTableData[index].stockTakingItems =
              res.data.data.stockTakingItems;
          });
        }
      });
    },

    mouseLeave() {
      this.adjustmentTableData.map((item) => {
        item.showIndex = false;
      });
    },
    // 初始查询条件
    async initSearchCondition() {
      let res = await getWarehouseList();
      // 仓库
      this.depotList = res.data.data;
    },
    // 查询
    onSearch() {
      if (this.searchForm.paperQuantity && !this.searchForm.paperQuantityType) {
        return this.$message.warning("请选择账面数量范围");
      }
      if (this.searchForm.paperQuantityType && !this.searchForm.paperQuantity) {
        return this.$message.warning("请输入账面数量");
      }
      if (
        this.searchForm.profitLossQuantity &&
        !this.searchForm.profitLossQuantityType
      ) {
        return this.$message.warning("请选择盈亏数量范围");
      }
      if (
        this.searchForm.profitLossQuantityType &&
        !this.searchForm.profitLossQuantity
      ) {
        return this.$message.warning("请输入盈亏数量");
      }
      if (this.searchForm.unitPrice && !this.searchForm.unitPriceType) {
        return this.$message.warning("请选择成本单价范围");
      }
      if (this.searchForm.unitPriceType && !this.searchForm.unitPrice) {
        return this.$message.warning("请输入成本单价");
      }
      if (
        this.searchForm.unitTotalPrice &&
        !this.searchForm.unitTotalPriceType
      ) {
        return this.$message.warning("请选择盈亏成本范围");
      }
      if (
        this.searchForm.unitTotalPriceType &&
        !this.searchForm.unitTotalPrice
      ) {
        return this.$message.warning("请输入盈亏成本");
      }
      this.currentPage = 1;
      if (this.billDate) {
        this.searchForm.startTime = this.billDate[0];
        this.searchForm.endTime = this.billDate[1];
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.billDate = [];
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 审核
    async examine(row) {
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
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的单据");
        return;
      }
      try {
        await this.$confirm("确定该调整单提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await examineAdjustment({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消审核");
      }
    },
    // 删除
    async handleDel(row) {
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
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据");
        return;
      }
      try {
        await this.$confirm("确定要删除该调整单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delAdjustment({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 选择表格
    handleSelectionChange(value) {
      this.tableRowData = value;
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 跳转
    add() {
      this.$router.push("/storageManage/adjustment/add");
    },
  },
  filters: {
    billStatus: function (value) {
      if (value === 0) {
        return "未审核";
      } else {
        return "已审核";
      }
    },
    bePutStatus: function (value) {
      if (value === 0) {
        return "未入库";
      } else {
        return "已入库";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
#Aclass {
  td {
    padding: 5px;
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>
