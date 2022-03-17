<template>
  <div>
    <el-dialog
      title="编辑报修工单"
      :visible.sync="info.editShow"
      width="68%"
      border
      @opened="openAll"
      style="background-color: rgba(0,0,0,0.5)"
      :modal="false"
      :before-close="handleClose">
      <el-divider></el-divider>
      <!--      <div class="box">-->
      <b @click="ooo">·工单信息</b>
      <el-button type="primary" size="small" @click="saveform" style="float: right"> 保存编辑</el-button>
      <!--        <el-button type="primary" size="mini" @click="saveform"> &nbsp;&nbsp;保存 &nbsp;&nbsp;</el-button>-->
      <!--        <button @click="qwe">12</button>-->
      <!--      </div>-->
      <br>
      <br>
      <el-divider></el-divider>
      <!--     form表单-->
      <el-form ref="form" :model="workOrderForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="工单编号" prop="number" >
                <el-input v-model="workOrderForm.number" disabled></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="工单名称" prop="name" >
                <el-input v-model="workOrderForm.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="工单日期" prop="createTime" >
                <div class="block">
                  <!--              <span class="demonstration">默认</span>-->
                  <el-date-picker
                    v-model="value1"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="制单人" prop="creaetUsername">
                <el-input v-model="workOrderForm.createUsername"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="紧急程度" >
                <el-select v-model="urgency" placeholder="请选择" @change="urgencyChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="故障类别" >
                <el-select v-model="faultCategory" placeholder="请选择" @change="faultCategoryChange">
                  <el-option
                    v-for="item in categorys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <br>
        <b>·维修对象</b>
        <el-divider></el-divider>
        <el-button   type="primary" @click="pdd(value)" size="small">添加设备</el-button>
        <el-button   type="info" size="small">移除设备</el-button>
        <!--      表格-->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 15px;margin-top: 20px"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="assetTag"
            label="资产编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="equipmentCoding"
            label="设备编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            width="120"
            label="设备名称">
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
          <el-table-column prop="location" label="所在位置" width="120"></el-table-column>
          <el-table-column
            prop="custodian"
            label="所属人员"
            width="120">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <el-input v-model="workOrderForm.memo" placeholder="请输入内容"></el-input>
      </el-form>
    </el-dialog>
    <!--    <v-tianjia :info="info"></v-tianjia>-->


    <!--    //添加页？-->
    <el-dialog
      title="添加设备"
      @open='open'
      :visible.sync="tianjiaShow"
      width="65%"
      style="background-color: rgba(0,0,0,0.5)"
      :modal="false"
      :before-close="handleClose">
      <!--      <v-tianjia :tableData="tableData" @setValue="getValue"></v-tianjia>-->
      <div>
        <el-divider></el-divider>
        <b>·设备筛选</b>
        <el-button type="primary"
                   @click="addTrue"
                   style="float: right"
                   size="small"

        >选择添加
        </el-button>
        <div style="height: 10px"></div>
        <el-divider></el-divider>



        <!--        添加设备页-->
        <el-form ref="form" :model="addsaberform" label-width="80px">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="资产编号" prop="assetTag" >
                  <el-input v-model="addsaberform.assetTag"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="设备编号" prop="equipmentCoding">
                  <el-input v-model="addsaberform.equipmentCoding"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="设备名称" prop="name">
                  <el-input v-model="addsaberform.name"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div style="float: right">
            <el-button type="primary" size="small" @click="handList">查询</el-button>
            <el-button type="primary" size="small" @click="resetForm">重置</el-button>
          </div>
        </el-form>
        <div class="asd"></div>
        <!--      添加选择表格-->
        <el-table
          ref="multipleTable"
          :data="eqtableData"
          border
          size="mini"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selsChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="资产编号"
            width="120"
            prop="assetTag"
          >
          </el-table-column><el-table-column
          label="设备编号"
          width="120"
          prop="equipmentCoding"
        >
        </el-table-column><el-table-column
          label="设备名称"
          width="120"
          prop="name"
        >
        </el-table-column><el-table-column
          label="设备类别"
          width="120"
          prop="category"
        >
        </el-table-column>
          <el-table-column
            label="规格型号"
            width="120"
            prop="specifications"
          >
          </el-table-column>
          <el-table-column
            label="所在部门"
            width="120"
            prop="dept"
          >
          </el-table-column>
          <el-table-column
            prop="location"
            label="所在位置"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="custodian"
            label="所属人员"
            width="120">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import main from "@/main"
import {fixdetail,uploadFix} from "@/api/shebei/fix";
import { getShebei , selecTtree } from "@/api/shebei/account";
import  vTianjia from "./tianjia"

