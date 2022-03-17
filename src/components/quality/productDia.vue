<template>
  <div class="add-dialog">
    <el-row>
      <div style="margin-bottom: 10px; float: right">
        <el-input
          class="serchIpt"
          size="small"
          v-model="searchForm.productSn"
          placeholder="输入产品编码"
          clearable
        >
        </el-input>
        <el-input
          class="serchIpt"
          size="small"
          v-model="searchForm.name"
          placeholder="输入产品名称"
          clearable
        >
        </el-input>
        <el-input
          class="serchIpt"
          size="small"
          v-model="searchForm.model"
          placeholder="输入规格型号"
          clearable
        >
        </el-input>
        <el-button
          style="margin-right: 10px"
          type="primary"
          size="small"
          @click="search"
          >查询</el-button
        >
      </div>
    </el-row>
    <el-row>
      <el-col :span="3">
        <p>产品分类</p>
        <el-tree
          :data="productCateList"
          productCateList
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="id"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="21" class="product-list-box">
        <el-container style="height: 400px">
          <el-main>
            <el-table
              border
              :data="productList"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              @row-click="clickRow"
              highlight-current-row
            >
              <!-- <el-table-column prop="stock" label="数量"></el-table-column> -->
              <el-table-column prop="pic" label="图片">
                <template slot-scope="{ row }">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="row.pic"
                    fit="contain"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="productSn"
                label="产品编码"
                width="160px"
              ></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="model" label="规格型号"></el-table-column>
              <el-table-column
                prop="unitName"
                label="计量单位"
              ></el-table-column>
              <el-table-column prop="stock" label="现存货"></el-table-column>
              <el-table-column
                prop="purPriceSuggest"
                label="参考进价"
              ></el-table-column>
              <!-- <el-table-column prop="" label="品牌"></el-table-column>
          <el-table-column prop="" label="产地"></el-table-column>
          <el-table-column prop="" label="厂家"></el-table-column> -->
            </el-table>
          </el-main>
        </el-container>
        <el-row class="float-right margin-top-20">
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
    <div class="margin-bottom-20 footer-box margin-top-20">
      <el-button @click="handleCancel" size="small">取消</el-button>
      <el-button type="primary" @click="submit" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
import productList from "@/mixins/productCate";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "productSelect",
  mixins: [productList, paginationMixin],
  props: {
    keyWord: {
      type: String,
      default: "",
    },
    checkData: {
      type: Array,
      default: () => [],
    },
    supplierId: {
      //供应商id
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchForm: {},
      defaultProps: {
        children: "productCateList",
        label: "cateName",
      },
      multipleSelection: [],
      keywords: "",
    };
  },
  methods: {
    search() {
      this.handleList();
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 单击选择
    clickRow(row) {
      this.clickRowDate = row;
    },
    handleNodeClick(data) {
      if (data.parentId !== "0") {
        // 不选择一级
        this.id = data.id;
        this.handleList();
      }
    },
    submit() {
      if (this.clickRowDate) {
        this.$emit("on-submit", this.clickRowDate);
      } else {
        this.$message.info("请选择产品");
      }
    },
  },
  watch: {
    keyWord(value) {
      this.keywords = value;
    },
    supplierId(val) {
      this.handleList();
    },
  },
};
</script>

<style lang="scss" scoped>
.serchIpt {
  width: 180px;
  margin-right: 10px;
}
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
// /deep/ .el-table td, .el-table th {
//   overflow: hidden;
// }
// .product-list-box {
//   // overflow-x: auto
// }
</style>
