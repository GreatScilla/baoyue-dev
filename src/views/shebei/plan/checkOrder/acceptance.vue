<template>
  <div>
    <el-dialog
      title="工单验收"
      :visible.sync="info.acceptanceShow"
      width="60%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·明细</b>
            <el-button @click="asdfa">测试</el-button>
            <el-button @click="submitBtn" type="primary" size="small" style="float: right"> 验收</el-button>
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
          prop="name"
          label="点检项目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="method"
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
            <el-input v-model="scope.row.how"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import  {getChenkFeedback,CheckPlanAcceptance} from "@/api/shebei/equipmentCheck"
export default {
  props:["info"],
  data() {
    return {
      sus:true,
      forS:{},
      arr:[],
      tableData: [],
    };
  },
  methods: {
   async asdfa(){
     let res = await CheckPlanAcceptance({id:this.info.id})
     console.log(res.data,987)

    },
    clickRow(row){
      console.log(row)
    },
    //获取数据
    async submitBtn(){
      // let tableResponse = []
      let { data } = await CheckPlanAcceptance({id:this.info.id})
      console.log(data)
      // for (let key in data.data) {
      //   tableResponse.push(data.data[key])
      // }
      // this.tableData = tableResponse.map(child=>{

        // return {
        //   ...child,
        //   children:child.checkItems
        // }
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
