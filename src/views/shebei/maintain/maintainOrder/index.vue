<template>
  <div>

    <el-dialog
      title="搜索"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
<!--      <el-form-->
<!--        ref="form"-->
<!--        :model="form"-->
<!--        label-width="90px"-->
<!--        class="form-footer">-->
<!--        <el-form-item label="出库状态:" >-->
<!--          <el-input v-model="formInline.name" placeholder="手动输入"></el-input>&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="单据编号:" >-->
<!--          <el-input v-model="form.orderSn"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户名称:" >-->
<!--          <el-input v-model="form.memberUsername"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="单据日期:">-->
<!--        </el-form-item>-->
<!--        <el-form-item label="交货日期:">-->
<!--          <el-date-picker-->
<!--            @change="changeExpectReceiveDate"-->
<!--            v-model="expectReceiveDate"-->
<!--            type="daterange"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期"-->
<!--            value-format="yyyy-MM-dd">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item class="search-footer">-->
<!--          <el-button @click="handleReset('form')" size="small">重置</el-button>-->
<!--          <el-button type="primary" size="small" @click="handleList">查询</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      ------------------------------------------11------------------------------------------------------------->
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
<!--    <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--      <el-form-item label="工单编号">-->
<!--        <el-input v-model="formInline.name" placeholder="手动输入"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="保养部门">-->
<!--        <el-input v-model="formInline.dept" placeholder="手动输入"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="保养人">-->
<!--        <el-input v-model="formInline.assetTag" placeholder="手动输入"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" size="small" @click="searchAll">查询</el-button>-->
<!--        <el-button type="" size="small"  @click="resetBtn">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-button type="primary" size="small" @click="searchBtn"><i class="el-icon-search"></i>搜索</el-button>
<!--   ------------------------------------ 表格 ------------------------------------------------------------------>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      @row-click="clickRow"
      tooltip-effect="dark"
      style="width: 100%"
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
          <span v-if="slotProps.row.orderStatus == '0'" style="color: #909399"
          >未完成</span>
          <span v-if="slotProps.row.orderStatus == '1'" style="color: #67C23A"
          >已完成</span>
          <span v-if="slotProps.row.orderStatus == '2'" style="color: #909399"
          >已验收</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="工单编号"
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
        width="160"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        show-overflow-tooltip>
        <template  slot-scope="scope">
          <el-button style="margin-right: 3px" size="mini" type="text" @click="detailBtn">详情</el-button>
          <el-button v-if="scope.row.orderStatus == '0'" size="mini" type="text"
                     @click="backBtn(scope.$index, scope.row)"
          >结果反馈</el-button>
          <el-button v-if="scope.row.orderStatus == '1'" style="color: #67C23A"
          >验收</el-button>
          <el-button v-if="scope.row.orderStatus == '2'" style="color: #909399"
          >已验收</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <add-plan :info="info"> </add-plan>
    <detail :info="info"> </detail>
    <end-back :info="info"></end-back>
  </div>
</template>

<script>
import {maintainPlanPage,maintainAssign,maintainDetail} from "@/api/shebei/maintain"
import detail from "./detail";
import endBack from "./endBack";
export default {
  components:{
    detail,
    endBack
  },
  data() {
    return {
      total:"",
      dialogVisible:false,
      info:{
        addPlanShow:false,
        detailShow:false,
        assignedShow:false,
        backShow:false,
        spareId:"",
        id:''
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
    searchBtn(){
      this.dialogVisible=true
    },

    backBtn(index, row){
      this.info.id=row.id
        this.info.backShow=true
    },
    clickRow(row){
      this.info.spareId=row.id
      this.info.id=row.id
    },
    resetBtn(){
      this.formInline={}
    },
    searchAll(){
      this.getpage(this.formInline)
    },
    handleSelectionChange(val){
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
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
   async  aaa(){
      let res = await maintainDetail({id:this.rowIds})
    },
    handleSizeChange(val) {
      this.getpage({pageSize:val})
    },
    handleCurrentChange(val) {
      this.getpage({pageNum:val})
    },
    async getpage(para){
      let res = await maintainPlanPage(para)
      this.tableData=res.data.data.records
      this.total=res.data.data.total
    },
    detailBtn(){
      this.info.detailShow=true
    },
  }
}


</script>

<style scoped>

</style>
