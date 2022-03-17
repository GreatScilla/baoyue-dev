// 销售类型设置
<template>
  <basic-container>
    <el-row style="margin-bottom: 20px;">
      <el-button
        v-if="types === 3 ? permission.sale_type_add : permission.purchase_type_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <el-button
        v-if="types === 3 ? permission.sale_type_delete : permission.purchase_type_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleBatchDelete"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="types === 3 ? sale_type_start : permission.purchase_type_start"
        size="small"
        icon="el-icon-check"
        plain
        @click="handleUpdateStatus"
        >启用</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        border
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="{row, $index}">
            <el-switch
              v-model="row.status"
              :active-value="0"
              :inactive-value="1"
              @change="(val) => changeStatus(row,$index, val)">
            </el-switch>
             <!-- <span>{{scope.row.status | erpStatus}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="number" label="类型编号"> </el-table-column>
        <el-table-column prop="name" label="类型名称">
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip v-if="types === 3 ? permission.sale_type_edit : permission.purchase_type_edit" class="item" effect="dark" content="编辑" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.row.id, 'edit')">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip v-if="types === 3 ? permission.sale_type_detail : permission.sale_type_detail" class="item" effect="dark" content="详情" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-tickets" @click="handleEdit(scope.row.id, 'detail')">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip v-if="types === 3 ? permission.sale_type_delete : permission.purchase_type_delete" class="item" effect="dark" content="删除" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">
              </el-button>
            </el-tooltip>
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
    <el-dialog append-to-body :visible.sync="showAdds" :title="title" @close="handleCancel" class="saletype-dialog">
        <el-form :model="addForm" label-width="90px" :fullscreen="true" class="saletype-form">
          <el-form-item label="类型编号：" v-if="type !== 'add'">
            <span v-if="type === 'detail'">{{addForm.number}}</span>
            <el-input v-else v-model="addForm.number" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型名称：">
            <span v-if="type === 'detail'">{{addForm.name}}</span>
            <el-input v-else v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item v-if="type !== 'detail'">
            <el-button size="small" type="primary" @click="submit">保存</el-button>
            <el-button @click="handleCancel" size="small">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getErpSubList, addErpSubType, selectDetailById, deleteStatus, batchDeleteStatus, batchUpdateStatus } from "@/api/salesManage/saleType";
import paginationMixin from "@/mixins/pagination";
import { getId } from "@/api/common";
import {mapGetters} from "vuex";
export default {
  name: 'saleType',
  mixins: [paginationMixin],
  props: {
    types: { // 调用接口时type的值1采购/2采购退货/3销售/销4售退货/5调拨
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      addForm: {
        number: '',
        name: ''
      }, // 新增弹窗
      type: 'add', // 增改类型
      tableData: [],
      multipleSelection: [],
      showAdds: false,
      title: '销售类型新增',
      selectData: []
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"])
  },
  async mounted() {
    await this.handleList();
  },
  methods: {
    async handleList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: this.types
      }
      const res = await getErpSubList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async handleDelete(row) {
      this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        deleteStatus(row).then(res => {
          this.$message.success({
            message: '删除成功！'
          })
          this.handleList()
        })
      })
    },
    async handleBatchDelete () { // 批量删除
      if (this.selectData.length === 0) {
        this.$message.warning({
          message: '请至少选择一条数据'
        })
        return
      }
      this.$confirm("确定要删除选中数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = []
        this.selectData.forEach(item => {
          ids.push(item.id)
        })
        ids = ids.join(',')
        batchDeleteStatus(ids,).then(res => {
          this.$message.success({
            message: '批量删除成功！'
          })
          this.handleList()
        })    
      })
    },
    handleUpdateStatus () { 
      if (this.selectData.length === 0) {
        this.$message.warning({
          message: '请至少选择一条数据'
        })
        return
      }
      this.$confirm("确定要启选中数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = []
        this.selectData.forEach(item => {
          ids.push(item.id)
        })
        ids = ids.join(',')
        batchUpdateStatus(ids, 1).then(res => {
          this.$message.success({
            message: '批量启用成功！'
          })
          this.handleList()
        })    
      })
    },
    handleSelectionChange (val) { // 选择表格数据
      console.log(val)
      this.selectData = val
    },
    handleAdd() { // 新增
      this.type = 'add'
      if (this.types === 1) {
        this.title = '采购类型新增'
      } else if (this.types === 3) {
        this.title = '销售类型新增'
      }
      // this.getOrderSn()
      this.showAdds = true
    },
    handleEdit (id, type) {
      this.type = type,
      // this.rowId = id
      this.getDetail(id)
      if (type === 'edit') {
        if (this.types === 1) {
          this.title = '采购类型编辑'
        } else if (this.types === 3) {
          this.title = '销售类型编辑'
        }
      } else {
        if (this.types === 1) {
          this.title = '采购类型详情'
        } else if (this.types === 3) {
          this.title = '销售类型详情'
        }
      }
    },
    handleCancel () {
      this.showAdds = false
      this.addForm = {
        number: '',
        name: ''
      }
    },
    async submit () {
      const params = {
        ...this.addForm,
        type: this.types
      }
      const data = await addErpSubType(params)
      this.$message.success({
        message: '操作成功'
      })
      this.showAdds = false
      this.handleList()
    },
    async getDetail (id) { // 获取明细详情
      const res = await selectDetailById(id)
      this.addForm = res.data.data
      this.showAdds = true
    },
    async changeStatus (row, index, val) { //启用传1禁用0
      const res = await batchUpdateStatus(row.id, val)
      this.$message.success({
        message: '修改成功'
      })
      this.handleList()
    }
    // async getOrderSn () { // 获取单据编号
    //   let name = ''
    //   if (this.types === 1) {
    //     name =  '采购类型'
    //   } else if (this.types === 3) {
    //     name = '销售类型'
    //   }
    //   const res = await getId({codeName: name})
    //   this.addForm.number = res.data.data
    // },
  }
};
</script>

<style lang="scss" scoped>
 .saletype-form .el-form-item{
  //  margin-bottom: 20px;
 }
 .saletype-form {
  //  margin-bottom: 20px;
  .el-input {
    width: 200px
  }
 }
 /deep/ .saletype-dialog .el-dialog__body {
   padding: 16px 20px !important;
 }
</style>

<style>
.saletype-dialog .el-dialog__body {
   padding: 16px 20px !important;
 }
</style>
