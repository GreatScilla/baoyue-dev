<template>
  <div>
    <el-dialog
      title="保养计划"
      :visible.sync="info.editShow"
      width="68%"
      :modal="false"
      @opened="pageOpen"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·工单信息</b>
            <el-button size="small" type="primary" style="float: right" @click="saveEdit">保存编辑</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!----------------------------------------------头部表单------------------------------------------------------------->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="laasd">
        <el-form-item label="计划单号：">
          <el-input v-model="formInline.number" placeholder="自动生成"></el-input>
        </el-form-item>
        <el-form-item label="计划名称：">
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="计划周期：">
          <el-input v-model="formInline.how" placeholder="请输入" style="width: 100px"></el-input>
          <el-select v-model="formInline.region" placeholder="请选择" style="width: 100px;margin-left: 5px">
            <el-option label="天/次" value="天/次"></el-option>
            <el-option label="周/次" value="周/次"></el-option>
            <el-option label="月/次" value="月/次"></el-option>
            <el-option label="季/次" value="季/次"></el-option>
            <el-option label="年/次" value="年/次"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期：">
          <div class="block">
            <el-date-picker
              v-model="formInline.value1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-time-picker
            arrow-control
            v-model="formInline.time1"
            value-format="HH:mm:ss"
            :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-time-picker
            arrow-control
            v-model="formInline.time2"
            value-format="HH:mm:ss"
            :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }">
          </el-time-picker>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <!--        ------------------------------------------保养对象----------------------------------------------------->
            <b>·保养对象</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" size="small" @click="addEq">添加设备</el-button>
            <el-button type="info" size="small">移除设备</el-button>
          </div>
        </el-col>
      </el-row>
      <!--    表格-->
      <!--      --------------------------------------设备表格------------------------------------------>
      <el-table
        ref="multipleTable"
        :data="equipmenttableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="equipmentChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category"
          label="设备类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="specifications"
          label="规格型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dept"
          label="所在部门"
          width="120">
        </el-table-column>
        <el-table-column
          prop="location"
          label="所在位置"
          width="120">
        </el-table-column>
        <el-table-column
          prop="custodian"
          label="所属人员"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- -----------------------------------------保养标准------------------------------------------------------------------>
      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·保养标准</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" size="small" @click="addRule">添加标准</el-button>
            <el-button type="info" size="small">移除标准</el-button>
          </div>
        </el-col>
      </el-row>
      <!--    表格-->
      <el-table
        ref="multipleTable"
        :data="maintenancetableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="standardChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="设备编号"
          prop="equipmentCoding"
          width="240">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          width="240">
        </el-table-column>
        <el-table-column
          prop="maintenanceParts"
          label="保养部位"
          width="240">
        </el-table-column>
        <el-table-column
          prop="maintenanceMethod"
          label="保养方法"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- -----------------------------------------所需备件------------------------------------------------------------------>
      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·所需备件</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" size="small" @click="addNeed">添加备件</el-button>
            <el-button type="info" size="small">移除备件</el-button>
          </div>
        </el-col>
      </el-row>
      <!--    表格-->
      <el-table
        ref="multipleTable"
        :data="sparetableData"
        border
        @row-click="asd"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="spareChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="备件编号"
          prop="equipmentCoding"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备件名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="model"
          label="规格型号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="quantityRequired"
          label="所需数量"
          width="200">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          show-overflow-tooltip>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="address"-->
        <!--          label="地址"-->
        <!--          show-overflow-tooltip>-->
        <!--        </el-table-column>-->
      </el-table>

      <!------------------------------------------------------添加设备页面----------------------------------------------------->
      <el-dialog
        title="添加设备"
        style="background-color: rgba(0,0,0,0.5)"
        :visible.sync="addShow"
        width="70%"
        :modal="false"
        @open="addEqOpen"
        :before-close="handleClose">
        <el-divider></el-divider>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <b>·设备筛选</b>
              <el-button size="small" type="primary" style="float: right" @click="putEquipmentBtn">1选择添加</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form :inline="true" :model="equipmentForm" class="demo-form-inline">
          <el-form-item label="资产编号">
            <el-input v-model="equipmentForm.assetTag" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input v-model="equipmentForm.equipmentCoding" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="equipmentForm.name" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="searchEquipment">查询</el-button>
            <el-button type="" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="addEqtableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="equipmentSelChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
            label="设备名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="category"
            label="设备类别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="specifications"
            label="规格型号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dept"
            label="所在部门"
            width="120">
          </el-table-column>
          <el-table-column
            prop="location"
            label="所在位置"
            width="120">
          </el-table-column>
          <el-table-column
            prop="custodian"
            label="所属人员"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--  ----------------------------------------------------添加标准------------------------------------------------------->
      <el-dialog
        title="添加标准"
        style="background-color: rgba(0,0,0,0.5)"
        :visible.sync="see.ruleShow"
        width="70%"
        @opened="standardOpen"
        :modal="false"
        :before-close="handleClose">
        <el-divider></el-divider>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <b>·设备筛选</b>
              <el-button size="small" type="primary" style="float: right" @click="putStandardBtn">选择添加</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form :inline="true" :model="standardForm" class="demo-form-inline">
          <el-form-item label="设备编号">
            <el-input v-model="standardForm.equipmentCoding	" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="standardForm.equipmentName" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="searchStandard">查询</el-button>
            <el-button type="" size="small" @click="resetStandard">重置</el-button>
          </el-form-item>
        </el-form>
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
      </el-dialog>
      <!--  ----------------------------------------------------添加配件------------------------------------------------------->
      <el-dialog
        title="所需备件"
        style="background-color: rgba(0,0,0,0.5)"
        :visible.sync="see.needShow"
        width="70%"
        :modal="false"
        @opened="spareAaaPageopened"
        :before-close="handleClose">
        <el-divider></el-divider>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <b>·设备筛选</b>
              <el-button size="small" type="primary" style="float: right" @click="putSpareBtn">选择添加</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!--    -------------------------------备件form------------------------------------ -->
        <el-form :inline="true" :model="spareFoem" class="demo-form-inline">
          <el-form-item label="备件编号">
            <el-input v-model="spareFoem.equipmentCoding" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="备件名称">
            <el-input v-model="spareFoem.name" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="备件类别">
            <el-input v-model="spareFoem.category" placeholder="手动输入"></el-input>
          </el-form-item>
          <el-form-item label="规格型号">
            <el-input v-model="spareFoem.model" placeholder="手动输入"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button size="small" type="primary" @click="searchSpare">查询</el-button>
            <el-button size="small" type="primary" @click="resetSpare">重置</el-button>
          </el-form-item>
        </el-form>
        <!--    表格------------------------------->
        <el-table
          ref="multipleTable"
          :data="addSparetableData"
          border
          @row-click="wbd"
          tooltip-effect="dark"
          style="width: 100%;margin-top: 10px"
          @selection-change="spareSelChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="category"
            label="备件类别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="quantityRequired"
            label="所需数量"
            width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantityRequired"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <see :see="see"></see>

    </el-dialog>
  </div>
