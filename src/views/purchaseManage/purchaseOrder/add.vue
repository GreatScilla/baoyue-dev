<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :rules="rules"
      :inline="true"
      :model="form"
      :show-message="false"
      label-width="150px"
      class="detail-form"
    >
      <el-row v-if="type !== 'add'">
        <el-col :span="12">
          <el-form-item label="单据日期">
            <span v-if="type === 'detail'">{{ form.createTime }}</span>
            <el-date-picker
              v-if="type === 'edit'"
              v-model="form.createTime"
              type="date"
              disabled
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据编号">
            <span v-if="type === 'detail'">{{ form.number }}</span>
            <el-input
              v-if="type === 'edit'"
              v-model="form.number"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商" prop="supplierName">
            <span v-if="type === 'detail'">{{ form.supplierName }}</span>
            <el-input
              v-else
              v-model="form.supplierName"
              @focus="selectCustomer"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请购单号/采购计划号">
            <span v-if="type === 'detail'">{{ form.linkNumber }}</span>
            <el-select
              v-else
              :disabled="!form.supplierName"
              v-model="form.linkNumber"
              clearable
            >
              <el-option
                v-for="item of linkNumberLists"
                :key="item.receiptNo"
                :label="item.receiptNo"
                :value="item.receiptNo"
                @click.native="changelinkNumber(item)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购类型" prop="subTypeId">
            <span v-if="type === 'detail'">{{ form.subType }}</span>
            <div v-else>
              <el-select v-model="form.subTypeId" @change="changeTypes">
                <el-option
                  v-for="item of typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                <!-- <span class="add-option" @click="handleAddType">
                  <i class="el-icon-plus"></i>
                  新增
                </span>-->
              </el-select>
              <!-- <el-input v-else disabled v-model="form.subType"></el-input> -->
            </div>
            <!-- <el-input v-else v-model="form.subTypeId"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到货日期" prop="expectReceiveDate">
            <span v-if="type === 'detail'">{{ form.expectReceiveDate }}</span>
            <el-date-picker
              v-else
              v-model="form.expectReceiveDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购部门">
            <span v-if="type === 'detail'">{{ form.purchaseDepot }}</span>
            <el-input
              v-else
              v-model="form.purchaseDepot"
              @focus="selectDepot"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购员">
            <span v-if="type === 'detail'">{{ form.purchaseMan }}</span>
            <el-input
              v-else
              v-model="form.purchaseMan"
              @focus="selectUser"
              :disabled="form.purchaseDepot === ''"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="结算方式" prop="paymentTypeId">
            <span v-if="type === 'detail'">{{ form.paymentType }}</span>
            <el-select
              v-else
              v-model="form.paymentTypeId"
              @change="changePaymentType"
            >
              <el-option
                v-for="item of paymentType"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商经营范围">
            <span v-if="type === 'detail'">{{ form.businessScope }}</span>
            <el-input v-else v-model="form.businessScope" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-table
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
          class="detail-table"
        >
          <el-table-column
            v-if="form.linkNumber === ''"
            type="index"
            align="center"
            width="120px"
          >
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
          <el-table-column width="80" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, tableData)"
                :disabled="type === 'detail'"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <el-image :src="row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品编号" prop="productSn" width="160px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail' || form.linkNumber !== ''">{{
                row.productSn
              }}</span>
              <el-input
                v-else
                v-model="row.productSn"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品" prop="productName" width="120px">
            <!-- <template slot-scope="{row, $index}">
              <span v-if="type === 'detail'">{{row.productName}}</span>
              <el-input v-else v-model="row.productName" @focus="showProduct($index)"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column
            label="规格型号"
            prop="model"
            width="160px"
          ></el-table-column>
          <el-table-column label="单位" prop="sp1"></el-table-column>
          <el-table-column
            v-if="type === 'add'"
            label="现存量"
            prop="stock"
          ></el-table-column>
          <el-table-column label="数量" prop="num" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.num }}</span>
              <el-input
                v-else
                v-model="row.num"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购单价" prop="realAmount" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.realAmount }}</span>
              <el-input
                v-else
                v-model="row.realAmount"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购金额" prop="salePrice" width="120px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.salePrice }}</span>
              <el-input v-else v-model="row.salePrice" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="note" width="140px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.note }}</span>
              <el-input v-else v-model="row.note"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="进货数量"
            prop="productSendNum"
          ></el-table-column>
          <!-- <el-table-column label="是否赠品" prop="type">
            <template slot-scope="{row}">
              <span v-if="type === 'detail'">{{row.type | isGift}}</span>
              <el-select v-else v-model="row.type">
                <el-option :value="1" label="普通商品"></el-option>
                <el-option :value="2" label="赠品"></el-option>
              </el-select>
            </template>
          </el-table-column>-->
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="折让金额">
            <span v-if="type === 'detail'">{{ form.discountAmount }}</span>
            <el-input v-else v-model="form.discountAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总金额">
            <span v-if="type === 'detail'">{{ form.totalAmount }}</span>
            <el-input v-else v-model="totalAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应付金额">
            <span v-if="type === 'detail'">{{ form.payAmount }}</span>
            <el-input v-else v-model="payAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <span v-if="type === 'detail'">{{ form.payAmountAlready }}</span>
            <el-input v-else type="textArea" v-model="form.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item label="本次欠款">
            <span v-if="type === 'detail'">{{form.payAmountAlready}}</span>
            <el-input v-else v-model="form.debtMoney"   ></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-form-item label="附件信息">
          <upload-file
            @on-remove="handleRemove"
            @on-success="handleSuccess"
            :imageList="file"
            message="产品合格证"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ form.createPersonName }}</span>
            <el-input v-else v-model="form.createPersonName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人" v-if="type === 'detail'">
            <span>{{ form.checkPerson }}</span>
          </el-form-item>
        </el-col>
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
            :loading="requesting"
            >保存</el-button
          >
        </div>
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择供应商">
      <customer
        category="1"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showUser" title="选择人员">
      <user
        :deptId="deptId"
        @on-cancel="closeUser"
        @on-submit="submitUser"
      ></user>
    </el-dialog>
    <el-dialog :visible.sync="show" append-to-body width="70%" title="选择产品">
      <product-select
        :supplierId="form.supplierId"
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
  </div>
