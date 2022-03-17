// 选择人员
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="employeeDialogVisible"
      :before-close="handleClose"
    >
      <el-input
        size="small"
        suffix-icon="el-icon-search"
        v-model="searchParams"
        placeholder="输入名称"
        @keyup.enter.native="search"
        @change="search"
        style="margin-bottom:10px">
      </el-input>
      <el-table
        highlight-current-row
        :data="tableData"
        @row-click="clickRow"
      >
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
        <el-table-column prop="postName" label="职务"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
      </el-table-column>
        <el-table-column prop="workDate" label="入职时间"></el-table-column>
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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="confim">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getEmployeeFileList} from "@/api/humanResources/employeeFile"
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props:{
    employeeDialogVisible:Boolean,
    title:String
  },
  data () {
    return {
      tableData:[],
      clickRowDate:null,
      searchParams:''
    }
  },
  created(){
    this.handleList()
  },
  methods: {
    // 获取资源
    async handleList(){
      let params = {current:this.currentPage,size:this.pageSize}
      let res = await getEmployeeFileList(params)
      this.tableData = res.data.data.pages.records
      this.total = res.data.data.pages.total
    },
    // 单击选择人员
    clickRow(row){
      this.clickRowDate = row
    },
    // 搜索人员
    async search(){
      let res  = await getEmployeeFileList({current:this.currentPage,size:this.pageSize,name:this.searchParams})
      if (res.data.success) {
        this.tableData = res.data.data.pages.records
      }
    },
    // 确定
    confim(){
      if (this.clickRowDate) {
        this.$emit('on-selected-personnel', this.clickRowDate)
        this.$emit('update:employeeDialogVisible', false)
      } else {
        this.$message.info('请选择人员')
      }
    },
    // 取消
    cancel(){
      this.closeDialog()
    },
    // 关闭
    handleClose(){
      this.closeDialog()
    },
    // 表单初始
    closeDialog(){
      this.$emit('on-selected-personnel', false)
      this.$emit('update:employeeDialogVisible', false)
    },
  },
  filters: {
    status: function(value) {
      if (value === 2) {
        value = "兼职";
      } else if (value === 4) {
        value = "正式";
      }else if (value === 5) {
        value = "试用";
      }
      return value;
    },
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width:240px
}
</style>