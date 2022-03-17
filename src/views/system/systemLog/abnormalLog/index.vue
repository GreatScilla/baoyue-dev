// 异常日志
<template>
  <basic-container>
    <!-- 搜索 -->
    <!-- 搜索表单 -->
    <el-form
      label-width="100px"
      :inline="true"
      :model="abnormalLogSearchForm"
      ref="abnormalLogForm"
    >
      <el-form-item  label="服务id:">
        <el-input
          size="small"
          v-model="abnormalLogSearchForm.code"
          placeholder="请输入往来单位名称">
        </el-input>
      </el-form-item>
      <el-form-item  label="服务host:">
        <el-input
          size="small"
          v-model="abnormalLogSearchForm.code"
          placeholder="请输入往来单位名称">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="searchAbnormalLog">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格table -->
    <el-row>
      <el-col :span="8" :offset="16">
        <el-form
          label-width="100px"
          :inline="true"
          :model="abnormalLogSearchForm"
          ref="abnormalLogForm"
        >
          <el-form-item  label="清除日志:">
            <el-select v-model="value" size="small">
              <el-option
                v-for="item in companyoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:10px;margin-top:-1px">
            <el-button size="small" type="primary" @click="searchAbnormalLog">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      @selection-change="handleSelectionChange"
      :data="abnormalLogTableData"
    >
      <el-table-column prop="code" label="编号" > </el-table-column>
      <el-table-column prop="workshopName" label="服务id"> </el-table-column>
      <el-table-column prop="materileCode" label="ip地址"> </el-table-column>
      <el-table-column prop="materileName" label="软件环境"> </el-table-column>
      <el-table-column label="请求方法">
        <template slot-scope="scope">
         {{scope.row.planCount || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="请求接口">
        <template slot-scope="scope">
          {{scope.row.startTime || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="操作日期">
        <template slot-scope="scope">
          {{scope.row.endTime || '无'}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作记录">
        <template slot-scope="scope">
          {{scope.row.status.name || '无'}}
        </template>
      </el-table-column>
      <el-table-column width="100" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelCompany(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
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
      abnormalLogSearchForm:{},
      abnormalLogTableData:[]
    }
  },
  created(){
    // let params = this.abnormalLogForm
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
      this.handleList(this.abnormalLogForm)
    },
  
    // 重置
    reset(){
      for (let key in this.abnormalLogForm) {
        if (key === 'status') {
          this.abnormalLogForm[key] = '0'
        } else {
          this.abnormalLogForm[key] = ''
        }
      }
      this.handleList(this.abnormalLogForm)
    },
  }
}
</script>

<style lang="scss" scoped>
 
.el-input,.el-select{
  width:160px
}
</style>