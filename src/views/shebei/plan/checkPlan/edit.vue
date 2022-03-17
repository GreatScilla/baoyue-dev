<template>
  <div>

    <el-dialog
      title="编辑点检计划"
      :visible.sync="info.editShow"
      width="70%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      @opened="opened"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b @click="poi">·计划信息</b>
<!--            <el-button size="small"-->
<!--                       @click="editBtn"-->
<!--                       type="primary"-->
<!--                       style="float: right"-->
<!--                       v-show="selfShow==0"-->
<!--            >编辑-->
<!--            </el-button>-->
<!--            <div v-show="selfShow==1">-->
              <el-button size="small"
                         type="primary"
                         @click="saveUpdate"
                         style="float: right;margin-left: 5px"
              >保存编辑
              </el-button>
<!--              <el-button size="small"-->
<!--                         type="primary"-->
<!--                         style="float: right"-->
<!--                         @click="cancelBtn"-->
<!--              >取消编辑</el-button>-->
<!--            </div>-->
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--    头部表单-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="计划单号">
          <el-input v-model="formInline.number" placeholder="自动带入" disabled></el-input>
        </el-form-item>
        <el-form-item label="计划名称">
          <el-input v-model="formInline.name" placeholder="自动带入"></el-input>
        </el-form-item>
        <el-form-item label="计划周期">
          <el-input v-model="formInline.num" placeholder="数字" style="width: 80px;margin-right: 10px"></el-input>
          <el-select v-model="formInline.how" placeholder="请选择" style="width: 100px">
            <el-option label="天/次" value="天/次"></el-option>
            <el-option label="周/次" value="周/次"></el-option>
            <el-option label="月/次" value="月/次"></el-option>
            <el-option label="季/次" value="季/次"></el-option>
            <el-option label="年/次" value="年/次"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <div class="block">
            <el-date-picker
              v-model="startDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            arrow-control
            v-model="startTime"
            value-format="HH:mm:ss"
            :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker
            arrow-control
            v-model="endTime"
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
            <b>·点检对象</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row >
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" size="small" @click="addEq">添加设备</el-button>
            <el-button type="info" size="small" @click="deleteRow">移除设备</el-button>
          </div>
        </el-col>
      </el-row>
      <!--    表格-->
      <el-table
        ref="multipleTable"
        :data="qwertableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="SelectionChange">
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
          prop="equipmentCoding"
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
          width="120">
        </el-table-column>
<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="点检标准"-->
<!--          width="160">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="text" size="small" @click="detailBTN">查看</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·备注</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-input v-model="formInline.user" placeholder="备注" style="width: 100%"></el-input>
    </el-dialog>
    <!--  ---------------------------------------添加设备页面------------------------------------------------>
    <el-dialog
      title="添加设备"
      :visible.sync="addShow"
      width="70%"
      style="background-color: rgba(0,0,0,0.5)"
      :modal="false"
      :before-close="handleClose">
      <el-divider></el-divider>
      <!--      <el-row>-->
      <!--        <el-col :span="24">-->
      <!--          <div class="grid-content bg-purple-dark">-->
      <!--            <b>·设备筛选</b>-->
      <!--            <el-button size="small" type="primary" style="float: right">选择添加</el-button>-->
      <!--          </div>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·设备筛选</b>
            <el-button size="small" type="primary" style="float: right" @click="choiceAppendEqBtn">选择添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :inline="true" :model="addformInline" class="demo-form-inline">
        <el-form-item label="资产编号">
          <el-input v-model="addformInline.assetTag" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="addformInline.equipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="addformInline.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchEq">查询</el-button>
          <el-button type="" size="small" @click="seleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="addtableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="addEqSelectChange">
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
          label="设备编号"
          prop="equipmentCoding"
          width="120">
        </el-table-column>
        <el-table-column
          label="设备名称"
          prop="name"
          width="120">
        </el-table-column>
        <el-table-column
          label="设备类别"
          prop="category"
          width="120">
        </el-table-column>
        <el-table-column
          label="规格型号"
          prop="specifications"
          width="120">
        </el-table-column>
        <el-table-column
          label="所在部门"
          prop="dept"
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
        >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--    通用组件see-->
    <see :see="see"></see>
  </div>
</template>

<script>
import {checkPlanDetail, checkSave, getEquipmentinfo, upCheckPlan} from "@/api/shebei/equipmentCheck"
import {getShebei} from "@/api/shebei/account";

import see from "./see"

export default {
  components: {
    see
  },
  props: ["info"],
  data() {
    return {
      startDate:"",
      startTime:"",
      endTime:"",
      selfShow: 0,
      see: {
        seeShow: false,
        equipmentCoding:''
      },
      addShow: false,
      value1: "",
      time1: new Date(),
      time2: new Date(),
      formInline: {
        user: '',
        region: ''
      },
      addformInline: {
        number: '',
        region: ''
      },
      qwertableData: [],
      addtableData: [],
      saveData: [],
      test:'12天/次',
    };

  },
  methods: {
    poi(){

    },
    choiceAppendEqBtn(){
      this.qwertableData=this.qwertableData.concat(this.saveData)
      this.addShow=false
    },
    // qwertableData
    addEqSelectChange(val){
      console.log(val)
      this.saveData=val
    },
    //保存
    async saveUpdate() {
      let para={
        id:this.info.id,
        number:this.formInline.number,
        name:this.formInline.name,
        cycle:this.formInline.num+this.formInline.how,
        startDate:this.startDate,
        startTime:this.startTime,
        endTime:this.endTime,
        eqIds	:this.rowIds,
        memo:this.memo,
      };
      if (para.eqIds==undefined){
        this.$message({
          message: '请选择要添加的设备',
          type: 'success'
        });
      }else {
        console.log(para)
      }
      // let res = await upCheckPlan(para)

    },
    //添加设备
    // async addEq() {
    //
    // },
    SelectionChange(row){
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
      console.log(row)
    },
    //删除行
    deleteRow(){

    },
    //获取id
    rowClick(row){
      this.see.equipmentCoding=row.equipmentCoding
    },
    // 打开页面
    opened(){
      this.crkkkk()
    },
    //测试按钮
    async crkkkk(){
      let res = await checkPlanDetail({id:this.info.id})
      // this.formInline.
      this.formInline={
        number:res.data.data.number,
        name:res.data.data.name,
        num:res.data.data.cycle.replace(/[^0-9]/ig,""),
        how:res.data.data.cycle.substring(this.test.length-3),
      }
      console.log(res.data.data.cycle.substring(this.test.length-3))
      this.startDate=res.data.data.startDate,
        this.startTime=res.data.data.startTime
      this.qwertableData=res.data.data.equipmentInfos
    },
    cancelBtn(){
      this.selfShow=0
    },
    editBtn() {
      this.selfShow = 1
    },
    detailBTN() {
      this.see.seeShow = true
      console.log(this.see.seeShow)
    },
    async addEq() {
      this.addShow = true
      let res = await getShebei()
      this.addtableData = res.data.data.records
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
