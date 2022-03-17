// 系统初始化
<template>
  <basic-container>
    <el-checkbox v-model="checked" style="marfin-right:5px"></el-checkbox>
    <span>库存初始化，所有仓库数据、均会清除</span>
    <p>一旦启用单据数据初始化，系统以下模块的数据会被清除，请认真阅读，以免导致数据误删</p>
    <div class='moduleBox'>
      <div>库存管理</div>
      <div>
        <span>库存查看</span>
        <span>入库管理</span>
        <span>库存调拨</span>
        <span>库存盘点</span>
        <span>出库管理</span>
      </div>
    </div>
    <el-button size="small" type="primary" @click="handeleInit">立即初始化</el-button>
  </basic-container>
</template>

<script>
import { initStock } from "@/api/base-data/initSystem"
export default {
  data(){
    return {
      checked:false
    }
  },
  created(){
    
  },
  methods:{
    // 工单状态
    async handeleInit(){
      if (!this.checked) {
        this.$message('请先勾选库存初始化');
      } else {
        let res = await initStock()
        if (res.data.success) {
          this.$message.success('操作成功')
          this.checked = false
        } else {
          this.$message.success('操作失败')
        }
      }
      
    },
  }
}
</script>

<style lang="scss" scoped>
 
*{
  font-size: 14px;
}
p{
  font-size: 12px;
  color:#999;
  margin-left:22px
}
.moduleBox{
  width:500px;
  height:100px;
  border:1px solid #ccc;
  margin-bottom:20px;
  margin-left:22px;
  &>div{
    padding-left:50px;
    height:50px;
    line-height:50px
  }
  &>div:nth-of-type(1){
    background: #ecf5ff;
    border-bottom:1px solid #ccc
  }
  &>div:nth-of-type(2) span{
    margin-right:20px
  }
}
.el-button{
  margin-left:22px;
}

</style>