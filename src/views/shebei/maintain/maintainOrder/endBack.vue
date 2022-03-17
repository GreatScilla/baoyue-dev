<template>
  <div>
    <el-dialog
      title="结果反馈"
      :visible.sync="info.backShow"
      width="60%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·明细</b>
            <el-button @click="asda">测试</el-button>
            <el-button @click="submitBtn" type="primary" size="small" style="float: right"> 提交</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
<!--      -------------------------------------------table1----------------------------------------->

      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        @row-click="clickRow"
        style="width: 100%;margin-top: 15px">
        <el-table-column
          label="资产编号"
          prop="assetTag"
          width="120">
        </el-table-column>
        <el-table-column
          prop="equipmentCoding"
          label="设备编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="checkItem"
          label="保养部位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="checkMethod"
          label="保养方法"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="点检结果"
          width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.how"></el-input>
          </template>
        </el-table-column>
      </el-table>



      <el-row style="margin-top: 25px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·备件消耗</b>
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTableTwo"
        :data="spareData"
        border
        tooltip-effect="dark"
        @row-click="clickRow"
        style="width: 100%;margin-top: 15px">
        <el-table-column
          label="备件编号"
          prop="equipmentCoding"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备件名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="model"
          label="规格型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="quantityRequired"
          label="所需数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="点检结果"
          width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.feedbackResults"></el-input>
          </template>
        </el-table-column>
      </el-table>


    </el-dialog>
  </div>
</template>

<script>
// import  {getChenkFeedback,CheckPlanBack} from "@/api/shebei/equipmentCheck"
import {maintenanceGetBack} from "@/api/shebei/maintain"
export default {
  props:["info"],
  data() {
    return {
      forS:{},
      arr:[],
      tableData: [],
      spareData:[],
    };
  },
  methods: {

   async asda(){
     let res = await maintenanceGetBack({id:this.info.id})
     this.spareData=res.data.data.spares[0]
    console.log(res.data.data.spares[0])
    console.log(this.spareData,777)
    },
    clickRow(row){
    },
    //获取数据
   async submitBtn(){
     // let tableResponse = []
     // let { data } = await maintenanceGetBack({id:this.info.id})
     let res  = await maintenanceGetBack({id:this.info.id})
     this.tableData=res.data.data.date[0]
     this.spareData=res.data.data.spares[0]
     console.log(res.data.data.date)
     // for (let key in data.data) {
     //   tableResponse.push(data.data[key])
     // }
     // this.tableData = tableResponse.map(child=>{
     //
     //   return {
     //     ...child,
     //     children:child.checkItems
     //   }
     // })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.tableData=[]
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>

</style>
