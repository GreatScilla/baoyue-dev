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
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.projectName"
              @focus="projectDialogVisible = true"
            ></el-input>
            <span v-else>{{ form.projectName }}</span>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="expectReceiveDate" label="交货日期">
            <el-date-picker
              v-if="type !== 'detail'"
              v-model="form.expectReceiveDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span v-else>{{ form.expectReceiveDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售部门">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.salesDepot"
              @focus="selectDepot"
            ></el-input>
            <span v-else>{{ form.salesDepot }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售员">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.salesMan"
              @focus="selectUser"
              :disabled="form.salesDepot === ''"
            ></el-input>
            <span v-else>{{ form.salesMan }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售类型" prop="subTypeId">
            <el-select v-if="type !== 'detail'" v-model="form.subTypeId">
              <el-option
                v-for="item of saleTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span v-else>{{ form.subTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="memberUserName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.memberUserName"
              @focus="selectCustomer"
              disabled
            ></el-input>
            <span v-else>{{ form.memberUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联合同编号" label-width="120px">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.contactSn"
              disabled
            ></el-input>
            <span v-else>{{ form.contactSn }}</span>
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
          <el-table-column label="图片" prop="pic" width="120px">
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
            <!-- <template slot-scope="{row, $index}">
              <el-input v-model="row.productName"></el-input>
            </template>-->
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
              <!-- <el-input v-model="row.productAttr"></el-input> -->
              <span>{{ row.model }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="sp1">
            <template slot-scope="{ row }">
              <!-- <el-input v-model="row.sp1"></el-input> -->
              <span>{{ row.sp1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="productQuantity" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productQuantity }}</span>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="折让金额">
            <span v-if="type === 'detail'">{{ form.discountAmount }}</span>
            <el-input v-else v-model="form.discountAmount"   ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总金额">
            <span v-if="type === 'detail'">{{ totalAmount }}</span>
            <el-input v-else v-model="totalAmount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应收金额">
            <span v-if="type === 'detail'">{{ payAmount }}</span>
            <el-input v-else v-model="payAmount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <span v-if="type === 'detail'">{{ form.note }}</span>
            <el-input v-else type="textArea" v-model="form.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row></el-row>
      <el-row>
        <el-form-item label="附件信息">
          <upload-file
            @on-remove="handleRemove"
            @on-success="handleSuccess"
            :imageList="file"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-row>
        <div class="title">发货信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="shipInformation.linkName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.shipInformation.linkName"
            ></el-input>
            <span v-else>{{ form.shipInformation.linkName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="shipInformation.linkPhone">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.shipInformation.linkPhone"
            ></el-input>
            <span v-else>{{ form.shipInformation.linkPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="客户收货地址">
          <div v-if="type !== 'detail'">
            <v-distpicker
              @selected="selected"
              :province="sendArea[0]"
              :city="sendArea[1]"
              :area="sendArea[2]"
            ></v-distpicker>
          </div>
          <span v-else></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="详细地址" class="adress-box">
          <span v-if="type === 'detail'">{{
            form.shipInformation.sendArea + form.shipInformation.sendAddress
          }}</span>
          <el-input
            v-else
            v-model="form.shipInformation.sendAddress"
          ></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-row v-if="type === 'detail'">
        <p>出库记录</p>
      </el-row>
      <el-row v-if="type === 'detail'">
        <el-table :data="outboundData">
          <el-table-column label="产品编号"></el-table-column>
          <el-table-column label="产品名称"></el-table-column>
          <el-table-column label="规格"></el-table-column>
          <el-table-column label="计量单位"></el-table-column>
          <el-table-column label="仓库"></el-table-column>
          <el-table-column label="批号"></el-table-column>
          <el-table-column label="出库数量"></el-table-column>
          <el-table-column label="SN号"></el-table-column>
          <el-table-column label="源订单号 "></el-table-column>
        </el-table>
      </el-row>-->
      <!-- <el-row>
        <div class="title">关联合同</div>
        <el-divider class="detail-divider"></el-divider>
        <el-table :data="form.orderContractList" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="合同编号">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.contractSn"></el-input>
              <span v-else>{{row.contractSn}}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.payAmount"></el-input>
              <span v-else>{{row.payAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.contractNum"></el-input>
              <span v-else>{{row.contractNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售人员">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.saleName"></el-input>
              <span v-else>{{row.saleName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="签订日期">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.contractTime"></el-input>
              <span v-else>{{row.contractTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联客户">
            <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.linkUserId"></el-input>
              <span v-else>{{row.linkUserId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
             <template slot-scope="{row}">
              <el-input v-if="type !== 'detail'" v-model="row.remark"></el-input>
              <span v-else>{{row.remark}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>-->
      <el-row v-for="(item, index) in changeOrderList" :key="item.id">
        <el-row v-if="type !== 'add'">
          <el-col style="margin-top:10px" :span="24">
            <span class="title">变更订单信息{{ index + 1 }}</span>
            <span class="detailSpan">{{ item.orderSn }}</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row class="margin-bottom-20">
            <el-table
              :data="item.orderItemList"
              border
              :summary-method="getSummaries"
              show-summary
              class="detail-table"
            >
              <el-table-column type="index" align="center" width="80">
                <template slot="header">
                  <el-button
                    type="text"
                    icon="el-icon-plus"
                    circle
                    disabled
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" width="0">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    circle
                   
                    disabled
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="pic" width="120px">
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
              <el-table-column label="退货数量" prop="returnNum">
              </el-table-column>
            </el-table>
          </el-row>
          <el-col :span="24">
            <span class="title">变更发货信息{{ index + 1 }}</span>
            <el-divider class="detail-divider"></el-divider>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人">
                <span>{{ item.shipInformation.linkName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <span>{{ item.shipInformation.linkPhone }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="客户收货地址">
              <span>{{
                item.shipInformation.sendArea + item.shipInformation.sendAddress
              }}</span>
            </el-form-item>
          </el-row>
        </el-row></el-row
      >
      <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="开票类型">-->
        <!--            <el-select v-if="type !== 'detail'" v-model="form.taxType">-->
        <!--              <el-option value="增值税专用发票" label="增值税专用发票"></el-option>-->
        <!--              <el-option value="普通发票" label="普通发票"></el-option>-->
        <!--              <el-option value="专业发票" label="专业发票"></el-option>-->
        <!--              <el-option value="其他" label="其他"></el-option>-->
        <!--            </el-select>-->
        <!--            <span v-else>{{form.taxType}}</span>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="制单人">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.createUserName"
              disabled
            ></el-input>
            <span v-else>{{ form.createUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type === 'detail'">
          <el-form-item label="审核人">
            <span>{{ form.checkPerson }}</span>
          </el-form-item>
        </el-col>
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
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </div>
</template>

<script>
import common from "@/mixins/common";
import { addOrUpdateShopOrder } from "@/api/salesManage/saleOrder";
import { detailsContactUnit } from "@/api/base-data/contactUnit";
import saleType from "@/mixins/saleType";
import upload from "@/mixins/upload";
import VDistpicker from "v-distpicker";
import { getId, getPaymentTypeList } from "@/api/common";
import productSelect from "@/components/productSelect";
import projectSelect from "@/components/projectSelect";
import { formatter } from "@/util/util";
export default {
  name: "addSaleOrder",
  components: {
    VDistpicker,
    productSelect,
    projectSelect,
  },
  mixins: [saleType, common, upload],
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
      changeOrderList: [],
      requesting: false,
      module: "销售", // 控制选择客户部门的common
      right: "right",
      sendArea: [],
      form: {
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
        createTime: "",
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
  created() {
    if (this.type !== "add") {
      this.form = Object.assign(this.data, {});
      console.log(this.form);
      this.changeOrderList = this.data.changeOrderList;
      this.tableData = this.data.orderItemList;
      this.sendArea = this.form.shipInformation.sendArea.split(",");
      this.form.subTypeId = parseInt(this.form.subTypeId);
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
    } else {
      // 新增
      // this.getOrderSn()
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUserName = info.content["nick_name"];
      const dates = new Date();
      // this.form.createTime = formatter.date(dates, "yyyy-MM-dd")
      this.form.expectReceiveDate = formatter.date(dates, "yyyy-MM-dd");
    }
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
  mounted() {
    this.getPayment();
  },
  methods: {
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    //选择项目
    async onProjectSelect(e) {
      console.log(e);
      this.form.memberId = e.customerId;
      this.form.memberUserName = e.customerName;
      this.form.projectSn = e.projectSn;
      this.form.contractName = e.contractName;
      this.form.projectName = e.projectName;
      this.form.contactSn = e.contractSn;
      this.form.salesDepotId = e.depotId; //销售部门id
      this.form.salesDepot = e.depotName; //销售部门
      this.form.salesManId = e.salesManId; //销售员id
      this.form.salesMan = e.salesMan; //销售员
      this.form.shipInformation.linkName = e.customerLead;
      this.form.shipInformation.linkPhone = e.customerPhone;
      const res = await detailsContactUnit({ id: e.customerId });
      if (res.data.code === 200) {
        this.form.paymentTypeId =
          res.data.data.contactUnitOther.settlementContactUnitId;
        this.form.paymentType =
          res.data.data.contactUnitOther.settlementContactUnitName;
      }
    },
    async getPayment() {
      // 获取结算方式
      const res = await getPaymentTypeList();
      this.paymentType = res.data.data;
    },
    async beforeAvatarUpload(file) {
      // let OSS = require("ali-oss");
      // let client = new OSS({
      //   region: "oss-cn-shenzhen",
      //   bucket: "bipinyun",
      //   accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
      //   accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ"
      // });
      // let result = await client.put(file.name, file);
      // this.file.push(result.url);
      // this.fileList.push({ name: result.name, url: file.url })
      return false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.totalAmount = this.totalAmount;
          this.form.payAmount = this.payAmount;
          this.form.shipInformation.sendArea = this.sendArea.join(",");
          const params = {
            data: {
              ...this.form,
              orderItemList: this.tableData,
              file: this.file.join(","),
              type: 0,
            },
            codeName: "销售订单",
          };
          this.requesting = true;
          addOrUpdateShopOrder(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/salesManage/saleOrder");
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
      this.$router.push("/salesManage/saleOrder");
    },
    selected(value) {
      console.log(value);
      this.sendArea[0] = value.province.value;
      this.sendArea[1] = value.city.value;
      this.sendArea[2] = value.area.value;
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
    async getOrderSn() {
      // 获取单据编号
      const res = await getId({ codeName: "销售订单" });
      this.form.orderSn = res.data.data;
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
     ( Number(this.tableData[index].productQuantity)   *
      Number( this.tableData[index].realAmount)).toFixed(2) ;
    },
    changePaymentType(val) {
      // 改变结算方式
      this.paymentType.forEach((item) => {
        if (item.id === val) {
          this.form.paymentType = item.name;
        }
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
