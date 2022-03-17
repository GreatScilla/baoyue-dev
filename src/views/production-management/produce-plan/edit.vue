// 生产计划新增、编辑、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="formInline"
      class="detail-form"
      :rules="rules"
      ref="formInline"
      :show-message="false"
    >
      <el-row>
        <el-row>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="生产类型">
              <span v-if="type === 'detail'">{{
                formInline.productionTypeName
              }}</span>
              <el-select
                v-else
                v-model="formInline.productionType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in productionTypeStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  @click.native="changeProductionType(item.name)"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item required label="单据日期">
              <span v-if="type === 2">{{
                formInline.createTime
              }}</span>
              <el-date-picker
                v-else
                v-model="formInline.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="车间">
              <span v-if="type === 'detail'">{{ formInline.workshop }}</span>
              <el-select
                v-else
                v-model="formInline.shopNo"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in workshopList"
                  :key="Number(item.id)"
                  :label="item.factoryName"
                  :value="Number(item.id)"
                  @click.native="changeWorkshop(item.factoryName)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售订单编号">
              <span v-if="type === 'detail'">{{ formInline.sourceName }}</span>
              <el-input
                v-else
                disabled
                v-model="formInline.sourceName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="物料分析状态">
              <el-select
                @change="changeScheduleAnalysisStatusList"
                v-model="formInline.stateAnalysis"
                placeholder="请选择"
                :disabled="type === 'detail'"
              >
                <el-option
                  v-for="item in scheduleAnalysisStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="deliveryDate" label="交货日期">
              <span v-if="type === 'detail'">{{
                formInline.deliveryDate
              }}</span>
              <el-date-picker
                v-else
                v-model="formInline.deliveryDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预生产计划编号">
              <span v-if="type === 'detail'">{{ formInline.sourceNo }}</span>
              <el-input
                style="width: 350px"
                disabled
                v-else
                v-model="formInline.sourceNo"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-table
          :data="formInline.productionPlanSubList"
          style="width: 100%; margin: 20px 0"
        >
          <!-- <el-table-column type="index" width="50">
          <template slot="header">
            <div
              v-if="type !== 2"
              @click="addProduct"
              style="justify-content: center; align-items: center"
            >
              <i
                style="color: #409eff; font-size: 24px"
                class="el-icon-circle-plus-outline"
              ></i>
            </div>
          </template>
        </el-table-column> -->
          <!-- <el-table-column prop="name" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              :fit="fit"
            ></el-image>
          </template>
        </el-table-column> -->
          <el-table-column
            prop="productCode"
            label="*产品编码"
          ></el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
          ></el-table-column>
          <el-table-column
            prop="productCategoryName"
            label="产品分类"
          ></el-table-column>
          <el-table-column prop="model" label="规格型号"></el-table-column>

          <el-table-column prop="unitName" label="单位"></el-table-column>
          <el-table-column label="*生产数量">
            <template slot="header">
              <span style="color: #f56c6c">*</span>生产数量
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{
                scope.row.productionQuantity
              }}</span>
              <el-form-item
                v-else
                label-width="0px"
                :prop="
                  'productionPlanSubList.' +
                  scope.$index +
                  '.productionQuantity'
                "
                :rules="rules.productionQuantity"
              >
                <el-input
                  v-model="scope.row.productionQuantity"
                  @blur="
                    scope.row.singleModeNum = Math.ceil(
                      Number(scope.row.productionQuantity) /
                        Number(scope.row.singleModeVolume)
                    )
                  "
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="模数量">
            <template slot-scope="{ row }">
              <span>{{ row.singleModeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="type === 'detail'" style="margin-top: 20px">
        <el-row>
          <div class="title">更多信息</div>
          <el-divider></el-divider>
        </el-row>
        <!-- <el-form label-width="100px" :model="formInline" class="form-inline"> -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="制单人">
              <span v-if="type === 'detail'">{{
                formInline.makingPeople
              }}</span>
              <!-- <el-input
                disabled
                v-else
                v-model="formInline.makingPeople"
              ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核人">
              <span v-if="type === 'detail'">{{
                formInline.reviewerName
              }}</span>
              <!-- <el-input v-else v-model="formInline.reviewerName"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="footer">
        <el-button v-if="!examine" size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type === 'edit'"
          size="small"
          type="primary"
          @click="handleSave"
          >保存
        </el-button>
      </el-row>
    </el-form>

    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      title="选择商品"
    >
      <product-select @on-submit="selectProduct"></product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import productSelect from "@/components/productSelect";
import {
  save,
  update,
  productionplanDetail,
  getProductionTypeStatusList,
  getScheduleAnalysisStatusList,
  queryWorkshop,
} from "@/api/manufacture/produce-plan";
import { mapGetters } from "vuex";
// import { delete } from 'vue/types/umd';

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
    examine: {
      type: String,
      default: "",
    },
  },
  components: {
    productSelect,
  },
  async mounted() {
    await this._init();
    let detailRes = "";
    if (this.type === "detail") {
      detailRes = await productionplanDetail({
        productionPlanId: this.data.id,
      });
    } else {
      detailRes = await productionplanDetail({
        productionPlanId: this.$route.query.data.id,
      });
    }
    if (detailRes.data.code === 200) {
      this.formInline = detailRes.data.data;
      this.formInline.stateAnalysis = "1";
      // this.tableData = this.formInline.productionPlanSubList;
    }
    // this.formInline.makingPeople = this.userInfo.user_name;
  },
  data() {
    return {
      visible: false,
      productionTypeStatusList: [],
      scheduleAnalysisStatusList: [],
      workshopList: [],
      tableData: [{}],
      formInline: {
        productionPlanSubList: [{}],
      },
      rules: {
        deliveryDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        productionQuantity: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //选择车间
    changeWorkshop(name) {
      this.formInline.workshop = name;
    },
    //选择生产类型
    changeProductionType(name) {
      this.formInline.productionTypeName = name;
    },
    changeScheduleAnalysisStatusList() {
      this.scheduleAnalysisStatusList.forEach((ele) => {
        if (ele.code === this.formInline.stateAnalysis) {
          this.formInline.stateAnalysisName = ele.name;
        }
      });
    },
    addProduct() {
      this.visible = true;
    },
    selectProduct(value) {
      this.tableData = value;
      this.visible = false;
    },
    async handleSave() {
      try {
        await this.$refs.formInline.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let saveRes;
      this.formInline.productionPlanSubList.forEach((res) => {
        delete res.mainTableId;
      });
      saveRes = await update(this.formInline);
      if (saveRes.data.code === 200) {
        this.$message.success("修改成功");
        this.$router.push("/production-management/produce-plan");
      }
    },
    cancel() {
      this.$router.push("/production-management/produce-plan");
    },
    async _init() {
      // getProductionTypeStatusList, getScheduleAnalysisStatusList, queryWorkshop
      const getProductionTypeStatusListRes =
        await getProductionTypeStatusList();
      if (getProductionTypeStatusListRes.data.code === 200) {
        this.productionTypeStatusList =
          getProductionTypeStatusListRes.data.data;
      }
      const getScheduleAnalysisStatusListRes =
        await getScheduleAnalysisStatusList();
      if (getScheduleAnalysisStatusListRes.data.code === 200) {
        this.scheduleAnalysisStatusList =
          getScheduleAnalysisStatusListRes.data.data;
      }
      const queryWorkshopRes = await queryWorkshop();
      if (queryWorkshopRes.data.code === 200) {
        this.workshopList = queryWorkshopRes.data.data;
      }
    },
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}
.footer {
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
  margin-top: 30px;
}

.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
