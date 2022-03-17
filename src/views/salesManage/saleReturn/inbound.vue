<template>
  <div class="pages">
    <p>订单信息</p>
    <p>客户：测试客户</p>
    <el-table>
      <el-table-column label="单据号"></el-table-column>
      <el-table-column label="单据日期"></el-table-column>
      <el-table-column label="业务部门"></el-table-column>
      <el-table-column label="业务员"></el-table-column>
      <el-table-column label="到货状态"></el-table-column>
    </el-table>
    <div>
      <span>待入库</span>
      <el-button type="primary">入库</el-button>
    </div>
    <el-table>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="本次数量">
        <template>
          <el-input></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单号"></el-table-column>
      <el-table-column label="产品编码"></el-table-column>
      <el-table-column label="产品名称"></el-table-column>
      <el-table-column label="规格"></el-table-column>
      <el-table-column label="计量单位"></el-table-column>
      <el-table-column label="仓库">
        <template>
          <el-select>
            <el-option></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="订单数量"></el-table-column>
      <el-table-column label="已入库数量"></el-table-column>
      <el-table-column label="未入库数量"></el-table-column>
    </el-table>
    <el-table>
      <el-table-column label="产品编码"></el-table-column>
      <el-table-column label="产品名称"></el-table-column>
      <el-table-column label="规格"></el-table-column>
      <el-table-column label="计量单位"></el-table-column>
      <el-table-column label="仓库"></el-table-column>
      <el-table-column label="批号"></el-table-column>
      <el-table-column label="数量"></el-table-column>
      <el-table-column label="SN号"></el-table-column>
      <el-table-column label="源订单号"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'saleInbound',
  data() {
    return {}
  }
}
</script>