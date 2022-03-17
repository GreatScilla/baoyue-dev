
<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :show-message="false"
      :inline="true"
      :model="form"
      label-width="150px"
      :rules="rules"
      class="detail-form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="deliveryDate" label="交货日期">
            <span v-if="type === 'detail'">{{ form.deliveryDate }}</span>
            <el-date-picker
              v-else
              v-model="form.deliveryDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item prop="sourceNo" label="销售订单号">
            <el-select
              style="width: 260px"
              :disabled="type === 'detail'"
              v-model="form.sourceNo"
            >
              <el-option
                v-for="item of orderSnList"
                :key="item.id"
                :label="item.orderSn + ' 销售金额:' + item.payAmount"
                :value="item.id"
                @click.native="handleSource(item)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="销售订单号" prop="sourceNo">
            <span v-if="type === 'detail'">{{ form.sourceNo }}</span>
            <el-input
              v-else
              placeholder="请选择销售订单号"
              v-model="form.sourceNo"
              @focus="selectBasicInfo"
            ></el-input>
            <!-- <el-select v-else v-model="form.linkNumber" @change="changelinkNumber">
              <el-option v-for="item of linkNumberList" :key="item.id" :label="item.orderSn" :value="item.orderSn"></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-table
          :data="form.preProductionPlanSubList"
          border
          :summary-method="getSummaries"
          show-summary
          class="detail-table"
        >
          <el-table-column align="center" type="index" width="80px">
            <template slot="header">
              <el-button
                type="text"
                icon="el-icon-plus"
                circle
                @click="handleAdd"
                :disabled="type === 'detail'"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column width="80px" align="center" v-if="type !== 'detail'">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                @click="
                  handleDelete(scope.$index, form.preProductionPlanSubList)
                "
                :disabled="type === 'detail'"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <el-image :src="row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品编号">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productSn }}</span>
              <el-input
                v-else
                v-model="row.productSn"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productName" width="100px">
          </el-table-column>
          <el-table-column
            label="产品分类"
            prop="productCategoryName"
            width="140px"
          >
          </el-table-column>
          <el-table-column label="规格型号" prop="model"> </el-table-column>
          <el-table-column label="是否可纳入计量单位" prop="sp1" width="160px">
            <template slot-scope="scope">
              <el-switch
                active-value="0"
                inactive-value="1"
                v-model="scope.row.inVolume"
                :disabled="type === 'detail'"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unitName"> </el-table-column>
          <el-table-column label="数量" prop="numberOf" width="120px">
            <template slot="header">
              <span style="color: #f56c6c">*</span>数量
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.numberOf }}</span>
              <!-- <el-input v-else v-model="row.numberOf"   ></el-input> -->
              <el-form-item
                v-else
                label-width="0px"
                :prop="'preProductionPlanSubList.' + scope.$index + '.numberOf'"
                :rules="rules.numberOf"
              >
                <el-input
                  v-model="scope.row.numberOf"
                  @blur="
                    scope.row.singleModeNum = Math.ceil(
                      Number(scope.row.numberOf) /
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
          <el-table-column label="备注">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.remark }}</span>
              <el-input v-else v-model="row.remark"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <div>
          <el-button v-if="!examine" @click="handleBack" size="small"
            >取消</el-button
          >
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            @click="submit"
            size="small"
            >保存</el-button
          >
        </div>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="show" append-to-body width="70%" title="选择产品">
      <product-select
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog
      :visible.sync="showBasicInfo"
      append-to-body
      width="40%"
      title="选择销售订单号"
    >
      <basic-info
        @on-cancel="closeBasicInfo"
        @on-submit="changelinkNumber"
        type="saleOutbound"
        name="销售订单号"
      ></basic-info>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/mixins/common";
