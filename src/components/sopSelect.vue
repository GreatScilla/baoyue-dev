<template>
  <div>
    <el-row class="margin-bottom-20">
      <div class="search-box">
        <el-input v-model="searchParam"></el-input>
        <i class="el-icon-search padding-right-10 cursor-style" @click="searchSop"></i>
      </div>
    </el-row>
    <el-row class="margin-bottom-20">
      <el-table
        border
        :data="tableData" class="margin-bottom-20"
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="fileSize" label="大小"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
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
    </el-row>
    <div class="margin-bottom-20 footer-box">
      <el-button @click="handleCancel" size="small">取消</el-button>
      <el-button type="primary" @click="submit" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
import {getListPage} from '@/api/base-data/sop'
import paginationMixin from "@/mixins/pagination";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      multipleSelection: [],
      searchParam: '',
      tableData: []
    }
  },
  mounted() {
    this.handleList()
  },
  methods: {
    async handleList(...arg) {
      let params = {current: this.currentPage, size: this.pageSize}
      if (arg.length > 0) {
        params = Object.assign(params, arg[0])
      }
      const res = await getListPage(params)
      this.tableData = res.data.data.records
      this.total = res.data.data.total
    },
    handleCancel() {
      this.$emit('on-cancel')
    },
    submit() {
      this.$emit('on-submit', this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchSop() {
      this.handleList(this.searchParam)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .search-box {
  width: 240px;
  border: 1px solid #DCDFE6;

  .el-input {
    width: 216px;
  }

  .el-input__inner {
    border: none
  }
}
</style>
