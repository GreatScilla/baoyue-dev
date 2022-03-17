<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-row :span="24">
          <el-form>
            <el-col :span="6">
              <el-form-item label="产品名称:" prop="name">
                <el-input
                  clearable
                  placeholder="请输入产品名称"
                  v-model="form.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="规格型号:" prop="model">
                <el-input
                  clearable
                  placeholder="请输入规格型号"
                  v-model="form.model"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" size="small" @click="onSearch"
                  >查询</el-button
                >
                <el-button size="small" @click="onReset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-container style="height: 300px">
          <el-main>
            <!-- <el-table
              border
              :data="productList"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              highlight-current-row
            > -->
            <el-table
              border
              :data="productList"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              @current-change="CurrentChange"
              highlight-current-row
            >
              <!-- <el-table-column
                :selectable="checkSelectable" -->
              <el-table-column
                :selectable="checkSelectable"
                type="selection"
              ></el-table-column>
              <el-table-column prop="name" label="图片">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.pic"
                    :fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="productSn"
                label="*产品编码"
              ></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="model" label="规格型号"></el-table-column>
              <el-table-column
                prop="productCategoryName"
                label="产品分类"
              ></el-table-column>
              <el-table-column
                prop="unitName"
                label="计量单位"
              ></el-table-column>
              <el-table-column prop="stock" label="*库存"></el-table-column>
              <el-table-column
                prop="purPriceSuggest"
                label="*单价"
              ></el-table-column>
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
import paginationMixin from "@/mixins/pagination";
// import { findProductByDepot } from "@/api/storageManage/inventoryCheck";
import { listProductData } from "@/api/base-data/product-data.js";

export default {
  name: "productSelect",
  mixins: [paginationMixin],
  props: {
    deptId: {
      type: Number,
      default: null,
    },
    checkData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    async deptId() {
      await this.handleList();
    },
  },
  mounted() {
    this.handleList();
  },
  data() {
    return {
      form: {},
      multipleSelection: [],
      productList: [],
      id: "",
      total: "",
    };
  },
  methods: {
    onReset() {
      this.form = {};
      this.handleList();
    },
    onSearch() {
      this.handleList();
    },
    selectNameInfo(val) {
      console.log(val);
    },
    handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        name: this.form.name,
        model: this.form.model,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      listProductData(params)
        .then((res) => {
          this.productList = res.data.data.records;
          // this.roleTableData.forEach((ele) => {
          //   if (ele.pic) {
          //     const tempArr = ele.pic.split(",");
          //     ele.picList = tempArr.map((item) => {
          //       return `${uploadUrl}${item}`;
          //     });
          //   }
          // });
          // console.log(this.roleTableData);
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleSizeChange(val) {
      this.handleList({ size: val });
    },
    checkSelectable(row) {
      //已选择禁止点击
      if (
        this.checkData.some((el) => {
          return el.productId === row.id;
        })
      ) {
        return false;
      } else {
        return true;
      }
    },
    // async handleList() { // 获取表格数据
    //   const res = await findProductByDepot({
    //     depotId: this.deptId,
    //   })
    //   console.log(res)
    //   this.productList = res.data.data
    //   this.total = res.data.data.total
    // },
    handleCancel() {
      this.$emit("on-cancel");
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    CurrentChange(val) {
      this.multipleSelection.push(val);
    },
    // handleCurrentChange(val) {
    //   this.multipleSelection.push(val);
    //   this.handleList({ current: val });
    // },
    submit() {
      this.$emit("on-submit", this.multipleSelection);
      this.$refs.multipleTable.clearSelection();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content {
  display: flex;
  margin-right: 15px;
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
</style>
