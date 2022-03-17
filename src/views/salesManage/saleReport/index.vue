<template>
  <basic-container>
    <el-row>
      <el-form :inline="true">
        <el-row>
          <el-form-item label="产品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-select>
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="单据日期">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
            <el-button size="small">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="col-box">
          <p>10</p>
          <span>订单总数</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="col-box">
          <p>10</p>
          <span>商品总数</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="col-box">
          <p>10</p>
          <span>总金额</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-button size="small">导出</el-button>
      <el-button size="small">打印</el-button>
    </el-row>
    <el-row>
      <el-table>
        <el-table-column label="单据编号"></el-table-column>
        <el-table-column label="单据日期"></el-table-column>
        <el-table-column label="源单号"></el-table-column>
        <el-table-column label="订单类型"></el-table-column>
        <el-table-column label="往来单位名称"></el-table-column>
        <el-table-column label="客户地区"></el-table-column>
        <el-table-column label="存货编码"></el-table-column>
        <el-table-column label="仓库名称"></el-table-column>
        <el-table-column label="产品名称"></el-table-column>
        <el-table-column label="规格型号"></el-table-column>
        <el-table-column label="单位"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="单价"></el-table-column>
        <el-table-column label="销售金额"></el-table-column>
        <el-table-column label="发运方式"></el-table-column>
        <el-table-column label="销售地址"></el-table-column>
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
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  name: 'saleReport',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
 
.col-box {
  width: 100%;
  height: 120px;
  background-color: pink;
  text-align: center;
}
</style>