</template>

<script>
import { getPaymentTypeList, getPriceByProductId } from "@/api/common";
import { addOrUpdatePurchaseOrder } from "@/api/purchase/purchaseOrder";
import {
  procurementPlanSelect,
  procurementplanDetail,
} from "@/api/manufacture/purchase-plan";
import common from "@/mixins/common";
import productSelect from "@/components/productSelect";
// import { erpTypeSelect } from "@/api/salesManage/saleType";
import getOrderSn from "@/mixins/orderSn";
import addTypes from "@/mixins/addType";
import upload from "@/mixins/upload";
import { formatter } from "@/util/util";
export default {
  name: "addPurchase",
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
      requesting: false,
      linkNumberLists: [], // 暂时先放着
      module: 1, // 新增类型使用，采购是1
      tableData: [
        {
          pic: "",
          productName: "",
          productSn: "",
          productType: "",
          stock: "",
          num: "",
          realAmount: "",
          salePrice: "",
          sp2: "",
          productSendNum: "", // 到货数量
          type: "",
        },
      ],
      show: false, // 展示选择产品
      form: {
        linkNumber: "",
        purTypeName: "", // 采购类型
        subTypeId: "", // 源单号
        discountAmount: 0,
        purchaseDepot: "",
        expectReceiveDate: "",
        supplierName: "",
        paymentTypeId: "",
      },
      purchanseType: [], // 采购类型集合
      paymentType: [], // 结算方式
      file: [],
      rules: {
        expectReceiveDate: [{ required: true, message: "", trigger: "change" }],
        subTypeId: [{ required: true, message: "", trigger: "change" }],
        supplierName: [
          { required: true, message: "", trigger: ["change", "blur"] },
        ],
        paymentTypeId: [{ required: true, message: "", trigger: "change" }],
      },
    };
  },
  mixins: [common, getOrderSn, addTypes, upload],
  components: {
    productSelect,
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.salePrice) {
          total = (+total + +item.salePrice).toFixed(2);
        }
      });
      return total;
    },
    payAmount() {
      let price = 0;
      price = (this.totalAmount - this.form.discountAmount).toFixed(2);
      return price;
    },
  },
  async created() {
    // 获取结算方式
    const res = await getPaymentTypeList();
    this.paymentType = res.data.data;
    // let list = await procurementPlanSelect();
    // this.linkNumberLists = list.data.data;
    if (this.type === "add") {
      // this.getOrderSn('采购订单')
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createPersonName = info.content["nick_name"];
      const dates = new Date();
      this.form.expectReceiveDate = formatter.date(dates, "yyyy-MM-dd");
    } else {
      this.form = this.data;
      console.log("form", this.form);
      this.paymentType.map((el) => {
        if (this.form.paymentTypeId == el.id) {
          this.form.paymentType = el.name;
        }
      });
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
      this.form.subTypeId = parseInt(this.form.subTypeId);
      this.tableData = this.data.purchaseOrderItemList;
      this.tableData.forEach((item) => {
        if (item.type === -1) {
          item.type = "";
        }
      });
    }
  },
  mounted() {
    // this.getType()
    // this.getPayment();
  },
  methods: {
    handleAdd() {
      this.tableData.push({
        pic: "",
        productName: "",
        productSn: "",
        productType: "",
        stock: "",
        num: "",
        realAmount: "",
        salePrice: "",
        sp2: "",
        productSendNum: "", // 到货数量
        type: "",
      });
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    async beforeAvatarUpload(file) {
      let OSS = require("ali-oss");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        bucket: "bipinyun",
        accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
        accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ",
      });
      let result = await client.put(file.name, file);
      this.file.push(result.url);
      this.fileList.push({ name: result.name, url: file.url });
      return false;
    },
    // async getType() { // 获取采购类型
    //   const params = {
    //     pageNum: 1,
    //     pageSize: 100,
    //     type: 1
    //   }
    //   const res = await erpTypeSelect(params);
    //   this.purchanseType = res.data.data.records;
    // },
    // 选择产品
    addProductList(list) {
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      console.log(list);
      list.forEach((item, index) => {
        this.initWarehouse(item);
      });
      this.show = false;
    },
    async initWarehouse(item) {
      // 处理选择的商品数据
      const form = {
        productId: item.id,
        supplierId: this.form.supplierId,
      };
      let res = await getPriceByProductId(form);
      const obj = {
        productSn: item.productSn, // 编号
        productName: item.name, // 名称
        productId: item.id,
        stock: item.stock, // 库存
        model: item.model, // 型号
        sp1: item.unitName, // 单位
        realAmount: res.data.data, // 价格
        num: 1,
        salePrice: 1 * res.data.data,
        remark: "",
        isGift: "",
      };
      this.tableData.push(obj);

      this.tableData = this.tableData.filter((ele) => {
        if (!ele.productName) {
          return false;
        } else {
          return true;
        }
        this.tableData.push({});
        this.tableData.pop();
      });
    },
    showProduct(index) {
      if (this.form.supplierName) {
        // 展示产品选择
        this.show = true;
      } else {
        this.$message.error("请选择供应商");
      }
    },
    // async getPayment() {
    //   // 获取结算方式
    //   const res = await getPaymentTypeList();
    //   this.paymentType = res.data.data;
    // },
    async changelinkNumber(val) {
      // 改变源单号
      console.log(val, this.form);
      this.form.linkNumberId = val.id;
      let info = {
        supplierId: this.form.supplierId,
        procurementPlanId: val.id,
      };
      this.tableData = [];
      await procurementplanDetail(info).then((res) => {
        const data = res.data.data;
        data.procurementPlanSubList.forEach((item) => {
          const obj = {
            // 查询的订单就是新增的商品表tableData的数据，不可修改
            pic: item.pic,
            productId: item.productId,
            productName: item.name,
            productSn: item.productSn,
            productType: item.model,
            sp1: item.unitName,
            stock: item.stock,
            num: item.unpurchasedQuantity,
            realAmount: item.productPrice,
            salePrice: item.price,
            remark: "",
            isGift: "",
          };
          this.tableData.push(obj);
        });
      });
    },
    calSalePrice(val, index) {
      // 计算采购金额
      this.tableData[index].salePrice =
        this.tableData[index].realAmount * this.tableData[index].num;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (column.label !== "采购金额") {
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
    changePaymentType(val) {
      // 选择结算方式
      this.paymentType.forEach((item) => {
        if (val === item.id) {
          this.form.paymentType = item.name;
        }
      });
    },
    async submit() {
      // 新增提交
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      this.form.totalAmount = this.totalAmount;
      this.form.payAmount = this.payAmount;
      const params = {
        data: {
          ...this.form,
          file: this.file.join(","),
          purchaseOrderItemList: this.tableData,
        },
        codeName: "采购订单",
      };
      this.requesting = true;
      addOrUpdatePurchaseOrder(params)
        .then((res) => {
          this.requesting = false;
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/purchaseManage/purchaseOrder",
          });
        })
        .catch((err) => {
          this.requesting = false;
        });
    },
    handleBack() {
      this.$router.push({
        path: "/purchaseManage/purchaseOrder",
      });
    },
    handleSuccess(url) {
      this.file.push(url);
    },
    handleRemove(file, fileList) {
      //
      console.log(file);
      this.file = this.file.filter((item) => item !== file.url);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-input,
.el-select {
  width: 240px;
}
</style>
