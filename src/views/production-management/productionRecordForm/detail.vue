// 生产记录表详情
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
          <el-col :span="8">
            <el-form-item label="计划号:">
              <span>{{ form.planSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排程号:">
              <span>{{ form.scheduleSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="浇注工单号:">
              <span>{{ form.pouringSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="切割工单号:">
              <span>{{ form.cuttingSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入釜工单号:">
              <span>{{ form.irigamaSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="质检工单号:">
              <span>{{ form.qualitySn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库工单号:">
              <span>{{ form.qualitySn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品类型:">
              <span>{{ form.productCategoryName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称:">
              <span>{{ form.materialName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="釜号:">
              <span>{{ form.still }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出釜时间:">
              <span>{{ form.comeStillTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入釜时间:">
              <span>{{ form.intoStillTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格型号:">
              <span>{{ form.model }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="釜数量(方):">
              <span>{{ form.sum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合格数量:">
              <span>{{ form.qualifiedSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预进库位:">
              <span>{{ form.location }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实进库位:">
              <span>{{ form.location }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报废数量:">
              <span>{{ form.scrapSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待修补数量:">
              <span>{{ form.repairedSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="切割员:">
              <span>{{ form.cuttingCreateUserName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入窑时间:">
              <span>{{ form.intoFambeTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="切割备注:">
              <span>{{ form.cuttingRemark }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蒸养员:">
              <span>{{ form.irigamaCreateUserName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进釜时间:">
              <span>{{ form.intoStillTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蒸养备注:">
              <span>{{ form.irigamaRemark }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品检员:">
              <span>{{ form.createUserName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品检备注:">
              <span>{{ form.remark }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="浇注时间:">
              <span>{{ form.placingTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="浇注操作员:">
              <span>{{ form.pouringCreateUserName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="浇注备注:">
              <span>{{ form.pouringRemark }}</span>
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
