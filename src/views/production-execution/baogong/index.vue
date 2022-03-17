<template>
  <div class="container">
    <div class="title">
      <div>
        <div class="item">
          <i class="icon-mes-204shangzhangzhuishou-shi"></i>
          <span class="font">报工</span>
        </div>
      </div>
      <div class="back" @click="$router.push('/production-execution/index')">
        <i class="icon-mes-fanhui"></i>
        <span class="font">返回</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <el-form
          label-width="100px"
          ref="baogongForm"
          :model="reportWorkForm"
          :inline="true"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="工单号:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.orderSn"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="排程数:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.planNum"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="不良数:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.badNum"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工单类型:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.ordersTypeName"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="报工数:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.jobBookingNum"
                  v-int
                >
                </el-input>
              </el-form-item>
              <el-form-item label="报废数:">
                <el-input size="small" v-model="reportWorkForm.scrapNum" v-int>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排程号:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.planSn"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="生产时间:">
                <el-input
                  size="small"
                  v-model="reportWorkForm.realStartTime"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:">
                <el-input
                  style="width: 615px"
                  :rows="5"
                  type="textarea"
                  v-model="reportWorkForm.remark"
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer">
          <el-button size="small" @click="back">取消</el-button>
          <el-button size="small" type="primary" @click="confim"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addReportWork } from "@/api/productionExecution/index";
export default {
  data() {
    return {
      reportWorkForm: {},
    };
  },
  created() {
    this.reportWorkForm = this.$route.query.data;
    console.log(this.$route.query);
  },
  methods: {
    // 保存
    async confim() {
      console.log(this.reportWorkForm);
      this.reportWorkForm.station = this.reportWorkForm.workStation;
      this.reportWorkForm.process = this.reportWorkForm.thisProcessName;
      let res = await addReportWork(this.reportWorkForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.back();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 返回
    back() {
      this.$router.push("/production-execution/index");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";
.container {
  width: 100%;
  height: 100%;
  .content-wrapper {
    min-height: calc(100% - 60px);
    background: #f7f8fa;
    padding: 20px;
    .content {
      width: 100%;
      background-color: #fff;
      .footer {
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
      }
    }
  }
}
.el-input,
.el-select {
  width: 240px;
}
</style>
