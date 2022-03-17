<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="设备编号">
      <el-input v-model="formInline.equipmentCoding" placeholder="手动输入"></el-input>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-input v-model="formInline.equipmentName" placeholder="手动输入"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="searchBtn">查询</el-button>
      <el-button type="" size="small" @click="resetBtn">重置</el-button>
    </el-form-item>
  </el-form>
<br>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-button type="primary" size="small" @click="addBTN">新增标准</el-button>
      <el-button type="primary" size="small" @click="removeAll">删除</el-button>
    </div></el-col>
  </el-row>



  <el-table
    ref="multipleTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @row-click="rowClick"
    @selection-change="selsChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="equipmentCoding"
      label="设备编号"
      width="400px">
    </el-table-column>
    <el-table-column
      prop="equipmentName"
      label="设备名称"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template  v-slot:default="slotProps">
        <el-button type="text" size="small" @click="editBtn">详情</el-button>
        <el-button type="text" size="small" @click="editBtn">编辑</el-button>
        <el-button type="text" size="small" @click="RemoveSelf(slotProps.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <add-page :info="info"></add-page>
  <edit-page :info="info"></edit-page>
</div>
</template>

<script>
import  {CheckStandardPage,removeCheckStandardItem} from "@/api/shebei/equipmentCheck"
import addPage from "./addPage";
import editPage from "./editPage";
export default {
  components:{
    addPage,
    editPage
  },
  data() {
    return {
      info:{
        addShow:false,
        editShow:false,

      },
      id:"",
      formInline: {
        equipmentCoding: '',
        equipmentName: ''
      },
      rowIds:"",
      tableData: [],
    }
  },
  created() {
    this.getPage()
  },
  methods:{
    resetBtn(){
      this.formInline={}
    },
    searchBtn(){
      let para = {
        number:this.formInline.equipmentCoding,
        repairman:this.formInline.equipmentName
      }
      this.getPage(para)
      console.log(para)
    },
    rowClick(row){
      this.info.id=row.id
      this.info.equipmentCoding=row.equipmentCoding
      this.info.equipmentName=row.equipmentName
    },
  async RemoveSelf(val){
    this.rowdel = val;
      let res = await removeCheckStandardItem({ids:val.id})
    if(res.data.code==200){
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.getPage()
    }
    },
    selsChange(val) {
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
    },
    async removeAll(){
      let res = await removeCheckStandardItem({ids:this.rowIds})
      console.log(res.data.code)
      console.log(this.rowIds)
      this.getPage()
    },

    editBtn(){
      this.info.editShow=true
      console.log(666)
    },
    dsdf(){
      this.getPage()
    },
   async getPage(para){
      let res = await CheckStandardPage(para)
        this.tableData=res.data.data.records
     console.log(res.data.data.records)
    },
    addBTN(){
      this.info.addShow=true
    }
  }
}
</script>

<style scoped>

</style>
