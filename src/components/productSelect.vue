<template>
  <div class="add-dialog">
    <el-row>
      <div style="margin-bottom: 10px; float: right">
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
        <!-- <el-select
          class="serchIpt"
          v-model="form.deptId"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in deptOptions"
            :key="item.id"
            :label="item.deptName"
            :value="item.id"
          >
          </el-option>
        </el-select> -->
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
        <el-container style="height: 450px">
          <el-main>
            <el-table
              border
              :data="productList"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              highlight-current-row
            >
              <!-- @current-change="CurrentChange"
              highlight-current-row
            > -->
              <el-table-column
                type="selection"
                :selectable="checkSelectable"
                v-if="keyWord === ''"
              ></el-table-column>
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
    productGrade: {
      type: Number,
      default: null,
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
  watch: {
    keyWord(value) {
      this.keywords = value;
    },
    supplierId(val) {
      this.handleList();
    },
    productGrade: {
      deep: true, // 深度监听
      handler(newVal) {
        this.productGrade = newVal;
        this.handleList();
      },
    },
  },
  methods: {
    search() {
      this.handleList();
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
    handleSelectionChange(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].status == "1" && parseFloat(val[i].stock) > 0) {
          val.splice(i, 1);
          this.$refs.multipleTable.clearSelection(i);
          return this.$message.warning({
            message: "产品已停用,请联系系统管理员",
          });
        }
      }
      this.multipleSelection = val;
    },
    CurrentChange(val) {
      this.multipleSelection.push(val);
    },
    handleNodeClick(data) {
      if (data.parentId !== "0") {
        // 不选择一级
        this.id = data.id;
        this.handleList();
      }
    },
    checkSelectable(row) {
      // if (row.status == "0" && parseFloat(row.stock) > 0) {
      //   return false;
      // }
      //已选择禁止点击
      if (
        this.checkData.some((el) => {
          return el.productSn === row.productSn;
        })
      ) {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      if (this.multipleSelection.length <= 0) {
        return this.$message.warning({
          message: "请选择产品",
        });
      }
      this.$emit("on-submit", this.multipleSelection);
      this.$refs.multipleTable.clearSelection();
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
.serchIpt {
  width: 180px;
  margin-right: 10px;
}
// /deep/ .el-table td, .el-table th {
//   overflow: hidden;
// }
// .product-list-box {
//   // overflow-x: auto
// }
</style>
