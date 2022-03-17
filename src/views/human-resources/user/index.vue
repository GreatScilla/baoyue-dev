// 用户管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.userbpy_search"
      >
        查 询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/human-resources/user/add')"
        v-if="permission.userbpy_add"
      >
        新 增
      </el-button>
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelUser"
        v-if="permission.userbpy_delete"
      >
        批量删除
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 10px;"
        placeholder="账号或姓名"
        v-model="searchParam">
      </el-input>
      <el-button size="small" type="primary" @click="searchUser">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">
        新增
      </el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelUser">
        删除
      </el-button>
    </el-row> -->
    <el-row>
      <el-table
        :data="userTableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="name" label="用户名称">
          <template slot-scope="scope">
            {{ scope.row.name || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="所属部门"> </el-table-column>
        <el-table-column prop="realName" label="人员姓名"> </el-table-column>
        <el-table-column prop="phone" label="电话">
          <template slot-scope="scope">
            {{ scope.row.phone || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              class="switch"
              v-model="scope.row.status"
              inactive-color="#FF4949"
              :active-value="0"
              :inactive-value="1"
              @change="
                (value) => {
                  handleSwitchChange(value, scope.row);
                }
              "
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createUsername" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150">
        </el-table-column>
        <el-table-column width="150" label="操作" fixed="right">
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
                v-if="permission.userbpy_edit"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.userbpy_edit && permission.userbpy_delete"
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
                @click="handleDelUser(scope.row)"
                v-if="permission.userbpy_delete"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="
                permission.userbpy_delete && permission.userbpy_editPassWord
              "
            ></el-divider>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改密码"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleEditPassword(scope.$index, scope.row)"
                v-if="permission.userbpy_editPassWord"
              >
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
        <el-form-item label="账户">
          <el-input
            placeholder="请输入账户"
            v-model="searchForm.account"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input
            placeholder="请输入用户名称"
            v-model="searchForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input
            placeholder="请输入所属部门"
            v-model="searchForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="人员姓名">
          <el-input
            placeholder="请输入人员姓名"
            v-model="searchForm.realName"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            placeholder="请输入电话"
            v-model="searchForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input
            placeholder="请输入创建人"
            v-model="searchForm.createUser"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog
      title="重置密码"
      append-to-body
      :visible.sync="editPasswordDialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form
        ref="passwordForm"
        :model="passwordForm"
        label-width="100px"
        :rules="rules"
      >
        <!-- <el-form-item label="旧密码" required prop="oldPassword">
          <el-input size="small" v-model="passwordForm.oldPassword" placeholder="请输入内容" show-password></el-input>
        </el-form-item> -->
        <el-form-item label="新密码" required prop="newPassword">
          <el-input
            size="small"
            v-model="passwordForm.newPassword"
            placeholder="请输入内容"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" required prop="newPassword1">
          <el-input
            size="small"
            v-model="passwordForm.newPassword1"
            placeholder="请输入内容"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取 消 </el-button>
        <el-button
          size="small"
          type="primary"
          @click="confimEditPasswordDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getUser,
  delUser,
  resetPassword,
  addEditUser,
} from "@/api/base-data/user";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      statusData: [
        { value: 0, label: "开启" },
        { value: 1, label: "关闭" },
      ],
      userTableData: [],
      searchForm: {},
      recordForm: {}, //暂存数据
      editPasswordDialogVisible: false,
      passwordForm: {},
      ids: [],
      rules: {
        // oldPassword: [
        //   { required: true, message: '请输入旧密码', trigger: ['blur','change'] },
        // ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"],
          },
        ],
        newPassword1: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: ["blur", "change"],
          },
        ],
      },
      searchDialogVisible: false,
      column: [
        {
          label: "账号或姓名",
          prop: "keywords",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑用户管理") {
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
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  methods: {
    // 查询用户
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      getUser(params)
        .then((res) => {
          this.userTableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    //删除
    async handleDelUser(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      try {
        await this.$confirm("确定要删除该用户吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delUser({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 修改密码
    handleEditPassword(index, row) {
      this.editPasswordDialogVisible = true;
      this.passwordForm.userId = row.bladeUserId;
    },
    // 确认修改密码
    confimEditPasswordDialogVisible() {
      try {
        // if(!this.passwordForm.oldPassword){
        //   throw('请输入旧密码')
        // } else
        if (!this.passwordForm.newPassword) {
          throw "请输入新密码";
        } else if (!this.passwordForm.newPassword1) {
          throw "请再次输入新密码";
        }
      } catch (err) {
        this.$message.info(err);
        return;
      }
      resetPassword(this.passwordForm)
        .then((res) => {
          if (res.data.success) {
            this.closeInitDialog();
            this.$message.success("操作成功");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 启用状态
    async handleSwitchChange(value, row) {
      if (value === 0) {
        row.status = 1;
      } else {
        row.status = 0;
      }
      let res = await addEditUser({
        id: row.id,
        status: value,
        bladeUserId: row.bladeUserId,
      });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.handleList();
      } else {
        this.$message.error("操作失败");
      }
    },
    // 取消
    cancel() {
      this.closeInitDialog();
    },
    // 表单初始
    closeInitDialog() {
      this.$refs.passwordForm.resetFields();
      this.editPasswordDialogVisible = false;
    },
    toEdit(row) {
      this.$router.push({
        path: "/human-resources/user/edit",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .el-dialog {
  .el-input {
    width: 240px;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
}
</style>