// import depot from '@/mixins/depot'
// import { findDepotByProductId } from "@/api/common";
import productSelect from "@/components/productSelect";
import basicInfo from "@/components/basicInfo";
import {
  savePreProductionPlan,
  orderList,
  detail,
  update,
} from "@/api/manufacture/pre-production-plan";
// import { getId } from "@/api/common";
import upload from "@/mixins/upload";
// import { formatter } from "@/util/util";
// import Data from "../../util/data.vue";
export default {
  name: "addPurchaseReturn",
  mixins: [common, upload],
  components: {
    productSelect,
    basicInfo,
  },
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
    examine: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showBasicInfo: false,
      form: {
        preProductionPlanSubList: [{}],
      },
      orderSnList: [],
      file: [],
      show: false, // 展示产品
      sendArea: [],
      rules: {
        deliveryDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sourceNo: [{ required: true, message: "请选择", trigger: "change" }],
        numberOf: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {},
  async created() {
    this.getOrderList();
    if (this.type === "add") {
      // const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      // this.form.createUserName = info.content["nick_name"];
      // const dates = new Date();
      // this.form.sendTime = formatter.date(dates, "yyyy-MM-dd");
    } else {
      const res = await detail({ preProductionPlanId: this.data.id });
      this.form = res.data.data;
      //    if (this.form.file.length > 0) {
      //     this.file = this.form.file.split(',')
      //   }
      //   this.tableData = this.data.shopOrderReturnDetail
      //   this.sendArea = this.form.shipInformation.sendArea.split(',')
    }
  },
  mounted() {},
  methods: {
    selectBasicInfo() {
      this.showBasicInfo = true;
    },
    closeBasicInfo() {
      this.showBasicInfo = false;
    },
    changelinkNumber(info) {
      console.log(info);
      // 改变源订单
      this.showBasicInfo = false;
      this.form.sourceNo = info.orderSn;
      this.form.sourceName = info.orderSn;
      this.form.memberId = info.supplierId;
      this.form.memberUserName = info.supplierName;
      this.form.projectName = info.projectName;
      this.form.projectSn = info.projectSn;
    },
    async getOrderList() {
      const res = await orderList({});
      this.orderSnList = res.data.data;
    },
    handleAdd() {
      this.form.preProductionPlanSubList.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    // async beforeAvatarUpload(file) {
    //   let OSS = require("ali-oss");
    //   let client = new OSS({
    //     region: "oss-cn-shenzhen",
    //     bucket: "bipinyun",
    //     accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
    //     accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ"
    //   });
    //   let result = await client.put(file.name, file);
    //   this.file.push(result.url);
    //   this.fileList.push({ name: result.name, url: file.url })
    //   return false;
    // },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
    },
    addProductList(list) {
      // 处理选择的商品数据
      this.show = false;
      if (
        list.length === 0 &&
        this.form.preProductionPlanSubList.length === 1
      ) {
        return;
      }
      console.log(list);
      list.forEach((item, index) => {
        const obj = {
          productId: item.id, // 产品id
          productSn: item.productSn, // 编号
          productName: item.name, // 名称
          productType: item.productType, //产品类型
          productCategoryId: item.productCateId, //产品分类id
          productCategoryName: item.productCategoryName, //产品分类
          model: item.model, // 型号
          inVolume: "0", //是否纳入可计量分类
          unitName: item.unitName, // 单位
          pic: item.pic, // 图片
          numberOf: "", // 数量
          singleModeNum: "", //模数量
          singleModeVolume: item.singleModeVolume, //模体积
          remark: item.remark, //备注
        };
        // findDepotByProductId({ productId: obj.productId }).then((res) => {
        //   obj.depotList = res.data.data;
        // });
        setTimeout(() => {
          this.form.preProductionPlanSubList.push(obj);
        }, 100);
      });
      this.form.preProductionPlanSubList =
        this.form.preProductionPlanSubList.filter((ele) => {
          if (!ele.productName || Object.keys(ele).length === 0) {
            return false;
          } else {
            return true;
          }
          this.form.preProductionPlanSubList.push({});
          this.form.preProductionPlanSubList.pop();
        });
    },
    handleSource(info) {
      console.log(info);
      //选择来源订单号
      this.form.sourceNo = info.orderSn + " 销售金额:" + info.payAmount;
      this.form.sourceName = info.orderSn;
      this.form.memberId = info.memberId;
      this.form.memberUserName = info.memberUserName;
      this.form.projectName = info.projectName;
      this.form.projectSn = info.projectSn;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index !== 9) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              let total = parseFloat(prev) + parseFloat(curr);
              return parseFloat(total).toFixed(2);
            } else {
              return prev;
            }
          }, 0);
          return sums[index];
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    // async getOrderSn() {
    //   // 获取单据编号
    //   const res = await getId({ codeName: "采购退货" });
    //   this.form.returnOrderSn = res.data.data;
    // },
    // changeReturnDepot (val) {
    //   this.depotList.forEach(item => {
    //     if (item.id === val) {
    //       this.form.depotName = item.depotName
    //     }
    //   })
    // },
    async submit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.form.sourceNo) {
        this.form.source = 1;
      } else {
        this.form.source = 0;
      }
      const params = {
        // orderReturnRequest: {
        ...this.form,
        // },
      };
      if (this.type === "add") {
        savePreProductionPlan(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/production-management/pre-production-plan");
          }
        });
      } else {
        update(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/production-management/pre-production-plan");
          }
        });
      }
    },
    handleBack() {
      this.$router.push("/production-management/pre-production-plan");
    },
  },
};
</script>