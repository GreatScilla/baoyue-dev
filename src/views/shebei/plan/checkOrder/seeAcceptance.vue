<template>
<div>

  <el-dialog
    title="查看"
    :modal="false"
    :visible.sync="info.seeShow"
    width="68%"
    style="background-color: rgba(0,0,0,0.5)"
    @opened="openAll"
    :before-close="handleClose">
<el-divider></el-divider>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>明细</b>
      </div></el-col>
    </el-row>
<el-divider></el-divider>

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
        prop=""
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
import  {getChenkFeedback} from "@/api/shebei/equipmentCheck"
// import {getChenkFeedback} from "@/api/shebei/equipmentCheck";

export default {
  props:["info"],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    openAll(){
      this.submitBtn()
    },
    //获取数据
    async submitBtn(){
      let tableResponse = []
      let { data } = await getChenkFeedback({id:this.info.id})
      console.log(data.data)
      for (let key in data.data) {
        tableResponse.push(data.data[key])
      }
      this.tableData = tableResponse.map(child=>{

        return {
          ...child,
          children:child.checkItems
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }

}
</script>

<style scoped>

</style>
