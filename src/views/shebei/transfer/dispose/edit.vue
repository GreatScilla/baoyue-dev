<template>
  <div>

    <el-dialog
      title="处置单"
      :visible.sync="info.detailShow"
      width="65%"
      :modal="false"
      @opened="open_all"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <b>·单据信息</b>
<!--            <el-button size="small" @click="qwwe"> 测试按钮</el-button>-->
      <el-button v-if="info.showStatus=='add'"
                 size="small" type="primary"
                 style="float: right"
                 @click="saveAll"
      >保存</el-button>

        <el-button type="primary"
                   v-show="info.showStatus=='detail'"
                   style="float: right;margin-left: 15px"
                   size="small"
        >保存编辑</el-button>

      <br>
      <br>

      <el-divider></el-divider>
      <!-------------------------------------------------------填写表单数据---------------------------------------------------->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formOne">
        <el-form-item label="单据编号">
          <el-input v-model="formInline.number" placeholder="自动生成" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
          <div class="block">
            <el-date-picker
              v-model="formInline.createTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input v-model="formInline.createUsername" placeholder="请输入当前账号名称" style="width: 205px"></el-input>
        </el-form-item>

      </el-form>

      <b>·设备信息</b>
      <el-divider></el-divider>
      <br>
      <el-divider></el-divider>
      <!--领用设备明细表格-->
      <el-form :inline="true" :model="equipmentForm" class="demo-form-inline" ref="formTwo">
        <el-form-item label="设备编号">
          <el-input v-model="equipmentForm.equipmentCoding" placeholder="自动生成" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="equipmentForm.assetTag" placeholder="根据设备编号带入" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="equipmentForm.name" placeholder="根据设备编号带入" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="设备类别">
          <el-input v-model="equipmentForm.category" placeholder="根据设备编号带入" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="购置金额">
          <el-input v-model="equipmentForm.price" placeholder="根据设备编号带入" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="设备净值">
          <el-input v-model="equipmentForm.netWorth" placeholder="根据设备编号带入" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="处置方式">
          <el-select v-model="equipmentForm.receiver" placeholder="请选择">
            <el-option label="出售" value="0"></el-option>
            <el-option label="报废" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处置原因">
          <el-select v-model="equipmentForm.reasons" placeholder="请选择">
            <el-option label="损坏" value="0"></el-option>
            <el-option label="产能不足" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时长">
          <el-input v-model="equipmentForm.user" placeholder="使用时长" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="处置人：">
          <el-input v-model="equipmentForm.user" placeholder="处置人" style="width: 205px"></el-input>
        </el-form-item>
      </el-form>
<!--    --------------------------------------------------------------------  end------------------------->
      <br>
      <br>
      <b >·备注</b>
      <el-divider></el-divider>
      <el-input v-model="equipmentForm.memo"></el-input>
    </el-dialog>
    <!-----------------------------------------添加设备组件---------------------------------------------------------------->

    <el-dialog
      title="添加设备"
      :visible.sync="appendEq"
      width="65%"
      :modal="false"
      :open="openEq"
      :before-close="handleClose">
      <el-divider></el-divider>
      <b>·设备筛选</b>
      <el-button @click="choiceAppendEqBtn" type="primary" size="small" style="float: right">选择添加</el-button>
      <br>
      <br>
      <el-divider></el-divider>
      <!--    添加设备页表单-->
      <el-form :inline="true" :model="formchoiceAppendEq" class="demo-form-inline">
        <el-form-item label="资产编号">
          <el-input v-model="formchoiceAppendEq.assetTag" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="formchoiceAppendEq.equipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formchoiceAppendEq.name" placeholder="手动输入"></el-input>
        </el-form-item>
      </el-form>
      <div style="width: 100%;height: 33px;float: right">
        <el-button type="primary"
                   style="float: right;margin-left: 15px"
                   size="small"
                   @click="searchEquipment"
        >查询</el-button>
        <el-button type="primary"
                   style="float: right"
                   size="small"
        >重置</el-button>
      </div>
      <br>
      <br>
      <!--    <el-divider></el-divider>-->
      <!--    表格-->
      <el-table
        ref="multipleTable"
        :data="choiceAppendEqtableData"
        tooltip-effect="dark"
        style="width: 100%;margin-top: 15px"
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

  </div>
