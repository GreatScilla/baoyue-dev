<template>
  <div class="add-dialog">
    <!-- <el-row class="margin-bottom-20">
      <div class="search-box">
        <el-input></el-input>
        <i class="el-icon-search padding-right-10 cursor-style" @click="searchProduct"></i>
      </div>
    </el-row> -->
    <el-row>
      <el-form label-width="80px">
        <el-col :span="8">
          <el-form-item label="人员名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="所在部门:">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label-width="20px" >
            <el-button
              size="small"
              icon="el-icon-search"
              type="primary"
              @click="searchProduct"
            >
              查 询
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="margin-bottom-20">
      <!-- <el-col :span="6">
        <p>选择人员</p>
        <el-tree 
          :data="productCateList"
          productCateList
          :props="defaultProps"
          show-checkbox
          >
        </el-tree>
      </el-col> -->
      <el-col :span="24">
        <el-table
          border
          :data="tableData"
          class="margin-bottom-20"
          highlight-current-row
          @current-change="handleColumnChange"
        >
          <!-- <el-table-column prop="stock" label="数量"></el-table-column> -->
          <!-- <el-table-column prop="deptName" label="人员编码"></el-table-column> -->
          <el-table-column prop="name" label="人员名称"></el-table-column>
          <el-table-column prop="deptName" label="所在部门"></el-table-column>
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
  </div>
</template>

<script>
import { getByDept } from "@/api/common";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "user",
  props: {
    deptId: {
      type: Number,
      default: null,
    },
  },
  mixins: [paginationMixin],
  data() {
    return {
      defaultProps: {
        children: "productCateList",
        label: "cateName",
      },
      form: {
        name: "",
        deptName: "",
      },
      multipleSelection: [],
      tableData: [],
    };
  },
  mounted() {
    this.handleList();
  },
  methods: {
    async handleList() {
      const data = await getByDept({
        deptId: this.deptId,
        name: this.form.name,
        deptName: this.form.deptName,
        current: this.currentPage,
        size: this.pageSize,
      });
      this.tableData = data.data.data.records;
      this.total = data.data.data.total;
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
    searchProduct() {
      this.currentPage=1
      this.handleList();
    },
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
.add-dialog {
  padding-bottom: 20px;
}
</style>