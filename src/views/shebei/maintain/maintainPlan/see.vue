<template>
<div>

  <el-dialog
    title="点检标准"
    :visible.sync="see.seeShow"
    width="70%"
    :modal="false"
    :before-close="handleClose">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·标准信息</b>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·项目标准</b>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 15px">
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·备注</b>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-input v-model="formInline.user" placeholder="备注"></el-input>
  </el-dialog>
</div>
</template>

<script>
export default {
props:["see"],
  data(){
  return{
    dialogVisible: true,
    formInline: {
      user: '',
      region: ''
    },
    tableData: [{
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }],
  }
  },
  methods:{
    wqeqw(){
      console.log(this.see.seeShow)
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
