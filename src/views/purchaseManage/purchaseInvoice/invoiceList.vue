<template>
  <basic-container>
    <el-row style="margin-bottom: 20px;">
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >导出</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >删除</el-button
      >
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="附件" width="50"></el-table-column>
        <el-table-column prop="status" label="开票日期">
        </el-table-column>
        <el-table-column prop="number" label="发票抬头"> </el-table-column>
        <el-table-column prop="name" label="发票编号">
        </el-table-column>
        <el-table-column prop="name" label="开票金额">
        </el-table-column>
        <el-table-column prop="name" label="所属供应商">
        </el-table-column>
        <el-table-column prop="name" label="开票部门">
        </el-table-column>
         <el-table-column prop="name" label="开票人">
        </el-table-column>
         <el-table-column prop="name" label="备注">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.id, 'edit')">
              编辑
            </el-button>
            <el-button type="text" @click="handleEdit(scope.row.id, 'detail')">
              详情
            </el-button>
            <el-button type="text" @click="handleDelete(scope.row)"
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
    <el-dialog append-to-body :visible.sync="showAdds" :title="title" @close="handleCancel">
      <el-form :model="addForm" label-width="80px" :fullscreen="true">
        <el-form-item label="类型编码">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item v-if="type !== 'detail'">
          <el-button size="small" type="primary" @click="submit">保存</el-button>
          <el-button @click="handleCancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>