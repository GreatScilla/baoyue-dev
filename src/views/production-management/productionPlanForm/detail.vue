// 生产计划表详情
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
            <el-form-item label="产品类型:">
              <span>{{ form.productCategoryName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称:">
              <span>{{ form.materialName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号:">
              <span>{{ form.model }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="强度:">
              <span>{{ form.intensity }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密度:">
              <span>{{ form.density }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="BOM配方:">
              <span>{{ form.productFormula }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量(方):">
              <span>{{ form.sum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模数:">
              <span>{{ form.modulus }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="块数:">
              <span>{{ form.wordCount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货日期:">
              <span>{{ form.deliveryDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理方式:">
              <span>{{ form.typeName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span>{{ form.remark }}</span>
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
