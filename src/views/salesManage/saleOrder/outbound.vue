<template>
  <div class="pages">
    <p class="title-p">订单信息</p>
    <p>客户：{{userName}}</p>
    <el-table border :data="infoData">
      <el-table-column label="单据号" prop="number"></el-table-column>
      <el-table-column label="单据日期" prop="createTime"></el-table-column>
      <el-table-column label="业务部门" prop="salesDepot"></el-table-column>
      <el-table-column label="业务员" prop="salesMan"></el-table-column>
      <el-table-column label="发货状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | deliveryStatus}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="title-p">
      <span>待出库</span>
      <el-button type="primary" size="small" class="float-right" @click="handleOutbound">出库</el-button>
    </div>
    <el-table border :data="orderItemInfoVoList"  @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="本次数量">
        <template slot-scope="{row}">
          <el-input v-model="row.num"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="orderSn"></el-table-column>
      <el-table-column label="产品编码" prop="productSn"></el-table-column>
      <el-table-column label="产品名称" prop="productName"></el-table-column>
      <el-table-column label="规格" prop="specificationName"></el-table-column>
      <el-table-column label="计量单位" prop="sp1"></el-table-column>
      <el-table-column label="仓库">
        <template slot-scope="{row}">
          <el-select v-model="row.depotName">
            <el-option></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" prop="productQuantity"></el-table-column>
      <el-table-column label="已出库数量" prop="changeNumber"></el-table-column>
      <el-table-column label="未出库数量" prop="productWaitNum"></el-table-column>
    </el-table>
    <p class="title-p">出库记录</p>
    <el-table border :data="depotItemList">
      <el-table-column label="产品编码" prop="productSn"></el-table-column>
      <el-table-column label="产品名称" prop="productName"></el-table-column>
      <el-table-column label="规格" prop="productType"></el-table-column>
      <el-table-column label="计量单位" prop="unit"></el-table-column>
      <el-table-column label="仓库" prop="depotName"></el-table-column>
      <el-table-column label="批号" prop=""></el-table-column>
      <el-table-column label="数量" prop="operNumber"></el-table-column>
      <el-table-column label="源订单号" prop="linkNumber"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrderInfoByOrderId, saleOutCheck } from "@/api/salesManage/saleOrder";
export default {
  name: 'outbound',
  data() {
    return {
      id: '',
      userName: '', // 客户名称
      infoData: [], // 订单信息
      orderItemInfoVoList: [], // 待出库信息
      depotItemList: [], // 出库记录
      multipleSelection: [] // 选中要出库的数据
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.getOrderInfo()
  },
  methods: {
    async getOrderInfo() { // 获取详情
      const data = await getOrderInfoByOrderId(this.id)
      const form = data.data.data
      this.userName = form.userName
      const obj = {
        createTime: form.createTime,
        id: form.id,
        number: form.number,
        salesDepot: form.salesDepot,
        salesMan: form.salesMan,
        status: form.status
      }
      this.infoData.push(obj)
      this.orderItemInfoVoList = form.orderItemInfoVoList
      this.depotItemList = form.depotItemList
    },
    async handleOutbound () { // 出库
      if (this.multipleSelection.length === 0) {
        this.$message.error({
          message: '请选择需要出库的订单'
        })
        return
      }
      const params = {
        orderId: this.id,
        depotHeadUpdateRequestList: this.multipleSelection
      }
      console.log(params)
      const data = await saleOutCheck(params)
      this.$message.success({
        message: '操作成功'
      })
      this.getOrderInfo()
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.title-p {
  padding: 15px 0;
  border-bottom: 1px solid #c4c1c1;
}
</style>