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
            <span v-if="type === 'detail'">{{ form.returnOrderSn }}</span>
            <el-input
              v-if="type === 'edit'"
              v-model="form.returnOrderSn"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售出库单号" prop="orderSn">
            <span v-if="type === 'detail'">{{ form.orderSn }}</span>
            <el-input
              v-else
              v-model="form.orderSn"
              @focus="selectBasicInfo"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售类型" prop="subTypeId">
            <span v-if="type === 'detail'">{{ form.subType }}</span>
            <div v-else>
              <el-select
                v-if="form.orderSn === ''"
                v-model="form.subTypeId"
                @change="changeTypes"
              >
                <el-option
                  v-for="item of typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                <span class="add-option" @click="handleAddType">
                  <i class="el-icon-plus"></i>
                  新增
                </span>
              </el-select>
              <el-input v-else disabled v-model="form.subType"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="memberUserName">
            <span v-if="type === 'detail'">{{ form.memberUserName }}</span>
            <el-input
              v-else
              v-model="form.memberUserName"
              @focus="selectCustomer"
              :disabled="form.orderSn !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式">
            <span v-if="type === 'detail'">{{ form.paymentType }}</span>
            <el-select
              v-else
              v-model="form.paymentTypeId"
              @change="changePaymentType"
              :disabled="form.orderSn !== ''"
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
          <el-form-item label="项目名称">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.projectName"
              @focus="projectDialogVisible = true"
            ></el-input>
            <span v-else>{{ form.projectName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="托盘">
            <el-input
              v-if="type !== 'detail'"
              disabled
              v-model="form.tray"
            ></el-input>
            <span v-else>{{ form.tray }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="数量">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.trayNum"
            ></el-input>
            <span v-else>{{ form.trayNum }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.licenseNumber"
            ></el-input>
            <span v-else>{{ form.licenseNumber }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-form-item label="扫码">
          <el-input></el-input>
        </el-form-item>
      </el-row>-->
      <el-row class="margin-bottom-20">
        <el-table
          ref="tableData"
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
          class="detail-table"
        >
          <el-table-column type="index" width="50px" :key="0">
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
          <el-table-column
            width="80"
            align="center"
            v-if="type !== 'detail'"
            :key="1"
          >
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
          <el-table-column label="图片" :key="2">
            <template slot-scope="{ row }">
              <el-image :src="row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="产品编号"
            prop="productSn"
            width="160px"
            :key="3"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="form.orderSn !== ''">{{ row.productSn }}</span>
              <el-input
                v-else
                v-model="row.productSn"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="产品"
            prop="productName"
            :key="4"
          ></el-table-column>
          <el-table-column
            label="产品分类"
            prop="productCategoryName"
            :key="5"
            width="120px"
          ></el-table-column>
          <el-table-column
            label="规格型号"
            prop="model"
            :key="6"
            width="160px"
          ></el-table-column>
          <el-table-column label="单位" prop="sp1" :key="7"></el-table-column>
          <el-table-column label="强度" prop="intensity"> </el-table-column>
          <el-table-column label="密度" prop="density"> </el-table-column>
          <el-table-column
            label="仓库名称"
            prop="depotName"
            width="160px"
            :key="8"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.depotName }}</span>
              <el-select
                v-else
                v-model="row.depotId"
                @change="(val) => changeDepot(val, $index)"
              >
                <el-option
                  v-for="item of depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="type !== 'detail'"
            label="现存量"
            prop="stock"
            :key="9"
          ></el-table-column>
          <el-table-column
            width="120px"
            v-if="type === 'detail'"
            label="是否已对账"
            prop="isAccount"
            :key="9.5"
          >
            <template slot-scope="scope">
              {{ scope.row.isAccount === 0 ? "否" : "是" }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            prop="productNum"
            :key="10"
            width="120px"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productNum }}</span>
              <el-input
                v-else
                v-model="row.productNum"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            prop="productPrice"
            width="120px"
            :key="11"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productPrice }}</span>
              <el-input
                v-else
                v-model="row.productPrice"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="退货金额"
            prop="allPrice"
            width="120px"
            :key="12"
          ></el-table-column>
          <el-table-column label="退货类型" width="140px">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>退货类型
            </template>
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.typeName }}</span>
              <el-select
                v-else
                @change="(val) => changeType(val, $index)"
                v-model="row.typeName"
              >
                <el-option
                  v-for="item of typeList"
                  :key="item.typeKey"
                  :label="item.typeName"
                  :value="item.typeName"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="退货原因" prop="note" width="120px" :key="13">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>退货原因
            </template>
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.note }}</span>
              <el-input v-else v-model="row.note"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="源单号"
            prop="orderItemId"
            v-if="form.orderSn === ''"
            :key="14"
          ></el-table-column>
          <el-table-column
            label="入库数量"
            prop="alreadyNum"
            :key="15"
          ></el-table-column>
          <!-- <el-table-column label="是否赠品" prop="isGift" width="100px" :key="16">
            <template slot-scope="{row}">
              <span v-if="type === 'detail'">{{row.isGift | isGift}}</span>
              <el-select v-else v-model="row.isGift">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>-->
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="折让金额">
            <span v-if="type === 'detail'">{{ form.discountAmount }}</span>
            <el-input v-else v-model="form.discountAmount" v-float></el-input>
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
          <el-form-item label="应付金额">
            <span v-if="type === 'detail'">{{ returnAmount }}</span>
            <el-input v-else v-model="returnAmount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <span v-if="type === 'detail'">{{ form.note }}</span>
            <el-input v-else v-model="form.note"></el-input>
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
      <!-- <el-row>
        <div class="title">收货信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="快递类别">
            <el-input v-model="form.shipInformation.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费承担">
            <el-select v-model="form.shipInformation.freightPerson">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="参考运费">
            <el-input v-model="form.shipInformation.freightAmount" v-float></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="联系人">
           <el-input v-model="form.shipInformation.linkName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="form.shipInformation.linkPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="寄件人">
            <el-input v-model="form.shipInformation.sendName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="寄件电话">
            <el-input v-model="form.shipInformation.sendPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="寄件地址">
            <v-distpicker @selected='selected' :province="sendArea[0]" :city="sendArea[1]" :area="sendArea[2]"></v-distpicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="详细地址" class="adress-box">
            <el-input v-model="form.shipInformation.sendAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="开票类型">
            <span v-if="type === 'detail'">{{form.taxType}}</span>
            <el-select v-else v-model="form.taxType">
              <el-option value="增值税专用发票" label="增值税专用发票"></el-option>
              <el-option value="普通发票" label="普通发票"></el-option>
              <el-option value="专业发票" label="专业发票"></el-option>
              <el-option value="其他" label="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ form.createUserName }}</span>
            <el-input v-else v-model="form.createUserName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="8">
           <el-form-item label="审核人">
          <el-input></el-input>
        </el-form-item>
        </el-col>-->
      </el-row>
      <el-row class="margin-bottom-20 footer-box">
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
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择客户">
      <customer
        category="2"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <el-dialog :visible.sync="show" append-to-body width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog
      :visible.sync="showBasicInfo"
      append-to-body
      width="40%"
      title="选择销售出库单号"
    >
      <basic-info
        @on-cancel="closeBasicInfo"
        @on-submit="changelinkNumber"
        type="saleReturn"
        name="销售出库单号"
      ></basic-info>
    </el-dialog>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </div>
