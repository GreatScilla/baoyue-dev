// 物料需求分析
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
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
          label-width="110px"
          class="form-footer"
        >
          <el-form-item label="采购/生产编号">
            <el-input v-model="searchForm.planNumber"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="searchForm.productName"></el-input>
          </el-form-item>
          <el-form-item class="search-footer">
            <el-button @click="reset('searchForm')" size="small"
              >重置</el-button
            >
            <el-button type="primary" size="small" @click="searchRole"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-button
         v-if="permission.materielDemandAnalysis_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button size="small">导出 </el-button>
      <el-button size="small">打印 </el-button> -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
          prop="planNumber"
          label="物料需求编号"
        ></el-table-column> -->
        <el-table-column
          prop="sn"
          label="采购/生产编号"
          width="120px"
        ></el-table-column>
        <el-table-column prop="sourceNo" label="销售订单号"></el-table-column>
        <el-table-column prop="productSn" label="产品编码"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="model" label="产品规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="numberOf" label="生产数量"></el-table-column>
        <el-table-column
          prop="stock"
          label="可用库存量"
        ></el-table-column>
        <el-table-column prop="wayNum" label="在途量"></el-table-column>
        <el-table-column prop="deliveryDate" label="交货日期"></el-table-column>
        <!-- <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="to('edit', scope.row)">
              转生产计划
            </el-button>
          </template>
        </el-table-column> -->
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
import { getList } from "@/api/manufacture/materiel-demand-analysis";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchForm: {
        deliveryDate: "",
        planNumber: "", //预计划编号
        productName: "", //产品名称
      },
      tableData: [],
      ids: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.handleList();
  },
  methods: {
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
    // 查询角色
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      getList(params)
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
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {
        deliveryDate: "",
        planNumber: "", //预计划编号
        productName: "", //产品名称
      };
      this.handleList();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
