<template>
  <div>
    <el-dialog
      title="编辑保养标准"
      :visible.sync="info.editShow"
      width="60%"
      :modal="false"
      @opened="opened"
      :before-close="handleClose">
      <el-divider></el-divider>
      <button @click="ceshi"> 双方的</button>
      <button @click="jkdsjh">ffdjfjfd</button>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·标准信息</b>
          <el-button size="small" type="primary" style="float: right" @click="saveAll">保存编辑</el-button>
          <el-button size="small" type="primary" style="float: right;margin-right: 15px" @click="resetAll">取消编辑</el-button>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>


      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="formInline.equipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formInline.equipmentName" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="保养部位">
          <el-input v-model="formInline.maintenanceParts" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="保养周期">
          <el-input v-model="formInline.how" placeholder="手动输入" style="width: 100px ;margin-right: 10px"></el-input>
          <el-select v-model="formInline.region" placeholder="选择" style="width: 80px">
            <el-option label="天/次" value="天/次"></el-option>
            <el-option label="周/次" value="周/次"></el-option>
            <el-option label="月/次" value="月/次"></el-option>
            <el-option label="季/次" value="季/次"></el-option>
            <el-option label="年/次" value="年/次"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保养方法">
          <el-input v-model="formInline.maintenanceMethod" placeholder="手动输入"></el-input>
        </el-form-item>
      </el-form>


      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small" @click="addStandard">添加标准</el-button>
          <el-button type="info" size="small">移除标准</el-button>
        </div></el-col>
      </el-row>

<!--------------------------------------------------table------------------------------------------------------------->
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="equipmentCoding"
          label="备件编号"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备件名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="model"
          label="规格型号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="how"
          label="所需数量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="resource"
          label="单位"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>



      <br>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·备注</b>
          <br>
          <el-input v-model="formInline.memo"></el-input>
        </div></el-col>
      </el-row>
    </el-dialog>
    <!-------------------------------------------------  添加项目标准----------------------------------------------------->
    <el-dialog
      title="添加备件"
      :visible.sync="dialogVisible"
      width="60%"
      @opened="Spareopened"
      :modal="false"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·项目标准</b>
          <el-button @click="saveStandard" size="small" type="primary" style="float: right">选择添加</el-button>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :inline="true" :model="standardForm" class="demo-form-inline">
        <el-form-item label="备件编号">
          <el-input v-model="standardForm.equipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="备件名称">
          <el-input v-model="standardForm.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="备件类别">
          <el-input v-model="standardForm.category" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="standardForm.model" placeholder="手动输入" ></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button size="small" type="primary" @click="searchSpare">查询</el-button>
          <el-button size="small" type="primary" @click="resetSpare">重置</el-button>
        </el-form-item>
      </el-form>
      <!--    表格------------------------------->
      <el-table
        ref="multipleTable"
        :data="addtableData"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-top: 10px"
        @selection-change="handleSelectionChange">
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
          label="所需数量"
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
import  {addCheckItem,saveCheckStandard,editCheckStandard,CheckStandardDetail} from "@/api/shebei/equipmentCheck"
import {MaintenancestandardsDetail} from "@/api/shebei/Maintenancestandards"
import {pageList} from "@/api/shebei/InventoryManagement";
export default {
  props:["info"],
  data() {
    return {
      rowIds:"",
      dialogVisible:false,
      formInline: {
        memo:""
      },
      standardForm:{
      },
      publicData:[],
      tableData: [ ],
      addtableData: [ ],
    };
  },
  methods: {
    Spareopened(){
      this.getSparePage()
    },
    //添加备件
    async getSparePage(para){
      let res = await pageList(para)
      this.addtableData=res.data.data.records
    },
    ceshi(){
      this.getSparePage
    },
    jkdsjh(){
      this.getDetail()
    },
    opened(){
      this.getDetail()
    },
   async getDetail(){
      let res = await MaintenancestandardsDetail({id:this.info.id})
     this.tableData=res.data.data.spareDatebases
     this.formInline={
       equipmentCoding:res.data.data.equipmentCoding,
       equipmentName:res.data.data.equipmentName,
       maintenanceParts:res.data.data.maintenanceParts,
       how:res.data.data.maintenanceCycle,
       maintenanceMethod:res.data.data.maintenanceMethod,
     }
     console.log(res.data.data)
    },
    async saveAll(){
      let para = {
        id:this.info.id,
        equipmentCoding:this.formInline.equipmentCoding,
        equipmentName:this.formInline.equipmentName,
        checkItemIds:this.rowIds,
        memo:this.formInline.memo
      }
      let res = await editCheckStandard(para)
      if(res.data.code==200){
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      }else{
        this.$message.error('操作失败');
      }
    },
    handleSelectionChange(val){
      this.publicData=val
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
    },

    async saveStandard(){
     // this.tableData.push(this.publicData)
      this.tableData=this.publicData
      this.dialogVisible=false
    },
    addStandard(){
      this.dialogVisible=true
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
