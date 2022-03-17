// 操作日志
<template>
  <basic-container>
    <!-- 搜索 -->
    <el-row style="display:flex;margin-bottom: 25px;">
      <el-input
        size="small"
        style="margin-right:30px;"
        placeholder="请输入文件名称"
        v-model="factoryModelInput">
      </el-input>
      <el-button size="small" type="primary" @click="searchOperationLog">查询</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="operationLogTableData"
    >
      <el-table-column prop="code" label="文件名" > </el-table-column>
      <el-table-column prop="workshopName" label="地址"> </el-table-column>
      <el-table-column prop="materileCode" label="操作"> </el-table-column>
      <el-table-column prop="materileName" label="大小"> </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
         {{scope.row.planCount || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="目录">
        <template slot-scope="scope">
          {{scope.row.startTime || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="状态">
        <template slot-scope="scope">
          {{scope.row.endTime || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作者">
        <template slot-scope="scope">
          {{scope.row.status.name || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="操作时间"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
import {getWorkOrderPage, delWorkOrder, getWorkOrderState} from "@/api/planning/workOrder"
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data(){
    return {
      operationLogTableData:[]
    }
  },
  created(){
    // let params = this.contactNnitForm
    // this.handleList(params)
    // this.initWorkOrderState()
  },
  methods:{
    // 工单状态
    initWorkOrderState(){
      getWorkOrderState()
      .then(res => {
        this.workOrder = res.data.data
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 分页查询工单
    handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      getWorkOrderPage(params)
      .then(res => {
        this.workOrderTableData = res.data.data.records
        this.total = res.data.data.total
      })
      .catch(error => {
        console.error(error)
      })
    },
   
    // 工单搜索
    searchWorkOrder(){
      this.handleList(this.contactNnitForm)
    },
  
    // 重置
    reset(){
      for (let key in this.contactNnitForm) {
        if (key === 'status') {
          this.contactNnitForm[key] = '0'
        } else {
          this.contactNnitForm[key] = ''
        }
      }
      this.handleList(this.contactNnitForm)
    },
  }
}
</script>

<style lang="scss" scoped>
 
.el-input,.el-select{
  width:160px
}
</style>