<template>
  <div class="pages addPages">
    <el-form :inline="true" label-width="180px" class="detail-form">
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <el-form-item v-if="type === 'add'" label="日期">
            <!-- <span v-if="type === 'detail'">
              {{ form.date }}
            </span> -->
            <el-date-picker
              v-model="date"
              disabled
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-else label="日期">
            <el-date-picker
              v-model="date1"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="getOrderById"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-bottom: 50px">
        <el-row>
          <el-col
            ><div class="Change-fill-area">
              变动填写区域 <span> (每天依报表填写)</span>
            </div></el-col
          >
        </el-row>
        <el-col :span="12">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">A班</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
              <td>汇总</td>
            </tr>

            <tr bgcolor="white">
              <td>浇筑模数</td>
              <td>
                <span v-if="type === 'detail'">{{ form.apanelModulus }}</span>
                <el-input
                  v-else
                  v-model="form.apanelModulus"
                  @input="(val) => calSalePrice(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.aprecisionBlockModulus
                }}</span>
                <el-input
                  v-else
                  v-model="form.aprecisionBlockModulus"
                  @input="(val) => calSalePrice(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.aaeratedBlockModulus
                }}</span>
                <el-input
                  v-else
                  v-model="form.aaeratedBlockModulus"
                  @input="(val) => calSalePrice(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{ form.amodulusCollect }}</span>
                <el-input
                  v-else
                  disabled
                  v-model="form.amodulusCollect"
                ></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>干物料(KG)</td>
              <td>
                <span v-if="type === 'detail'">{{ form.apanelMaterial }}</span>
                <el-input
                  v-else
                  v-model="form.apanelMaterial"
                  @input="(val) => calSalePrice2(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.aprecisionBlockMaterial
                }}</span>
                <el-input
                  v-else
                  v-model="form.aprecisionBlockMaterial"
                  @input="(val) => calSalePrice2(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.aaeratedBlockMaterial
                }}</span>
                <el-input
                  v-else
                  v-model="form.aaeratedBlockMaterial"
                  @input="(val) => calSalePrice2(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.amaterialCollect
                }}</span>
                <el-input
                  v-else
                  disabled
                  v-model="form.amaterialCollect"
                ></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>电量日使用量</td>
              <td colspan="4">
                <span v-if="type === 'detail'">{{ form.aelectric }}</span>
                <el-input v-else v-model="form.aelectric"></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>燃气日使用量</td>

              <td colspan="4">
                <span v-if="type === 'detail'">{{ form.afuelGas }}</span>
                <el-input v-else v-model="form.afuelGas"></el-input>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="12">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">B班</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
              <td>汇总</td>
            </tr>

            <tr bgcolor="white">
              <td>浇筑模数</td>
              <td>
                <span v-if="type === 'detail'">{{ form.bpanelModulus }}</span>
                <el-input
                  v-else
                  v-model="form.bpanelModulus"
                  @input="(val) => calSalePrice1(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.bprecisionBlockModulus
                }}</span>
                <el-input
                  v-else
                  v-model="form.bprecisionBlockModulus"
                  @input="(val) => calSalePrice1(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.baeratedBlockModulus
                }}</span>
                <el-input
                  v-else
                  v-model="form.baeratedBlockModulus"
                  @input="(val) => calSalePrice1(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{ form.bmodulusCollect }}</span>
                <el-input
                  v-else
                  disabled
                  v-model="form.bmodulusCollect"
                ></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>干物料(KG)</td>
              <td>
                <span v-if="type === 'detail'">{{ form.bpanelMaterial }}</span>
                <el-input
                  v-else
                  v-model="form.bpanelMaterial"
                  @input="(val) => calSalePrice3(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.bprecisionBlockMaterial
                }}</span>
                <el-input
                  v-else
                  v-model="form.bprecisionBlockMaterial"
                  @input="(val) => calSalePrice3(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.baeratedBlockMaterial
                }}</span>
                <el-input
                  v-else
                  v-model="form.baeratedBlockMaterial"
                  @input="(val) => calSalePrice3(val)"
                ></el-input>
              </td>
              <td>
                <span v-if="type === 'detail'">{{
                  form.bmaterialCollect
                }}</span>
                <el-input
                  v-else
                  disabled
                  v-model="form.bmaterialCollect"
                ></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>电量日使用量</td>
              <td colspan="4">
                <span v-if="type === 'detail'">{{ form.belectric }}</span>
                <el-input v-else v-model="form.belectric"></el-input>
              </td>
            </tr>

            <tr bgcolor="white">
              <td>燃气日使用量</td>

              <td colspan="4">
                <span v-if="type === 'detail'">{{ form.bfuelGas }}</span>
                <el-input v-else v-model="form.bfuelGas"></el-input>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row v-if="type !== 'add'" style="padding-bottom: 50px">
        <el-row>
          <el-col><div class="Change-fill-area">自动计算区域</div></el-col>
        </el-row>
        <el-col :span="12">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">A班均值</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
            </tr>
            <tr bgcolor="white">
              <td>干物料</td>
              <td>{{ averageAssessmentIndexVO.apanelMaterialMean }}</td>
              <td>
                {{ averageAssessmentIndexVO.aprecisionBlockMaterialMean }}
              </td>
              <td>{{ averageAssessmentIndexVO.aaeratedBlockMaterialMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电量使用量</td>
              <td colspan="3">{{ averageAssessmentIndexVO.aelectricMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>燃气使用量</td>
              <td colspan="3">{{ averageAssessmentIndexVO.afuelGasMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电费</td>
              <td colspan="3">
                {{ averageAssessmentIndexVO.aelectricChargeMean }}
              </td>
            </tr>
            <tr bgcolor="white">
              <td>气费</td>
              <td colspan="3">{{ averageAssessmentIndexVO.agasFeeMean }}</td>
            </tr>
          </table>
        </el-col>
        <el-col :span="12">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">B班均值</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
            </tr>
            <tr bgcolor="white">
              <td>干物料</td>
              <td>{{ averageAssessmentIndexVO.bpanelMaterialMean }}</td>
              <td>
                {{ averageAssessmentIndexVO.bprecisionBlockMaterialMean }}
              </td>
              <td>{{ averageAssessmentIndexVO.baeratedBlockMaterialMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电量使用量</td>
              <td colspan="3">{{ averageAssessmentIndexVO.belectricMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>燃气使用量</td>
              <td colspan="3">{{ averageAssessmentIndexVO.bfuelGasMean }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电费</td>
              <td colspan="3">
                {{ averageAssessmentIndexVO.belectricChargeMean }}
              </td>
            </tr>
            <tr bgcolor="white">
              <td>气费</td>
              <td colspan="3">{{ averageAssessmentIndexVO.bgasFeeMean }}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row v-if="type !== 'add'" style="padding-bottom: 50px">
        <el-row>
          <el-col><div class="Change-fill-area">参考标准</div></el-col>
        </el-row>
        <el-col :span="24">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">参考标准</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
            </tr>
            <tr bgcolor="white">
              <td>干物料</td>
              <td>{{ referenceStandard.panelMaterial }}</td>
              <td>{{ referenceStandard.precisionBlockMaterial }}</td>
              <td>{{ referenceStandard.aeratedBlockMaterial }}</td>
            </tr>
            <tr bgcolor="white">
              <td>浇筑模数(模)</td>
              <td>{{ referenceStandard.panelModulus }}</td>
              <td>{{ referenceStandard.precisionBlockModulus }}</td>
              <td>{{ referenceStandard.aeratedBlockModulus }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电使用量(度)</td>
              <td colspan="3">{{ referenceStandard.electric }}</td>
            </tr>
            <tr bgcolor="white">
              <td>燃气使用量(方)</td>
              <td colspan="3">{{ referenceStandard.fuelGas }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电力单价(元/度)</td>
              <td colspan="3">{{ referenceStandard.electricUnit }}</td>
            </tr>
            <tr bgcolor="white">
              <td>燃气单价(元/方)</td>
              <td colspan="3">{{ referenceStandard.fuelGasUnit }}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row v-if="type !== 'add'">
        <el-row>
          <el-col><div class="Change-fill-area">月统计</div></el-col>
        </el-row>
        <el-col :span="24">
          <table
            width="90%"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">产能</td>
              <td>板材</td>
              <td>高精砌块</td>
              <td>加气砌块</td>
            </tr>
            <tr bgcolor="white">
              <td>干物料(KG)</td>
              <td>{{ monthlyAssessmentIndicatorsVO.panelMaterial }}</td>
              <td>
                {{ monthlyAssessmentIndicatorsVO.precisionBlockMaterial }}
              </td>
              <td>{{ monthlyAssessmentIndicatorsVO.aeratedBlockMaterial }}</td>
            </tr>
            <tr bgcolor="white">
              <td>浇筑模数(模)</td>
              <td>{{ monthlyAssessmentIndicatorsVO.panelModulus }}</td>
              <td>{{ monthlyAssessmentIndicatorsVO.precisionBlockModulus }}</td>
              <td>{{ monthlyAssessmentIndicatorsVO.aeratedBlockModulus }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电使用量(度)</td>
              <td colspan="3">{{ monthlyAssessmentIndicatorsVO.electric }}</td>
            </tr>
            <tr bgcolor="white">
              <td>燃气使用量(方)</td>
              <td colspan="3">{{ monthlyAssessmentIndicatorsVO.fuelGas }}</td>
            </tr>
            <tr bgcolor="white">
              <td>电费</td>
              <td colspan="3">
                {{ monthlyAssessmentIndicatorsVO.electricCharge }}
              </td>
            </tr>
            <tr bgcolor="white">
              <td>燃气费</td>
              <td colspan="3">{{ monthlyAssessmentIndicatorsVO.gasFee }}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row class="footer-box">
        <el-button
          @click="$router.push('/production-management/assessment-indicators')"
          size="small"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  EvaluationSubmit,
  updateEvaluationSubmit,
  EvaluationGetByYear,
  EvaluationGetDate,
  EvaluationGetById,
} from "@/api/manufacture/assessment-indicators";
export default {
  props: {
    type: {
      // 类型分add,edit,detail
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
  name: "addAssessmentIndicators",
  data() {
    return {
      tankNo: "",
      date: new Date(),
      date1: "",
      date2: "",
      ById: "",
      creactMonthArr: [],
      averageAssessmentIndexVO: {},
      evaluation: {},
      monthlyAssessmentIndicatorsVO: {},
      referenceStandard: {},
      form: {
        aaeratedBlockMaterial: "", //加气块材料
        aaeratedBlockModulus: "", //充气块模量
        aelectric: "", //电费
        afuelGas: "", //燃气
        amaterialCollect: "", //干物料汇总
        amodulusCollect: "", //模数汇总
        apanelMaterial: "", // 板材
        apanelModulus: "", //板材模数
        aprecisionBlockMaterial: "", //精密块材料
        aprecisionBlockModulus: "", //精度块模数
        baeratedBlockMaterial: "", //
        baeratedBlockModulus: "", //
        belectric: "", //
        bfuelGas: "", //
        bmaterialCollect: "", //
        bmodulusCollect: "", //
        bpanelMaterial: "", //
        bpanelModulus: "", //
        bprecisionBlockMaterial: "", //
        bprecisionBlockModulus: "", //
        // createDept: "",
        // createTime: "",
        // createUser: "",
        // createUserId: "",
        date: "",
        // id: 0,
        month: "",
        // updateTime: "",
        // updateUser: "",
        // updateUserId: "",
        year: "",
      },
      options: [],
      pickerOptions: {
        disabledDate: (time) => {
          var year = time.getFullYear();
          var month = time.getMonth() + 1;
          var day = time.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
          var ymd = year + "-" + month + "-" + day;
          return !this.creactMonthArr.includes(ymd);
        },
      },
    };
  },
  computed: {},
  async created() {
    console.log(this.type);
    console.log(this.data);
    if (this.type !== "add") {
      this.form = this.data;
      var data = {
        month: this.form.month,
        year: this.form.year,
      };
      let res = await EvaluationGetByYear(data);
      let res1 = await EvaluationGetDate(data);
      this.date2 = res1.data.data;
      var date2 = res1.data.data.map((el) => {
        return el.date;
      });
      this.creactMonthArr = date2;
      this.averageAssessmentIndexVO = res.data.data.averageAssessmentIndexVO;
      this.monthlyAssessmentIndicatorsVO =
        res.data.data.monthlyAssessmentIndicatorsVO;
      console.log(this.monthlyAssessmentIndicatorsVO);
      this.referenceStandard = res.data.data.referenceStandard;
      this.form = res.data.data.evaluation;
    }
  },
  methods: {
    calSalePrice(val) {
      //A班浇筑模数汇总
      this.form.amodulusCollect =
        Number(this.form.apanelModulus) +
        Number(this.form.aprecisionBlockModulus) +
        Number(this.form.aaeratedBlockModulus);
    },
    calSalePrice1(val) {
      // //B班浇筑模数汇总
      this.form.bmodulusCollect =
        Number(this.form.bpanelModulus) +
        Number(this.form.bprecisionBlockModulus) +
        Number(this.form.baeratedBlockModulus);
    },
    calSalePrice2(val) {
      // //A班干物料汇总
      this.form.amaterialCollect =
        Number(this.form.apanelMaterial) +
        Number(this.form.aprecisionBlockMaterial) +
        Number(this.form.aaeratedBlockMaterial);
    },
    calSalePrice3(val) {
      // //B班干物料汇总
      this.form.bmaterialCollect =
        Number(this.form.bpanelMaterial) +
        Number(this.form.bprecisionBlockMaterial) +
        Number(this.form.baeratedBlockMaterial);
    },

    async getOrderById(val) {
      this.date2.map((el) => {
        if (val == el.date) {
          EvaluationGetById({ id: el.id }).then((res) => {
            this.form = res.data.data;
          });
        }
      });
    },

    //保存
    async submit() {
      if (this.type === "add") {
        var d = new Date(this.date);
        var datetime =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1;
        this.form.date = datetime;
        this.form.year = yy;
        this.form.month = mm;
      }
      let submitApi = "";
      if (this.type === "add") {
        submitApi = EvaluationSubmit;
      } else {
        submitApi = updateEvaluationSubmit;
      }
      const res = await submitApi(this.form);
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/production-management/assessment-indicators",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#Aclass {
  color: #606266;
  font-size: 14px;
  td {
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
}
.Change-fill-area {
  border-bottom: 1px solid #dedede;
  padding-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  span {
    color: #6e6e6e;
    font-size: 14px;
    font-weight: normal;
  }
}
.footer-box {
  margin: 20px 0;
}
</style>