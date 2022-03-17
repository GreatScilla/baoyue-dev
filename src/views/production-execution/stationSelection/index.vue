// 工位选择
<template>
  <div class="container">
    <div class="title">
      <div>
        <div class="item">
          <i class="icon-mes-211dingdan-shi"></i>
          <span class="font">工位选择/切换</span>
        </div>
      </div>
      <div class="back" @click="back">
        <i class="icon-mes-fanhui"></i>
        <span class="font">返回</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <el-table
          @selection-change="handleSelectionChange"
          :data="stationSelectionTableData"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="linkStationCode" label="工位编码"> </el-table-column>
          <el-table-column prop="linkStationName" label="工位名称"> </el-table-column>
          <el-table-column label="选择/切换" fixed="right">
            <template slot-scope="scope">
              <el-switch
                class="switch"
                v-model="scope.row.status"
                inactive-color="#FF4949"
                :active-value="0"
                :inactive-value="1"
                :disabled="scope.row.status === 0? true:false"
                @change="((value)=>{handleSwitchChange(value,scope.row,scope.$index)})">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {stationSelectionList, checkStation} from "@/api/productionExecution/index"
export default {
  data() {
    return {
      stationSelectionTableData: [],
      disabled:false
    };
  },
  created(){
    this.handleList()
  },
  methods:{
    // 获取列表
    async handleList() {
      let res = await stationSelectionList()
      this.stationSelectionTableData = res.data.data
    },
    // 修改状态
    async handleSwitchChange(value,row,index){
      let res = await checkStation({id:row.id})
      if (res.data.success) {
        this.$message.success('操作成功')
        this.handleList()
      } else {
        this.$message.success('操作失败')
      }
    },
    // 返回
    back(){
      this.$router.back()
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";
 

.container {
  min-height: 100%;
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  .content-wrapper {
    padding: 20px;
    background: #f7f8fa;
    .content {
      padding: 30px;
      background-color: #fff;
      .header {
        margin-bottom: 30px;
      }
    }
  }
}
.el-input,.el-select{
  width:240px
}
.selectAdd,.noDataSelectAdd{
  margin:5px 0 0 20px;
  font-size:14px;
  color: #606266;
  cursor: pointer
}
.noDataSelectAdd{
  margin:10px 0 10px 20px;
}
</style>
