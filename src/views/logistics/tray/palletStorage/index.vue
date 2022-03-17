// 托盘入库
<template>
  <basic-container>
    <el-form
      :inline="true"
      :model="palletStorageForm"
      ref="setUpForm"
    >
      <el-form-item label="单据日期:">
        <el-date-picker
          v-model="billData"
          size="small"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeBillDate">
        </el-date-picker>
      </el-form-item>
     
      <el-form-item label-width="100px" label="产品名称:">
        <el-input
          size="small"
          v-model="palletStorageForm.productName"
          placeholder="请输入产品名称">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="searchpalletStorage">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">新增</el-button>
      <el-button size="small" icon="el-icon-coordinate" type="primary" plain @click="examine">审核</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelpalletStorage">删除</el-button>
      <el-button size="small" icon="el-icon-upload2" type="success" plain>导出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain>打印</el-button>
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="palletStorageTableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="单据状态">
          <template slot-scope="scope">
            {{scope.row.status | billStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="procName" label="附件">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.file"
              style="width: 100px; height: 100px"
              :src="scope.row.file[0]"
              fit="cover">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="单据号">
        </el-table-column>
         <el-table-column prop="createTime" label="单据日期" width="150">
        </el-table-column>
        <el-table-column prop="createUser" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="to('edit',scope.row)" v-if="scope.row.status === 0">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="to('details', scope.row)">
              详情
            </el-button>
            <el-button type="text" size="small" @click="handleDelpalletStorage(scope.row)" v-if="scope.row.status === 0">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
import {getInAndOutBoundPage, examineInAndOutBoundPage,  delInAndOutBoundPage} from "@/api/storageManage/inAndOutBound"
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      palletStorageForm:{},
      palletStorageTableData: [],
      billDate:[],
      ids:[],
    };
  },
  created() {
    this.handleList()
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize, type:"入库"}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await getInAndOutBoundPage(params)
      this.palletStorageTableData = res.data.data.records
      this.palletStorageTableData.forEach((item) => {
        if(item.file){
          item.file = item.file.split(',')
        }
      })
      this.total = res.data.data.total
    },
   
    // 审核
    async examine(){
      if (this.ids.length <= 0 ) {
        this.$message.warning('请选择至少一条数据')
        return
      }
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0
      })
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据")
        return
      }
      let res = await examineInAndOutBoundPage({ids:this.ids,type:1})
      if(res.data.success){
        this.$message.success('操作成功')
        this.handleList()
      } else {
        this.$message.success('操作失败')
      }
    },
    // 删除
    async handleDelpalletStorage(row){
      let ids
      if (row.id) {
        ids = row.id
      } else {
        if (this.ids.length <= 0 ) {
          this.$message.warning('请选择至少一条数据')
          return
        }
        ids = this.ids
      }
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0
      })
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据")
        return
      }
      try {
        await this.$confirm("确定要删除该入库单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const res = await delInAndOutBoundPage({ids:ids})
        if (res.data.success) {
          this.handleList()
          this.$message.success('操作成功');
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 选择单据日期
    changeBillDate(value){
      this.palletStorageForm.beginTime = value[0]
      this.palletStorageForm.endTime = value[1]
    },
    // 搜索
    searchpalletStorage(){
      if (this.palletStorageForm) {
        this.handleList(this.palletStorageForm)
      }
    },
    // 重置
    reset(){
      this.palletStorageForm = {}
      this.billDate = []
      this.handleList()
    },
    // 选择表格
    handleSelectionChange(value){
      this.tableRowData = value
      console.log(this.tableRowData)
      this.ids = []
      if (value.length > 0) {
        value.forEach(item => {
          this.ids.push(item.id)
        })
        this.ids = this.ids.join()
      }
    },
    // 跳转
    to(operationState,row) {
      this.$router.push({
        path: "/logistics/tray/palletStorage/detail",
        query: {
          operationState,
          row
        }
      })
    }
  },
  filters:{
    billStatus:function(value){
      if (value === 0) {
        return '未审核'
      } else {
        return '已审核'
      }
    },
    bePutStatus:function(value){
      if (value === 0) {
        return '未入库'
      } else {
        return '已入库'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
 
.el-input,.el-select{
  width:160px
}
</style>