export default {
  props: ["info" ],
  components:{
    vTianjia
  },
  name: "",

  data() {
    return {
      faultCategory:'',
      urgency:'',
      //pid
      eqtableData:[],
      tableData:[],
      assetNewTag:"",
      assetAddTag:"",
      assetTag:"",
      //搜索设备表单
      addsaberform:{},
      //子组件传得数据
      value: [],
      //创建维修工单的参数
      pid:"",
      tianjiaShow:false,
      multipleSelection: [],
      dialogVisible: false,
      //工单表单
      workOrderForm:{},
      //下拉框数据
      options: [
        {
          value: '0',
          label: '特别紧急'
        }, {
          value: '1',
          label: '一般紧急'
        }, {
          value: '2',
          label: '比较紧急'
        }, ],
      //下拉异常
      categorys: [
        {
          value: '0',
          label: '异常停机'
        }, {
          value: '1',
          label: '异响'
        }, {
          value: '2',
          label: '温度异常'
        }, ],
      // value: '',
      category: '',
      saceData:[],
      // 时间数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
    };
  },
  methods: {
    urgencyChange(){
      this.urgencySave=this.urgency
      console.log(this.urgencySave)
    },
    faultCategoryChange(){
        this.faultCategorySave=this.faultCategory
      console.log(this.faultCategorySave)
    },
    ooo(){
      console.log(this.faultCategory)
    },
    async opened(){
      let obj = JSON.parse(JSON.stringify(this.info))
      let pid = obj.pid
      let id = obj.id
      let res = await fixdetail({pid: pid,id:id})
      this.workOrderForm={
        number:res.data.data.number,
        name:res.data.data.name,
        createUsername:res.data.data.createUsername,
      }

      switch (res.data.data.faultCategory){
        case 0 : this.faultCategory="异常停机";
          break;
        case 1 : this.faultCategory="异响";
          break;
        case 2 : this.faultCategory="温度异常";
          break;
      };
      switch (res.data.data.urgency){
        case 0 : this.urgency="特别紧急";
          break;
        case 1 : this.urgency="一般紧急";
          break;
        case 2 : this.urgency="比较紧急";
          break;
      }
      this.urgencySave=res.data.data.urgency
      this.faultCategorySave=res.data.data.faultCategory
      this.value1=res.data.data.createTime
      this.tableData.push(res.data.data.equipmentInfo)
    },
    openAll(){
      this.opened()
      let now = new Date();
      console.log(now.getTime(),777)
      this.workOrderForm={
        number:now.getTime()
      }
    },
    qwe(){
    },
    //查询按钮
    async cahxun(){
      // console.log(this.addsaberform,456)
    },
    //清空表单
    resetForm() {
      // console.log(this.$data.ruleForm)
      this.$data.addsaberform={}
    },

    //选中添加数据
    selsChange(sels,val) {
      this.saceData=sels
      // this.sels = sels;
      //遍历选中的数组
      // for (let tableData of this.sels) {
      //     this.disabled = false;
      // }
      // let length = this.sels.length;
      // if(length>1){
      //     this.$message('只能选择单条数据');
      //     // console.log(this.$refs.multipleTable.$children)
      // }
      // this.addsaberform={};
      // this.$data.assetNewTag=sels[0].assetTag;
      // console.log(this.$data.assetNewTag,456)
    },
    //选择保存数据
    handleSelectionChange(val){
      const newarr = val.map(ele => ele.assetTag);
      this.pid = newarr.join(",");
      // this.pid=val.assetTag
      console.log(this.pid )

      this.sels = val;
      //遍历选中的数组
      for (let tableData of this.sels) {
        this.disabled = false;
      }
      let length = this.sels.length;
      // this.pid=sels[0].assetTag
      // console.log(this.$data.pid)
    },
    // 选择添加
    addTrue(){
      this.$message('添加成功');
      console.log(this.saceData)
      console.log(this.tableData)
      this.tableData=this.tableData.concat(this.saceData)
      // this.addsaberform.assetTag={};
      // this.addsaberform.assetTag=this.$data.assetNewTag
      // this.handList(this.$data.assetNewTag)
      this.$data.tianjiaShow=false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    //保存工单
    async saveform(...arg){
      // console.log(this.workOrderForm)
      let params={
        id:this.info.updid,
        number:this.workOrderForm.number,
        name:this.workOrderForm.name,
        documentDate:this.value1,
        urgency:this.urgencySave,
        faultCategory:this.faultCategorySave,
        pid:this.pid,
        memo:this.workOrderForm.memo,
      }
      let para = JSON.parse(JSON.stringify(params))
      let res = await uploadFix(para)
      this.info.editShow=false
      this.$parent.handleList()
      // if (arg.length>0) {
      //   params = Object.assign(params,arg[0])
      // }

      // let res = await modify(para)

    },
    pdd(){
      this.$data.tianjiaShow=true
    },
    //设置添加页一个渲染表单
    async handList(...arg){
      let params = {
        name:this.addsaberform.name,
        assetTag:this.addsaberform.assetTag,
        equipmentCoding:this.addsaberform.equipmentCoding}
      let res = await getShebei(params)
      this.eqtableData = res.data.data.records;
    },
    async open(){
      this.resetForm()
        this.handList()
      const res = await getShebei(this.paging);
      this.eqtableData = res.data.data.records;
    },
  },
  getValue(value) {
    this.value = value;
  },




}
</script>

<style lang="scss" scoped>
.box {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}

.el-row {
  /*margin-bottom: 20px;*/

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

/*.bg-purple-dark {*/
/*  background: #99a9bf;*/
/*}*/
/*.bg-purple {*/
/*  background: #d3dce6;*/
/*}*/
/*.bg-purple-light {*/
/*  background: #e5e9f2;*/
/*}*/
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
