<template>
  <div>

    <el-dialog
      title="点检标准"
      :visible.sync="see.seeShow"
      width="70%"
      @openen="openAll"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·标准信息</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
<!--      <button @click="qweqw">巴腾</button>-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="formInline.user" placeholder="自动带入"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formInline.user" placeholder="自动带入"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·项目标准</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table
        ref="multipleTable"
        :data="addStandardData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="standardSelChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="设备编号"
          prop="equipmentCoding"
          width="120">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="maintenanceParts"
          label="保养部位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="maintenanceMethod"
          label="保养方法"
          width="120">
        </el-table-column>
        <el-table-column
          prop="maintenanceCycle"
          label="保养周期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·备注</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-input v-model="formInline.user" placeholder="备注"></el-input>
    </el-dialog>
  </div>
</template>

<script>
import {checkOrderDetail, seeEquipmentinfo} from "@/api/shebei/equipmentCheck"

export default {
  props: ["see"],
  data() {
    return {
      dialogVisible: true,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
    }
  },
  methods: {
    feiji(){

    },
    openAll() {
      setTimeout(() => {
        this.feiji()
      }, 2500);
    },
    async qweqw() {
      let res = await seeEquipmentinfo({equipmentCoding: this.see.eqid})
      // console.log(res.data)
      console.log(this.see.eqid)
    },
    wqeqw() {
      console.log(this.see.seeShow)
    },
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
