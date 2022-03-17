// 库存预警
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.earlyWarning_search"
        >查 询</el-button
      >
      <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')" v-if="permission.earlyWarning_add">新 增</el-button>
      <el-button size="small" icon="el-icon-s-check" type="primary" plain @click="examine" v-if="permission.earlyWarning_examine">批量提交审核</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelInboundManage" v-if="permission.earlyWarning_delete">批量删除</el-button> -->
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.earlyWarning_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.earlyWarning_print">打 印</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="earlyWarningTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="预警状态">
          <template slot-scope="scope">
            {{ scope.row.status | status }}
          </template>
        </el-table-column>
        <el-table-column
          prop="productSn"
          label="产品编码"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="specificationName"
          label="规格型号"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="shopCategoryName" label="产品分类">
        </el-table-column>
        <el-table-column prop="unit" label="单位"> </el-table-column>
        <el-table-column prop="realStock" label="现库存"> </el-table-column>
        <el-table-column prop="lowerStock" label="库存下限"> </el-table-column>
        <el-table-column prop="upperStock" label="库存上限"> </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
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
                @click="to('details', scope.row)"
                v-if="permission.earlyWarning_details"
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
    <!-- <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search> -->
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
        <el-form-item label="产品编码">
          <el-input
            placeholder="请输入产品编码"
            v-model="searchForm.productSn"
          ></el-input>
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
            v-model="searchForm.specificationName"
          ></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input
            placeholder="请输入单位"
            v-model="searchForm.unit"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品分类">
          <el-select v-model="searchForm.shopCategoryId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.cateName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in dicData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账面数量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.realStockType"
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
              v-model="searchForm.realStock"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="库存下限">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.lowerStockType"
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
              v-model="searchForm.lowerStock"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="库存上限">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.upperStockType"
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
              v-model="searchForm.upperStock"
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
  getEarlyWarningPage,
  getProductList,
} from "@/api/storageManage/earlyWarning";
import paginationMixin from "@/mixins/pagination";
import search from "@/components/search/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  components: {
    search,
  },
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      searchForm: {},
      recordForm: {}, //暂存数据
      earlyWarningTableData: [],
      ids: [],
      tableRowData: [],
      options: [],
      dicData: [
        {
          value: 1,
          label: "正常",
        },
        {
          value: 2,
          label: "低库存",
        },
        {
          value: 3,
          label: "高库存",
        },
        {
          value: 4,
          label: "停止预警",
        },
      ],
      billDate: [],
      earlyWarningOptions: [
        {
          value: 0,
          label: "待入库",
        },
        {
          value: 1,
          label: "已入库",
        },
      ],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "库存预警详情") {
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
    await this.handleList(this.searchForm);
    await this.initSearchCondition();
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getEarlyWarningPage(params);
      this.earlyWarningTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 初始查询条件
    async initSearchCondition() {
      // 产品分类
      let res = await getProductList();
      this.options = res.data.data;
    },
    // 查询
    onSearch() {
      if (this.searchForm.realStock && !this.searchForm.realStockType) {
        return this.$message.warning("请选择账面数量范围");
      }
      if (this.searchForm.realStockType && !this.searchForm.realStock) {
        return this.$message.warning("请输入账面数量");
      }
      if (this.searchForm.lowerStock && !this.searchForm.lowerStockType) {
        return this.$message.warning("请选择库存下限范围");
      }
      if (this.searchForm.lowerStockType && !this.searchForm.lowerStock) {
        return this.$message.warning("请输入库存下限");
      }
      if (this.searchForm.upperStock && !this.searchForm.upperStockType) {
        return this.$message.warning("请选择库存上限范围");
      }
      if (this.searchForm.upperStockType && !this.searchForm.upperStock) {
        return this.$message.warning("请输入库存上限");
      }
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 跳转
    to(operationState, row) {
      this.$router.push({
        path: "/storageManage/earlyWarning/detail",
        query: {
          operationState,
          row,
        },
      });
    },
  },
  filters: {
    status: function (value) {
      if (value === 1) {
        return "正常";
      } else if (value === 2) {
        return "低库存";
      } else if (value === 3) {
        return "高库存";
      } else if (value === 4) {
        return "停止预警";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
