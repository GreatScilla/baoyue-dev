<template>
<div>
  <el-dialog
    title="报修单"
    :visible.sync="info.detailShow"
    width="65%"
    style="background-color: rgba(0,0,0,0.5)"
    :modal="false"
    @opened="openAll"
    :before-close="handleClose">
<!--    <button @click="btn">测试</button>-->
    <el-divider></el-divider>
    <div>
      <b @click="iii">·工单信息</b>
      <el-button type="primary" size="small" style="float: right">打印</el-button>
    </div>
<br>
    <el-divider></el-divider>
<!--    表单数据-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
      <el-form-item label="工单编号">
        <el-input v-model="formInline.number" placeholder="工单编号"></el-input>
      </el-form-item>
      <el-form-item label="工单日期">
        <el-input v-model="formInline.createTime" placeholder="工单日期"></el-input>
      </el-form-item>
      <el-form-item label="保修名称">
        <el-input v-model="formInline.name" placeholder="保修名称"></el-input>
      </el-form-item>
      <el-form-item label="故障类别">
        <el-input v-model="formInline.urgency" placeholder="故障类别"></el-input>
      </el-form-item>
      <el-form-item label="紧急程度">
        <el-input v-model="formInline.category" placeholder="紧急程度"></el-input>
      </el-form-item>
    </el-form>
    <b>·维修对象</b>
    <el-divider></el-divider>
<!--    获取到的  维修对象表格-->
    <el-table
      border
      :data="tableData"
      style="width: 100%">
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
        prop="name"
        label="所属人员"
>
      </el-table-column>
    </el-table>
<br>
    <b>·所需配件</b>
    <el-divider></el-divider>
    <div>
      <el-button size="small" type="primary" @click="addParts">添加配件</el-button>
      <el-button size="small" type="info">移除配件</el-button>
    </div>
<el-divider></el-divider>
<!--    所需配件表格-->

    <el-table
      border
      ref="multipleTable"
      :data="needtableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="partSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="备件编号"
        prop="equipmentCoding"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="备件名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="model"
        label="规格型号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="随需数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        width="180">
      </el-table-column>
    </el-table>
    <br>
    <b>·备注</b>
    <el-divider></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" disabled>
      <el-input v-model="formInline.user" placeholder="备注"></el-input>
      <el-divider></el-divider>
      <el-form-item label="制单人" size="mini">
        <el-input v-model="formInline.user" placeholder="制单人"></el-input>
      </el-form-item>
      <el-form-item label="维修部门">
        <el-input v-model="formInline.user" placeholder="维修部门"></el-input>
      </el-form-item>
      <el-form-item label="维修人">
        <el-input v-model="formInline.user" placeholder="维修人"></el-input>
      </el-form-item>
    </el-form>

<!--    添加配件的弹框-->

    <el-dialog
      title="添加配件"
      :modal="false"
      :visible.sync="dialogVisible"
      style="background-color: rgba(0,0,0,0.5)"
      width="65%"
      :before-close="handleClose">
      <div>
        <b>·备件筛选</b>
        <el-button size="small" type="primary" style="float: right" @click="partAdd">选择添加</el-button>
      </div>
      <br>
<el-divider></el-divider>


      <el-form :inline="true" :model="formAdd" class="demo-form-inline">
        <el-form-item label="配件编号">
          <el-input v-model="formAdd.partsEquipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="配件名称">
          <el-input v-model="formAdd.partsName" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="配件类别">
          <el-input v-model="formAdd.partsCategory" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="formAdd.partsModel" placeholder="手动输入"></el-input>
        </el-form-item>
          <el-button type="primary" size="small" @click="querryParts">查询</el-button>
          <el-button type="primary" size="small" @click="partsReset">重置</el-button>

      </el-form>


<!--添加配件表格-->
      <el-table
        @row-click="rowClick"
        ref="multipleTable"
        :data="addTableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="partSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="备件编号"
          prop="equipmentCoding"
          width="175">

        </el-table-column>
        <el-table-column
          prop="name"
          label="备件名称"
          width="175">
        </el-table-column>
        <el-table-column
          prop="category"
          label="规格型号"
          width="175">
        </el-table-column>
        <el-table-column
          prop="model"
          label="备件类别"
          width="175">
        </el-table-column>
        <el-table-column
          prop="numb"
          label="所需数量"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.numb"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

<!--结束配件弹框-->


  </el-dialog>
</div>
</template>

<script>
import {getdetailPage} from "@/api/shebei/InventoryManagement"
import {fixdetail} from "@/api/shebei/fix"
export default {
  props: ["info"],
  data() {
    return {
      rowid:"",
      dialogVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      formAdd: {
        partsEquipmentCoding: '',
        partsName: '',
        partsCategory:"",
        partsModel:""
      },
      category:"",
      urgency:"",
      //维修对象表格数据
      tableData: [],
      //所需条件表格
      needtableData: [{needunit:""}],
      //添加备件表格
      addTableData: [{numb:""}],
    };
  },
methods:{
  iii(){
    console.log(this.$refs.formInline.disabled)

  },
  async openAll(){
      let res = await fixdetail({id:this.info.ids})
    switch (res.data.data.faultCategory){
        case 0:
          this.category="特别紧急"
            break;
        case 1:
          this.category = "一般紧急"
            break;
        case 2:
          this.category= "比较紧急"
            break;
    };
      switch (res.data.data.urgency){
        case 0:
          this.urgency="异常停机"
            break;
        case 1:
          this.urgency = "异响"
            break;
        case 2:
          this.urgency= "温度异常"
            break;
    };
    this.formInline={
      number:res.data.data.number,
      createTime:res.data.data.createTime,
      name:res.data.data.name,
      category:this.category
    }
    this.tableData.push(res.data.data.equipmentInfo)
    setTimeout(() => {
      this.$refs.formInline.disabled=true
    }, 100);
    console.log(res.data.data)
  },
    //复选框事件
  partSelectionChange(row){
    this.rowid=row[0].id
    // console.log(123,row[0].id)
  },
    //partAdd,选择添加按钮
 async partAdd(){
    let id = this.rowid
    this.needtableData.needunit=this.addTableData.numb
    let res = await getdetailPage({id:id})
    console.log(res.data.data.records)
      this.needtableData=res.data.data.records
  },
    //获取点击表格当前页的数据
  rowClick(row){
    console.log(row)
  },
    //添加配件重置按钮
  partsReset(){
    this.formAdd={}
  },
    //添加备件页的查询
  querryParts(){
    let aa = {
      equipmentCoding:this.formAdd.partsEquipmentCoding,
      name:this.formAdd.partsName,
      category:this.formAdd.partsCategory,
      model:this.formAdd.partsModel
    }
      this.getParts(aa)
  },
    //获取添加设备分页
  async getParts(partsParams){
        let res = await getdetailPage(partsParams)
        this.addTableData=res.data.data.records
  },
    // 添加配件按钮
  addParts(){
    this.dialogVisible=true
    this.getParts()
  },
  //这可能是测试按钮
    btn(){
      console.log(this.info)
    },


  //控制本页的开关
  //可以在这个地方写清空渲染表的时间
  handleClose(done) {
    this.$confirm('确认关闭？')
      .then(_ => {
          this.tableData=[]
        done();
      })
      .catch(_ => {});
  }
},
}
</script>

<style scoped>

</style>
