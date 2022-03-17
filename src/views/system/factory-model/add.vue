// 工厂模型新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="100px"
        :inline="true"
        :model="factoryModelForm"
        :rules="rules"
        class="detail-form"
        ref="factoryModelForm"
        :inline-message="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              required
              label="编号:"
              prop="code"
              v-if="type !== 'add'"
            >
              <el-input
                size="small"
                v-model="factoryModelForm.code"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="名称:" prop="factoryName">
              <el-input
                :disabled="type == 'detail'"
                size="small"
                v-model="factoryModelForm.factoryName"
                placeholder="请输入名称"
                @change="handleChangeFactoryName"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="联系方式:">
              <el-input
               :disabled="type == 'detail'"
                size="small"
                v-model="factoryModelForm.contacts"
                placeholder="请输入联系方式"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="是否开启:">
              <el-select
               :disabled="type == 'detail'"
                v-model="factoryModelForm.enabled"
                placeholder="请选择"
                size="small"
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
          </el-col>
          <el-col :span="12">
            <el-form-item required label="层级:">
              <el-input
               :disabled="type == 'detail'"
                @click.native="clickLevel"
                suffix-icon="el-icon-search"
                size="small"
                v-model="levelName"
                placeholder="请选择层级"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="上一层级:">
              <el-input
               :disabled="type == 'detail'"
                @click.native="clickUpOneSelect"
                size="small"
                v-model="parentName"
                placeholder="请选择上一层级"
                suffix-icon="el-icon-search"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="负责人:">
              <el-input
               :disabled="type == 'detail'"
                @click.native="employeeDialogVisible = true"
                size="small"
                v-model="factoryModelForm.principalName"
                placeholder="请选择负责人"
                suffix-icon="el-icon-search"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址:">
              <el-row style="display: flex; align-items: center">
                <el-cascader
                 :disabled="type == 'detail'"
                  style="margin-right: 10px"
                  size="small"
                  :options="options_"
                  v-model="selectedAddress"
                  @change="handleChange"
                  ref="cityAddress"
                  placeholder="请选择地址"
                >
                </el-cascader>
                <el-input
                 :disabled="type == 'detail'"
                  size="small"
                  v-model="factoryModelForm.address"
                  placeholder="详细地址"
                >
                </el-input>
              </el-row>
            </el-form-item>
            <el-form-item label="描述:" style="margin-top: 4px">
              <el-input
               :disabled="type == 'detail'"
                :rows="5"
                type="textarea"
                v-model="factoryModelForm.description"
                maxlength="200"
                show-word-limit
                placeholder="请输入描述"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveFactoryModel('factoryModelForm')"
        >保存</el-button
      >
    </el-row>
    <!-- 层级对话框 -->
    <el-dialog
      title="选择数据源"
      append-to-body
      :visible.sync="selectDataSourceDialogVisible"
      :before-close="handleClose"
    >
      <el-table
        ref="singleTable"
        :data="hierarchyOptions"
        highlight-current-row
        @row-click="clickRowHierarchy"
      >
        <el-table-column prop="levelName" align="center" label="模型层级名称">
        </el-table-column>
        <el-table-column prop="levelId" align="center" label="模型层级等级">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectDataSourceDialogVisible = false">
          取 消
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="confimSelectDataSourceDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 数据源对话框 -->
    <el-dialog
      title="上级工厂数据源"
      width="60%"
      append-to-body
      :visible.sync="preFactoryDataSourceDialogVisible"
      :before-close="handleClose"
    >
      <el-table
        highlight-current-row
        :data="factoryModeltableData"
        row-key="id"
        default-expand-all
        @row-click="clickRowUpOneLevel"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="factoryName" label="工厂模型名称">
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template slot-scope="scope">
            {{ scope.row.description || "无" }}
          </template>
        </el-table-column>
        <el-table-column label="模型类型名称">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.levelId | type }}</el-tag>
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
              :disabled="true"
              class="switch"
              v-model="scope.row.controllerStatus"
              inactive-color="#FF4949"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="control" label="控制状态">
          <template slot-scope="scope">
            <span>
              {{ scope.row.controllerStatus | control }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="preFactoryDataSourceDialogVisible = false"
        >
          取 消
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="confimPreFactoryDataSourceDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择负责人 -->
    <dialog-select-personnel
      title="人员"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- <el-dialog
      title="选择负责人"
      width="60%"
      append-to-body
      :visible.sync="employeeDialogVisible"
    >
      <el-table
        highlight-current-row
        :data="employeeTableData"
        @row-click="clickRowEmployee"
      >
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="employeeDialogVisible = false">
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="confimEmployeeDialogVisible">
          确 定
        </el-button>
      </span>
    </el-dialog> -->
  </basic-container>
</template>

<script>
import {
  getFactoryModelList,
  addFactoryModel,
  getUpOneLevel,
  editModelGetData,
  editFactoryModel,
} from "@/api/base-data/factoryModel";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  components: {
    dialogSelectPersonnel,
  },
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
      selectDataSourceDialogVisible: false,
      preFactoryDataSourceDialogVisible: false,
      employeeDialogVisible: false,
      options_: regionData,
      selectedAddress: [],
      factoryModeltableData: [],
      rowEmployee: null,
      employeeTableData: [],
      clickHierarchy: null,
      clickUpOneLevel: null,
      levelName: "",
      parentName: "",
      type: "",
      tableData: "",
      enabledOptions: [
        {
          value: 0,
          label: "启用",
        },
        {
          value: 1,
          label: "停用",
        },
      ],
      factoryModelForm: {
        enabled: 0,
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入编号",
            trigger: ["blur", "change"],
          },
        ],
        factoryName: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
        ],
      },
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
    };
  },
  created() {
    if (this.type !== "add") {
      let id = this.data.id;
      this.initEditData(id);
    }
    this.init();
  },
  computed: {
    disabled: function () {
      return this.type === "edit";
    },
  },
  watch: {
    "factoryModelForm.levelId": {
      handler(newName) {
        switch (newName) {
          case "00":
            this.levelName = "工厂";
            break;
          case "10":
            this.levelName = "车间";
            break;
          case "20":
            this.levelName = "产线";
            break;
          case "30":
            this.levelName = "工位";
            break;
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 工厂模型 名称改变
    handleChangeFactoryName(value) {
      if (value) {
        this.traverseTree(this.tableData);
      }
    },
    // 获取工厂模型列表
    async init() {
      let res = await Promise.all([
        getFactoryModelList({ factoryName: "" }),
        getEmployeeList(),
      ]);
      this.tableData = res[0].data.data;
      this.employeeTableData = res[1].data.data;
    },
    // 获取编辑的数据
    initEditData(id) {
      editModelGetData({ id: id }).then((res) => {
        this.factoryModelForm = res.data.data;
        this.parentName = this.factoryModelForm.parentName;
        this.selectedAddress = this.factoryModelForm.addressId.split(",");
      });
    },
    // 选择地址
    handleChange(value) {
      this.factoryModelForm.addressId = value.toString();
      this.factoryModelForm.addressName = this.$refs["cityAddress"]
        .getCheckedNodes()[0]
        .pathLabels.toString();
    },
    // 选择负责人
    clickRowEmployee(row) {
      this.rowEmployee = row;
    },
    // 确认负责人
    confimEmployeeDialogVisible() {
      if (!this.rowEmployee) {
        this.$message.info("请选择负责人");
        return;
      }
      this.factoryModelForm.principalId = this.rowEmployee.id;
      this.factoryModelForm.principalName = this.rowEmployee.name;
      this.employeeDialogVisible = false;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.factoryModelForm.hrUserId = value.id;
        this.factoryModelForm.principalId = value.bladeUserId;
        this.factoryModelForm.principalName = value.name;
      }
      this.employeeDialogVisible = false;
    },
    // 获取上一层级
    initParentData() {
      getUpOneLevel({ levelId: this.clickHierarchy.levelId })
        .then((res) => {
          this.factoryModeltableData = res.data.filter((item) => {
            return item.controllerStatus === 0;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 点击层级
    clickLevel() {
      this.selectDataSourceDialogVisible = true;
    },
    // 点击上一层级
    clickUpOneSelect() {
      if (!this.clickHierarchy) {
        this.$message.info("请先选择层级");
      } else {
        this.preFactoryDataSourceDialogVisible = true;
      }
    },
    // 点击单行层级
    clickRowHierarchy(row) {
      this.clickHierarchy = row;
    },
    // 点击单行上一级
    clickRowUpOneLevel(row) {
      this.clickUpOneLevel = row;
    },
    // 层级保存
    confimSelectDataSourceDialogVisible() {
      if (this.clickHierarchy) {
        this.initParentData();
        this.levelName = this.clickHierarchy.levelName;
        this.factoryModelForm.levelId = this.clickHierarchy.levelId;
        this.selectDataSourceDialogVisible = false;
      } else {
        this.$message.info("请选择等级");
      }
    },
    // 上一级选择保存
    confimPreFactoryDataSourceDialogVisible() {
      if (this.clickUpOneLevel) {
        this.parentName = this.clickUpOneLevel.factoryName;
        this.factoryModelForm.parentId = this.clickUpOneLevel.id;
        this.preFactoryDataSourceDialogVisible = false;
      } else {
        this.$message.info("请选择上级");
      }
    },
    //保存
    saveFactoryModel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            try {
              if (!this.levelName) {
                throw "请选择层级";
              }
            } catch (err) {
              this.$message.info(err);
              return;
            }
            addFactoryModel(this.factoryModelForm)
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
            editFactoryModel(this.factoryModelForm)
              .then((res) => {
                if (res.data.success) {
                  this.$message.success("操作成功");
                  this.$router.back();
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else {
          return false;
        }
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
      if (item.factoryName === this.factoryModelForm.factoryName) {
        this.$message.warning("此工厂模型已存在");
        this.factoryModelForm.factoryName = null;
      }
    },
    // 取消新增
    cancel() {
      this.$router.back();
    },
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
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select,
.el-textarea,
.el-cascader {
  width: 360px;
}
.el-col {
  margin-bottom: 0px;
}
</style>
