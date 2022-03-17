
<template>
  <basic-container>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="earlyWarningTableData"
        border
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.pic"
              style="width: 100px; height: 100px;padding-top:5px"
              :src="scope.row.pic"
              fit="cover">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productNumber" label="产品编码" show-overflow-toolti>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" show-overflow-toolti>
        </el-table-column>
         <el-table-column prop="productSpecificationName" label="规格型号" show-overflow-toolti>
        </el-table-column>
        <el-table-column prop="stockUnitName" label="单位">
        </el-table-column>
        <el-table-column prop="depotName" label="所在仓库">
        </el-table-column>
        <el-table-column prop="stock" label="现存量">
        </el-table-column>
      </el-table>
    </el-row>
     <el-row class="button-wrapper-footer">
      <el-button size="small" @click="$router.push('/storageManage/earlyWarning')">返回</el-button>
     </el-row>
  </basic-container>
</template>

<script>
import {detailsAdjustment} from "@/api/storageManage/earlyWarning"
export default {
  data () {
    return {
      earlyWarningTableData:[]
    }
  },
  created(){
    this.handleList()
  },
  methods: {
    // 获取列表
    async handleList() {
      let res = await detailsAdjustment({productId:this.$route.query.row.productId})
      this.earlyWarningTableData = res.data.data
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input,.el-select{
  width:360px
}
.el-table{
  .el-select{
    width:120px
  }
  .el-input{
    width:90px
  }
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
