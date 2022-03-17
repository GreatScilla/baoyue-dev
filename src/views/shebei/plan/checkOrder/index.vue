<template>
<div>
  <el-dialog
    title="搜索"
    :visible.sync="searchShow"
    width="30%"
    :modal="false"
    style="background-color: rgba(0,0,0,0.5)"
    :before-close="handleClose">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="工单编号">
        <el-input v-model="formInline.number" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="点检部门">
        <el-input v-model="formInline.dept" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="点检人：">
        <el-input v-model="formInline.repairman" placeholder="手动输入"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" size="small" @click="serchAll">查询</el-button>
        <el-button type="" size="small" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

<el-button size="small" type="primary" @click="searchBtn"> <i class="el-icon-search"></i>搜索 </el-button>
  <el-table
    ref="multipleTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    @row-click="rowClick"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      label="工单状态"
      prop="status"
      width="120">
      <template  v-slot:default="slotProps">
       <span v-if="slotProps.row.status == '0'" style="color: #aaaaaa"
         >未指派</span>
        <span v-if="slotProps.row.status == '1'" style="color: #67C23A"
        >已指派</span>
        <span v-if="slotProps.row.status == '2'" style="color: #409EFF"
        >已验收</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="number"
      label="工单编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="工单日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dept"
      label="点检部门"
      width="120">
    </el-table-column>
    <el-table-column
      prop="executor"
      label="点检人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="点检结果"
      width="120">
      <template v-slot:default="slotProps">
        <el-button type="text" size="small" @click="seeBtn"
        v-if="slotProps.row.status == '1'||slotProps.row.status == '2'" >查看</el-button>
        <el-button type="text" size="small" @click="seeBtn"
        v-if="slotProps.row.status == '0'" >--</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="memo"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="detailBtn">详情</el-button>
        <el-button type="text" size="small" @click="endBackBtn">结果反馈</el-button>
        <el-button type="text" size="small" @click="acceptanceBtn(scope.$index, scope.row)"
        v-if="scope.row.status=='0'"
        >验收</el-button>
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
  <see-acceptance :info="info"></see-acceptance>
  <detail :info="info"></detail>
  <end-b-ack :info="info"></end-b-ack>
  <acceptance :info="info"></acceptance>
</div>
</template>

<script>
import {checkPlanPage} from "@/api/shebei/equipmentCheck"
import seeAcceptance from "./seeAcceptance";
import endBAck from "./endBAck";
import Detail from "./detail";
import acceptance from "./acceptance";
export default {
  components:{
    Detail,
    seeAcceptance,
    endBAck,
    acceptance
  },
  data() {
    return {
      total:"",
      searchShow:false,
      info:{
        seeShow:false,
        detailShow:false,
        backShow:false,
        acceptanceShow:false,
        id:""
      },
      formInline: {
        number: '',
        dept: '',
        repairman:"",
      },
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
    serchAll(){
        this.getPage(this.formInline)
      this.searchShow=false
    },
    searchBtn(){
      this.searchShow=true
    },
    acceptanceBtn(index, row){
      console.log(row)
      this.info.acceptanceShow=true
    },
    endBackBtn(){
      this.info.backShow=true
    },
    rowClick(row){
      console.log(row)
      this.info.id=row.id
    },
   async getPage(para){
      let res = await checkPlanPage(para)
     this.total=res.data.data.total
     this.tableData=res.data.data.records
    },
    aaaa(){
        this.getPage()
    },
    detailBtn(){
      this.info.detailShow=true
      console.log(this.info.detailShow)
    },
    seeBtn(){
      this.info.seeShow=true
    }
  },
}
</script>

<style scoped>

</style>
