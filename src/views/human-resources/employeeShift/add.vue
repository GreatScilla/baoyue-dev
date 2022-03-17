// 员工班次管理新增、修改、详情
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="employeeShiftForm"
      class="detail-form"
      ref="employeeShiftForm"
      :rules="rules"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item required label="工号:">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.jobNumber
            }}</span>
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              size="small"
              v-model="employeeShiftForm.jobNumber"
              suffix-icon="el-icon-search"
              placeholder="请选择工号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.personName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="employeeShiftForm.personName"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item required label="生效时间:" prop="startTime">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.startTime
            }}</span>
            <el-date-picker
              v-else
              size="small"
              v-model="employeeShiftForm.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="生效时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:">
            <span v-if="type === 'detail'">{{ employeeShiftForm.remark }}</span>
            <el-input
              v-else
              size="small"
              v-model="employeeShiftForm.remark"
              placeholder="请输入备注"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门:">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.depotName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="employeeShiftForm.depotName"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item required label="班次:" prop="mesClassId">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.mesClassName
            }}</span>
            <el-select
              size="small"
              v-model="employeeShiftForm.mesClassId"
              placeholder="请选择班次"
              @change="changeShift"
              v-else
            >
              <el-option
                v-for="item in employeeShiftOptions"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item required label="失效时间:" prop="endTime">
            <span v-if="type === 'detail'">{{
              employeeShiftForm.endTime
            }}</span>
            <el-date-picker
              v-else
              size="small"
              v-model="employeeShiftForm.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="失效时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveEmployeeShift('employeeShiftForm')"
        >保存</el-button
      >
    </el-row>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="人员"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- 选择工号 -->
    <!-- <el-dialog
      title="选择工号"
      width="60%"
      append-to-body
      :visible.sync="employeeShiftDialogVisible"
      :before-close="handleClose"
    >
      <el-table
        highlight-current-row
        :data="employeeTableData"
        @row-click="clickRowJobNumber"
      >
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="employeeShiftDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="confimEmployeeShiftDialogVisible">
          确 定
        </el-button>
      </span>
    </el-dialog> -->
  </basic-container>
</template>

<script>
import {
  detailsEmployeeShift,
  addEmployeeShift,
} from "@/api/humanResources/employeeShift";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import { getShiftList } from "@/api/humanResources/shift";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
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
      employeeShiftForm: {},
      employeeShiftOptions: [],
      employeeTableData: [],
      employeeDialogVisible: false,
      rowEmployee: {},
      rules: {
        mesClassId: [
          {
            required: true,
            message: "请选择班次",
            trigger: ["blur", "change"],
          },
        ],
        startTime: [
          {
            required: true,
            message: "请选择生效时间",
            trigger: ["blur", "change"],
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择失效时间",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.initemployeeShift();
    if (this.type !== "add") {
      let id = this.data.id;
      this.initDetailsEmployeeShift(id);
    }
  },

  methods: {
    // 获取班次
    async initemployeeShift(...arg) {
      let params = { current: 0, size: 10000, name: "" };
      let res = await Promise.all([getShiftList(params), getEmployeeList()]);
      this.employeeShiftOptions = res[0].data.data.records;
      this.employeeTableData = res[1].data.data;
    },
    // 选择班次
    changeShift(value) {
      let item = this.employeeShiftOptions.filter((item) => {
        return item.id === value;
      });
      console.log(item);
      this.employeeShiftForm.mesClassName = item[0].className;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.employeeShiftForm.jobNumber = value.jobNumber;
        this.employeeShiftForm.depotName = value.deptName;
        this.employeeShiftForm.depotId = value.deptId;
        this.employeeShiftForm.personId = value.id;
        this.employeeShiftForm.personName = value.name;
      }
      this.employeeDialogVisible = false;
    },
    // 选择工号
    clickRowJobNumber(value) {
      this.rowEmployee = value;
    },
    // 确定选择
    confimEmployeeShiftDialogVisible() {
      if (!this.rowEmployee) {
        this.$message.info("请选择人员");
        return;
      }
      this.employeeShiftForm.jobNumber = this.rowEmployee.jobNumber;
      this.employeeShiftForm.depotName = this.rowEmployee.deptName;
      this.employeeShiftForm.depotId = this.rowEmployee.deptId;
      this.employeeShiftForm.personName = this.rowEmployee.name;
      this.employeeShiftDialogVisible = false;
    },
    // 员工班次详情
    async initDetailsEmployeeShift(id) {
      let res = await detailsEmployeeShift({ id: id });
      this.employeeShiftForm = res.data.data;
    },
    // 保存员工班次
    async saveEmployeeShift() {
      try {
        if (!this.employeeShiftForm.jobNumber) {
          throw "请选择工号";
        }
        await this.$refs.employeeShiftForm.validate();
      } catch (error) {
        this.$message.error(error);
        return;
      }
      let res = await addEmployeeShift(this.employeeShiftForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.back();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
</style>
