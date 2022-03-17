<template>
<div>
  <el-dialog
    title="新增盘点单"
    :visible.sync="info.addShow"
    width="60%"
    @opened="openedAll"
    style="background-color: rgba(0,0,0,0.5)"
    :modal="false"
    :before-close="handleClose">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·单据信息</b>
        <el-button size="small" type="primary" style="float: right" @click="saveAll"> 保存</el-button>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <button @click="ppp">测试</button>
<!------------------------------------表单----------------------------------------------->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" >
      <el-form-item label="单据编号">
        <el-input v-model="formInline.number" placeholder="请输入" disabled></el-input>
      </el-form-item>
      <el-form-item label="单据日期">
        <el-date-picker
          v-model="formInline.value1"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="盘点范围">
        <el-select v-model="formInline.range" placeholder="活动区域">
          <el-option label="所有范围" value=""></el-option>
          <el-option label="执行人管理的设备" value="王二牛"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行部门">
        <el-select v-model="formInline.dept" placeholder="活动区域">
          <el-option label="部门一" value="部门一"></el-option>
          <el-option label="部门二" value="部门二"></el-option>
          <el-option label="部门三" value="部门三"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行人：">
        <el-input v-model="formInline.executor"></el-input>
      </el-form-item>
      <el-form-item label="制单人：">
        <el-input v-model="formInline.createUsername" placeholder="请输入"></el-input>
      </el-form-item>

<!--    --------------------------------------------------表格------------------------------------------------------>
    <el-table
      border
      @row-click="clickRow"
      :data="tableData"
      style="width: 100%;margin-top: 15px">
      <el-table-column
        prop="assetTag"
          label="资产编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="equipmentCoding"
        label="设备编码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="equipmentName"
        label="设备名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="equipmentCategory"
        label="设备/备件类别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="specifications"
        label="规格型号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bookQuantity"
        label="账面数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        label="购置金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="allPrice"
        label="合计金额"
        width="120">
        <template slot-scope="scope">
          <span  @blur="getNumber" style="width: 90px">{{scope.row.price*scope.row.bookQuantity}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bookQuantity"
        label="盘点数量"
        width="120">
<!--        <template slot-scope="scope">-->
<!--          <el-input v-model="scope.row.how" @blur="getNumber" style="width: 90px"></el-input>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column
        prop="name"
        label="盈亏数量"
        v-model="name"
        width="120">
<!--        <template slot-scope="scope">-->
<!--          <span @blur="getNumber" style="width: 90px">{{scope.row.how-scope.row.bookQuantity}}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column
        prop="address"
        label="盈亏金额">
      </el-table-column>
    </el-table>
      <el-form-item label="备注">
        <el-input v-model="formInline.memo"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {inwventPage,inventRange,inventSave} from "@/api/shebei/equipmentinventoryinfo"
import {inventoryAdd} from "@/api/shebei/inventory"
import  qs from "qs"
export default {
  props:["info"],
  data() {
    return {

      tableData: [],
      formInline: {
        user: '',
        region: ''
      },
      a:"",
    };
  },
  methods: {
    ppp(){
      console.log(this.tableData)
    },
   async saveAll(){
      // let List = qs.stringify(this.tableData)
      let List =this.tableData
      let para = {
        inventoryRecords:List,
        createUsername:this.formInline.createUsername,
        number:this.formInline.number,
        infoDateinfoDate:this.formInline.value1,
        range:this.formInline.range,
        dept:this.formInline.dept,
        executor:this.formInline.executor,
        memo:this.formInline.memo,
      }
      let res = await inventoryAdd(para)
     console.log(para)
    },
    clickRow(val){
      console.log(val)
    },
    getNumber(){

    },
    openedAll(){

      let now = new Date();
      this.formInline={
        number:now.getTime()
      }
      this.qweqw()
    },
   async qweqw(){
        let res = await inventRange({custodian:"李二牛"})
     this.tableData=res.data.data
     console.log(res.data.data,44)
     // let arr = [{assetTag,equipmentCoding,equipmentName,equipmentCategory,specifications,unit,bookQuantity,price,totalAmount,count,profitLossNum,profitLossPrice,pid},InventoryRecord:{}]
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.el-input{
  width: 205px;
}
</style>
