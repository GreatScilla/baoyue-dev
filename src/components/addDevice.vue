<template>
  <div class="add-dialog">
    <!-- 查询条件 -->
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :inline-message="true"
      label-width="100px"
    >
      <el-form-item label="资产编号:">
        <el-input v-model="form.assetSn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="设备编号:">
        <el-input v-model="form.facilitySn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="资产类别:">
        <el-input v-model="form.assetType" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="search-footer">
        <el-button type="primary" size="small" @click="onSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            border
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
            @current-change="handleColumnChange"
          >
            <el-table-column prop="assetSn" label="资产编号" width="160px">
            </el-table-column>
            <el-table-column prop="facilitySn" label="设备编号" width="160px">
            </el-table-column>
            <el-table-column prop="assetName" label="资产名称" width="120px">
            </el-table-column>
            <el-table-column prop="assetType" label="资产类别" width="120px">
            </el-table-column>
            <el-table-column prop="model" label="规格型号" width="120px">
            </el-table-column>
            <el-table-column
              prop="qualityAssuranceDate"
              label="质保日期"
              width="120px"
            >
            </el-table-column>
            <el-table-column prop="location" label="所在位置">
            </el-table-column>
            <el-table-column prop="department" label="权属部门">
            </el-table-column>
            <el-table-column prop="whomBelongs" label="权属人员">
            </el-table-column>
          </el-table>
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
        </el-col>
      </el-row>
      <div class="margin-bottom-20 footer-box">
        <el-button @click="handleCancel" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getList } from "@/api/asset-management/assetsParameter.js";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "dept",
  mixins: [paginationMixin],
  props: {
    keyWord: {
      type: String,
      default: "",
    },
    productSn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultProps: {
        children: "productCateList",
        label: "cateName",
      },
      multipleSelection: [],
      tableData: [],
      name: "",
      form: {},
      position: "",
      person: "",
      personList: [],
      currentRow: {},
    };
  },
  mounted() {
    this.handleList();
  },
  methods: {
    onSearch() {
      this.currentPage = 1;
      this.handleList();
    },
    async handleList() {
      this.form.facilitySn = this.productSn
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
    submit() {
      this.$emit("on-submit", this.currentRow);
    },
    handleColumnChange(val) {
      this.currentRow = val;
    },
    searchProduct() {},
  },
};
</script>

<style lang="scss" scoped>
/deep/ .search-box {
  width: 240px;
  border: 1px solid #dcdfe6;
  .el-input {
    width: 216px;
  }
  .el-input__inner {
    border: none;
  }
}
</style>
