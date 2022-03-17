// 费用管理
<template>
  <basic-container>
    <!-- 搜索 -->
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="handleOpenDialog('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelSettlementMethod">删除</el-button>
      <el-button size="small" type="success" plain @click="enable">启用/停用</el-button>
    </el-row>
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="settlementMethodTableData"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <span :class="[scope.row.status === 0 ? 'normalColor' : 'setOutColor']">
            {{ scope.row.status | status}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="codeSn" label="编码"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column width="150" label="操作" fixed="right">
        <template slot-scope="scope" >
          <el-button type="text" size="small" @click="handleOpenDialog('edit', scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleOpenDialog('details', scope.row)">
            详情
          </el-button>
          <el-button type="text" size="small" @click="handleDelSettlementMethod(scope.row)">
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
      :title="elDialogTitle"
      append-to-body
      width="40%"
      :visible.sync="settlementMethodDialogVisible"
      :before-close="handleClose"
    >
      <el-form 
        :model="settlementMethodForm"
        label-position="right"
        label-width="100px"
        ref="settlementMethodForm"
        :rules="rules"
      >
        <el-form-item label="方式编码:" prop="codeSn">
          <span v-if="operationState === 'details'">{{settlementMethodForm.codeSn}}</span>
          <el-input
            v-else
            size="small"
            :disabled="true"
            v-model="settlementMethodForm.codeSn"
            :placeholder="settlementMethodForm.codeSn ? '' : '自动编码'">
          </el-input>
        </el-form-item>
        <el-form-item required label="方式名称:" prop="name">
          <span v-if="operationState === 'details'">{{settlementMethodForm.name}}</span>
          <el-input
            v-else
            size="small"
            v-model="settlementMethodForm.name"
            placeholder="请输入方式名称">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="operationState !== 'details'">
        <el-button @click="cancel" size="small">
          取 消
        </el-button>
        <el-button type="primary" size="small" @click="confimsettlementMethodDialogVisible">
          保 存
        </el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {getSettlementMethod, addEditSettlementMethod, delSettlementMethod, enableSettlementMethod} from "@/api/base-data/settlementMethod"
import paginationMixin from "@/mixins/pagination";
import code from "@/mixins/code";
export default {
  mixins: [paginationMixin,code],
  data(){
    return {
      settlementMethodTableData:[],
      settlementMethodForm:{
        codeName:'结算方式'
      },
      settlementMethodDialogVisible:false,
      operationState:'',
      ids:[],
      rules:{
        name:[
          {required: true, message: '请输入方式名称', trigger: ['blur', 'change']},
        ]
      }
    }
  },
  created(){
    this.handleList()
    this.initCode('结算方式',this.settlementMethodForm,'codeSn')
  },
  computed:{
    elDialogTitle:function(){
      switch(this.operationState){
				case 'add': return '结算方式-新增'; break;
        case 'edit': return '结算方式-编辑'; break;
        case 'details': return '结算方式-详情'; break;
			}
    }
  },
  methods:{
    // 获取列表
    async handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await getSettlementMethod(params)
      this.settlementMethodTableData = res.data.data.records
      this.total = res.data.data.total
    },
    // 新增编辑
    async handleOpenDialog(operationState,row){
      this.settlementMethodDialogVisible = true
      this.operationState = operationState
      if (this.operationState !== 'add') {
        this.$nextTick(() => {
          this.settlementMethodForm = JSON.parse(JSON.stringify(row))
        })
      } else {
        this.settlementMethodForm = {
          codeName:'结算方式'
        }
        this.initCode('结算方式',this.settlementMethodForm,'codeSn')
      }
    },
    // 确认新增修改
    async confimsettlementMethodDialogVisible(){
      try {
        await this.$refs.settlementMethodForm.validate();
      } catch (error) {
        return;
      }

      let res = await addEditSettlementMethod(this.settlementMethodForm)

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
    // 启用
    async enable(){
      if (this.ids.length <= 0 ) {
        this.$message.warning('请选择至少一条数据')
        return
      }
      try {
        await this.$confirm("确定要启用/停用该科目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        let res = await enableSettlementMethod({ids:this.ids})
        if(res.data.success){
          this.$message.success('操作成功')
          this.handleList()
        }
      } catch (error) {
        console.error(error)
        this.$message.info("已取消");
      }
    },
    // 删除
    async handleDelSettlementMethod(row){
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
        const res = await delSettlementMethod({ids:ids});
        if (res.data.success) {
          this.handleList()
          this.$message.success('操作成功');
        }
      } catch (error) {
        console.log(error,'error')
        this.$message.info("已取消删除");
      }
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
      this.$refs.settlementMethodForm.resetFields()
      this.settlementMethodDialogVisible = false
    },
  },
  filters: {
    status: function(value) {
      if (value === 0) {
        value = "正常";
      } else if (value === 1) {
        value = "停用";
      }
      return value;
    },
  },
}
</script>

<style lang="scss" scoped>

.el-input,.el-select{
  width:240px
}
.normalColor{
  color:#13ce66
}
.setOutColor{
  color:#FF4949
}
</style>