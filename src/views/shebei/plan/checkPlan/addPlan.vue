<template>
  <div>
    <el-dialog
      title="新增点检计划"
      :visible.sync="info.addPlanShow"
      width="70%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      @opened="open_all"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·计划信息</b>
            <el-button size="small" type="primary" style="float: right" @click="submitForm('formInline')">保存</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--    头部表单-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" :rules="rules">
        <el-form-item label="计划单号" required>
          <el-input v-model="number" placeholder="手动输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="计划名称" prop="name">
          <el-input v-model="formInline.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="计划周期" prop="num">
          <el-input prop="num" v-model="formInline.num" placeholder="数字" style="width: 80px;margin-right: 10px"></el-input>
          <el-select v-model="formInline.how" placeholder="请选择" style="width: 100px">
            <el-option label="天/次" value="天/次"></el-option>
            <el-option label="周/次" value="周/次"></el-option>
            <el-option label="月/次" value="月/次"></el-option>
            <el-option label="季/次" value="季/次"></el-option>
            <el-option label="年/次" value="年/次"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <br>
        <el-form-item label="开始日期" prop="startDate">
          <div class="block">
            <el-date-picker
              prop="startDate"
              v-model="formInline.startDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-col :span="11" style="width: 220px" prop="startTime">
              <el-time-picker
                prop="startTime"
                placeholder="选择时间"
                value-format="HH:mm:ss"
                v-model="formInline.startTime"
                style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-col :span="11" style="width: 220px" prop="endTime">
            <el-time-picker
              prop="endTime"
              placeholder="选择时间"
              value-format="HH:mm:ss"
              v-model="formInline.endTime"
              style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <b>·点检对象</b>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" size="small" @click="addEq">添加设备</el-button>
            <el-button type="info" size="small" @click="delArray">移除设备</el-button>
          </div>
        </el-col>
      </el-row>
      <!--    表格-->
      <el-table
        ref="multipleTableOne"
        :data="tableData"
        border
        @row-click="qqq"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selsChange">
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
          label="所属人员">
        </el-table-column>
<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="160">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="text" size="small" @click="detailBtn">详情</el-button>-->
<!--            <el-button type="text" size="small">编辑</el-button>-->
<!--            <el-button type="text" size="small">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <el-divider></el-divider>
        <el-form-item label="备注">
          <el-input v-model="formInline.memo"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  ---------------------------------------------添加设备页面---------------------------------------------------------->
    <el-dialog
      title="添加设备"
      :visible.sync="addShow"
      width="70%"
      :modal="false"
      :before-close="handleClose">
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

    <see :see="see"></see>
  </div>
</template>

<script>
import see from "./see"
import {getShebei} from "@/api/shebei/account"
import {checkSave} from "@/api/shebei/equipmentCheck"

export default {
  components: {
    see
  },
  props: ["info"],
  name: "addPlan",
  data() {
    return {
      number:"",
      rowIds: "",
      see: {
        seeShow: false
      },
      memo:"",
      addShow: false,
      formInline: {
        user: '',
        num: '',
        how: '',
        startDate:'',
        startTime:"",
        endTime:"",
      },
      addformInline: {
        assetTag: "",
        user: '',
        region: ''
      },
      tableData: [],
      addtableData: [],
      rules: {
        name: [
          { required: true, message: '请输入计划名称', trigger: 'blur' },
        ],
        num: [
          { required: true, message: '请选择计划周期', trigger: 'blur' }
        ],
        startDate: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        startTime: [
          {  required: true, message: '请选择时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      tableDataAmount:[]
    };
  },
  methods: {
    qqq(row){
      console.log(row.id)
    },
    delArray(row, i) {
      console.log(999)
      //拿到选中的数据
      let val = this.tableDataAmount
      //如果选中数据存在
      if(val){
        //将选中数据遍历
        val.forEach((val,index) =>{
          //遍历源数据
          this.tableData.forEach((v,i)=>{
            //如果选中数据和源数据的某一条唯一标识符相等，删除对应的源数据
            if(val.id === v.id){
              this.tableData.splice(i,1)
            }
          })
        })
      }
      //清除选中状态
      this.$refs.multipleTable.clearSelection()
    },

    ppppp(){
      console.log(this.formInline.endTime)
    },
    open_all(){
      let now = new Date();
      this.number=now.getTime()

    },
    selsChange(val) {
      this.tableDataAmount = val
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
    },
    //保存
     submitForm(formInline) {
      this.$refs[formInline].validate((valid) => {
        if (valid) {
          let para={
            number:this.number,
            name:this.formInline.name,
            cycle:this.formInline.num+this.formInline.how,
            startDate:this.formInline.startDate,
            startTime:this.formInline.startTime,
            endTime:this.formInline.endTime,
            eqIds	:this.rowIds,
            memo:this.memo,
          };
          let res =  checkSave(para)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.info.addPlanShow=false
       this.$parent.getPage()
    },

    choiceAppendEqBtn() {
      this.tableData = this.saveEQ;
      this.addShow = false
    },
    addEqSelectChange(row) {
      this.saveEQ = row
    },
    seleReset() {
      this.addformInline = {}
    },
    async searchEq() {
      let memeda = {
        assetTag: this.addformInline.assetTag,
        equipmentCoding: this.addformInline.equipmentCoding,
        name: this.addformInline.name
      }
      let res = await getShebei(memeda)
      console.log(res)
      this.addtableData = res.data.data.records
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
