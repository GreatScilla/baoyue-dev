<template>
  <div>

    <el-dialog
      title="设备/备件申请领用单"
      :visible.sync="info.detailShow"
      width="65%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      @opened="open_all"
      :before-close="handleClose">
      <el-divider></el-divider>
      <b>·单据信息</b>
<!--      <button @click="qwwe"> 测试按钮</button>-->
<!--      <el-button v-if="info.showStatus=='add'"-->
<!--                 size="small" type="primary"-->
<!--                 style="float: right"-->
<!--                 @click="saveAll"-->
<!--      >保存</el-button>-->
<!--      <div v-show="this.info.showStatus=='edit'">-->
        <el-button type="primary"
                   style="float: right;margin-left: 15px"
                   v-show="info.flag!==0"
                   size="small"
                   @click="saveEdit"
        >保存编辑</el-button>
<!--        <el-button type="primary"-->
<!--                   style="float: right"-->
<!--                   size="small"-->
<!--                   @click="cancleEdit"-->
<!--        >取消编辑</el-button>-->
<!--      </div>-->
<!--      <el-button type="primary"-->
<!--                 style="float: right"-->
<!--                 size="small"-->
<!--                 v-show="this.info.showStatus=='detail'"-->
<!--                 @click="edit"-->
<!--      >编辑</el-button>-->
      <br>
      <br>

      <el-divider></el-divider>
      <!-------------------------------------------------------填写表单数据---------------------------------------------------->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="单据编号">
          <el-input v-model="formInline.number" placeholder="自动生成" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
          <div class="block" >
            <el-date-picker
              style="width: 205px"
              v-model="formInline.time"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="制单人：">
          <el-input v-model="formInline.user" placeholder="请输入当前账号名称" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="领用部门">
          <el-select v-model="formInline.dept" placeholder="活动区域">
            <el-option label="六扇门" value="六扇门"></el-option>
            <el-option label="大理寺" value="大理寺"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领用人：">
          <el-select v-model="formInline.receiver" placeholder="领用人">
            <el-option label="郝美丽" value="郝美丽"></el-option>
            <el-option label="马冬梅" value="马冬梅"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否归还">
          <el-select v-model="formInline.giveBack" placeholder="是否归还">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归还日期">
          <div class="block">
            <el-date-picker
              style="width: 205px"
              v-model="formInline.backtime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>

      </el-form>

      <b>·领用设备明细</b>
      <el-divider></el-divider>
      <div class="box" v-show="info.flag !==0">
        <el-button type="primary" style="float: right" size="small" @click="appendEquip">添加设备</el-button>
        <el-button type="info" style="float: right" size="small">移除设备</el-button>
      </div>
      <br>
      <el-divider></el-divider>
      <!--领用设备明细表格-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="addEqchange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="设备编号"
          prop="equipmentCoding"
          width="120">
        </el-table-column>
        <el-table-column
          label="资产编号"
          prop="assetTag"
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
          prop="specifications"
          label="规格型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="location"
          label="所在仓库">
        </el-table-column>
        <el-table-column
          label="库位编码"
          prop="locationCode"
          width="120">
        </el-table-column>
      </el-table>
      <br>
      <br>
      <b >·备注</b>
      <el-divider></el-divider>
      <el-input v-model="formInline.memo"></el-input>
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
import {addrevert,revertDetail} from "@/api/shebei/transfer"
import {getShebei} from "@/api/shebei/account"
import {getdetailPage} from "@/api/shebei/InventoryManagement"
export default {
  props:["info"],
  name: "",
  data() {
    return {
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
   async saveEdit(){
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
      let res = await addrevert(para)
      if(res.data.code==200){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }
    },
   async open_all(){
      let res  = await revertDetail({id:this.info.id})
     this.formInline={
        number:res.data.data.number,
       time:res.data.data.createTime,
       user:res.data.data.createUsername,
        dept:res.data.data.borrowDept,
       receiver:res.data.data.borrowPerson,
       giveBack:"",
       backtime:res.data.data.estimateBorrowDate,
     }
     this.tableData=res.data.data.equipmentInfoList
     console.log(res.data.data)
     if(this.info.flag==0){
       setTimeout(()=>{
         this.$refs.formInline.disabled=true
       },0)
     }
    },
    //添加设备表格select
    addEqchange(val){
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
      let res = await addrevert(para)
      if(res.data.code==200){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      }
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
