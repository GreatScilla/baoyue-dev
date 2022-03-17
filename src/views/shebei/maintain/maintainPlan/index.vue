<template>
  <div>
<!--    <button @click="aaa">测试</button>-->

    <el-dialog
      title="搜索"
      :visible.sync="searchShow"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-form label-width="100px"  :model="formInline" class="demo-ruleForm" >
        <el-form-item label="工单编号">
          <el-input v-model="formInline.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="保养部门">
          <el-input v-model="formInline.dept" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="保养人">
          <el-input v-model="formInline.assetTag" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchAll">查询</el-button>
          <el-button type="" size="small" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-button type="primary" size="small" @click="searchBtn"><i class="el-icon-search"></i>搜索</el-button>
        <el-button type="primary" size="small" @click="addPlan">新增计划</el-button>
        <el-button type="primary" size="small">删除</el-button>
        <el-button type="primary" size="small" @click="assignedBtn">指派</el-button>
      </div></el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="clickRow"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="计划状态"
        prop="status"
        width="165">
        <template  v-slot:default="slotProps">
          <span v-if="slotProps.row.status == '0'" style="color: #67C23A"
          >已指派</span>
          <span v-if="slotProps.row.status == '1'" style="color: #909399"
          >未指派</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="计划单号"
        width="165">
      </el-table-column>
      <el-table-column
        prop="name"
        label="计划名称"
        width="165">
      </el-table-column>
      <el-table-column
        prop="maintenanceDept"
        label="保养部门"
        width="165">
      </el-table-column>
      <el-table-column
        prop="maintenanceMan"
        label="保养人"
        width="165">
      </el-table-column>
      <el-table-column
        prop="planCycle"
        label="计划周期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailBtn">详情</el-button>
          <el-button type="text" size="small" @click="editBtn">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--   ---------------------------------- 分页---------------------------------------->
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
<!--    --------------------------------------------指派------------------------------------->
    <el-dialog
      title="指派"
      :visible.sync="info.assignedShow"
      width="50%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="点检部门">
          <el-select v-model="maintenanceDept" placeholder="活动区域">
            <el-option label="部门一" value="部门一"></el-option>
            <el-option label="部门二" value="部门二"></el-option>
            <el-option label="部门三" value="部门三"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点检人">
          <el-select v-model="maintenanceMan" placeholder="活动区域">
            <el-option label="人员1" value="人员1"></el-option>
            <el-option label="人员2" value="人员2"></el-option>
            <el-option label="人员3" value="人员3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">指派</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <add-plan :info="info"> </add-plan>
    <detail :info="info"> </detail>
    <edit :info="info"></edit>
  </div>
</template>

<script>
import {maintainPlanPage,maintainAssign} from "@/api/shebei/maintain"
import addPlan from "./addPlan";
import detail from "./detail";
import edit from "./edit";
export default {
  components:{
    addPlan,
    detail,
    edit
  },
  data() {
    return {
      total:"",
      size:"",
      searchShow:false,
      info:{
        addPlanShow:false,
        detailShow:false,
        assignedShow:false,
        editShow:false,
        spareId: "",
      },
      maintenanceDept:"",
      maintenanceMan:"",
      formInline: {
        name: '',
        dept: '',
        assetTag: '',
      },
      tableData: [],
      rowIds:"",

    }
  },
  created() {
    this.getpage()
  },
  methods:{
    handleSizeChange(val) {
      this.size=val
      console.log(val)
      this.getpage({pageSize:val})
    },
    handleCurrentChange(val) {
      this.getpage({pageNum:val})

  },
    searchBtn(){
      this.searchShow=true
      console.log(8989)
    },
    editBtn(){
      this.info.editShow=true
    },
    clickRow(row){
      // this.info.orderId=
      this.info.spareId=row.id
    },
    resetBtn(){
      this.formInline={}
    },
    searchAll(){
      this.getpage(this.formInline)
      this.searchShow=false
    },
    handleSelectionChange(val){
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
      console.log(this.rowIds)
    },
    async onSubmit(){
      let para = {
        id:this.rowIds,
        maintenanceDept:this.maintenanceDept,
        maintenanceMan:this.maintenanceMan,
      }
      let res = await maintainAssign(para)
      console.log(res.data)
      if(res.data.code==200){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.info.assignedShow=false
        this.getpage()
      }
    },
    assignedBtn(){
      this.info.assignedShow=true
      console.log(666)
    },
    aaa(){
      this.getpage()
    },
   async getpage(para){
      let res = await maintainPlanPage(para)
     this.tableData=res.data.data.records
     this.total=res.data.data.total
    },
    detailBtn(){
      this.info.detailShow=true
    },
    addPlan(){
      this.info.addPlanShow=true
    },

  }
}


</script>

<style scoped>

</style>
