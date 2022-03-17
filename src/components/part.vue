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
     <el-form-item label="备件名称:" prop="partName">
          <el-input
            placeholder="请输入备件名称"
            v-model="form.partName"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件ID:" prop="partId">
          <el-input
            placeholder="请输入备件ID"
            v-model="form.partId"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属仓库:" prop="warehouse">
            <el-select v-model="form.warehouse" placeholder="请选择仓库名称">
            <el-option
              v-for="item in depotList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
           <el-table-column label="序号" width="60px">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="备件名称" width="160px">
          </el-table-column>
          <el-table-column prop="productSpecificationName" label="规格型号" width="160px">
          </el-table-column>
          <el-table-column prop="productNumber" label="备件编号" width="120px">
          </el-table-column>

          <el-table-column prop="stock" label="库存数量" width="120px">
          </el-table-column>
          <el-table-column prop="stockUnitName" label="单位" width="120px">
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
import { getPartList } from "@/api/asset-management/sparePartsManagement.js";
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
      form: {
        assetsNo: "",
        deviceNo: "",
        deviceName: "",
      },
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
      const res = await getPartList({
        current: this.currentPage,
        size: this.pageSize,
        ...this.form
      });
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    handleSelectionChange(val) {
      let arr={}
      for (let i = 0; i < val.length; i++) {
        let ele = this.tableData[i];
        arr.id = ele.id;
        arr.model = ele.productSpecificationName;
        arr.sparePartName = ele.productName;
        arr.sparePartSn = ele.productNumber;
        arr.unit = ele.stockUnitName;
        arr.quantityConsumed = ele.stock;
      }
      this.currentRow.push(arr) ;
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
