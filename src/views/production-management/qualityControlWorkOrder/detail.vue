// 质检工单修改、详情
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
            <el-form-item label="质检工单号:">
              <span>{{ form.qualitySn }}</span>
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
            <el-form-item label="产品名称:">
              <span>{{ form.materialName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编码:">
              <span>{{ form.materialSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号:">
              <span>{{ form.model }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="釜号:">
              <span>{{ form.still }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入釜时间:">
              <span>{{ form.intoStillTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出釜时间:">
              <span>{{ form.comeStillTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入釜人员:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="釜数量(方):">
              <span>{{ form.sum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合格数量:">
              <span>{{ form.qualifiedSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报废数量:">
              <span>{{ form.scrapSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待修补数量:">
              <span>{{ form.repairedSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="降等级品数量:">
              <span>{{ form.downGradeSum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入窑时间:">
              <span>{{ form.intoFambeTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进窑时间:">
              <span>{{ form.intoFambeTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="切割人员:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="浇注时间:">
              <span>{{ form.placingTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="浇注人员:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="质检人员:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预进库位:">
              <span>{{ form.startTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实进库位:">
              <span>{{ form.location }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产班组:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span>{{ form.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="$router.back()">取消</el-button>
      </el-row>
    </el-form>
  </basic-container>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  async created() {
    this.form = this.$route.query.data;
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
