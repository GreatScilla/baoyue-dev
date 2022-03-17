<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.factoryModel_search"
      >
        查 询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/system/factory-model/add')"
        v-if="permission.factoryModel_add"
      >
        新 增
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 30px;"
        placeholder="名称"
        v-model="factoryModelInput">
      </el-input>
      <el-button size="small" type="primary" @click="searchFactoryModel">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">
        新增
      </el-button>
    </el-row> -->
    <el-table
      :data="tableData"
      border
      style="margin-bottom: 34px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="factoryName" label="工厂模型名称" width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="180">
        <template slot-scope="scope">
          {{ scope.row.description || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="模型类型名称">
        <template slot-scope="scope">
          <el-tag style="height: 24px; line-height: 22px">{{
            scope.row.levelId | type
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="principalName" label="负责人">
        <template slot-scope="scope">
          {{ scope.row.principalName || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            class="switch"
            v-model="scope.row.enabled"
            inactive-color="#FF4949"
            :active-value="0"
            :inactive-value="1"
            :disabled="scope.row.controllerStatus === 1"
            @change="
              (value) => {
                handleSwitchChange(value, scope.row);
              }
            "
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="control" label="控制状态">
        <template slot-scope="scope">
          <span
            :class="[
              scope.row.controllerStatus === 0 ? 'normalColor' : 'lockColor',
            ]"
          >
            {{ scope.row.controllerStatus | control }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
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
              :disabled="scope.row.controllerStatus === 1"
              v-if="permission.factoryModel_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.factoryModel_edit && permission.factoryModel_delete
            "
          ></el-divider>
          <span v-if="permission.factoryModel_detail">
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
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>
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
              :disabled="scope.row.controllerStatus === 1 || scope.$index === 0"
              v-if="permission.factoryModel_delete"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.factoryModel_delete &&
              scope.row.controllerStatus === 0 &&
              permission.factoryModel_lock
            "
          ></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="锁定"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-lock"
              @click="handleLock(scope.$index, scope.row)"
              v-if="
                scope.row.controllerStatus === 0 && permission.factoryModel_lock
              "
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              scope.row.controllerStatus === 1 && permission.factoryModel_lock
            "
          ></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="解锁"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-unlock"
              @click="handleUnLock(scope.$index, scope.row)"
              v-if="
                scope.row.controllerStatus === 1 && permission.factoryModel_add
              "
              :disabled="scope.row.unLock"
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="工厂模型名称">
          <el-input
            placeholder="请输入工厂模型名称"
            v-model="searchForm.factoryName"
          ></el-input>
        </el-form-item>
        <el-form-item label="模型类型">
          <el-select
            size="small"
            v-model="searchForm.levelId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hierarchyOptions"
              :key="item.levelId"
              :label="item.levelName"
              :value="item.levelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input
            placeholder="请输入负责人"
            v-model="searchForm.principalName"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select
            size="small"
            v-model="searchForm.enabled"
            placeholder="请选择"
          >
            <el-option
              v-for="item in enabledOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制状态">
          <el-select
            size="small"
            v-model="searchForm.controllerStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in controllerStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            placeholder="请输入描述"
            v-model="searchForm.description"
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
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getFactoryModelList,
  lockState,
  unLockState,
  delModel,
  enabledState,
} from "@/api/base-data/factoryModel";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      controllerStatusOptions: [
        { value: 0, label: "正常" },
        { value: 1, label: "锁定" },
      ],
      enabledOptions: [
        { value: 0, label: "启用" },
        { value: 1, label: "停用" },
      ],
      hierarchyOptions: [
        {
          levelName: "车间",
          levelId: "10",
        },
        {
          levelName: "产线",
          levelId: "20",
        },
        {
          levelName: "工位",
          levelId: "30",
        },
      ],
      searchForm: {}, // 搜索条件
      recordForm: {}, //暂存数据
      tableData: [],
      firstItem: false,
      list: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  filters: {
    type: function (value) {
      if (value === "00") {
        value = "工厂";
      } else if (value === "10") {
        value = "车间";
      } else if (value === "20") {
        value = "产线";
      } else if (value === "30") {
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
    if (from.name === "编辑工厂模型" || from.name === "工厂模型详情") {
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
    this.init(this.searchForm);
  },
  methods: {
    // 搜索
    searchRole() {
      this.init(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.init();
      // this.searchDialogVisible = false;
    },
    // 获取工厂模型列表
    init(...arg) {
      let params = null;
      if (arg.length > 0) {
        params = arg[0];
      }
      this.recordForm = params;
      getFactoryModelList(params)
        .then((res) => {
          let data = res.data.data;
          this.tableData = data;
          this.traverseTree(this.tableData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 遍历树形结构
    traverseSingle(item) {
      console.log(item);
      if (item.controllerStatus === 1 && item.children.length > 0) {
        item.children.forEach((item) => {
          item.disabled = true;
        });
      }
    },

    // 遍历树形结构
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
    // 启用状态
    async handleSwitchChange(value, row) {
      if (value === 0) {
        row.enabled = 1;
      } else {
        row.enabled = 0;
      }
      let res = await enabledState({ factoryModelId: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.init("");
      }
    },
    // 锁定状态
    async handleLock(index, row) {
      this.list = [];
      try {
        await this.$confirm("确定要锁定该模型吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await lockState({ factoryModelId: row.id });
        if (res.data.success) {
          this.$message.success("操作成功");
          this.init("");
        }
      } catch (error) {
        console.error(error);
        this.$message.info("已取消");
      }
    },
    // 解锁状态
    async handleUnLock(index, row) {
      try {
        await this.$confirm("确定要解锁该模型吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await unLockState({ factoryModelId: row.id });
        if (res.data.success) {
          this.$message.success("操作成功");
          this.init("");
        }
      } catch (error) {
        console.error(error);
        this.$message.info("已取消");
      }
    },
    // 删除模型
    handleDelete(index, row) {
      this.$confirm("确定要删除该数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delModel({ ids: row.id })
            .then((res) => {
              if (res.data.success) {
                this.init("");
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
    toEdit(row) {
      this.$router.push({
        path: "/system/factory-model/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/system/factory-model/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.normalColor {
  color: #13ce66;
}
.lockColor {
  color: #ff4949;
}
</style>
