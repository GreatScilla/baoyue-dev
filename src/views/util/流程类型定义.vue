// 流程类型定义
<template>
  <div>
    <basic-container>
      <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型名称">
            <el-input
              v-model="formInline.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.user">
              <el-option label="禁用" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
            <el-button size="small" type="primary" @click="onSubmit"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-button size="small" type="primary" @click="dialogVisible = true"
          >新增</el-button
        >
        <el-button size="small" type="primary" @click="onSubmit"
          >删除</el-button
        >
        <el-button size="small" type="primary" @click="onSubmit"
          >启用</el-button
        >
      </el-row>
      <el-row>
        <el-table ref="singleTable" :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="编码"> </el-table-column>
          <el-table-column prop="name" label="类型名称"> </el-table-column>
          <el-table-column prop="name" label="业务表"> </el-table-column>
          <el-table-column prop="name" label="状态"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="onSubmit"
                >编辑</el-button
              ><el-button size="small" type="text" @click="onSubmit"
                >删除</el-button
              >
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
    <el-dialog
      title="流程类型新增"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item required label="编码">
          <el-input v-model="formInline.user" placeholder="自动编码"></el-input>
        </el-form-item>
        <el-form-item required label="业务类型">
          <el-select v-model="formInline.user">
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="业务表">
          <el-select v-model="formInline.user">
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      formInline: {
        user: ""
      },
      tableData: [{ name: "haha" }],
      dialogVisible: false
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
 
</style>
