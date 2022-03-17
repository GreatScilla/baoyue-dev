// 编码管理设置
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件" 
      append-to-body 
      width="640px"
    >
      <el-form :model="form">
        <el-form-item label="对象名称">
          <!-- <el-select v-model="codeName">
            <el-option v-for="item of moduleType" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
          </el-select> -->
          <el-input v-model="codeName"></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
            <!-- <el-button @click="handleClose" size="small">取消</el-button> -->
            <el-button @click="handleReset" size="small">重置</el-button>
            <el-button type="primary" size="small" @click="handleList">查询</el-button>
            <!-- <el-button size="small" type="primary" @click="handleList">搜索</el-button>
            <el-button size="small">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px;">
      <el-button v-if="permission.encode_expore" size="small" icon="el-icon-search" type="primary" @click="searchDialogVisible = true">
        查 询
      </el-button>
      <!-- <el-button v-if="permission.encode_add" type="primary" @click="hanldeAdd" size="small">新增</el-button> -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="codeKey" label="对象编码"> </el-table-column>
        <el-table-column prop="codeName" label="对象名称"> </el-table-column>
        <el-table-column prop="codePreview" label="编码预览">
        </el-table-column>
        <el-table-column prop="encodingStyle" label="编码方式">
        </el-table-column>
        <el-table-column prop="prefix" label="前缀">
        </el-table-column>
        <el-table-column prop="combinationLength" label="流水码长度">
        </el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip v-if="permission.encode_edit" class="item" effect="dark" content="编辑" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.row)">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip v-if="permission.encode_detail" class="item" effect="dark" content="详情" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-tickets" @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip v-if="permission.encode_delete" class="item" effect="dark" content="删除" placement="bottom">
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
  </basic-container>
</template>

<script>
import { getList, remove } from "@/api/base/encode";
import { getDictionary } from '@/api/common'
import paginationMixin from "@/mixins/pagination";
import {mapGetters} from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchDialogVisible: false,
      moduleType: [],
      codeName: '',
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.getModuleType()
    this.handleList()
  },
  computed: {
    ...mapGetters(["userInfo", "permission"])
  },
  methods: {
    async handleList() {
      const res = await getList({
        current: this.currentPage,
        size: this.pageSize,
        codeName: this.codeName
      });
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false
    },
    async handleDelete(row) {
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const res = await remove(row.id);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消删除");
      }
    },
    handleEdit (row) {
      this.$router.push({
        path: '/base/encodeEdit',
        query: {
          id: row.id
        }
      })
    },
    hanldeAdd () {
      this.$router.push({
        path: '/base/encodeAdd'
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/base/encodeDetail',
        query: {
          id: row.id
        }
      })
    },
    async getModuleType () { // 获取模块类型
      const res = await getDictionary({code: 'mes_module_type'})
      this.moduleType = res.data.data
    },
    handleClose () {
      this.searchDialogVisible = false
    },
    handleReset () {
      this.codeName = ''
    }
  }
};
</script>

<style lang="scss" scoped>
 
</style>
