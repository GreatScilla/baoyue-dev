// 开票管理
<template>
  <basic-container>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="开票状态">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium">查询</el-button>
          <el-button size="medium">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >开票</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-upload2"
        plain
        @click="handleDelete()"
        >导出</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="status" label="开票状态">
        </el-table-column>
        <el-table-column prop="number" label="单据编号"> </el-table-column>
        <el-table-column prop="name" label="单据日期">
        </el-table-column>
        <el-table-column prop="number" label="源订单号"> </el-table-column>
        <el-table-column prop="name" label="客户分类">
        </el-table-column>
        <el-table-column prop="number" label="供应商"> </el-table-column>
        <el-table-column prop="name" label="业务员">
        </el-table-column>
        <el-table-column prop="number" label="价税合计"> </el-table-column>
        <el-table-column prop="name" label="已开票金额">
        </el-table-column>
        <el-table-column prop="number" label="可开票金额"> </el-table-column>
        <el-table-column prop="name" label="开票类型">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.id, 'detail')">
              详情
            </el-button>
          </template>
        </el-table-column>
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
  name: 'purchaseInvoice',
  mixins: [paginationMixin],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
 
</style>