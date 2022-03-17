// 排程工单修改、详情
<template>
  <basic-container>
    <el-form
      label-width="130px"
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
          <el-col :span="12" v-if="type != 'add'">
            <el-form-item label="生产排程号:">
              <span v-if="type === 'detail'">{{ form.scheduleSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.scheduleSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="生产车间:" prop="manufacturingShop">
              <span v-if="type === 'detail'">{{ form.manufacturingShop }}</span>
              <el-select disabled v-else v-model="form.manufacturingShop">
                <el-option
                  v-for="item of workshopOptions"
                  :key="item.id"
                  :label="item.factoryName"
                  :value="item.factoryName"
                  @click.native="changeWorkshop(item)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="生产产线:" prop="productionLine">
              <span v-if="type === 'detail'">{{ form.productionLine }}</span>
              <el-select v-else disabled v-model="form.productionLine">
                <el-option
                  v-for="item of productionLineList"
                  :key="item.id"
                  :label="item.factoryName"
                  :value="item.factoryName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required prop="materialSn" label="产品编码:">
              <span v-if="type === 'detail'">{{ form.materialSn }}</span>
              <el-input
                v-else
                disabled
                class="iptWidth"
                v-model="form.materialSn"
                placeholder="请选择产品编码"
                suffix-icon="el-icon-search"
                @focus="checkProductVisible = true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称:">
              <span v-if="type === 'detail'">{{ form.materialName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.materialName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号:">
              <span v-if="type === 'detail'">{{ form.model }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.model"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量(方):">
              <span v-if="type === 'detail'">{{ form.sum }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.sum"
                placeholder="请输入数量"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模数:">
              <span v-if="type === 'detail'">{{ form.modulus }}</span>
              <el-input
                v-else
                size="small"
                v-model="modulus"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="块数:">
              <span v-if="type === 'detail'">{{ form.wordCount }}</span>
              <el-input
                v-else
                size="small"
                v-model="wordCount"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="强度:">
              <span v-if="type === 'detail'">{{ form.intensity }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.intensity"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密度:">
              <span v-if="type === 'detail'">{{ form.density }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.density"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="类型:" prop="type">
              <span v-if="type === 'detail'">{{ form.type | typeName }}</span>
              <el-select
                disabled
                size="small"
                v-model="form.type"
                placeholder="请选择"
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
          </el-col>
          <el-col :span="12">
            <el-form-item required label="权重等级:" prop="weight">
              <span v-if="type === 'detail'">{{
                form.weight | weightName
              }}</span>
              <el-select disabled v-else v-model="form.weight">
                <el-option
                  v-for="item of weightList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.orderSn">
            <el-form-item label="来源订单号:">
              <span v-if="type === 'detail'">{{ form.orderSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.orderSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.planSn">
            <el-form-item label="关联生产计划:">
              <span v-if="type === 'detail'">{{ form.planSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.planSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称:">
              <span v-if="type === 'detail'">{{ form.projectName }}</span>
              <el-input
                v-else
                disabled
                size="small"
                placeholder="请选择"
                v-model="form.projectName"
                @focus="projectDialogVisible = true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称:">
              <span v-if="type === 'detail'">{{ form.organName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.organName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
                <el-col :span="12" v-if="form.inPlanSn">
            <el-form-item label="并入生产计划编号:">
              <span v-if="type === 'detail'">{{ form.inPlanSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inPlanSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inOrganName">
            <el-form-item label="并入客户名称:">
              <span v-if="type === 'detail'">{{ form.inOrganName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inOrganName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inProjectName">
            <el-form-item label="并入项目名称:">
              <span v-if="type === 'detail'">{{ form.inProjectName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inProjectName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inModel">
            <el-form-item label="并入规格型号:">
              <span v-if="type === 'detail'">{{ form.inModel }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inModel"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inModulus">
            <el-form-item label="并入模数:">
              <span v-if="type === 'detail'">{{ form.inModulus }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inModulus"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inScheduleSn">
            <el-form-item label="并入生产排程编号:">
              <span v-if="type === 'detail'">{{ form.inScheduleSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inScheduleSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inMaterialSn">
            <el-form-item label="并入产品编码:">
              <span v-if="type === 'detail'">{{ form.inMaterialSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inMaterialSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.inMaterialName">
            <el-form-item label="并入产品名称:">
              <span v-if="type === 'detail'">{{ form.inMaterialName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.inMaterialName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.outModulus">
            <el-form-item label="并出模数:">
              <span v-if="type === 'detail'">{{ form.outModulus }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.outModulus"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.outScheduleSn">
            <el-form-item label="并出生产排程编号:">
              <span v-if="type === 'detail'">{{ form.outScheduleSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.outScheduleSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="预进库位:" prop="location">
              <span v-if="type === 'detail'">{{ form.location }}</span>
              <el-select v-else v-model="form.location">
                <el-option
                  v-for="item of depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.depotName"
                  @click.native="form.locationId = item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货日期:">
              <span v-if="type === 'detail'">{{ form.deliveryDate }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.deliveryDate"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划开始时间:">
              <span v-if="type === 'detail'">{{ form.startTime }}</span>
              <el-date-picker
                v-else
                v-model="form.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="自动带出,可选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划结束时间:">
              <span v-if="type === 'detail'">{{ form.endTime }}</span>
              <el-date-picker
                v-else
                v-model="form.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="自动带出,可选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span v-if="type === 'detail'">{{ form.remark }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.remark"
                placeholder="请输入备注"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">
            物料信息<el-button
              style="margin-left: 85px"
              size="small"
              type="primary"
              v-if="type != 'detail'"
              @click="handMaterialCalculation"
              >自动计算物料</el-button
            >
          </div>
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
                  <span v-if="type === 'detail'"> {{ scope.row.sum }} </span>
                  <el-input
                    class="tableInput"
                    style="width: 120px"
                    size="mini"
                    v-else
                    v-model="scope.row.sum"
                    :readonly="readonly"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                v-if="type != 'detail'"
                width="130"
                label="操作"
                fixed="right"
              >
                <template slot-scope="scope">
                  <span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="编辑"
                      placement="bottom"
                    >
                      <el-button
                        type="text"
                        size="small"
                        icon="el-icon-edit-outline"
                        @click="readonly = !readonly"
                      >
                      </el-button>
                    </el-tooltip>
                  </span>
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
              <span v-if="type === 'detail'">{{
                form.processRouteVersion || "无"
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.processRouteVersion"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工艺路线:">
              <span v-if="type === 'detail'">{{ form.routing || "无" }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.routing"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品配方:">
              <span v-if="type === 'detail'">{{ form.productFormula }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.productFormula"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.status == 1" style="margin-left: -35px">
          <div class="title">分配信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row v-if="form.status == 1">
          <el-table
            :data="workshopTableData"
            style="width: 100%"
            row-key="jobId"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column align="center" prop="job" label="层级名称">
            </el-table-column>
            <el-table-column label="计划开始时间">
              <template slot-scope="scope" v-if="scope.row.jobId">
                <span>{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="计划结束时间">
              <template slot-scope="scope" v-if="scope.row.jobId">
                <span>{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量(方)">
              <template slot-scope="scope" v-if="scope.row.jobId">
                <span>{{ scope.row.sum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="modulus"
              width="160"
              label="模数"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="wordCount"
              width="160"
              label="块数"
            >
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-left: -35px; margin-top: 20px">
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
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        >
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
import projectSelect from "@/components/projectSelect";
import { getProductBomList } from "@/api/product/product-bom.js";
import { getProductBom } from "@/api/product/product-bom";
import { listProductData } from "@/api/base-data/product-data.js";
import { queryItemByCategoryId } from "@/api/quality/index";
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
      workshopTableData: [{ job: "", children: [] }],
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
    if (this.type == "edit") {
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
    } else {
      console.log(this.data);
      this.form = this.data;
      this.workshopTableData[0].job = this.form.productionLine;
      this.workshopTableData[0].children = this.form.scheduleSubs;
      this.form.type = this.data.type.toString();
      const res1 = await queryItemByCategoryId({
        productNo: this.form.materialSn,
      });
      this.qualityInspectionList = res1.data.data;
    }
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
    initResources() {
      Promise.all([
        getWorkshopList(),
        getProductBomList({ current: 1, size: 99999, status: 0 }),
        getWorkOrderType(),
        getDictionary({ code: "shop_order_density" }), //密度
        getDictionary({ code: "shop_order_intensity" }), //强度
        getDepot(), //库位
      ]).then((res) => {
        this.workshopOptions = res[0].data.data;
        this.productFormulaList = res[1].data.data.records;
        this.workOrderType = res[2].data.data;
        this.densityList = res[3].data.data;
        this.intensityList = res[4].data.data;
        this.depotList = res[5].data.data;
      });
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
        updateScheduleWorkOrder(this.form)
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
