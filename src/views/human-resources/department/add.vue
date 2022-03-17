// 部门新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="100px"
        :model="departmentForm"
        class="detail-form"
        ref="departmentForm"
        :rules="rules"
        :inline-message="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="部门名称:" prop="deptName">
              <span v-if="type === 'detail'">
                {{ departmentForm.deptName }}</span
              >
              <el-input
                v-else
                size="small"
                v-model="departmentForm.deptName"
                placeholder="请输入部门名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="排序序号:">
              <span v-if="type === 'detail'">
                {{ departmentForm.sort || "无" }}</span
              >
              <el-input
                v-else
                size="small"
                v-model="departmentForm.sort"
                placeholder="请输入排序序号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="成立日期:" style="margin-bottom: 8px">
              <span v-if="type === 'detail'">
                {{ departmentForm.setUpTime || "无" }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="departmentForm.setUpTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门:" prop="parentName">
              <span v-if="type === 'detail'">
                {{ departmentForm.parentName }}</span
              >
              <el-select
                v-model="departmentForm.parentName"
                placeholder="请选择上级部门"
                size="small"
                v-else
              >
                <el-input
                  v-model="filterDeptInput"
                  placeholder="输入关键词进行过滤"
                  size="small"
                  class="el-select-tree-input"
                ></el-input>
                <el-option class="el-select-tree-option">
                  <el-tree
                    :data="departmentTreeData"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="deptTree"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门电话:" prop="phone">
              <span v-if="type === 'detail'">
                {{ departmentForm.phone || "无" }}</span
              >
              <el-input
                v-else
                size="small"
                v-model="departmentForm.phone"
                placeholder="请输入部门电话"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="地址:" class="addressItem">
              <span v-if="type === 'detail'">{{
                departmentForm.provinceName + departmentForm.address || "无"
              }}</span>
              <template v-else>
                <el-cascader
                  size="small"
                  :options="addressOptions"
                  v-model="provinceId"
                  @change="handleChange"
                  ref="cityAddress"
                  placeholder="请选择地址"
                >
                </el-cascader>
                <el-input
                  size="small"
                  v-model="departmentForm.address"
                  placeholder="详细地址"
                  class="detailedAddress"
                ></el-input>
              </template>
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
        @click="saveDepartment"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import { regionData } from "element-china-area-data";
import {
  getDepartmentTree,
  detailsDepartment,
  addEditDepartment,
} from "@/api/humanResources/department";
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
      addressOptions: regionData,
      departmentForm: {
        parentName: "",
      },
      departmentTreeData: [],
      filterDeptInput: "",
      provinceId: [],
      defaultProps: {
        label: "title",
      },
      rules: {
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            max: 15,
            message: "部门电话不能超过15位",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.initDepartment();
    if (this.type !== "add") {
      let id = this.data.id;
      this.initDepartmentDetails(id);
    }
    // if (this.type !== "details") {

    // }
  },
  watch: {
    filterDeptInput(val) {
      this.$refs.deptTree.filter(val);
    },
  },
  methods: {
    // 上级部门选择
    handleNodeClick(value) {
      this.departmentForm.parentName = value.title;
      this.departmentForm.parentId = value.id;
    },
    // 选择地址
    handleChange(value) {
      let cityName = this.$refs["cityAddress"]
        .getCheckedNodes()[0]
        .pathLabels.toString()
        .replace(/,/g, "");
      this.departmentForm.provinceId = value.toString();
      this.departmentForm.provinceName = cityName;
    },
    // 获取部门树状结构
    initDepartment() {
      getDepartmentTree()
        .then((res) => {
          this.departmentTreeData = res.data.data;
          if (this.departmentTreeData.length === 0) {
            this.departmentTreeData.push({ title: "暂无上级部门" });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 获取部门详情
    initDepartmentDetails(id) {
      detailsDepartment({ id: id })
        .then((res) => {
          if (res.data.data) {
            this.departmentForm = res.data.data;
            // 省市区格式化
            this.provinceId = this.departmentForm.provinceId.split(",");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 保存
    async saveDepartment() {
      try {
        await this.$refs.departmentForm.validate();
      } catch (error) {
        this.$message.error(error);
        return;
      }
      let res = await addEditDepartment(this.departmentForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.back();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 过滤树状结构
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    // 取消
    cancel() {
      this.$router.push("/human-resources/department");
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
  margin-bottom: 4px;
}
.detailedAddress {
  margin-left: 10px;
  width: 439px;
}
.addressItem {
  margin-top: -10px;
}
.operationButton {
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
}
.el-select-dropdown__item.hover {
  background-color: #fff;
}
</style>