</template>

<script>
import {initspareDatabase} from "@/api/shebei/InventoryManagement";
import {getShebei} from "@/api/shebei/account"
import {MaintenancestandardsPage} from "@/api/shebei/Maintenancestandards"
import {maintenanceplanUpdate} from "@/api/shebei/maintain"
import see from "./see";
import {maintainDetail} from "@/api/shebei/maintain"

export default {
  components: {
    see
  },
  props: ["info"],
  name: "addPlan",
  data() {
    return {
      see: {
        seeShow: false,
        ruleShow: false,
        needShow: false,
      },
      standardForm: {},
      spareFoem: {},
      addShow: false,

      formInline: {
        user: '',
        region: '',
        value1: "",
        time1: new Date(),
        time2: new Date(),
      },
      equipmentForm: {},
      // tableData: [],
      equipmenttableData: [],
      maintenancetableData: [],
      sparetableData: [],
      addEqtableData: [],
      addSparetableData: [{how: 1}],
      addStandardData: [],
      savestandard: [],
      saveequipment: [],
      saveSpare: [],
      equipmentIds: "",
      spareIds: "",
      standardIds: "",
      spareNums: ""
    };
  },
  methods: {
    asd(row){
      console.log(row.quantityRequiredw)
    },
    feiji() {
      this.$refs.laasd.disabled = true
    },
    pageOpen() {
      this.ceshi()
    },
    async ceshi() {
      let res = await maintainDetail({id: this.info.spareId})
      console.log(res.data.data)
      this.equipmenttableData = res.data.data.equipmentInfoList
      this.maintenancetableData = res.data.data.maintenanceStandards
      this.sparetableData = res.data.data.spareDatebases
      this.formInline = {
        number: res.data.data.number,
        name: res.data.data.name,
        how: res.data.data.planCycle,
        value1: res.data.data.createTime,
        time1: res.data.data.startTime,
        time2: res.data.data.endTime,
      }
      this.$refs.laasd.disabled = true

    },

    wbd(row) {
      console.log(row)
    },
    equipmentChange(val) {
      const newarr = val.map(ele => ele.id);
      this.equipmentIds = newarr.join(",");
    },
    standardChange(val) {
      const newarr = val.map(ele => ele.id);
      this.standardIds = newarr.join(",");
      console.log(this.standardIds)
    },
    spareChange(val) {
      let sprId = val.map(ele => ele.id);
      const qw = val.map(ele => ele.quantityRequired);
      this.spareNums = qw.join(",");
      this.spareIds = sprId.join(",");
      console.log(val)
    },
    bigOpened() {
      this.getTime()
    },
    nbb() {
      this.getTime()
    },
    getTime() {
      let now = new Date();
      this.formInline = {
        number: now.getTime()
      }
    },
    //全部
    async saveEdit() {
      let para = {
        id:this.info.spareId,
        number: this.formInline.number,
        name: this.formInline.name,
        planCycle: this.formInline.how + this.formInline.region,
        startDate: this.formInline.value1,
        startTime: this.formInline.time1,
        endTime: this.formInline.time2,
        equipmentIds: this.equipmentIds,
        standardIds: this.standardIds,
        spareIds: this.spareIds,
        spareNums: this.spareNums,
        memo: '',
      }
      console.log(para)
      let res = await maintenanceplanUpdate(para)
      if (res.data.code == 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.info.addPlanShow = false
      }
    },
    putSpareBtn() {
      this.see.needShow = false
      this.sparetableData = this.saveSpare.concat(this.sparetableData)
      //
      console.log(this.sparetableData)
    },
    spareSelChange(val) {
      this.saveSpare = val
    },
    putEquipmentBtn() {
      this.addShow = false
      this.equipmenttableData = this.saveequipment.concat(this.equipmenttableData)
    },
    equipmentSelChange(val) {

      this.saveequipment = val
      console.log(val)
    },
    async searchEquipment() {
      // getShebei()
      let para = {
        assetTag: this.equipmentForm.assetTag,
        equipmentCoding: this.equipmentForm.equipmentCoding,
        name: this.equipmentForm.name
      }
      let res = await getShebei(para)
      this.addEqtableData = res.data.data.records
    },
    putStandardBtn() {
      this.maintenancetableData = this.savestandard.concat(this.maintenancetableData)
      this.see.ruleShow = false
    },
    standardSelChange(val) {
      console.log(val)
      this.savestandard = val
    },
    resetStandard() {
      this.standardForm = {}
    },
    searchStandard() {
      let para = {
        equipmentCoding: this.standardForm.equipmentCoding,
        name: this.standardForm.equipmentName
      }
      this.nnbbsp(para)
    },
    standardOpen() {
      this.nnbbsp()
    },
    async nnbbsp(para) {
      let res = await MaintenancestandardsPage(para)
      this.addStandardData = res.data.data.records
    },
    resetSpare() {
      this.spareFoem = {}
    },
    //搜索备件
    searchSpare() {
      let para = {
        equipmentCoding: this.spareFoem.equipmentCoding,
        name: this.spareFoem.name,
        category: this.spareFoem.category,
        model: this.spareFoem.model,
      }
      this.getSparePage(para)
    },
    //添加备件打开
    async spareAaaPageopened() {
      this.getSparePage()
    },
    async getSparePage(para) {
      let res = await initspareDatabase(para)
      this.addSparetableData = res.data.data.records
    },
    //添加设备打开回调
    async addEqOpen() {
      let res = await getShebei()
      this.addEqtableData = res.data.data.records

    },
    addRule() {
      this.see.ruleShow = true
    },
    addNeed() {
      this.see.needShow = true
    },
    detailBTN() {
      this.see.seeShow = true
    },
    addEq() {
      this.addShow = true
    },
    btn() {
      console.log(this.info.addPlanShow)
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
.el-input {
  width: 220px;
}
</style>
