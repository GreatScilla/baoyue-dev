<template>
<div>
  <el-dialog
    title="设备申请借用单"
    :visible.sync="info.addShow"
    width="60%"
    :modal="false"
    @opened="openAll"
    style="background-color: rgba(0,0,0,0.5)"
    :before-close="handleClose">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·单据信息</b>
        <el-button style="float: right" type="primary" size="small"> 保存</el-button>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="单据编号">
        <el-input v-model="formInline.number" placeholder="自动带入" disabled></el-input>
      </el-form-item>
      <el-form-item label="单据日期">
        <el-date-picker
          style="width: 190px"
          value-format="yyyy-MM-dd"
          v-model="formInline.value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="制单人：">
        <el-input v-model="formInline.user" placeholder="请输入个人名称"></el-input>
      </el-form-item>
      <el-form-item label="借用部门">
        <el-select v-model="formInline.dept" placeholder="请选择" style="width: 190px">
          <el-option label="部门一" value="部门一"></el-option>
          <el-option label="部门二" value="部门二"></el-option>
          <el-option label="部门三" value="部门三"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="借用人：">
        <el-select v-model="formInline.user" placeholder="请选择" style="width: 190px">
          <el-option label="郝美丽" value="郝美丽"></el-option>
          <el-option label="小马同学" value="小马同学"></el-option>
          <el-option label="乒卡乓" value="乒卡乓"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否归还">
        <el-select v-model="formInline.guihuan" placeholder="请选择" style="width: 190px">
          <el-option label="是" value="郝美丽"></el-option>
          <el-option label="否" value="小马同学"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归还日期">
        <el-date-picker
          style="width: 190px"
          v-model="formInline.value1"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·借用设备列表</b>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-button size="small" type="primary" @click="addEquipmentBtn">添加设备</el-button>
    <el-button size="small" type="info">移除设备</el-button>
<!--   -------------------------------------- 设备表格----------------------------------------------->
    <el-table
      ref="multipleTable"
      :data="equipmenTtableData"
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
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <br>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b>·备注</b>
        <el-input v-model="formInline.mome"></el-input>
      </div></el-col>
    </el-row>
  </el-dialog>

<!--  ----------------------------------------添加设备页面---------------------------------------------------->
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
          <el-button size="small" type="primary" style="float: right" @click="putEquipmentBtn">选择添加</el-button>
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
        <el-button type="" size="small" @click="resetAll">重置</el-button>
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
</div>
</template>

<script>
import {getShebei} from "@/api/shebei/account"
export default {
  props:["info"],
  data() {
    return {
      addShow:false,
      equipmentForm:{

      },
      formInline: {
        user: '',
        region: ''
      },
      equipmenTtableData:[],
      addEqtableData: [],
      saveData:[]
    };
  },
  methods: {
    resetAll(){
      this.equipmentForm={}
    },
    searchEquipment(){
          let para={
            assetTag:this.equipmentForm.assetTag,
            equipmentCoding:this.equipmentForm.equipmentCoding,
            name:this.equipmentForm.name,
          }
          this.getPage(para)
    },
    equipmentSelChange(val){
      console.log(val)
      this.saveData=val
    },
    putEquipmentBtn(){
     this.equipmenTtableData=this.saveData
      this.addShow=false
      console.log(666)
    },
    openAll(){
      let now = new Date();
      this.formInline={
        number:now.getTime()
      }
    },
    async addEqOpen(){
      this.getPage()
    },
   async getPage(para){
     let res = await getShebei(para)
     this.addEqtableData=res.data.data.records
    },
    addEquipmentBtn(){
      this.addShow=true
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

</style>
