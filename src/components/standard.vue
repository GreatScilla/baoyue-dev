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
      <el-form-item label="标准编码:">
        <el-input v-model="form.standardSn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="标准名称:">
        <el-input v-model="form.standardName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="保养分类:">
        <el-input v-model="form.maintainType" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="保养位置:">
        <el-input
          v-model="form.maintenanceParts"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item class="search-footer">
        <el-button type="primary" size="small" @click="onSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              :selectable="checkSelectable"
              width="50"
            ></el-table-column>
            <el-table-column prop="id" label="序号" width="170px">
            </el-table-column>
            <el-table-column prop="standardSn" label="标准编码" width="150px">
            </el-table-column>
            <el-table-column prop="standardName" label="标准名称">
            </el-table-column>
            <el-table-column prop="maintainType" label="保养分类">
            </el-table-column>
            <el-table-column prop="maintenanceParts" label="保养位置">
            </el-table-column>
            <el-table-column prop="maintenanceMethod" label="保养方法">
            </el-table-column>
            <el-table-column prop="maintenanceCycle" label="保养周期">
            </el-table-column>
            <el-table-column prop="createUserName" label="创建人">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="170px">
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
import { getList } from "@/api/asset-management/maintainStandard.js";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "dept",
  mixins: [paginationMixin],
  props: {
    keyWord: {
      type: String,
      default: "",
    },
    checkData: {
      type: Array,
      default: () => [],
    },
    facilitySn: {
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
      currentRow: [],
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
      this.form.facilitySn = this.facilitySn;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    handleSelectionChange(val) {
      this.currentRow = val;
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
    checkSelectable(row) {
      //已选择禁止点击
      if (
        this.checkData.some((el) => {
          return el.standardSn === row.standardSn;
        })
      ) {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      this.$emit("on-submit", this.currentRow);
    },
    handleColumnChange(val) {
      this.currentRow.push(val);
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
