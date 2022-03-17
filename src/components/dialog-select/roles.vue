// 选择角色
<template>
  <div>
    <el-dialog
      title="选择角色"
      append-to-body
      :visible.sync="rolesDialogVisible"
      :before-close="handleClose"
    >
      <el-input
        size="small"
        suffix-icon="el-icon-search"
        v-model="searchParams"
        placeholder="输入名称"
        @keyup.enter.native="searchRole"
        @change="searchRole"
        style="margin-bottom:10px">
      </el-input>
      <el-table
        ref="singleTable"
        :data="tableData"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
        highlight-current-row
        @row-click="clickRow"
      >
        <el-table-column property="name" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="roleAlias" label="角色代码">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型">
        </el-table-column>
      </el-table>
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
import {getRolesTree} from '@/api/base-data/role'
export default {
  props:{
    rolesDialogVisible:Boolean,
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
    this.initResources()
  },
  methods: {
    // 获取资源
    async initResources(){
      let res = await getRolesTree()
      this.tableData = res.data.data
    },
    // 单击选择角色
    clickRow(row){
      this.clickRowDate = row
    },
    // 搜索角色
    async searchRole(value){
      let res  = await getRolesTree({name:this.searchParams})
      if (res.data.success) {
        this.tableData = res.data.data
      }
    },
    // 确定
    confim(){
      if (this.clickRowDate) {
        this.$emit('on-selected-roles', this.clickRowDate)
      } else {
        this.$message.info('请选择角色')
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
      this.$emit('on-selected-roles',this.rolesDialogVisible = false)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-input{
  width:240px
}
</style>