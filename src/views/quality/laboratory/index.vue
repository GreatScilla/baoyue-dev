// 化验室管理
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
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="化验室编号">
          <el-input v-model="searchForm.labNo"></el-input>
        </el-form-item>
        <el-form-item label="化验室名称">
          <el-input v-model="searchForm.labName"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="searchForm.principalUserName"></el-input>
        </el-form-item>
        <el-form-item label="化验室位置">
          <el-input v-model="searchForm.labAddress"></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.laboratory_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.laboratory_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        >新增</el-button
      >

      <el-button
        v-if="permission.laboratory_delete"
        plain
        size="small"
        @click="handleDelRole()"
        >批量删除</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column prop="labNo" label="化验室编号"></el-table-column>
        <el-table-column prop="labName" label="化验室名称"></el-table-column>
        <el-table-column
          prop="principalUserName"
          label="负责人"
        ></el-table-column>
        <el-table-column prop="description" label="化验室描述">
          <template slot-scope="scope">
            <div class="ellipsis">
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="labAddress" label="化验室位置"></el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <div class="ellipsis">
              {{ scope.row.remark }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.laboratory_edit"
              :to="{
                path: '/quality/laboratory/edit',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  @click="handleEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>

            <router-link
              v-if="permission.laboratory_detail"
              :to="{
                path: '/quality/laboratory/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                  @click="handleDetail(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <el-tooltip
              v-if="permission.laboratory_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
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
      ></el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  selectLaboratoryManagementPage,
  removeLaboratoryManagement,
} from "@/api/quality/index";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      options: [
        {
          value: 0,
          label: "失效",
        },
        {
          value: 1,
          label: "生效",
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改化验室管理" || from.name === "化验室管理详情") {
      recordObj = JSON.parse(sessionStorage.getItem("recordForm"));
      next();
    } else {
      recordObj = "";
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj.data;
    }
    this.handleList();
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        data: this.searchForm,
      };
      this.recordForm = params;
      const res = await selectLaboratoryManagementPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeLaboratoryManagement({ ids: ids })
            .then((res) => {
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole([row.id]);
    },
    // 多行删除
    handleDelRole() {
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/laboratory/add");
    },
  },
  filters: {
    statusName(val) {
      if (val === 0) {
        return (val = "失效");
      }
      if (val === 1) {
        return (val = "生效");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
</style>
