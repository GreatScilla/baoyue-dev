// 项目类别
<template>
  <basic-container>
    <!-- 搜索 -->
    <el-form
      label-width="100px"
      :inline="true"
      :model="contactNnitSearchForm"
    >
      <el-form-item  label="项目名称:">
        <el-input
          size="small"
          v-model="contactNnitSearchForm.name"
          placeholder="请输入项目名称">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="searchCompany">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="handleOpenDialog('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelAccount">删除</el-button>
    </el-row>
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="accountSettingTableData"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="subjectsNumber" label="编号" > </el-table-column>
      <el-table-column prop="subjectsName" label="项目名称"> </el-table-column>
      <el-table-column prop="subjectsContent" label="说明"> </el-table-column>
      <el-table-column width="100" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleOpenDialog('edit', scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleDelAccount(scope.row)">
            删除
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
    <!-- 新增 -->
    <el-dialog
      :title="operationState === 'add'? '项目类别-新增' :'项目类别-编辑'"
      append-to-body
      width="40%"
      :visible.sync="accountSettingDialogVisible"
      :before-close="handleClose"
    >
      <el-form 
        :model="accountSettingForm"
        label-position="right"
        label-width="100px"
        ref="accountSettingForm"
        :rules="rules"
      >
        <el-form-item label="编号:">
          <el-input
            size="small"
            v-model="accountSettingForm.subjectsNumber"
            placeholder="请输入类型编码">
          </el-input>
        </el-form-item>
        <el-form-item required label="项目名称:" prop="subjectsName">
          <el-input
            size="small"
            v-model="accountSettingForm.subjectsName"
            placeholder="请输入项目名称">
          </el-input>
        </el-form-item>
        <el-form-item label="说明:">
          <el-input
            size="small"
            v-model="accountSettingForm.subjectsContent"
            placeholder="请输入说明">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">
          取 消
        </el-button>
        <el-button type="primary" size="small" @click="confimAccountSettingDialogVisible">
          保 存
        </el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {getAccountList, addAccount, editAccount, delAccount} from "@/api/base-data/accountSetting"
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data(){
    return {
      contactNnitSearchForm:'',
      searchParmas:'',
      accountSettingTableData:[],
      accountSettingForm:{},
      accountSettingDialogVisible:false,
      operationState:'',
      ids:[],
      rules:{
        subjectsName:[
          {required: true, message: '请输入科目名称', trigger: ['blur', 'change']},
        ]
      }
    }
  },
  created(){
    this.handleList()
  },
  methods:{
    // 获取列表
    async handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await getAccountList(params)
      this.accountSettingTableData = res.data.data.records
      this.total = res.data.data.total
    },
    // 新增编辑
    async handleOpenDialog(operationState,row){
      this.accountSettingDialogVisible = true
      this.operationState = operationState
      if (this.operationState === 'edit') {
        this.$nextTick(() => {
          this.accountSettingForm = JSON.parse(JSON.stringify(row))
        })
      } else {
        this.accountSettingForm = {}
      }
    },
    // 确认新增修改
    async confimAccountSettingDialogVisible(){
      let res
      try {
        await this.$refs.accountSettingForm.validate();
      } catch (error) {
        return;
      }

      if (this.operationState === 'add') {
        res = await addAccount(this.accountSettingForm)
      } else {
        res = await editAccount(this.accountSettingForm,this.accountSettingForm.id)
      }
      
      if (res.data.success) {
        this.$message.success('操作成功')
        this.closeInitDialog()
        this.handleList()
        
      } else {
        this.$message.success('操作失败')
      }
    },
    // 选择表格
    handleSelectionChange(value){
      this.ids = []
      if (value.length > 0) {
        value.forEach(item => {
          this.ids.push(item.id)
        })
        this.ids = this.ids.join()
      }
    },
    // 删除
    async handleDelAccount(row){
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
      try {
        await this.$confirm("确定要删除该科目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const res = await delAccount({subjectsIdList:ids});
        if (res.data.success) {
          this.handleList()
          this.$message.success('操作成功');
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 科目搜索
    searchAccountSetting(){
      this.handleList({subjectsName:this.searchParmas})
    },
    // 重置
    reset(){
      this.searchParmas = ''
      this.handleList()
    },
    // 取消
    cancel(){
      this.closeInitDialog()
    },
    // 关闭
    handleClose(){
      this.closeInitDialog()
    },
    // 表单初始
    closeInitDialog(){
      this.$refs.accountSettingForm.resetFields()
      this.accountSettingDialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.el-input,.el-select{
  width:240px
}
</style>