</template>

<script>
import {
  addOrUpdateOrderReturn,
  selectDepotHeadDetail,
  getReturnType,
} from "@/api/salesManage/saleReturn";
import customer from "@/components/customer";
import productSelect from "@/components/productSelect";
import depot from "@/mixins/depot";
import { getId, getPaymentTypeList } from "@/api/common";
import addTypes from "@/mixins/addType";
import upload from "@/mixins/upload";
import amountCal from "@/mixins/amountCal";
import { formatter } from "@/util/util";
import basicInfo from "@/components/basicInfo";
import projectSelect from "@/components/projectSelect";
export default {
  name: "addSaleReturn",
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
  mixins: [depot, addTypes, upload, amountCal],
  components: {
    customer,
    productSelect,
    basicInfo,
    projectSelect,
  },
  data() {
    return {
      requesting: false,
      module: 3, // 新增类型使用，销售是3
      tableData: [
        {
          pic: "",
          depotName: "", // 仓库
          depotId: "",
          stock: "",
          type: "",
        },
      ],
      form: {
        file: "",
        shipInformation: {
          type: "",
          typeId: "",
        },
        subType: "",
        subTypeId: "",
        orderSn: "", // 源单号
        discountAmount: 0,
        memberUserName: "",
        // createTime: '',
        trayNum: "", //数量
        licenseNumber: "", //车牌
      },
      show: false, // 展示产品弹窗
      linkNumberList: [], // 源单号option
      paymentType: [], // 结算方式列表
      sendArea: [], // 详细地址
      showCustomer: false,
      showBasicInfo: false,
      // fileList: [], // 上传图片
      file: [],
      rules: {
        orderSn: [{ required: true, message: "", trigger: "blur" }],
        subTypeId: [{ required: true, message: "", trigger: "change" }],
        memberUserName: [{ required: true, message: "", trigger: "blur" }],
      },
      projectDialogVisible: false, //项目弹窗
      typeList: [],
    };
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.allPrice) {
          total = (+total + +item.allPrice).toFixed(2);
        }
      });
      return total;
    },
    returnAmount() {
      let price = 0;
      price = (this.totalAmount - this.form.discountAmount).toFixed(2);
      return price;
    },
  },
  filters: {
    typeName(val) {
      if (val === 0) {
        return (val = "扣数");
      } else if (val === 1) {
        return (val = "退回");
      }
    },
  },
  async created() {
    // 获取结算方式
    const res1 = await getPaymentTypeList();
    this.paymentType = res1.data.data;
    const res = await getReturnType();
    this.typeList = res.data;
    if (this.type === "add") {
      // this.getOrderSn('销售退货')
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUserName = info.content["nick_name"];
      // const dates = new Date();
      // this.form.createTime =  formatter.date(dates, "yyyy-MM-dd")
    } else {
      this.form = this.data;
      this.paymentType.map((el) => {
        if (this.form.paymentTypeId == el.id) {
          this.form.paymentType = el.name;
        }
      });
      this.tableData = this.data.shopOrderReturnDetail;
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
    }
  },
  mounted() {
    // this.getPayment();
  },
  methods: {
    changeType(val, index) {
      console.log(val, index);
      this.typeList.map((el) => {
        if (el.typeName == val) {
          this.tableData[index].type = el.typeKey;
        }
      });
    },
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    calSalePrice(val, index) {
      // 计算采购金额
      this.tableData[index].allPrice =
        this.tableData[index].productNum * this.tableData[index].productPrice;
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
    //选择项目
    onProjectSelect(e) {
      this.form.projectSn = e.projectSn;
      this.form.projectName = e.projectName;
    },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
      // this.currentIndex = index
    },
    // async getPayment() {
    //   // 获取结算方式
    //   const res = await getPaymentTypeList();
    //   this.paymentType = res.data.data;
    // },
    handleBack() {
      this.$router.push({
        path: "/salesManage/saleReturn",
      });
    },
    selected(value) {
      // 处理省市的
      this.sendArea[0] = value.province.value;
      this.sendArea[1] = value.city.value;
      this.sendArea[2] = value.area.value;
    },
    selectCustomer() {
      // 处理客户选择的
      this.showCustomer = true;
    },
    handleCancel() {
      // 关闭产品选择
      this.show = false;
    },
    addProductList(list) {
      // 处理选择的商品数据
      this.show = false;
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item, index) => {
        console.log(item);
        const obj = {
          productSn: item.productSn, // 编号
          productName: item.name, // 名称
          productId: item.id, // 产品id
          stock: item.stock, // 库存
          model: item.model, // 型号
          sp1: item.unitName, // 单位
          productPrice: item.priceSuggest, // 价格
          pic: item.pic, // 图片
          productCategoryName: item.productCategoryName, // 分类
          allPrice: 1 * item.priceSuggest,
          productNum: 1,
          type: "", //退货分类
          note: "",
          alreadyNum: "0",
          isGift: "",
        };
        this.tableData.push(obj);
      });
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
    closeCustomer() {
      this.showCustomer = false;
    },
    submitCustomer(val) {
      this.showCustomer = false;
      this.form.memberUserName = val.name;
      this.form.memberId = val.id;
    },
    async getOrderSn() {
      // 获取单据编号
      const res = await getId({ codeName: "采购退货" });
      this.form.returnOrderSn = res.data.data;
    },
    async changelinkNumber(val) {
      // 改变源订单
      console.log(val);
      this.showBasicInfo = false;
      this.form.subType = val.subTypeName;
      this.form.subTypeId = val.subTypeId;
      this.form.orderSn = val.orderSn;
      const id = val.id;
      this.tableData = [];
      await selectDepotHeadDetail({ id: id }).then((res) => {
        const data = res.data.data;
        this.form.memberUserName = data.organName;
        this.form.memberId = data.organId;
        this.form.paymentTypeId = data.paymentTypeId;
        this.form.projectSn = data.projectSn;
        this.form.projectName = data.projectName;
        this.form.tray = data.tray;
        this.form.trayId = data.trayId;
        this.form.trayNum = data.trayNum;
        this.form.licenseNumber = data.licenseNumber;
        this.form.carId = data.carId;
        this.form.carSn = data.carSn;
        this.form.driverName = data.driverName;
        data.depotItemList.forEach((item) => {
          const obj = {
            // 查询的订单就是新增的商品表tableData的数据，不可修改
            productId: item.productId,
            pic: item.pic,
            productName: item.productName,
            productSn: item.productSn,
            productCategoryName: item.productCate,
            model: item.productType, // 型号
            sp1: item.unit,
            depotName: item.depotName,
            depotId: item.depotId,
            stock: "",
            productNum: item.operNumber,
            productPrice: item.unitPrice,
            allPrice: item.allPrice,
            type: "", //退货分类
            note: item.remark,
            orderItemId: item.id,
            alreadyNum: item.changeNumber,
            density: item.density,
            intensity: item.intensity,
          };
          this.tableData.push(obj);
        });
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
        if (this.form.orderSn === "") {
          // 没有选择源单号
          if (index !== 12) {
            sums[index] = "";
            return;
          }
        } else {
          if (index !== 11) {
            // 选择了源单号
            sums[index] = "";
            return;
          }
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
    async submit() {
      // 新增
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      console.log(this.tableData);
      if (this.tableData.some((val) => val.type === "")) {
        return this.$message.warning("请选择退货类型");
      }
      if (this.tableData.some((val) => val.note == "")) {
        return this.$message.warning("请输入退货原因");
      }
      this.form.totalAmount = this.totalAmount;
      this.form.returnAmount = this.returnAmount;
      const params = {
        data: {
          ...this.form,
          shopOrderReturnDetail: this.tableData,
          file: this.file.join(","),
        },
        codeName: "销售退货",
      };
      params.sendArea = this.sendArea.join(",");
      this.requesting = true;
      try {
        const res = await addOrUpdateOrderReturn(params);
        this.$message.success({
          message: "操作成功",
        });
        this.requesting = false;
        this.$router.push({
          path: "/salesManage/saleReturn",
        });
      } catch {
        this.requesting = false;
      }
    },
    selectBasicInfo() {
      this.showBasicInfo = true;
    },
    closeBasicInfo() {
      this.showBasicInfo = false;
    },
    changePaymentType(val) {
      this.paymentType.forEach((item) => {
        if (val === item.id) {
          this.form.paymentType = item.name;
        }
      });
    },
    handleSuccess(url) {
      this.file.push(url);
    },
    handleRemove(file, fileList) {
      //
      // console.log(file)
      this.file = this.file.filter((item) => item !== file.url);
      console.log(this.file);
    },
  },
};
</script>
