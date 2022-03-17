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
        <el-form-item label="计划单号">
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
          <el-button type="primary" size="small" @click="searchAll">查询</el-button>
          <el-button type="" size="small" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-button type="primary" size="small" @click="searchBtn"><i class="el-icon-search"></i> 查询</el-button>
        <el-button type="primary" size="small" @click="addPlan">新增计划</el-button>
        <el-button type="primary" size="small" @click="removeCheck">删除</el-button>
        <el-button type="primary" size="small" @click="assignedBtn">指派</el-button>
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
        label="计划状态"
        prop="status"
        width="120">
        <template  v-slot:default="slotProps">
      <span v-if="slotProps.row.status == '0'" style="color: #aaaaaa"
          >未指派</span>
          <span v-if="slotProps.row.status == '1'" style="color:#67C23A "
          >已指派</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="计划单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="计划名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="dept"
        label="点检部门"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="executor"
        label="点检人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="cycle"
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
          <el-button type="text" size="small" @click="removeSele(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    //分页插件-->
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
    <edit :info="info"></edit>
<!--···················································    指派------------------------------------------------------>
    <el-dialog
      title="指派"
      :visible.sync="assShow"
      width="40%"
      style="background-color: rgba(0,0,0,0.5)"
      :modal="false"
      :before-close="handleClose">
      <template>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="点检部门">
        <el-select v-model="deptvalue" placeholder="请选择" style="width: 120px">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.deptName"
            :value="item.deptName">
          </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="点检人">
        <el-select v-model="uservalue" placeholder="请选择" style="width: 120px">
          <el-option
            v-for="item in useroptions"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName">
          </el-option>
        </el-select>
          </el-form-item>
<el-form-item>
  <el-button size="small" type="primary" @click="eqassignedPlanBtn">指派</el-button>
</el-form-item>
        </el-form>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import {deptList,userList} from "@/api/shebei/commit"
import {checkPlanPage,checkRemove,eqassignedPlan} from "@/api/shebei/equipmentCheck"
import addPlan from "@/views/shebei/plan/checkPlan/addPlan";
import detail from "@/views/shebei/plan/checkPlan/detail";
import edit from "./edit"
import {getShebei} from "@/api/shebei/account";
export default {
components:{
  addPlan,
  detail,
  edit
},
  data() {
    return {
      // 分页
      total: "",
      // 分页
      paging: "",
      searchShow:false,
      // select
      options: [],  // select
      useroptions: [],
      deptvalue: '',
      uservalue: '',
      rowIds:"",
      info:{
        addPlanShow:false,
        detailShow:false,
        editShow:false,
        id:""

      },
      assShow:false,
      formInline: {},
      tableData: [],

    }
  },
  created() {
  this.getPage()
  },
  methods:{
    // 分页
    // async handleCurrentChange(val) {
    //   this.paging.pageNum = val;
    //   const res = await getShebei(this.paging);
    //   this.total = res.data.data.total;
    //   this.tableData = res.data.data.records;
    // },
    searchBtn(){
      this.searchShow=true
    },
   async removeSele(index,row){
     console.log(row.id,999)
      let res = await checkRemove({ids:row.id})
      if(res.data.code==200){
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getPage()
    }
    }
    ,
  //rowClick事件
    rowClick(row){
      // console.log(row.id)
      this.info.id=row.id
    },
  //重置
    resetBtn(){
      this.formInline={}
    },
  //搜索
    searchAll(){
      let para={
        number:this.formInline.number,
        dept:this.formInline.dept,
        repairman:this.formInline.repairman,
        }
      this.getPage(para)
      this.searchShow=false
    },
  //指派
   async eqassignedPlanBtn(){
     let para={
       id:this.rowIds,
       dept:this.deptvalue,
       executor:this.uservalue
     }
      let res = await eqassignedPlan(para)
        if (res.data.code==200){
          this.$message({
            message: '指派成功',
            type: 'success'
          });
          this.assShow=false
          this.getPage()
        }
    },
    //可删除。测试按钮
    ddd(){
      // console.log(this.deptvalue)
      // console.log(this.uservalue)
    },
  //指派
   async assignedBtn(){
     let userRes = await userList()
     let deptRes = await deptList()
     // options: [],  // select
     //   useroptions: [],
     console.log(deptRes.data.data)
     this.useroptions=userRes.data.data.records
     this.options=deptRes.data.data
      this.assShow=true
    },
    selsChange(val) {
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
      console.log(this.rowIds)
    },
    //删除
 async removeCheck(){
    let res = await checkRemove({ids:this.rowIds})
   if(res.data.code==200){
     this.$message({
       message: '删除成功',
       type: 'success'
     });
     this.getPage()
   }
  },
    fdfd(){
      this.getPage()
    },
    //分页
  async getPage(para){
    let res = await checkPlanPage(para)
    this.total=res.data.data.total
    this.tableData=res.data.data.records
  },
    handleSizeChange(val) {
      this.getPage({pageSize:val})
    },
    handleCurrentChange(val) {
      this.getPage({pageNum:val})
    },
    // 几页
    // handleCurrentChange(val) {
    //   this.paging.pageNum = val;
    //   this.getPage();
    // },
    // 几条
    handlePageSize(val) {
      this.paging.pageSize = val;
      console.log(val)
      this.getPage();
    },
    detailBtn(){
      this.info.detailShow=true
    },
    editBtn(){
      this.info.editShow=true
    },
    addPlan(){
      this.info.addPlanShow=true
    },

  }
}


</script>

<style scoped>

</style>
