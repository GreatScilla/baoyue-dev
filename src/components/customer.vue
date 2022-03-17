// 
<template>
  <div class="add-dialog">
    <el-row v-if="type=='statement'" class="margin-bottom-20">
      <div class="search-box">
        <el-input
          clearable
          v-model="keyword"
          placeholder="请输入客户名"
        ></el-input>
        <i
          class="el-icon-search padding-right-10 cursor-style"
          @click="searchProduct"
        ></i>
      </div>
    </el-row>
    <el-row class="margin-bottom-20">
      <!-- <el-col :span="6">
        <p>单位分类</p>
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
          <el-table-column prop="name" :label="`${name}名称`"></el-table-column>
          <el-table-column prop="code" :label="`${name}编码`"></el-table-column>
          <el-table-column :label="`${name}分类`">
            <template slot-scope="{ row }">
              <span>{{ row.category | category }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="linkName" label="首要联系人"></el-table-column>
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
import { getContactUnitBase } from "@/api/common";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "customer",
  mixins: [paginationMixin],
  props: {
    category: {
      // 1供应商2客户
      type: "String",
      default: "2",
    },
    type: {
      type: "String",
      default: "1221",
    },
  },
  data() {
    return {
      defaultProps: {
        children: "productCateList",
        label: "cateName",
      },
      multipleSelection: [],
      currentRow: {}, // 当前选中行
      tableData: [],
      keyword: "", //关键词
    };
  },
  created(){
  },
  mounted() {
    this.handleList();
  },
  computed: {
    name() {
      if (this.category === "1") {
        return "供应商";
      } else {
        return "客户";
      }
    },
  },
  methods: {
    async handleList() {
      const data = await getContactUnitBase({
        category: this.category,
        name: this.keyword,
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
      this.handleList(this.keyword);
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
</style>