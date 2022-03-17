// 收入单详情
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="costItemsForm"
      ref="costItemsForm"
      :rules="rules"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item required label="申请人:" prop="applyUsername">
            <span v-if="type === 'detail'">
              {{ costItemsForm.applyUsername }}</span
            >
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="costItemsForm.applyUsername"
              placeholder="请选择申请人"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="业务部门:">
            <span v-if="type === 'detail'">
              {{ costItemsForm.businessDeptName }}</span
            >
            <el-select
              size="small"
              v-model="costItemsForm.businessDept"
              placeholder="请选择业务部门"
              @change="changeDept"
              v-else
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <span v-if="type === 'detail'"> {{ costItemsForm.remark }}</span>
            <el-input
              v-else
              size="small"
              v-model="costItemsForm.remark"
              placeholder="请输入备注"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用类型:">
            <span v-if="type === 'detail'">
              {{ costItemsForm.feeType | feeType }}</span
            >
            <el-select
              size="small"
              v-model="costItemsForm.feeType"
              placeholder="请选择费用类型"
              v-else
            >
              <el-option
                v-for="item in costOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额:">
            <span v-if="type === 'detail'"> {{ costItemsForm.amount }}</span>
            <el-input
              v-else
              v-flost
              size="small"
              v-model="costItemsForm.amount"
              placeholder="请输入金额"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="title">附件信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件信息:" prop="" style="margin-bottom: 6px">
            <!-- <upload-img
              v-if="type !== 'details'"
              listType="picture-card"
              :imageList="fileList"
              @on-success="onSuccess"
              @on-remove="onRemove"
            >
            </upload-img> -->
            <upload-file
              v-if="type !== 'detail'"
              listType="picture-card"
              message=""
              :imageList="fileList"
              @on-success="onSuccess"
              @on-remove="onRemove"
            >
            </upload-file>
            <el-image
              v-else
              v-for="(item, index) in fileList"
              :key="index"
              style="width: 104px; height: 104px; margin-right: 10px"
              :src="item"
              fit="cover"
            >
            </el-image>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="button-wrapper-footer" style="margin-bottom: 27px">
      <el-button v-if="!examine" size="small" @click="$router.push('/financial/costItems')">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveCostItems"
        >保存</el-button
      >
    </el-row>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="申请人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
  </basic-container>
</template>

<script>
import { addEditCostItems, detailsCostItems } from "@/api/financial/costItems";
import { getDepartmentList } from "@/api/humanResources/department";
import uploadFile from "@/components/uploadFile";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import upload from "@/mixins/upload";
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
    examine: {
      type: String,
      default: "",
    },
  },
  components: {
    uploadFile,
    dialogSelectPersonnel,
  },
  mixins: [upload],
  data() {
    return {
      costItemsForm: {},
      costOptions: [
        {
          value: 1,
          label: "采购",
        },
        {
          value: 2,
          label: "项目",
        },
      ],
      deptOptions: [], // 部门
      employeeDialogVisible: false, // 业务员对话框
      fileList: [],
      rules: {
        applyUsername: [
          {
            required: true,
            message: "请选择申请人",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.initResources();
    if (this.type !== "add") {
      this.handleDetails();
    }
  },
  methods: {
    // 获取资源
    async initResources() {
      let res = await getDepartmentList();
      this.deptOptions = res.data.data;
    },
    // 详情
    async handleDetails() {
      let res = await detailsCostItems({ id: this.data.id });
      if (res.data.success) {
        this.costItemsForm = res.data.data;
        if (this.costItemsForm.url) {
          this.fileList = this.costItemsForm.url.split(",");
        }
      }
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.costItemsForm.applyUsername = value.name;
        this.costItemsForm.applyUser = value.id;
      }
      this.employeeDialogVisible = false;
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.costItemsForm.businessDeptName = item[0].deptName;
    },
    // 附件上传
    onSuccess(value) {
      if (value) {
        this.fileList.push(value);
        this.costItemsForm.url = this.fileList.toString();
      }
    },
    // 附件删除
    onRemove(file) {
      this.fileList.forEach((item, index) => {
        if (file.url === item) {
          return this.fileList.splice(index, 1);
        }
      });
      this.costItemsForm.url = this.fileList.toString();
    },
    // 保存
    async saveCostItems() {
      try {
        await this.$refs.costItemsForm.validate();
      } catch (error) {
        this.$message.error(error);
        return;
      }
      let res = await addEditCostItems(this.costItemsForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.back();
      }
    },
  },
  filters: {
    feeType: function (value) {
      if (value == 1) {
        return "采购";
      } else {
        return "项目";
      }
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

