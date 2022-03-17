// 选择客户
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="contactUnitDialogVisible"
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
        <el-table-column prop="name" :label="`${name}名称`"></el-table-column>
        <el-table-column prop="code" :label="`${name}编码`"></el-table-column>
        <el-table-column :label="`${name}分类`">
          <template slot-scope="{row}">
            <span>{{row.category | category}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="linkName" label="首要联系人"></el-table-column>
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
import { getContactUnitBase } from '@/api/common'
import paginationMixin from "@/mixins/pagination";
export default {
  name: 'customer',
  mixins: [paginationMixin],
  props: {
    category: { // 1供应商2客户
      type: 'String',
      default: '2'
    },
    contactUnitDialogVisible:Boolean,
    title:String
  },
  data () {
    return {
      tableData: [],
      clickRowDate: {}, // 当前选中行
      searchParams:''
    }
  },
  created () {
    this.handleList()
  },
  computed: {
    name () {
      if (this.category == '1') {
        return '供应商'
      } else {
        return '客户'
      }
    }
  },
  methods: {
    async handleList() {
      const data = await getContactUnitBase({
        category: this.category,
        name: '',
        current: this.currentPage,
        size: this.pageSize
      })
      this.tableData =  data.data.data.records
      this.total = data.data.data.total
    },
    //点击选择
    clickRow (val) {
      this.clickRowDate = val
    },
    // 确定
    confim(){
      if (this.clickRowDate) {
        this.$emit('on-selected-contactUnit', this.clickRowDate)
      } else {
        this.$message.info('请选择')
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
      this.$emit('on-selected-contactUnit',this.contactUnitDialogVisible = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width:240px
}
</style>