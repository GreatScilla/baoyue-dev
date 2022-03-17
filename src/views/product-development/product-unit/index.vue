// 产品单位
<!--product_unit_add-->
<!--product_unit_search-->
<!--product_unit_modify-->
<!--product_unit_delete-->
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.product_unit_search"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        >查询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        v-if="permission.product_unit_add"
        type="primary"
        @click="addGroup"
        >添加分组
      </el-button>
      <el-button
        icon="el-icon-plus"
        size="small"
        v-if="permission.product_unit_add"
        type="primary"
        @click="addUnit"
        >添加单位
      </el-button>
    </el-row>
    <el-divider></el-divider>

    <el-row class="content-wrapper">
      <el-col class="content-left" :span="6">
        <div class="top">单位分组</div>
        <el-tree
          :data="groupList"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
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
                  @click="() => editGroup(data)"
                >
                </el-button>
              </el-tooltip>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-table :data="unitTable" border style="width: 100%">
            <el-table-column prop="name" label="单位名称"></el-table-column>
            <el-table-column prop="exchType" label="换算方式">
              <template slot-scope="scope">
                {{ scope.row.exchType === 0 ? "无换算方式" : "标准换算方式" }}
              </template>
            </el-table-column>

            <el-table-column label="换算比例">
              <template>
                <div>
                  {{ "--" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="单位状态">
              <template slot-scope="scope">
                <el-switch
                  class="switch"
                  v-model="scope.row.status"
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
            <el-table-column label="主单位">
              <template>
                {{ "否" }}
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="重要指数"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="permission.product_unit_modify"
                  class="item"
                  effect="dark"
                  content="编辑"
                  placement="bottom"
                >
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-edit-outline"
                    @click="editUnit(scope.row)"
                  >
                  </el-button>
                </el-tooltip>
                <el-divider
                  v-if="permission.product_unit_modify"
                  direction="vertical"
                ></el-divider>
                <el-tooltip
                  v-if="permission.product_unit_delete"
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="bottom"
                >
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    @click="deleteUnit(scope.$index, scope.row)"
                  >
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!--        <el-row class="pagination-wrapper">-->
        <!--          <el-pagination-->
        <!--            @size-change="handleSizeChange"-->
        <!--            @current-change="handleCurrentChange"-->
        <!--            :current-page="currentPage"-->
        <!--            :page-sizes="pageSizes"-->
        <!--            :page-size="pageSize"-->
        <!--            layout="total, sizes, prev, pager, next, jumper"-->
        <!--            :total="total"-->
        <!--            background-->
        <!--          >-->
        <!--          </el-pagination>-->
        <!--        </el-row>-->
      </el-col>
    </el-row>

    <!-- 添加分组 -->
    <el-dialog
      title="添加分组"
      :visible.sync="addGroupDialogVisible"
      width="500px"
      append-to-body
    >
      <el-form
        label-width="100px"
        :model="groupForm"
        inline-message
        ref="groupForm"
        :rules="rules"
      >
        <el-form-item prop="name" required label="分组名称：">
          <span v-if="groupDialogStatus === 'details'">
            {{ groupForm.name }}</span
          >
          <el-input
            v-else
            size="small"
            v-model="groupForm.name"
            placeholder="请输入分组名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="换算方式：" prop="type">
          <span v-if="groupDialogStatus === 'details'">
            {{ groupForm.typeId }}</span
          >
          <el-select
            size="small"
            v-model="groupForm.exchType"
            placeholder="请选择"
            v-else
          >
            <el-option
              v-for="item in typeName"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要指数：" prop="sort">
          <span v-if="groupDialogStatus === 'details'">
            {{ groupForm.name }}</span
          >
          <el-input
            v-else
            size="small"
            v-model="groupForm.sort"
            placeholder="请输入重要指数"
          >
          </el-input>
          <div>指数越大排列越靠前</div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateGroup('groupForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 添加单位 -->
    <el-dialog
      title="添加单位"
      :visible.sync="addUnitDialogVisible"
      width="500px"
      append-to-body
    >
      <el-form
        label-width="100px"
        :model="unitForm"
        inline-message
        ref="unitForm"
        :rules="unitRules"
      >
        <el-form-item prop="groupId" required label="所属分组：">
          <span v-if="operationState === 'details'">
            {{ unitForm.groupId }}</span
          >
          <el-select
            size="small"
            v-model="unitForm.groupId"
            placeholder="请选择"
            v-else
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required prop="name" label="单位名称：">
          <span v-if="operationState === 'details'"> {{ unitForm.name }}</span>
          <el-input v-else size="small" v-model="unitForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="status" required label="单位状态：">
          <span v-if="operationState === 'details'">
            {{ unitForm.status }}</span
          >
          <el-select
            size="small"
            v-model="unitForm.status"
            placeholder="请选择"
            v-else
          >
            <el-option label="禁用" :value="1"></el-option>
            <el-option label="启用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换算方式：">
          <div>无换算</div>
        </el-form-item>
        <el-form-item label="重要指数：" prop="groupName">
          <span v-if="operationState === 'details'"> {{ unitForm.sort }}</span>
          <el-input v-else size="small" v-model="unitForm.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addUnitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateUnit('unitForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

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
import {
  saveOrUpdateUnit,
  deleteUnits,
  getUnits,
  saveOrUpdateGroup,
  getGroup,
} from "@/api/product/prudoct-unit.js";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import { saveOrUpdateProductCate } from "@/api/product/pruduct-categroy";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchDialogVisible: false,
      typeName: [
        { dictKey: 0, dictValue: "无换算方式" },
        { dictKey: 1, dictValue: "标准换算方式" },
      ],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入重要指数", trigger: "blur" }],
      },
      unitRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        groupId: [
          { required: true, message: "请选择计价方式", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      addGroupDialogVisible: false,
      addUnitDialogVisible: false,
      groupForm: {
        name: "",
        exchType: "",
        sort: "",
      },
      groupId: "",
      groupList: [],
      unitForm: {
        groupId: "",
        name: "",
        status: "",
        sort: "",
      },
      unitTable: [],
      defaultProps: {
        label: "name",
        value: "id",
      },
      column: [
        {
          label: "单位名称",
          prop: "keywords",
        },
        {
          label: "启用状态",
          prop: "status",
          type: "select",
          dicData: [
            {
              label: "启用",
              value: 0,
            },
            {
              label: "停用",
              value: 1,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  async mounted() {
    await this._init();
  },
  methods: {
    onSearch(searchParam) {
      this.searchDialogVisible = false;
      this.handleList(searchParam);
    },
    addGroup() {
      this.addGroupDialogVisible = true;
      this.groupForm = {
        name: "",
        exchType: "",
        sort: "",
      };
    },
    addUnit() {
      this.addUnitDialogVisible = true;
      this.unitForm = {
        groupId: "",
        name: "",
        status: "",
        sort: "",
      };
    },
    async _init() {
      await this.handleGroup();
      if (this.groupList.length > 0) {
        this.groupId = this.groupList[0].id;
      }
      await this.handleList();
    },
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        groupId: this.groupId,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const getUnitRes = await getUnits(params);
      this.unitTable = getUnitRes.data.data;
    },
    async handleGroup() {
      const getGroupRes = await getGroup();
      this.groupList = getGroupRes.data.data;
    },
    async saveOrUpdateGroup(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const saveOrUpdateGroupRes = await saveOrUpdateGroup(this.groupForm);
          if (saveOrUpdateGroupRes.data.code === 200) {
            this.addGroupDialogVisible = false;
            this.$message.success("操作成功");
            this.groupForm = {
              name: "",
              exchType: "",
              sort: "",
            };
            this.handleGroup();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchUnit() {
      this.handleList({ keywords: this.searchParam });
    },
    async saveOrUpdateUnit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const saveOrUpdateUnitRes = await saveOrUpdateUnit(this.unitForm);
          if (saveOrUpdateUnitRes.data.code === 200) {
            this.addUnitDialogVisible = false;
            this.$message.success("操作成功");
            this.unitForm = {
              groupId: "",
              name: "",
              status: "",
              sort: "",
            };
            this.handleList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // Switch状态
    handleSwitchChange(value, row) {
      if (!this.permission.product_unit_modify) {
        this.$message.error("无操作权限");
        return;
      }
      row.status = value;
      saveOrUpdateUnit(row)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("修改成功");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //重置
    reset() {
      this.searchParam = "";
      this.handleList();
    },
    // 删除单位
    deleteUnit(index, row) {
      this.$confirm("确定要删除该单位吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUnits({ ids: [row.id] })
            .then((res) => {
              if (res.data.success) {
                this.$message.success("删除成功");
                this.handleList();
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
    editGroup(data) {
      this.groupForm = data;
      this.addGroupDialogVisible = true;
    },
    editUnit(data) {
      this.unitForm = data;
      this.unitForm.groupId = String(this.unitForm.groupId);
      this.addUnitDialogVisible = true;
    },
    handleNodeClick(data) {
      this.groupId = data.id;
      this.handleList();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}

.content-wrapper {
  .content-left {
    width: 240px;
    height: 823px;
    border: 1px solid #dedede;
    margin-right: 15px;

    .top {
      background: #f7f8fa;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #3e3e3e;
      line-height: 53px;
      padding-left: 20px;
    }
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/deep/ .el-select {
  width: 100%;
}
</style>
