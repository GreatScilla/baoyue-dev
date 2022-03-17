<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :label-position="right"
      label-width="100px"
      :inline-message="true"
      :show-message="false"
      class="detail-form"
    >
      <el-row>
        <el-row>
          <el-col>
            <span class="title">销售订单信息</span>
            <span v-if="type == 'change'" @click="onShow" class="detailSpan">{{
              orderSn
            }}</span>
            <span v-else @click="onShow" class="detailSpan">{{
              form.shopOrderSn
            }}</span>
          </el-col>
        </el-row>
        <el-row v-if="showDetail">
          <el-col :span="24">
            <span class="title">基本信息</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <span>{{ form.projectName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算方式" prop="paymentTypeId">
              <span>{{ form.paymentType }}</span>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="expectReceiveDate" label="交货日期">
                <span>{{ form.expectReceiveDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售部门">
                <span>{{ form.salesDepot }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售员">
                <span>{{ form.salesMan }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售类型" prop="subTypeId">
                <span>{{ form.subTypeName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户" prop="memberUserName">
                <span>{{ form.memberUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联合同编号" label-width="120px">
                <span>{{ form.contactSn }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <span class="title">订单明细</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row class="margin-bottom-20">
            <el-table
              :data="tableData1"
              border
              :summary-method="getSummaries"
              show-summary
              class="detail-table"
            >
              <el-table-column
                label="序号"
                type="index"
                align="center"
                width="80"
              >
              </el-table-column>
              <el-table-column align="center" width="80">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, tableData1)"
                    disabled
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="pic">
                <template slot-scope="{ row }">
                  <el-image
                    style="width: 100px; height: 100px"
                    fit="contain"
                    :src="row.pic"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="产品编号" prop="productSn" width="160px">
              </el-table-column>
              <el-table-column label="产品" prop="productName" width="100px">
              </el-table-column>
              <el-table-column
                label="产品分类"
                prop="productCategoryName"
                width="120px"
              >
              </el-table-column>
              <el-table-column label="规格型号" prop="model"> </el-table-column>
              <el-table-column label="单位" prop="sp1"> </el-table-column>
              <el-table-column
                label="数量"
                prop="productQuantity"
                width="120px"
              >
              </el-table-column>
              <el-table-column label="单价" prop="realAmount" width="120px">
              </el-table-column>
              <el-table-column label="销售金额" prop="salePrice" width="120px">
              </el-table-column>
              <el-table-column label="备注" prop="sp2" width="100px">
              </el-table-column>
              <el-table-column
                label="已出库数量"
                prop="productAlreadyNum"
                width="100px"
              >
              </el-table-column>
              <el-table-column
                label="未出库数量"
                prop="productWaitNum"
                width="100px"
              >
              </el-table-column>
              <el-table-column label="退货数量" prop="returnNum" width="100px">
              </el-table-column>
            </el-table>
          </el-row>
          <el-col :span="24">
            <span class="title">财务信息</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item label="折让金额">
                <span>{{ form.discountAmount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总金额">
                <span>{{ totalAmount1 }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="title">发货信息</div>
            <el-divider class="detail-divider"></el-divider>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人">
                <span>{{ linkName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <span>{{ linkPhone }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="客户收货地址" class="adress-box">
              <span>{{ sendArea + sendAddress }}</span>
            </el-form-item>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-checkbox
              v-if="type == 'change'"
              @change="changeOrderInfo"
              v-model="checked"
              :disabled="tableDataDisabled"
            ></el-checkbox
            ><span class="title">变更订单信息</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row class="margin-bottom-20">
            <el-table
              :data="tableData"
              border
              :summary-method="getSummaries"
              show-summary
              class="detail-table"
            >
              <el-table-column type="index" align="center" width="130">
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
              <el-table-column align="center" width="80">
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
              <el-table-column label="图片" prop="pic">
                <template slot-scope="{ row }">
                  <el-image
                    style="width: 100px; height: 100px"
                    fit="contain"
                    :src="row.pic"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="产品编号" prop="productSn" width="160px">
                <template slot="header" slot-scope="scope">
                  <span style="color: #f56c6c">*</span>产品编号
                </template>
                <template slot-scope="{ row }">
                  <span v-if="type === 'detail'">{{ row.productSn }}</span>
                  <el-input
                    v-else
                    v-model="row.productSn"
                    @focus="showProduct($index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="产品" prop="productName" width="100px">
              </el-table-column>
              <el-table-column
                label="产品分类"
                prop="productCategoryName"
                width="120px"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.productCategoryName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格型号" prop="model">
                <template slot-scope="{ row }">
                  <span>{{ row.model }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" prop="sp1">
                <template slot-scope="{ row }">
                  <span>{{ row.sp1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                prop="productQuantity"
                width="120px"
              >
                <template slot-scope="{ row, $index }">
                  <span v-if="type === 'detail'">{{
                    row.productQuantity
                  }}</span>
                  <el-input
                    v-else
                    v-model="row.productQuantity"
                      
                    @blur="(val) => calSalePrice(val, $index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单价" prop="realAmount" width="120px">
                <template slot-scope="{ row, $index }">
                  <span v-if="type === 'detail'">{{ row.realAmount }}</span>
                  <el-input
                    v-else
                    v-model="row.realAmount"
                      
                    @blur="(val) => calSalePrice(val, $index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="销售金额" prop="salePrice" width="120px">
                <template slot-scope="{ row }">
                  <span>{{ row.salePrice }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="100px">
                <template slot-scope="{ row }">
                  <sapn v-if="type === 'detail'">{{ row.sp2 }}</sapn>
                  <el-input v-else v-model="row.sp2"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="已出库数量" width="100px">
                <template slot-scope="{ row }">
                  <span>{{ row.productAlreadyNum }}</span>
                </template>
              </el-table-column>
              <el-table-column label="未出库数量" width="100px">
                <template slot-scope="{ row }">
                  <span>{{ row.productWaitNum }}</span>
                </template>
              </el-table-column>
              <el-table-column label="退货数量">
                <template slot-scope="{ row }">
                  <span>{{ row.returnNum }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-col :span="24">
            <el-checkbox
              v-if="type == 'change'"
              @change="changeDeliveryInfo"
              v-model="checked1"
              :disabled="linkName1 == ''"
            ></el-checkbox
            ><span class="title">变更发货信息</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input
                  v-if="type !== 'detail'"
                  v-model="linkName1"
                ></el-input>
                <span v-else>{{ linkName1 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input
                  v-if="type !== 'detail'"
                  v-model="linkPhone1"
                ></el-input>
                <span v-else>{{ linkPhone1 }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="客户收货地址">
              <div v-if="type !== 'detail'">
                <v-distpicker
                  @selected="selected"
                  :province="sendArea1[0]"
                  :city="sendArea1[1]"
                  :area="sendArea1[2]"
                ></v-distpicker>
              </div>
              <span v-else>{{ sendArea1 + sendAddress1 }}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              v-if="type != 'detail'"
              label="详细地址"
              class="adress-box"
            >
              <span v-if="type === 'detail'">{{
                sendArea1 + sendAddress1
              }}</span>
              <el-input v-else v-model="sendAddress1"></el-input>
            </el-form-item>
          </el-row>
        </el-row>
        <el-row>
          <div class="title">更多信息</div>
          <el-divider class="detail-divider"></el-divider>
          <el-row>
            <el-form-item label="" class="adress-box">
              <span style="color: red">*</span
              ><span style="padding-right: 10px; color: #606266">变更原因</span>
              <span v-if="type === 'detail'">{{ form.note }}</span>
              <el-input v-else v-model="form.note"></el-input>
            </el-form-item>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <div>
          <el-button v-if="!examine" size="small" @click="handleBack"
            >取消</el-button
          >
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            size="small"
            @click="submit"
            :loading="requesting"
            >保存</el-button
          >
        </div>
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择客户">
      <customer
        category="2"
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
  </div>
</template>

<script>
import { getOrderById } from "@/api/salesManage/common";
import common from "@/mixins/common";
import { addOrUpdateShopOrder } from "@/api/salesManage/saleOrder";
import saleType from "@/mixins/saleType";
import upload from "@/mixins/upload";
import VDistpicker from "v-distpicker";
import { getPaymentTypeList } from "@/api/common";
import productSelect from "@/components/productSelect";
export default {
  name: "",
  components: {
    VDistpicker,
    productSelect,
  },
  mixins: [saleType, common, upload],
  props: {
    type: {
      type: String,
      default: "change",
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
      tableDataDisabled: true,
      orderSn: "",
      linkName: "",
      linkPhone: "",
      sendArea: "",
      sendAddress: "",
      linkName1: "",
      linkPhone1: "",
      sendArea1: [],
      sendAddress1: "",
      checked: false,
      checked1: false,
      showDetail: false,
      requesting: false,
      module: "销售", // 控制选择客户部门的common
      right: "right",
      form: {
        shopOrderId: "",
        shopOrderSn: "",
        createTime: "",
        orderSn: "",
        paymentTypeId: "", //结算方式
        salesDepot: "",
        salesMan: "",
        memberId: "",
        memberUserName: "",
        projectSn: "", //项目编号
        contractName: "", //合同名称
        projectName: "", //项目名称
        contactSn: "", //合同编号
        subTypeId: "",
        subTypeName: "",
        expectReceiveDate: "", // 交货日期
        shipInformation: {
          type: "", // 快递类别
          typeId: "",
          linkName: "",
          linkPhone: "",
        }, // 发货信息
        orderContractList: [], // 合同信息
        discountAmount: 0,
        // payAmountAlready: '',
        // payType: '',
        debtMoney: "",
        note: "",
        taxType: "",
        createUserName: "",
        checkPerson: "",
      },
      tableData2: [
        // {
        //   id: "",
        //   pic: "",
        //   productId: "",
        //   productSn: "",
        //   productCategoryId: "",
        //   productAttr: "",
        //   sp1: "",
        //   productQuantity: "",
        //   productPrice: "",
        //   sp2: "",
        //   productAlreadyNum: "",
        //   productWaitNum: "",
        // },
      ],
      tableData1: [
        // {
        //   id: "",
        //   pic: "",
        //   productId: "",
        //   productSn: "",
        //   productCategoryId: "",
        //   productAttr: "",
        //   sp1: "",
        //   productQuantity: "",
        //   productPrice: "",
        //   sp2: "",
        //   productAlreadyNum: "",
        //   productWaitNum: "",
        // },
      ],
      tableData: [
        {
          id: "",
          pic: "",
          productId: "",
          productSn: "",
          productCategoryId: "",
          productAttr: "",
          sp1: "",
          productQuantity: "",
          productPrice: "",
          sp2: "",
          productAlreadyNum: "",
          productWaitNum: "",
        },
      ],
      paymentType: [], // 结算方式列表
      outboundData: [], // 出库记录
      show: false,
      currentIndex: 0, // 当前行
      file: [], // 上传附件
      projectDialogVisible: false, //项目弹窗
      rules: {
        "shipInformation.linkName": [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        note: [{ required: true, message: "请输入变更原因", trigger: "blur" }],
        "shipInformation.linkPhone": [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        expectReceiveDate: [
          { required: true, message: "请选择交货日期", trigger: "change" },
        ],
        paymentTypeId: [
          { required: true, message: "请选择结算方式", trigger: "change" },
        ],
        subTypeId: [
          { required: true, message: "请选择销售类型", trigger: "change" },
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        memberUserName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
      },
    };
  },
  async created() {
    console.log(this.type, this.data);
    if (this.type !== "change") {
      // this.showDetail = true;
      this.form = Object.assign(this.data, {});
      this.linkName1 = this.form.shipInformation.linkName;
      this.linkPhone1 = this.form.shipInformation.linkPhone;
      this.sendArea1 = this.form.shipInformation.sendArea.split(",");
      this.sendAddress1 = this.form.shipInformation.sendAddress;
      this.tableData = this.data.orderItemList;
      const res = await getOrderById({ id: this.data.shopOrderId });
      console.log(res);
      this.tableData1 = res.data.data.orderItemList;
      this.linkName = res.data.data.shipInformation.linkName;
      this.linkPhone = res.data.data.shipInformation.linkPhone;
      this.sendArea = res.data.data.shipInformation.sendArea.split(",");
      this.sendAddress = res.data.data.shipInformation.sendAddress;
    } else {
      this.form = Object.assign(this.data, {});
      this.orderSn = this.data.orderSn;
      this.form.shopOrderId = this.data.id;
      this.form.shopOrderSn = this.data.orderSn;
      this.linkName = this.form.shipInformation.linkName;
      this.linkPhone = this.form.shipInformation.linkPhone;
      this.sendArea = this.form.shipInformation.sendArea;
      this.sendAddress = this.form.shipInformation.sendAddress;
      this.tableData1 = this.data.orderItemList;
      this.tableData = [];
      this.form.note = "";
      this.form.subTypeId = parseInt(this.form.subTypeId);
    }
  },
  computed: {
    totalAmount1() {
      let total = 0;
      this.tableData1.forEach((item) => {
        if (item.salePrice) {
          total = (+total + +item.salePrice).toFixed(2);
        }
      });
      return total;
    },
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
  mounted() {
    this.getPayment();
  },
  methods: {
    changeDeliveryInfo(val) {
      if (val === true) {
        this.form.shipInformation.linkName = this.linkName1;
        this.form.shipInformation.linkPhone = this.linkPhone1;
        this.form.shipInformation.sendArea = this.sendArea1.join(",");
        this.form.shipInformation.sendAddress = this.sendAddress1;
      } else {
        this.form.shipInformation.linkName = this.linkName;
        this.form.shipInformation.linkPhone = this.linkPhone;
        this.form.shipInformation.sendArea = this.sendArea;
        this.form.shipInformation.sendAddress = this.sendAddress;
      }
    },
    changeOrderInfo(val) {
      if (this.tableData.length == 0) {
        return this.$message.warning("请先选择产品");
      }
      if (val === true) {
        this.tableData2 = this.tableData;
      } else {
        this.tableData2 = this.tableData1;
      }
    },
    onShow() {
      this.showDetail = !this.showDetail;
    },
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
      if (this.tableData.length==0) {
        this.tableDataDisabled = true
      }
    },
    async getPayment() {
      // 获取结算方式
      const res = await getPaymentTypeList();
      this.paymentType = res.data.data;
    },
    submit() {
      // if (this.type == "change" && this.checked == false) {
      //   return this.$message.error("请勾选变更单信息");
      // }
      if (!this.form.note) {
        return this.$message.error("请输入变更原因");
      }
      if (this.type == "edit") {
        this.form.shipInformation.linkName = this.linkName1;
        this.form.shipInformation.linkPhone = this.linkPhone1;
        this.form.shipInformation.sendArea = this.sendArea1.join(",");
        this.form.shipInformation.sendAddress = this.sendAddress1;
        this.tableData2 = this.tableData;
      } else {
        // this.form.shopOrderId = this.form.id;
        delete this.form.id;
        // this.form.shopOrderSn = this.form.orderSn;
        delete this.form.orderSn;
      }
      console.log(this.tableData2);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.totalAmount = this.totalAmount;
          this.form.payAmount = this.payAmount;
          const params = {
            data: {
              ...this.form,
              orderItemList: this.tableData2,
              file: this.file.join(","),
              type: 1,
            },
            codeName: "",
          };
          this.requesting = true;
          addOrUpdateShopOrder(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/salesManage/changeSaleOrder");
              this.requesting = false;
            })
            .catch((e) => {
              this.requesting = false;
            });
        } else {
          this.$message.error({
            message: "请完善必填信息",
          });
        }
      });
    },
    handleBack() {
      // 返回
      this.$router.push("/salesManage/changeSaleOrder");
    },
    selected(value) {
      console.log(value);
      this.sendArea1[0] = value.province.value;
      this.sendArea1[1] = value.city.value;
      this.sendArea1[2] = value.area.value;
    },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
      this.currentIndex = index;
    },
    handleCancel() {
      this.show = false;
    },
    addProductList(list) {
      this.show = false;
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item, index) => {
        const obj = {
          productSn: item.productSn,
          model: item.model, // 规格型号
          sp1: item.unitName,
          realAmount: item.purPriceSuggest,
          pic: item.pic,
          productId: item.id,
          productName: item.name,
          productCategoryId: item.productCateId,
          productCategoryName: item.productCategoryName,
          productQuantity: 1,
          sp2: "",
          salePrice: 1 * item.purPriceSuggest,
          productWaitNum: "0",
          productAlreadyNum: "0",
          productAlreadyNum: "0",
        };
        this.tableData.push(obj);
      });
      if (this.tableData.length > 0) {
        this.tableDataDisabled = false;
      } else {
        this.tableDataDisabled = true;
      }
      this.tableData = this.tableData.filter((ele) => {
        if (!ele.productSn) {
          return false;
        } else {
          return true;
        }
        this.tableData.push({});
        this.tableData.pop();
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index !== 10) {
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
    calSalePrice(val, index) {
      // 计算采购金额
      this.tableData[index].salePrice =
        this.tableData[index].productQuantity *
        this.tableData[index].realAmount;
    },
  },
};
</script>

<style lang="scss" scoped>
.adress-box {
  .el-input {
    width: 300px;
  }
}
.footer-box {
  text-align: center;
}
.detailSpan {
  cursor: pointer;
  z-index: 9 !important;
  color: #16792c;
  font-size: 14px;
  padding-left: 40px;
}
</style>
