// 工单新增、修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="workOrderForm"
      class="detail-form"
      :rules="rules"
      ref="workOrderForm"
      :show-message="false"
    >
      <el-row>
        <el-row>
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>

        <el-row>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="车间" prop="productionOrdersWorkShopId">
              <span v-if="type === 'detail'">{{
                workOrderForm.productionOrdersWorkShopName
              }}</span>
              <el-select
                size="small"
                v-model="workOrderForm.productionOrdersWorkShopId"
                placeholder="请选择"
                @change="handleChangeWorkshop"
                :disabled="disabled"
                v-else
              >
                <el-option
                  v-for="item in workshopOptions"
                  :key="item.id"
                  :label="item.factoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="工单类型">
              <span v-if="type === 'detail'">{{
                workOrderForm.productionOrdersTypeName
              }}</span>
              <el-select
                size="small"
                v-model="workOrderForm.productionOrdersTypeId"
                placeholder="请选择"
                @change="handleChangeType"
                :disabled="disabled"
                v-else
              >
                <el-option
                  v-for="item in workOrderType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源订单号">
              <span v-if="type === 'detail'">{{
                workOrderForm.salesOrderId
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.salesOrderId"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item required label="工单状态">
              <span v-if="type === 'detail'">{{
                workOrderForm.productionOrdersStatusName | state
              }}</span>
              <el-select
                size="small"
                v-model="workOrderForm.productionOrdersStatusId"
                @change="handleChangeWorkshop"
                placeholder="请选择"
                disabled
                v-else
              >
                <el-option
                  disabled
                  v-for="item in workOrderState"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联生产计划">
              <span v-if="type === 'detail'">{{
                workOrderForm.productionPlanId
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.productionPlanId"
                @click.native="checkUserVisible = true"
                suffix-icon="el-icon-search"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">物料信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item required label="产品编码" prop="productEncode">
              <span v-if="type === 'detail'">{{
                workOrderForm.productEncode
              }}</span>
              <el-input
                v-else
                @focus="openproduct"
                suffix-icon="el-icon-search"
                size="small"
                v-model="workOrderForm.productEncode"
                :disabled="disabled || workOrderForm.productionPlanId === ''"
                placeholder="请选择"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="工艺路线版本">
              <span v-if="type === 'detail'">{{
                workOrderForm.lineVersion || "无"
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.lineVersion"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="工艺路线">
              <span v-if="type === 'detail'">{{
                workOrderForm.lineName || "无"
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.lineName"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <span v-if="type === 'detail'">{{
                workOrderForm.productName
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.productName"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">数量时间信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="planNumber" label="计划数量">
              <span v-if="type === 'detail'">{{
                workOrderForm.planNumber || "无"
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.planNumber"
                placeholder="自动带出"
                disabled
                v-int
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="singleModeNum" label="模数量">
              <span v-if="type === 'detail'">{{
                workOrderForm.singleModeNum || "无"
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="workOrderForm.singleModeNum"
                placeholder="自动带出"
                disabled
                v-int
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="计划时间">
              <span v-if="type === 'detail'"
                >{{ workOrderForm.planStartTime || "无" }} 至
                {{ workOrderForm.planStartTime || "无" }}</span
              >
              <div v-else>
                <!-- <el-date-picker
                  v-model="workOrderForm.planStartTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
                至
                <el-date-picker
                  v-model="workOrderForm.planEndTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  size="small"
                  placeholder="选择日期时间"
                >
                </el-date-picker> -->
                <el-date-picker
                  v-model="workOrderDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>

      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveWorkOrder"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <!-- 物料编码 -->
    <el-dialog
      title="产品编码"
      append-to-body
      :visible.sync="selectDataMaterileDialogVisible"
      :before-close="handleClose"
    >
      <!-- <product-select @on-submit="confirmSelectProduct"></product-select> -->
      <el-table
        border
        highlight-current-row
        :data="protableData"
        @row-click="clickpro"
        ref="multipleTable1"
      >
        <el-table-column prop="productCode" label="*产品编码"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="产品分类"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>

        <el-table-column prop="unitName" label="单位"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="selectDataMaterileDialogVisible = false"
        >
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="confirmSelectProduct">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择生产 -->
    <proDiolag
      title="生产计划"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="checkProduction"
    >
    </proDiolag>
  </basic-container>
</template>

<script>
import ProductSelect from "@/components/productSelect";
import proDiolag from "@/components/production/proDiolag";
import {
  getProduct,
  addWorkOrder,
  editWorkOrder,
  detailsWorkOrder,
  getWorkOrderType,
  getWorkOrderState,
  getMaterileList,
  getWorkshopList,
} from "@/api/planning/workOrder";
import { productionplanDetail } from "@/api/manufacture/produce-plan";
import { getCode } from "@/api/common";
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
  },
  data() {
    return {
      checkUserVisible: false,
      workOrderDate: null,
      workOrderForm: {
        productEncode: "",
        productionPlanId: "",
        productionOrdersStatusId: "0",
        productionOrdersTypeId: "1",
        productionOrdersWorkShopId: "",
        materileCode: "",
        planNumber: "",
      },
      workOrderType: [],
      workOrderState: [],
      workshopOptions: [],
      materileTableData: [],
      selectDataMaterileDialogVisible: false,
      searchParam: "",
      rules: {
        productionOrdersWorkShopId: [
          {
            required: true,
            message: "请选择车间",
            trigger: ["blur", "change"],
          },
        ],
        productEncode: [
          {
            required: true,
            message: "",
            trigger: ["blur", "change"],
          },
        ],
        planNumber: [
          {
            required: true,
            message: "",
            trigger: ["blur", "change"],
          },
        ],
      },
      proId: "", //生产id
      protableData: [], //产品弹窗列表
      clickRowDate: null,
      workTable: [],
    };
  },
  components: {
    ProductSelect,
    proDiolag,
  },
  async created() {
    // const codeRes = await getCode({ codeName: "工单管理" });
    // this.workOrderForm.productionOrdersEncode = codeRes.data.data;

    if (this.type !== "add") {
      this.initdetailsWorkOrder();
    }
    this.initWorkOrderTypeState();
    this.initResources();
  },
  computed: {
    disabled: function () {
      return Number(this.workOrderForm.allowCount) > 0;
    },
  },
  methods: {
    // 工单类型、工单状态
    initWorkOrderTypeState() {
      Promise.all([getWorkOrderType(), getWorkOrderState()])
        .then((res) => {
          this.workOrderType = res[0].data.data;
          this.workOrderState = res[1].data.data;
          this.workOrderForm.productionOrdersTypeName = "量产";
          this.workOrderState.forEach((item) => {
            if (item.code === this.workOrderForm.productionOrdersStatusId) {
              this.workOrderForm.productionOrdersStatusName = item.name;
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 车间、物料集合
    initResources() {
      Promise.all([getWorkshopList()]).then((res) => {
        this.workshopOptions = res[0].data.data;
        //   this.materileTableData = res[1].data.data;
      });
    },
    // 工单详情
    initdetailsWorkOrder() {
      detailsWorkOrder(this.$route.query.data.id)
        .then((res) => {
          this.workOrderForm = res.data;
          this.workOrderForm.lineVersion = this.workOrderForm.version;
          this.workOrderDate = [
            this.workOrderForm.planStartTime,
            this.workOrderForm.planEndTime,
          ];
          // this.workOrderForm.productionOrdersStatusId = this.workOrderForm.productionOrdersStatusId.code;
          if (this.type === "detail") {
            this.workshopOptions.forEach((info) => {
              if (this.workOrderForm.productionOrdersWorkShopId === info.id) {
                this.workOrderForm.productionOrdersWorkShopName =
                  info.factoryName;
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 选择工单状态
    handleChangeOrderStatus() {
      this.workOrderState.forEach((item) => {
        if (item.code === this.workOrderForm.productionOrdersStatusId) {
          this.workOrderForm.productionOrdersStatusName = item.name;
        }
      });
    },

    // 选择车间
    handleChangeWorkshop() {
      this.workshopOptions.forEach((item) => {
        if (item.id === this.workOrderForm.productionOrdersWorkShopId) {
          this.workOrderForm.productionOrdersWorkShopName = item.factoryName;
        }
      });
    },
    // 选择工单类型
    handleChangeType() {
      this.workOrderType.forEach((item) => {
        if (item.dictKey === this.workOrderForm.productionOrdersTypeId) {
          this.workOrderForm.productionOrdersTypeName = item.dictValue;
        }
      });
    },
    //选择生产计划
    checkProduction(val) {
      this.proId = val.id;
      this.workOrderForm.productionPlanId = val.receiptNo;
      this.workOrderForm.salesOrderId = val.sourceNo;
    },
    //打开产品
    async openproduct() {
      const res = await productionplanDetail({
        productionPlanId: this.proId,
      });
      this.protableData = res.data.data.productionPlanSubList;
      this.selectDataMaterileDialogVisible = true;
    },
    clickpro(val) {
      console.log(val);
      this.clickRowDate = val;
    },
    // 选择产品
    async confirmSelectProduct() {
      if (this.clickRowDate) {
        const productRes = await getProduct({
          productSn: this.clickRowDate.productCode,
        });
        this.workOrderForm.productId = productRes.data.productId;
        this.workOrderForm.productEncode = productRes.data.productEncode;
        this.workOrderForm.productName = productRes.data.productName;
        this.workOrderForm.lineName = productRes.data.lineName;
        this.workOrderForm.lineVersion = productRes.data.version;
        this.workOrderForm.planNumber = this.clickRowDate.productionQuantity;
        this.workOrderForm.singleModeNum = this.clickRowDate.singleModeNum;
        this.workOrderForm.singleModeVolume =
          this.clickRowDate.singleModeVolume;
        this.selectDataMaterileDialogVisible = false;
      } else {
        this.$message.info("请选择产品");
      }
    },
    async saveWorkOrder() {
      if (!this.workOrderDate) {
        return this.$message.info("请选择计划时间");
      }
      console.log(this.workOrderForm);
      try {
        await this.$refs.workOrderForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let editParams = {
        productionOrdersId: this.workOrderForm.id,
        // productionOrdersId: this.workOrderForm.productionOrdersId,
        // productionOrdersEncode: this.workOrderForm.productionOrdersEncode,
        productionOrdersWorkShopName:
          this.workOrderForm.productionOrdersWorkShopName,
        productionOrdersWorkShopId:
          this.workOrderForm.productionOrdersWorkShopId,
        productionOrdersStatusName:
          this.workOrderForm.productionOrdersStatusName,
        productionOrdersStatusId: this.workOrderForm.productionOrdersStatusId,
        productionOrdersTypeName: this.workOrderForm.productionOrdersTypeName,
        productionOrdersTypeId: this.workOrderForm.productionOrdersTypeId,
        productId: this.workOrderForm.productId,
        productEncode: this.workOrderForm.productEncode,
        // materileVersion: this.workOrderForm.materileVersion,
        productName: this.workOrderForm.productName,
        // lineName: this.workOrderForm.lineName,
        // lineVersion: this.workOrderForm.lineVersion,
        planNumber: this.workOrderForm.planNumber,
        planStartTime: this.workOrderDate[0],
        planEndTime: this.workOrderDate[1],
        productionPlanId: this.workOrderForm.productionPlanId,
        salesOrderId: this.workOrderForm.salesOrderId,
        singleModeNum: this.workOrderForm.singleModeNum,
        singleModeVolume: this.workOrderForm.singleModeVolume,
      };
      let addParams = editParams;
      if (this.type === "add") {
        console.log(addParams, this.workOrderForm);
        addWorkOrder(addParams)
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
        editWorkOrder(editParams)
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
    // 搜索物料
    searchMaterile() {
      getMaterileList({ keywords: this.searchParam })
        .then((res) => {
          this.materileTableData = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
  filters: {
    state: function (value) {
      if (value === "0") {
        value = "新建";
      } else if (value === "1") {
        value = "下达";
      } else if (value === "2") {
        value = "关闭";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
