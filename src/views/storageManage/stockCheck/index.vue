// 库存查看
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.stockCheck_search"
        >查 询</el-button
      >
      <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="" v-if="permission.stockCheck_export">导出</el-button> -->
    </el-row>
    <el-divider></el-divider>

    <!-- 表格 -->
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="stockCheckTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          prop="productNumber"
          label="产品编号"
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
          prop="productSpecificationName"
          label="产品规格"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="productCategoryName" label="产品分类">
        </el-table-column>
        <el-table-column prop="stockUnitName" label="库存单位">
        </el-table-column>
        <el-table-column prop="stock" label="现存量"> </el-table-column>
        <el-table-column prop="depotName" label="所属仓库"> </el-table-column>
        <el-table-column prop="onPassage" label="在途量"> </el-table-column>
        <!-- <el-table-column prop="onPassage" label="可用库存量">
        </el-table-column> -->
        <el-table-column width="100" label="操作" fixed="right">
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
                @click="to(scope.row)"
                v-if="permission.stockCheck_details"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
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
        <el-form-item label="产品编码">
          <el-input
            placeholder="请输入产品编码"
            v-model="searchForm.productNumber"
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
            v-model="searchForm.productSpecificationName"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品分类">
          <el-select
            ref="test"
            v-model="searchForm.executeUserName"
            placeholder="请选择"
            style="width: 30%"
          >
            <el-option :value="treeDataValue" style="height: auto">
              <el-tree
                ref="tree"
                :data="options"
                default-expand-all
                node-key="id"
                :props="defaultProps"
                @node-click="nodeClick"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存单位">
          <el-input
            placeholder="请输入库存单位"
            v-model="searchForm.stockUnitName"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-select v-model="searchForm.depotId" placeholder="请选择仓库名称">
            <el-option
              v-for="item in depotList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现存量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.stockType"
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
              v-model="searchForm.stock"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="在途量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.onPassageType"
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
              v-model="searchForm.onPassage"
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
import { getStockCheckPage } from "@/api/storageManage/stockCheck";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { getProductCates } from "@/api/product/pruduct-categroy";
import paginationMixin from "@/mixins/pagination";
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
      searchForm: {},
      recordForm: {}, //暂存数据
      stockCheckTableData: [],
      productCategoryName: "",
      filterProductClassification: "",
      productClassification: [],
      warehouseOptions: [],
      options: [],
      depotList: [],
      searchDialogVisible: false,
      //
      treeDataValue: "",
      defaultProps: {
        label: "cateName",
        value: "id",
        children: "productCateList",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "库存详情") {
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
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
    this.initResources();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  watch: {
    filterProductClassification(val) {
      this.$refs.productClassificationTree.filter(val);
    },
  },
  methods: {
    // 查询分页
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getStockCheckPage(params);
      this.stockCheckTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 获取产品分类以及仓库
    async initResources() {
      let res = await Promise.all([getProductCates(), getWarehouseList()]);
      // 查询产品分类下拉框
      this.options = res[0].data.data;
      // 查询仓库名称下拉框
      this.depotList = res[1].data.data;
    },
    // 查询
    onSearch() {
      if (this.searchForm.stock&&!this.searchForm.stockType) {
        return this.$message.warning("请选择现存量范围");
      }
      if (this.searchForm.stockType&&!this.searchForm.stock) {
        return this.$message.warning("请输入现存量");
      }
      if (this.searchForm.onPassage&&!this.searchForm.onPassageType) {
        return this.$message.warning("请选择在途里范围");
      }
      if (this.searchForm.onPassageType&&!this.searchForm.onPassage) {
        return this.$message.warning("请输入在途里");
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
    to(row) {
      this.$router.push({
        path: "/storageManage/stockCheck/detail",
        query: {
          row,
        },
      });
    },
    //
    nodeClick(data, node, nodeData) {
      this.treeDataValue = data;
      this.searchForm.executeUserId = data.id;
      this.searchForm.executeUserName = data.cateName;
      this.$refs.test.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
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
