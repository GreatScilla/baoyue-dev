// 浇注工单修改、详情
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
            <el-form-item label="浇注工单号:">
              <span>{{ form.pouringSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班组号:">
              <span>{{ form.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产车间:">
              <span>{{ form.manufacturingShop }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产产线:">
              <span>{{ form.productionLine }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编码:">
              <span>{{ form.materialSn }}</span>
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
            <el-form-item label="类型:">
              <span>{{ form.type | typeName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重等级:">
              <span>{{ form.weight | weightName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.orderSn">
            <el-form-item label="来源订单号:">
              <span>{{ form.orderSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.planSn">
            <el-form-item label="关联生产计划:">
              <span>{{ form.planSn }}</span>
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
            <el-form-item label="预进库位:">
              <span>{{ form.location }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货日期:">
              <span>{{ form.deliveryDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划开始时间:">
              <span>{{ form.startTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划结束时间:">
              <span>{{ form.endTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报工时间:">
              <span>{{ form.artisanTime || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报工状态:">
              <span>{{ form.artisanStatus | statusName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="撤销时间:">
              <span>{{ form.repealTime || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="撤销状态:">
              <span>{{ form.repealStatus | repealName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span>{{ form.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">物料信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col>
            <el-table
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              :data="form.productionPlanSubList"
              style="width: 100%"
            >
              <el-table-column
                prop="materialSn"
                label="物料编码"
              ></el-table-column>
              <el-table-column
                prop="materialName"
                label="物料名称"
              ></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="model" label="规格型号"></el-table-column>
              <el-table-column prop="sum" label="物料数量" width="160">
                <template slot-scope="scope">
                  <span> {{ scope.row.sum }} </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">工艺路线</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工艺路线版本:">
              <span>{{ form.processRouteVersion || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工艺路线:">
              <span>{{ form.routing || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品配方:">
              <span>{{ form.productFormula }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">质检标准</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-row :span="12">
            <el-form-item label="质检单:">
              <el-link
                @click="
                  showQualityInspectionSheet = !showQualityInspectionSheet
                "
                ><i class="el-icon-tickets el-icon--left"></i>质量检测单
              </el-link>
            </el-form-item>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
      </el-row>
    </el-form>
    <el-dialog
      title="检验内容"
      append-to-body
      :visible.sync="showQualityInspectionSheet"
      :before-close="handleClose"
    >
      <el-divider></el-divider>
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
          <td width="25%">检验项目</td>
          <td>检验标准</td>
          <td>检验结果</td>
        </tr>
        <tr
          bgcolor="white"
          v-for="(item, index) in qualityInspectionList"
          :key="index"
        >
          <td>{{ item.inspectionName }}</td>
          <td>{{ item.inspectionStandard }}</td>
          <td>{{ 2 }}</td>
        </tr>
      </table>
      <table
        width="90%"
        border="1"
        bordercolor="#d7d7d7"
        id="Aclass"
        cellpadding="5"
        cellspacing="15"
        align="center"
        style="margin-top: 20px"
        bgcolor="black"
      >
        <tr bgcolor="#f2f2f2">
          <td width="50%">消解时间(min)</td>
          <td>温度(℃)</td>
        </tr>
        <tr bgcolor="white">
          <td>{{ 1 }}</td>
          <td>{{ 2 }}</td>
        </tr>
      </table>
    </el-dialog>
    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="checkProductVisible"
      top="20px"
      append-to-body
      width="70%"
      title="选择产品"
    >
      <productDia
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></productDia>
    </el-dialog>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </basic-container>
</template>

<script>
import { getDepot } from "@/api/common";
import { workshopLine } from "@/api/planning/workOrder";
import { getDictionary } from "@/api/system/dictbiz";
import productDia from "@/components/quality/productDia";
import ProductSelect from "@/components/productSelect";
import proDiolag from "@/components/production/proDiolag";
import { getWorkOrderType, getWorkshopList } from "@/api/planning/workOrder";
import {
  addOrUpdateProductionPlan,
  getRouting,
} from "@/api/manufacture/producePlan";
import { updateScheduleWorkOrder } from "@/api/manufacture/scheduleSingle";
import { updateJobWorkOrder } from "@/api/manufacture/teamWorkOrder";
import projectSelect from "@/components/projectSelect";
import { getProductBomList } from "@/api/product/product-bom.js";
import { getProductBom } from "@/api/product/product-bom";
import { listProductData } from "@/api/base-data/product-data.js";
import { queryItemByCategoryId } from "@/api/quality/index";
import { getShiftList } from "@/api/humanResources/shift";
export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    ProductSelect,
    projectSelect,
    productDia,
    proDiolag,
  },
  data() {
    return {
      teamList: [],
      qualityInspectionList: [],
      depotList: [],
      locationList: [],
      readonly: true,
      productFormulaList: [],
      projectDialogVisible: false,
      volume: "", //单位体积
      singleModeVolume: "", //单模体积
      weightList: [
        { code: 1, name: "A" },
        { code: 2, name: "B" },
        { code: 3, name: "C" },
      ],
      densityList: [], //密度list
      intensityList: [], //强度list
      checkProductVisible: false,
      showMaterialCalculation: false,
      showQualityInspectionSheet: false,
      checkUserVisible: false,
      workOrderDate: null,
      form: {
        productionPlanSubList: [],
      },
      workOrderType: [],
      productionLineList: [],
      workshopOptions: [],
    };
  },
  async created() {
    console.log(this.$route.query.data);
    this.form = this.$route.query.data;
    this.form.type = this.$route.query.data.type.toString();
    const res = await listProductData({ productSn: this.form.materialSn });
    this.singleModeVolume = res.data.data.records[0].singleModeVolume;
    this.volume = res.data.data.records[0].volume;
    const res1 = await queryItemByCategoryId({
      productNo: this.form.materialSn,
    });
    this.qualityInspectionList = res1.data.data;
    this.initResources();
  },
  computed: {
    //模数
    modulus() {
      return Math.ceil(Number(this.form.sum) / this.singleModeVolume) || 0;
    },
    //块数
    wordCount() {
      return Math.ceil(Number(this.form.sum * 1000000) / this.volume) || 0;
    },
  },
  mounted() {},
  methods: {
    //修改班组信息
    changeJobName(val) {
      this.teamList.map((el) => {
        if (val == el.className) {
          this.form.jobSn = el.code;
        }
      });
    },
    async changeWorkshop(i) {
      const res = await workshopLine({ ids: i.id });
      this.productionLineList = res.data.data[0].children;
    },
    //选择配方
    async handleChangeProductFormula(val) {
      this.form.productionPlanSubList = [];
      let id = "";
      this.productFormulaList.map((el) => {
        if (val == el.proBomName) {
          id = el.id;
        }
      });
      const res = await getProductBom({ id: id });
      let list = [];
      list = res.data.data.productBomComponents.map((ele) => {
        ele.product.num = ele.num;
        return ele.product;
      });
      list.forEach((item) => {
        const obj = {
          materialSn: item.productSn,
          materialName: item.name,
          unit: item.unitName,
          model: item.model,
          num: item.num,
          attritionRate: Number(item.lossScale),
          sum: "",
        };
        this.form.productionPlanSubList.push(obj);
      });
    },
    //选择项目
    async onProjectSelect(e) {
      this.form.organId = e.customerId;
      this.form.organName = e.customerName;
      this.form.projectName = e.projectName;
      this.form.projectSn = e.projectSn;
    },
    //获取产品
    async addProductList(val) {
      console.log(val);
      // this.form.productId = val.id; //产品ID
      this.form.materialName = val.name; //	产品名称
      this.form.materialSn = val.productSn; //产品编号
      this.form.model = val.model; //规格型号
      this.singleModeVolume = Number(val.singleModeVolume); //单模体积
      this.volume = Number(val.volume); //单位体积
      const res = await getRouting({ productId: val.id });
      this.form.processRouteVersion = res.data.data.version;
      this.form.routing = res.data.data.lineName;
      this.checkProductVisible = false;
    },
    //计算物料
    async handMaterialCalculation() {
      if (!this.form.sum) {
        return this.$message.error("请输入数量");
      } else if (!this.form.productFormula) {
        return this.$message.error("请选择产品配方");
      }
      this.form.productionPlanSubList.map((el) => {
        let num = this.form.sum * el.num * (1 + el.attritionRate / 100);
        el.sum = num.toFixed(4);
      });
    },
    // 车间、物料,产品配方集合
    async initResources() {
      const res = await Promise.all([
        getWorkshopList(),
        getProductBomList({ current: 1, size: 99999, status: 0 }),
        getWorkOrderType(),
        getDictionary({ code: "shop_order_density" }), //密度
        getDictionary({ code: "shop_order_intensity" }), //强度
        getDepot(), //库位
        getShiftList({ current: 0, size: 10000, name: "" }), //班组
      ]);
      this.workshopOptions = res[0].data.data;
      this.productFormulaList = res[1].data.data.records;
      this.workOrderType = res[2].data.data;
      this.densityList = res[3].data.data;
      this.intensityList = res[4].data.data;
      this.depotList = res[5].data.data;
      this.teamList = res[6].data.data.records;
      console.log(this.teamList);
    },
    //保存
    async saveProducePlan() {
      this.form.modulus = this.modulus;
      this.form.wordCount = this.wordCount;
      console.log(this.form);
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.type === "add") {
        addOrUpdateProductionPlan(this.form)
          .then((res) => {
            if (res.data.success) {
              this.$message.success("保存成功");
              this.$router.back();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        updateJobWorkOrder(this.form)
          .then((res) => {
            if (res.data.success) {
              this.$message.success("修改成功");
              this.$router.back();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
  filters: {
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
    typeName(value) {
      if (value == 1) {
        value = "量产";
      } else if (value == 2) {
        value = "返工";
      } else if (value == 3) {
        value = "试制";
      }
      return value;
    },
    statusName(value) {
      if (value == 0) {
        value = "未报工";
      } else if (value == 1) {
        value = "已报工";
      } else if (value == 2) {
        value = "已交接";
      }
      return value;
    },
    repealName(value) {
      if (value == 0) {
        value = "未撤销";
      } else if (value == 1) {
        value = "已撤销";
      } else if (value == 2) {
        value = "已交接";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.tableInput {
  .el-input__inner {
    text-align: center;
  }
}
#Aclass {
  color: #606266;
  font-size: 14px;
  td {
    vertical-align: middle;
    text-align: center;
  }
}
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
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
