<template>
  <div>
    <el-dialog
      title="点检详情"
      :visible.sync="info.detailShow"
      width="68%"
      style="background-color: rgba(0,0,0,0.5)"
      :modal="false"
      @opened="opened"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·工单信息</b>
            <el-button size="small" type="primary" style="float: right">打印</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="form">
        <el-form-item label="工单编号">
          <el-input v-model="formInline.number" placeholder="自动带入"></el-input>
        </el-form-item>
        <el-form-item label="工单日期">
          <el-input v-model="formInline.createTime" placeholder="自动带入"></el-input>
        </el-form-item>
        <el-form-item label="点检时间">
          <el-input v-model="formInline.startTime" placeholder="自动带入"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="form1">
        <el-form-item label="计划名称">
          <el-input v-model="formInline.name" placeholder="自动带入"></el-input>
        </el-form-item>
        <el-form-item label="计划周期">
          <el-input v-model="formInline.cycle" placeholder="自动带入"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·点检对象</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>


      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @row-click="rowClick"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
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
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="category"
          label="设备类别">
        </el-table-column>
        <el-table-column
          prop="specifications"
          label="规格型号">
        </el-table-column>
        <el-table-column
          prop="dept"
          label="所在部门">
        </el-table-column>
        <el-table-column
          prop="location"
          label="所在位置">
        </el-table-column>
        <el-table-column
          prop="custodian"
          label="所属人员">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="点检标准"
          width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="seeBtn">查看</el-button>
          </template>
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
      <el-input></el-input>
    </el-dialog>
    <see :see="see"></see>
  </div>
</template>

<script>
import {checkOrderDetail, getEquipmentinfo} from "@/api/shebei/equipmentCheck"
import See from "./see";

export default {
  components: {See},
  props: ["info"],
  data() {
    return {
      see: {
        seeShow: false
      },
      dialogVisible: true,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],

    };
  },
  methods: {
    feiji(){
      this.$refs.form.disabled=true
      this.$refs.form1.disabled=true
      console.log(this.$refs.form)
    },
    rowClick(row){
      console.log(row.equipmentCoding)
      this.see.eqid=row.equipmentCoding
    },
    async getEqinfo() {
      let res = await getEquipmentinfo({equipmentCoding:this.eqid})
      console.log(res)
        },
    opened() {
      setTimeout(() => {
        this.feiji()
      }, 2500);
      this.ddd()
    },
    async ddd() {
      console.log(this.info.id)
      let res = await checkOrderDetail({id: this.info.id})
      console.log(res.data.data)
      this.formInline = {
        number: res.data.data.number,
        createTime: res.data.data.createTime,
        startTime: res.data.data.createTime + "-" + res.data.data.endTime,
        name: res.data.data.name,
        cycle: res.data.data.cycle,
      }
      this.tableData = res.data.data.equipmentInfos
    },
    seeBtn() {
      this.see.seeShow = true
    },
    asd() {
      console.log(this.info)
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