</template>

<script>
import {applydispose,disposeDetail,equipmentdisposal} from "@/api/shebei/transfer"
import {getShebei} from "@/api/shebei/account"
import {getdetailPage} from "@/api/shebei/InventoryManagement"
export default {
  props:["info"],
  name: "",
  data() {
    return {
      equipmentForm:{},
      eqIds:"",
      spareIds:"",
      //存储设备
      saveEQ:[],
      //存储备件
      saveSpare:"",
      //添加设备组件
      appendEq:false,
      appendSpare:false,
      editBtn:"0",
      dialogVisible: true,
      formInline: {
        number:"",
        receiver: '',
        dept: '',
        giveBack:""
      },
      //添加设备页表单
      formchoiceAppendEq: {},
      //添加备件页表单
      formchoiceAppendSpare: {
        user: '',
        region: ''
      },
      //领用设备 明细 表格
      tableData: [],
      //选择设备 明细 表格
      choiceAppendEqtableData: [{}],
    };
  },



  methods: {
    open_all(){

      this.qwwe()
    },
   async qwwe(){
     let res = await disposeDetail({id:this.info.id})
     this.formInline={
       number:res.data.data.number,
       createTime:res.data.data.createTime,
       createUsername:res.data.data.createUsername
     }
     this.equipmentForm=res.data.data.equipmentInfo
      console.log(res.data.data.equipmentInfo)
     if(this.info.showStatus=='detail'){
       setTimeout(()=>{
         this.$refs.formOne.disabled=true
         this.$refs.formTwo.disabled=true
       })
     }
    },
    //添加设备表格select
    addEqchange(val){
      // console.log(row)
      const newarr = val.map(ele => ele.id);
      this.eqIds = newarr.join(",");
      console.log(this.eqIds)
    },
    //保存
    async saveAll(){
      var timestamp=Date.parse(new Date())
      this.formInline.number=timestamp
      let para = {
        number:this.formInline.number,
        documentDate:this.formInline.time,
        createUsername:this.formInline.user,
        borrowDept:this.formInline.dept,
        borrowPerson:this.formInline.receiver,
        borrowedEquipmentIds:this.eqIds,
        memo:this.formInline.memo,
        isNeedReturn:this.formInline.giveBack,
        estimateBorrowDate:this.formInline.backtime
      }
      let res = await applydispose(para)
      if(res.data.code==200){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      }
      console.log(res)
    },
    // 添加设备
    choiceAppendEqBtn(){
      this.tableData=this.saveEQ,
        this.appendEq=false
    },
    //添加设备多选
    addEqSelectChange(row){
      this.saveEQ=row
    },
    async  searchSpare(){
      let teng={
        equipmentCoding:this.formchoiceAppendSpare.equipmentCoding,
        name:this.formchoiceAppendSpare.name,
        category:this.formchoiceAppendSpare.category,
      }
      let res = await getdetailPage(teng)
      this.choiceAppendSparetableData=res.data.data.records
    },
    //添加设备搜索
    async searchEquipment(){
      let memeda = {
        assetTag:this.formchoiceAppendEq.assetTag,
        equipmentCoding:this.formchoiceAppendEq.equipmentCoding,
        name:this.formchoiceAppendEq.name
      }
      let res = await getShebei(memeda)
      this.choiceAppendEqtableData=res.data.data.records
      console.log(res.data.data.records)
    },
    //添加设备按钮
    async appendEquip(){
      let res = await getShebei()
      this.choiceAppendEqtableData=res.data.data.records
      this.appendEq=true
    },
    //编辑按钮
    edit(){
      this.info.showStatus='edit'
      console.log(this.editBtn)
    },
    //取消编辑按钮
    cancleEdit(){
      this.info.showStatus='detail'
      console.log(this.info.showStatus)
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
.box{
  display: flex;
  width: 300px;
  height: 32px;
  /*background-color: #00a680;*/
  justify-content: flex-start
}
</style>
