// 角色管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button size="small" icon="el-icon-search" type="primary" @click="searchDialogVisible = true" v-if="permission.roles_search">
        查 询
      </el-button>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')" v-if="permission.roles_add">
        新 增
      </el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelRole" v-if="permission.roles_delete">
        批量删除
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 30px;"
        placeholder="请输入名称"
        v-model="searchParam">
      </el-input>
      <el-button size="small" type="primary" @click="searchRole">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelRole">删除</el-button>
    </el-row> -->
    <el-row>
      <el-table 
        :data="roleTableData"
        border
        @selection-change="handleSelectionChange"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <!-- <el-table-column prop="roleType" label="角色类型"></el-table-column>
        <el-table-column prop="resourceType" label="资源类型"> </el-table-column> -->
        <el-table-column prop="roleAlias" label="角色代码"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="createUserName" label="创建人">
          <template slot-scope="scope">
            {{scope.row.createUserName || "无"}} 
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-edit-outline" 
                @click="to('edit',scope.row)" v-if="permission.roles_edit">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" v-if="permission.roles_edit && permission.roles_details"></el-divider>
            <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-tickets" 
                @click="to('details',scope.row)" v-if="permission.roles_details">
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" v-if="permission.roles_details && permission.roles_delete"></el-divider>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button type="text" size="small" icon="el-icon-delete" 
                @click="handleDelRole(scope.row)" v-if="permission.roles_delete">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination> -->
    </el-row>
    <!-- 查询 -->
    <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search>
  </basic-container>
</template>

<script>
import {getRolesTree, detailsRole, delRole} from '@/api/base-data/role'
import paginationMixin from "@/mixins/pagination";
import {mapGetters} from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      roleTableData: [],
      ids:[],
      searchParam:'',
      searchDialogVisible:false,
      column:[
        {
          label:'名称',
          prop: "roleName",
        }
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"])
  },
  created(){
    this.handleList()
  },
  methods: {
    // 表格多选
    handleSelectionChange(value){
      this.ids = []
      if (value.length > 0) {
        value.forEach(item => {
          this.ids.push(item.id)
        })
        this.ids = this.ids.join()
      }
    },
    // 查询角色
    handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      getRolesTree(params)
      .then(res => {
        this.roleTableData = res.data.data
        this.total = res.data.data.total
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 查询
    onSearch(value){
      if (value) {
        this.handleList({roleName:value.roleName})
      }
      this.searchDialogVisible = false
    },
    // 搜素
    searchRole(){
      if (this.searchParam) {
        this.handleList({name:this.searchParam})
      }
    },
    //重置
    reset(){
      this.searchParam = ''
      this.handleList()
    },
    //删除角色
    async handleDelRole(row){
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
        await this.$confirm("确定要删除该角色吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const res = await delRole({ids:ids})
        if (res.data.success) {
          this.handleList()
          this.$message.success('操作成功');
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 删除
    to(operationState,row) {
      this.$router.push({
        path: "/human-resources/roles/detail",
        query: {
          operationState,
          row
        }
      });
    }
  }
};

</script>

<style lang="scss" scoped>
 
</style>
