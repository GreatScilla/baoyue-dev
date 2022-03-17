// 用户新增、修改
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="100px"
        :inline="true"
        :model="userFormData"
        class="detail-form"
        ref="userFormData"
        :rules="rules"
        :inline-message="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="账号:" prop="account">
              <el-input
                size="small"
                v-model="userFormData.account"
                placeholder="请输入账号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="人员:" prop="realName">
              <el-input
                @click.native="employeeDialogVisible = true"
                size="small"
                suffix-icon="el-icon-search"
                v-model="userFormData.realName"
                placeholder="请选择人员"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="工位:">
              <el-select
                v-model="userFormData.stationName"
                placeholder="请选择工位"
                size="small"
              >
                <el-input
                  v-model="filterUserInput"
                  placeholder="输入关键词进行过滤"
                  class="el-select-tree-input"
                  size="small"
                ></el-input>
                <el-option class="el-select-tree-option">
                  <el-tree
                    show-checkbox
                    ref="tree"
                    :data="stationTreeData"
                    :props="defaultProps"
                    @check="handleCheck"
                    :filter-node-method="filterNode"
                    node-key="id"
                    :default-checked-keys="defaultCheckedKeys"
                  >
                  </el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              required
              label="密码:"
              prop="password"
              v-if="type === 'add'"
            >
              <el-input
                size="small"
                v-model="userFormData.password"
                show-password
                placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="用户名称:" prop="name">
              <el-input
                size="small"
                v-model="userFormData.name"
                placeholder="请输入用户名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="是否开启:">
              <el-select size="small" v-model="userFormData.status">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="角色:" prop="roleName">
              <el-input
                @click.native="rolesDialogVisible = true"
                size="small"
                suffix-icon="el-icon-search"
                v-model="userFormData.roleName"
                placeholder="请选择角色"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!-- 角色对话框 -->
    <dialog-select-roles
      title="角色"
      :rolesDialogVisible="rolesDialogVisible"
      @on-selected-roles="onSelectedRoles"
    >
    </dialog-select-roles>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="人员"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- 选择人员对话框 -->
    <!-- <el-dialog
      title="选择人员"
      width="60%"
      append-to-body
      :visible.sync="selectDataPersonnelDialogVisible"
      :before-close="handleClose"
    >
      <el-input
        size="small"
        suffix-icon="el-icon-search"
        v-model="searchParamsPersonnel"
        placeholder="输入姓名和工号"
        style="margin-bottom:15px"
        @keyup.enter.native="searchPersonnel"
        @change="searchPersonnel">
      </el-input>
      <el-table
        highlight-current-row
        :data="personnelTableData"
        row-key="id"
        default-expand-all
        @row-click="clickRowPersonnel"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="jobNumber" label="工号">
          <template slot-scope="scope">
            {{ scope.row.jobNumber || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | status}}
          </template>
        </el-table-column>
        <el-table-column prop="workDate" label="入职时间">
          <template slot-scope="scope">
            {{ scope.row.workDate || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="speedDimissionDate" label="离职时间">
          <template slot-scope="scope">
            {{ scope.row.speedDimissionDate || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectDataPersonnelDialogVisible = false">
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="confimSelectDataPersonnelDialogVisible">
          确 定
        </el-button>
      </span>
    </el-dialog> -->
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveUser('userFormData')"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import { isMobile, isEmail } from "@/util/validate";
import { detailsUser, addEditUser } from "@/api/base-data/user";
import { getMultipleRoles } from "@/api/base-data/role";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import { getFactoryModelList } from "@/api/base-data/factoryModel";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import dialogSelectRoles from "@/components/dialog-select/roles";
export default {
    props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      stateOptions: [
        {
          value: 0,
          label: "开启",
        },
        {
          value: 1,
          label: "停用",
        },
      ],
      searchParamsPersonnel: "",
      searchParamsRole: "",
      userFormData: {
        status: 0,
        stationName: "",
        linkStationId: [],
        realName: "",
        roleName: "",
      },
      rolesTableData: [],
      personnelTableData: [],
      stationTreeData: [],
      defaultProps: {
        label: "factoryName",
      },
      defaultCheckedKeys: [],
      clickRole: null,
      clickRealName: null,
      rolesDialogVisible: false,
      employeeDialogVisible: false,
      filterUserInput: "",
      type: "",
      rules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["blur", "change"],
          },
        ],
        realName: [
          {
            required: true,
            message: "请选择人员姓名",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
        roleName: [
          {
            required: true,
            message: "请选择角色",
            trigger: ["blur", "change"],
          },
        ],
        stationName: [
          {
            required: true,
            message: "请选择工位",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {
    dialogSelectPersonnel,
    dialogSelectRoles,
  },
  created() {
    this.initResources();
    if (this.type !== "add") {
      let id=this.data.id
      this.initUserDetails(id);
    }
  },
  methods: {
    // 初始化资源
    initResources() {
      Promise.all([
        getMultipleRoles(),
        getEmployeeList(),
        getFactoryModelList({ factoryName: "" }),
      ])
        .then((res) => {
          this.rolesTableData = res[0].data.data;
          this.personnelTableData = res[1].data.data;
          this.stationTreeData = res[2].data.data;
          this.traverseTree(this.stationTreeData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 员工详情
    initUserDetails(id) {
      detailsUser({ id: id })
        .then((res) => {
          this.userFormData = res.data.data;
          this.defaultCheckedKeys = this.userFormData.linkStationId.split(",");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 点击单行角色
    clickRowRole(row, column, event) {
      this.clickRole = row;
    },
    // 点击单行人员
    clickRowPersonnel(row, column, event) {
      this.clickRealName = row;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.userFormData.realName = value.name;
        this.userFormData.personnelFileId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    // 选择角色
    onSelectedRoles(value) {
      if (value) {
        this.userFormData.roleName = value.roleName;
        this.userFormData.roleId = value.id;
      }
      this.rolesDialogVisible = false;
    },
    // 角色保存
    confimSelectDataRoleDialogVisible() {
      if (this.clickRole) {
        this.userFormData.roleName = this.clickRole.roleName;
        this.userFormData.roleId = this.clickRole.baseId;
        this.selectDataRoleDialogVisible = false;
      } else {
        this.$message.info("请选择角色");
      }
    },
    // 人员保存
    confimSelectDataPersonnelDialogVisible() {
      if (this.clickRealName) {
        this.userFormData.realName = this.clickRealName.name;
        this.userFormData.personnelFileId = this.clickRealName.id;
        this.selectDataPersonnelDialogVisible = false;
      } else {
        this.$message.info("请选择人员");
      }
    },
    // 工位选择
    handleCheck(data, checkNode) {
      this.userFormData.stationName = [];
      this.userFormData.linkStationId = [];
      if (checkNode) {
        checkNode.checkedNodes.forEach((item) => {
          if (item.levelId === "30") {
            this.userFormData.stationName.push(item.factoryName);
            this.userFormData.linkStationId.push(item.id);
          }
        });
      }
    },
    // 保存
    saveUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userFormData.stationName =
            this.userFormData.stationName.toString();
          this.userFormData.linkStationId =
            this.userFormData.linkStationId.toString();
          // let params

          // if (this.type === 'add') {
          //   params = this.userFormData
          // } else {
          //   params = {
          //     id:this.userFormData.id,
          //     account:this.userFormData.account,
          //     name:this.userFormData.name,
          //     password:this.userFormData.password,
          //     status:this.userFormData.status,
          //     personnelFileId:this.userFormData.personnelFileId,
          //     roleId:this.userFormData.roleId,
          //     linkStationId:this.userFormData.linkStationId,
          //   }
          // }
          addEditUser(this.userFormData)
            .then((res) => {
              if (res.data.success) {
                this.$message.success("操作成功");
                this.$router.back();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
    // 搜索人员
    searchPersonnel() {
      getEmployeeList({ keywords: this.searchParamsPersonnel })
        .then((res) => {
          this.personnelTableData = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜索角色
    searchRole() {
      getMultipleRoles({ name: this.searchParamsRole })
        .then((res) => {
          this.rolesTableData = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 人员过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.factoryName.indexOf(value) !== -1;
    },
    // 取消
    cancel() {
      this.$router.back();
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
      if (item.levelId !== "30") {
        item.disabled = true;
      }
    },
  },
  watch: {
    filterUserInput(val) {
      this.$refs.tree.filter(val);
    },
  },
  filters: {
    sex: function (value) {
      if (value === 1) {
        value = "男";
      } else if (value === 2) {
        value = "女";
      } else {
        value = "未知";
      }
      return value;
    },
    status: function (value) {
      if (value === 2) {
        value = "兼职";
      } else if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select,
.el-textarea {
  width: 360px;
}
.el-col {
  margin-bottom: 4px;
}
.el-select-dropdown__item.hover {
  background-color: #fff;
}
/deep/ .el-select-dropdown__list {
  text-align: center;
}
</style>
