  <template>
<div>
  <el-dialog
    @open="opened"
    title="报修单"
    :modal="false"
    :visible.sync="info.xiangqingShow"
    width="65%"
    style="background-color: rgba(0,0,0,0.5)"
    :before-close="handleClose">
    <el-divider></el-divider>
<!--    <button @click="btn" >测试</button>-->
    <b>·工单信息</b>
    <br>
    <br>
    <el-divider></el-divider>

<!--    开始-->

    <el-form ref="form" :model="workOrderForm" label-width="80px">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="工单编号" prop="number" >
              <el-input v-model="workOrderForm.number"></el-input>
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
              <el-form-item label="紧急程度" prop="number" >
                <el-input v-model="urgency"></el-input>
              </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="故障类别" prop="number" >
              <el-input v-model="faultCategory"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <br>
      <b>·维修对象</b>
      <el-divider></el-divider>
      <!--      表格-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;margin-bottom: 15px;margin-top: 20px"
        border
        size="mini"
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

<!--    结束-->
  </el-dialog>
</div>
</template>

<script>
import {newly,fixdetail} from "@/api/shebei/fix";
import {getShebei} from "@/api/shebei/account";
// import { fixdetail } from "@/api/shebei/fix";
export default {
  props: ["info"],
  name: "",
  data() {
    return {
      tableData:[],
      //pid
      assetNewTag:"",
      assetAddTag:"",
      assetTag:"",
      //搜索设备表单
      addsaberform:{},
      //子组件传得数据
      value: [],
      urgency:"",
      //创建维修工单的参数
      pid:"",
      tianjiaShow:false,
      multipleSelection: [],
      dialogVisible: false,
      //工单表单
      workOrderForm:{},
      // value: '',
      category: '',
       value1: '',
      faultCategory: '',
    };
  },

  created() {


  },


  methods: {
   async opened(){
     this.tableData=[]
     console.log(999)
     let obj = JSON.parse(JSON.stringify(this.info))
     let pid = obj.pid
     let id = obj.detailId
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
      this.value1=res.data.data.createTime
     this.tableData.push(res.data.data.equipmentInfo)
     console.log(res.data.data)
     setTimeout(() => {
       this.$refs.form.disabled=true
     }, 0);
    },
    btn(){
      console.log(this.tableData)
    },
    //查询按钮
    async cahxun(){
    },
    //清空表单
    resetForm() {
      this.$data.addsaberform={}
    },

    //选中添加数据
    selsChange(sels) {

      this.sels = sels;
      //遍历选中的数组
      for (let tableData of this.sels) {
        this.disabled = false;
      }
      let length = this.sels.length;
      if(length>1){
        this.$message('只能选择单条数据');
        // console.log(this.$refs.multipleTable.$children)
      }
      this.addsaberform={};
      this.$data.assetNewTag=sels[0].assetTag;
    },
    //选择保存数据
    handleSelectionChange(sels){
      this.sels = sels;
      //遍历选中的数组
      for (let tableData of this.sels) {
        this.disabled = false;
      }
      let length = this.sels.length;
      this.pid=sels[0].assetTag
    },
    // 选择添加
    addTrue(){
      this.$message('添加成功');
      // this.addsaberform.assetTag={};
      this.addsaberform.assetTag=this.$data.assetNewTag
      this.handList(this.$data.assetNewTag)
      // console.log(this.$data.addsaberform.assetTag);
      // console.log(this.tableData)
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
          this.tableData=[],
            console.log(999)
            this.workOrderForm={}
          done();
        })
        .catch(_ => {
        });
    },
    //保存工单
    async saveform(...arg){
      // console.log(this.workOrderForm)
      let params={
        number:this.workOrderForm.number,
        name:this.workOrderForm.name,
        createTime:this.$data.value1,
        urgency:this.$data.category,
        faultCategory:this.$data.value,
        pid:this.$data.pid,
        memo:this.workOrderForm.memo,
      }
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await newly(params)
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
      this.tableData = res.data.data.records;
    },
    async open(){
      this.resetForm(),
        this.handList()

      console.log(456)
      const res = await getShebei(this.paging);
      this.tableData = res.data.data.records;
    },
  },
  getValue(value) {
    this.value = value;
  },
}
</script>

<style scoped>

</style>
