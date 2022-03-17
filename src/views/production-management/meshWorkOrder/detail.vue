// 降级处理单修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单号:">
              <span>{{ form.meshWorkOrderSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称:">
              <span>{{ form.projectName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称:">
              <span>{{ form.organName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网片名称:">
              <span>{{ form.materialName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网片编码:">
              <span>{{ form.materialSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号:">
              <span>{{ form.model }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="钢筋材质:">
              <span>{{ form.unit }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量:">
              <span>{{ form.sum }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="操作员:">
              <span>{{ form.handsPersonName }}</span>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <!-- <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        > -->
      </el-row>
    </el-form>
  </basic-container>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.form = this.$route.query.data;
  },
  methods: {
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
.el-input,
.el-select {
  width: 240px;
}
</style>
