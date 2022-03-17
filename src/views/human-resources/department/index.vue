// 组织架构
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.department_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/human-resources/department/add')"
        v-if="permission.department_add"
        >新 增</el-button
      >
    </el-row>
    <el-divider></el-divider>
    <!-- <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 30px;"
        placeholder="输入名称"
        v-model="searchParam">
      </el-input>
      <el-button size="small" type="primary" @click="searchDepartment">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add','',tableData)">
        新增
      </el-button>
    </el-row> -->
    <el-table
      :data="tableData"
      border
      style="margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="deptName" label="名称"></el-table-column>
      <el-table-column prop="deptLevel" label="层级"></el-table-column>
      <el-table-column prop="phone" label="部门电话">
        <template slot-scope="scope">
          {{ scope.row.phone || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
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
              @click="toEdit(scope.row)"
              v-if="permission.department_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="permission.department_edit && permission.department_details"
          ></el-divider>
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
              @click="toDetail(scope.row)"
              v-if="permission.department_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="permission.department_details && permission.department_delete"
          ></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="permission.department_delete"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查询 -->
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
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="机构名称">
          <el-input placeholder="请输入机构名称" v-model="searchForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="机构层级">
          <el-input    placeholder="请输入机构层级" v-model="searchForm.level"></el-input>
        </el-form-item>
        <el-form-item label="机构电话">
          <el-input placeholder="请输入机构电话" v-model="searchForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getDepartmentTree,
  delDepartMent,
} from "@/api/humanResources/department";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchForm: {}, // 搜索条件
      recordForm: {}, //暂存数据
      tableData: [],
      searchDialogVisible: false,
    };
  },
  filters: {
    type: function (value) {
      if (value === 0) {
        value = "工厂";
      } else if (value === 1) {
        value = "车间";
      } else if (value === 2) {
        value = "工位";
      }
      return value;
    },
    control: function (value) {
      if (value === 0) {
        value = "正常";
      } else if (value === 1) {
        value = "锁定";
      }
      return value;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑组织架构" || from.name === "组织架构详情") {
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
      this.searchForm = recordObj;
    }
    this.initDepartment(this.searchForm);
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    // 获取部门树状结构
    initDepartment(...arg) {
      let params = null;
      if (arg.length > 0) {
        params = arg[0];
      }
      this.recordForm = params;
      getDepartmentTree(params)
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜索
    searchRole() {
      this.initDepartment(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.initDepartment();
      // this.searchDialogVisible = false;
    },
    // 单行删除
    handleDelete(index, row) {
      this.$confirm("确定要删除该部门吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDepartMent({ ids: row.id })
            .then((res) => {
              if (res.data.success) {
                this.initDepartment("");
                this.$message.success("操作成功");
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
    traverseTree(data) {
      if (!data) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        this.traverseSingle(data[i]);
        if (data[i].children && data[i].children.length > 0) {
          this.traverseTree(data[i].children);
        }
      }
    },
    traverseSingle(item) {
      if (item.hasChildren) {
        delete item.hasChildren;
      }
    },

    toEdit(row) {
      this.$router.push({
        path: "/human-resources/department/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/human-resources/department/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
