<template>
<div>
  <el-dialog
    :title='title'
    style="background-color: rgba(0,0,0,0.5)"
    :modal="false"
    @opened="openAll"
    :visible.sync="info.detailShow"
    width="60%"
    :before-close="handleClose">
<!--    <br>-->
<!--    <br>-->
    <b>基本信息</b>
    <el-button v-if="info.flag=='add'" @click="savebtn" type="primary" size="small" style="float: right">保存</el-button>
    <el-button v-if="info.flag=='edit'" @click="editbtn" type="primary" size="small" style="float: right">编辑</el-button>
    <br>
    <br>
    <el-divider></el-divider>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
      <el-form-item label="单据编号">
        <el-input v-model="formInline.tagName" placeholder="自动生成"></el-input>
      </el-form-item>
      <el-form-item label="所在位置">
        <el-input v-model="formInline.position" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="温度上限">
        <el-input v-model="formInline.temperatureTop" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="温度下限">
        <el-input v-model="formInline.temperatureLow" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="湿度上限">
        <el-input v-model="formInline.humidityTop" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="湿度下限">
        <el-input v-model="formInline.humidityLow" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="温度点位">
        <el-input v-model="formInline.pidWd" placeholder="手动输入"></el-input>
      </el-form-item>
      <el-form-item label="湿度点位">
        <el-input v-model="formInline.pidSd" placeholder="手动输入"></el-input>
      </el-form-item>
    </el-form>
    <b>其他信息</b>
    <el-form ref="op">
    <el-form-item >
      <el-input v-model="formInline.name" placeholder="备注"></el-input>
    </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {thermometerAdd,wsdDetail,wsdEdit} from "@/api/shebei/iInternetOfthings"
export default {
  props:["info"],
  name: "detail",
  data(){
  return{
    title:"",
    formInline: {
    }
  }
  },
  methods:{
    editbtn(){
     this.formInline.id=this.info.id
      delete this.formInline.createTime
      delete this.formInline.createUser
      delete this.formInline.createDept
     let para = JSON.parse(JSON.stringify(this.formInline))
     wsdEdit(para)
    },
   async savebtn(){
      let para = this.formInline
        let res =await thermometerAdd(para)
     if(res.data.cede){
       this.$message({
         message: '新增成功',
         type: 'success'
       });
       this.$parent.getpage()
     }
    },
    async openAll(){

      switch(this.info.flag) {
        case 'edit':
          this.title='编辑'
          break;
        case 'add':
          this.title='新增'
          break;
        case 'detail':
          this.title='详情'
          break;
      }
      if(this.info.flag=='detail'||this.info.flag=='edit'){
        let res = await wsdDetail({id:this.info.id})
        this.formInline=res.data.data
        setTimeout(()=>{
          if(this.info.flag=='detail'){
            this.$refs.formInline.disabled=true
            this.$refs.op.disabled=true
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.el-form-item{

}
</style>
