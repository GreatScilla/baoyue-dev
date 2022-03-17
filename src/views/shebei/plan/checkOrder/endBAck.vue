<template>
  <div>
    <el-dialog
      title="结果反馈"
      :visible.sync="info.backShow"
      width="60%"
      :modal="false"
      @opened="openAll"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·明细</b>
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
        :tree-props="{children:'children'}"
        row-key="id"
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
          label="点检项目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="checkMethod"
          label="点检方法"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="标准类型">
        </el-table-column>
        <el-table-column
          prop="resource"
          label="参考">
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
import {getChenkFeedback, CheckPlanBack} from "@/api/shebei/equipmentCheck"
import qs from "qs"

export default {
  props: ["info"],
  data() {
    return {
      arr: [],
      tableData: [{}],
    };
  },
  methods: {
    openAll() {
      this.getPage()
    },
    //测试
    async submitBtn() {

      // let equipmentCheckingPlan=JSON.stringify(this.tableData)
      let para = this.tableData
      // let arr = para.map((item,index)=>{
      //   for(var key in item){
      //     console.log(item[key]);
      // console.log(item,999)
      // this.arr.push(item[key])
      // console.log(this.arr)

      // console.log(item,123)
      //   return item
      // })
      // console.log(arr,123)
      // let para= qs.stringify(this.tableData)
      let res= await CheckPlanBack({inspectionRecords: para})
      console.log(res.data.code)
      if(res.data.code==200){
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.info.backShow=false
      }
    },
    clickRow(row) {
      console.log(row)
    },
    //获取数据
    async getPage() {
      // let tableResponse = []
      let {data} = await getChenkFeedback({id: this.info.id})
      this.tableData = data.data
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
          this.tableData = []
          done();
        })
        .catch(_ => {
        });
    }
  }
};
</script>

<style scoped>

</style>
