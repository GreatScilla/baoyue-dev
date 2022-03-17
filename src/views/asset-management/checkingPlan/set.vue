<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :inline-message="true"
      label-width="110px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="计划名称:">
            <el-input
              v-model="form.spotCheckName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            required
            :label="type == 'checkingSet' ? '点检部门:' : '巡检部门:'"
          >
            <el-input
              v-model="form.spotCheckDepartment"
              @focus="selectDepot"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            required
            :label="type == 'checkingSet' ? '点检时间:' : '巡检时间:'"
          >
            <el-time-picker
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              v-model="form.spotCheckTime"
              placeholder="请选择点检时间"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="启用日期:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="form.startDate"
              type="date"
              placeholder="请选择启用日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="计划周期:">
            <span>
              <el-col :span="12">
                <el-input
                  type="number"
                  min="0"
                  v-model="form.planningCycle"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="form.planningCycleUnit"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in unitList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">
          {{
            type == "checkingSet" ? "点检计划变更单" : "巡检计划变更单"
          }}</span
        >
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row>
        <el-col :span="12">
          <el-form-item
            required
            :label="type == 'checkingSet' ? '点检算法:' : '巡检算法:'"
          >
            <el-select v-model="form.tallyAlgorithm" placeholder="请选择">
              <el-option
                v-for="item in algorithmList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            required
            :label="
              type == 'checkingSet'
                ? '是否启用固定点检周期:'
                : '是否启用固定巡检周期:'
            "
          >
            <el-switch
              v-model="form.theTallyCycle"
              :active-value="0"
              :inactive-value="1"
              active-color="#16792c"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">其他信息</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:">
            <el-input
              placeholder="请输入备注"
              type="textarea"
              v-model="form.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <el-button size="small" @click="handleBack">取消</el-button>
        <el-button type="primary" size="small" @click="submit">保存</el-button>
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
  </div>
</template>

<script>
import {
  setSpotCheckById,
  getSpotCheckById,
} from "@/api/asset-management/checkingPlan.js";
import {
  setPollingById,
  getPollingById,
} from "@/api/asset-management/patrolScheme.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
export default {
  props: {
    type: {
      type: String,
      default: "checkingSet",
    },
  },
  components: {
    customer,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      module: "资产台账",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      showDept: false,
      unitList: ["天/次", "周/次", "月/次", "年/次", "季/次"],
      algorithmList: ["算法A", "算法B"],
    };
  },
  async created() {
    var getUrl = "";
    if (this.type == "checkingSet") {
      getUrl = getSpotCheckById;
    } else {
      getUrl = getPollingById;
      this.algorithmList = ["算法C", "算法D"];
    }
    const res = await getUrl();
    if (res.data) {
      this.form = res.data;
    }
  },
  mounted() {},
  methods: {
    submitDept(val) {
      this.form.spotCheckDepartment = val.deptName;
      this.form.spotCheckDepartmentId = val.id;
      this.showDept = false;
    },
    closeDept() {
      this.showDept = false;
    },
    async submit() {
      var setUrl = "";
      if (this.type == "checkingSet") {
        setUrl = setSpotCheckById;
      } else {
        setUrl = setPollingById;
      }
      const params = {
        ...this.form,
      };
      const res = await setUrl(params);
      if (res.data.msg == "操作成功!") {
        this.$message.success({
          message: "操作成功",
        });
        if (this.type == "checkingSet") {
          this.$router.push("/asset-management/checkingPlan");
        } else {
          this.$router.push("/asset-management/patrolScheme");
        }
      } else {
        this.$message.success({
          message: res.data.msg,
        });
      }
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/checkingPlan",
      });
    },
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>
<style lang="scss" scoped>
/deep/.el-form-item__label{
  width: auto!important;
  padding-left: 50px;
}
</style>