<template>
  <div>

    <el-dialog
      title="结果反馈"
      :modal="false"
      :visible.sync="info.seeShow"
      width="68%"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·明细</b>
            <el-button type="primary" size="small" style="float: right">验收</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 25px">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·备件消耗</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 25px">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    }
  }

}
</script>

<style scoped>

</style>
