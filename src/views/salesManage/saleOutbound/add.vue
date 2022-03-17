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
              v-else-if="type === 'edit'"
              v-model="form.number"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售订单号" prop="linkNumber">
            <span v-if="type === 'detail'">{{ form.linkNumber }}</span>
            <el-input
              v-else
              v-model="form.linkNumber"
              @focus="selectBasicInfo"
            ></el-input>
            <!-- <el-select v-else v-model="form.linkNumber" @change="changelinkNumber">
              <el-option v-for="item of linkNumberList" :key="item.id" :label="item.orderSn" :value="item.orderSn"></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户" prop="organName">
            <span v-if="type === 'detail'">{{ form.organName }}</span>
            <el-input
              v-else
              v-model="form.organName"
              @focus="selectCustomer"
              :disabled="form.linkNumber !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售类型" prop="subTypeId">
            <span v-if="type === 'detail'">{{ form.subTypeName }}</span>
            <div v-else>
              <el-select
                v-if="form.linkNumber === ''"
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
              <el-input v-else disabled v-model="form.subTypeName"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售部门">
            <span v-if="type === 'detail'">{{ form.handsDepot }}</span>
            <el-input
              v-else
              v-model="form.handsDepot"
              @focus="selectDepot"
              :disabled="form.linkNumber !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售员">
            <span v-if="type === 'detail'">{{ form.handsPersonName }}</span>
            <el-input
              v-else
              v-model="form.handsPersonName"
              @focus="selectUser"
              :disabled="form.linkNumber !== '' || form.handsDepot === ''"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称">
            <span v-if="type === 'detail'">{{ form.projectName }}</span>
            <el-input
              v-else
              placeholder="请输入项目名称"
              v-model="form.projectName"
              :disabled="form.linkNumber !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="托盘名称/规格">
            <span v-if="type === 'detail'">{{ form.tray }}</span>
            <el-input
              v-else
              @focus="selectProduct"
              disabled
              v-model="form.tray"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="托盘数量">
            <span v-if="type === 'detail'">{{ form.trayNum }}</span>
            <el-input
              v-else
              placeholder="请输入托盘数量"
              v-model="form.trayNum"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车牌号">
            <span v-if="type === 'detail'">{{ form.licenseNumber }}</span>
            <el-input
              v-else
              placeholder="请输入车牌号"
              v-model="form.licenseNumber"
              @focus="vehicleDialogVisible = true"
            ></el-input>
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
          :data="tableData"
          :key="itemKey"
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
          <!--&& form.linkNumber === ''-->
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
          <!-- <el-table-column label="托盘规格" prop="">
          </el-table-column>
          <el-table-column label="托盘数量">
          </el-table-column>-->
          <el-table-column label="图片" :key="3">
            <template slot-scope="{ row }">
              <el-image :src="row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="产品编号"
            prop="productSn"
            width="160px"
            :key="4"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail' || form.linkNumber !== ''">
                {{ row.productSn }}
              </span>
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
            :key="5"
            width="120px"
          >
            <!-- <template slot-scope="{row, $index}">
              <span v-if="type === 'detail' || form.linkNumber !== ''">{{row.productName}}</span>
              <el-input v-else v-model="row.productName" @focus="showProduct($index)"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column
            label="规格型号"
            prop="productType"
            :key="6"
            width="120px"
          ></el-table-column>
          <el-table-column label="单位" prop="unit" :key="7"></el-table-column>
          <el-table-column label="强度" width="110px" prop="intensity">
            <template slot-scope="scope">
              <el-select
                :disabled="type === 'detail'"
                v-model="scope.row.intensity"
              >
                <el-option
                  v-for="item of intensityList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="密度" width="110px" prop="density">
            <template slot-scope="scope">
              <el-select
                :disabled="type === 'detail'"
                v-model="scope.row.density"
              >
                <el-option
                  v-for="item of densityList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="仓库名称"
            prop="depotId"
            width="120px"
            :key="8"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail' || row.productId === ''">
                {{ row.depotName }}
              </span>
              <el-select
                v-else
                v-model="row.depotId"
                @change="(val) => changeDepot(val, $index, 'rowDepot')"
              >
              <!-- <el-select
                v-else
                v-model="row.depotId"
                @change="$forceUpdate()"
                @input="changeDepot1(row, $index)"
              > -->
                <el-option
                  v-for="item of row.depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="现存量" prop="stock"></el-table-column>
          <el-table-column
            width="120px"
            v-if="type === 'detail'"
            label="是否已对账"
            prop="isAccount"
            :key="9.5"
          >
            <template slot-scope="scope">{{
              scope.row.isAccount === 0 ? "否" : "是"
            }}</template>
          </el-table-column>
          <el-table-column
            label="订单数量"
            prop="productQuantity"
            :key="10"
          ></el-table-column>
          <el-table-column
            label="未出库数量"
            prop="waitNumber"
            width="120px"
            v-if="type !== 'detail'"
            :key="15"
          ></el-table-column>
          <el-table-column label="本次数量" prop="num" :key="11" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.num }}</span>
              <el-input
                v-else
                v-model="row.num"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            prop="unitPrice"
            :key="12"
            width="120px"
          >
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.unitPrice }}</span>
              <el-input
                v-else
                v-model="row.unitPrice"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="销售金额"
            prop="allPrice"
            :key="13"
            width="120px"
          >
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.allPrice }}</span>
              <el-input v-else v-model="row.allPrice" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="已出库数量"
            prop="changeNumber"
            width="120px"
            v-if="type !== 'detail'"
            :key="14"
          ></el-table-column>
          <el-table-column label="备注" prop="remark" width="120px" :key="16">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.remark }}</span>
              <el-input v-else v-model="row.remark"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="开票类型">-->
        <!--            <span v-if="type === 'detail'">{{form.taxType}}</span>-->
        <!--            <el-select v-else v-model="form.taxType">-->
        <!--              <el-option value="增值税专用发票" label="增值税专用发票"></el-option>-->
        <!--              <el-option value="普通发票" label="普通发票"></el-option>-->
        <!--              <el-option value="专业发票" label="专业发票"></el-option>-->
        <!--              <el-option value="其他" label="其他"></el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="联系人">
            <span v-if="type === 'detail'">{{ form.linkName }}</span>
            <el-input v-else v-model="form.linkName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <span v-if="type === 'detail'">{{ form.phone }}</span>
            <el-input v-else v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ form.createUser }}</span>
            <el-input v-else v-model="form.createUser" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人" v-if="type === 'detail'">
            <span>{{ form.checkPerson }}</span>
            <!-- <el-input v-else v-model="form.checkPerson"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="button-wrapper-footer">
        <div>
          <el-button v-if="!examine" @click="handleBack" size="small"
            >取消</el-button
          >
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            @click="confirm"
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
        v-if="show"
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
        :keyWord="keyWord"
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
    <!--车牌弹窗-->
    <dia-vehicle
      title="车牌"
      :vehicleDialogVisible.sync="vehicleDialogVisible"
      @on-selected-contact="onVehicleSelect"
    ></dia-vehicle>
    <add-type
      :type="3"
      :show="showAddType"
      @on-refresh="getSaleTypeOptions"
      @on-close="showAddType = false"
    ></add-type>
  </div>
</template>

<script>
import { getLogisticsTray } from "@/api/logistics/pallet/pallet";
import { getOrderById } from "@/api/salesManage/common";
import {
  findDepotByProductId,
  findStockByDepotIdAndProductId,
} from "@/api/common";
import {
  saleOutCheck,
  updateSaleOutCheck,
} from "@/api/salesManage/saleOutbound";
import { getDictionary } from "@/api/system/dictbiz";
import customer from "@/components/customer";
import dept from "@/components/dept";
import user from "@/components/user";
import basicInfo from "@/components/basicInfo";
import productSelect from "@/components/productSelect";
import diaVehicle from "@/components/dialog-select/diaVehicle";
import depot from "@/mixins/depot";
// import getOrderSn from '@/mixins/orderSn'
import addTypes from "@/mixins/addType";
import { formatter } from "@/util/util";
// import addType from '../../components/addType'
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
    examine: {
      type: String,
      default: "",
    },
  },
  mixins: [depot, addTypes],
  components: {
    customer,
    dept,
    productSelect,
    user,
    basicInfo,
    // addType
    diaVehicle,
  },
  name: "addSaleOutbound",
  data() {
    return {
      itemKey:"",
      requesting: false,
      depotListArr: [],
      waitNumberList: "",
      numList: "",
      currentIndex: 0, // 选择产品当前行
      module: 3, // 新增类型使用，销售是3
      menu: "销售出库", // 新增类型使用
      tableData: [
        {
          productSn: "",
          productType: "",
          unit: "",
          depotId: "",
          // stock: "",
          num: "",
          unitPrice: "",
          allPrice: "",
          remark: "",
          isGift: "",
          productId: "",
        },
      ],
      form: {
        // type: '出库',
        // typeClass: '销售',
        trayNum: 0,
        linkNumber: "",
        tray: "",
        trayId: "",
        handsDepot: "", // 部门
        handsDepotId: "",
        projectName: "",
        // createTime: '',
        // number: '',
        organName: "", // 客户
        // organId: '',
        // handsPersonName: '', // 销售员
        // handsPersonId: '',
        subTypeName: "", // 源单类型
        subTypeId: "",
        linkName: "", //联系人
        phone: "", //联系电话
      },
      linkNumberList: [],
      showCustomer: false, // 展示选择客户弹窗
      showDept: false, // 展示选择部门
      show: false, // 展示选择产品
      showUser: false,
      showBasicInfo: false,
      vehicleDialogVisible: false, //展示车牌
      file: [],
      keyWord: "", // 选择产品弹窗时默认的数据
      deptId: "",
      rules: {
        organName: [{ required: true }],
        subTypeId: [{ required: true }],
      },
      densityList: [], //密度list
      intensityList: [], //强度list
    };
  },
  async created() {
    if (this.type === "add") {
      // this.getOrderSn('销售出库')
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUser = info.content["nick_name"];
      // const dates = new Date();
      // this.form.createTime =  formatter.date(dates, "yyyy-MM-dd")
    } else {
      // 编辑
      this.form = this.data;
      console.log(this.data.depotItemList);
      this.data.depotItemList.map(async (el) => {
        const res = await findDepotByProductId(el.productId);
        el.depotList = res.data.data;
        const res1 = await findStockByDepotIdAndProductId({
          depotId: el.depotId,
          productId: el.productId,
        });
        res.data.data.map((item) => {
          if (item.id == el.depotId) {
            el.depotName = item.depotName;
            if (res1.data.data.stock) {
              el.stock = res1.data.data.stock;
            } else {
              el.stock = 0;
            }
          }
        });
      });
      setTimeout(() => {
        this.tableData = this.data.depotItemList;
      }, 1000);
    }
  },
  mounted() {
    this.getDiction();
    getLogisticsTray().then((res) => {
      this.form.tray = res.data.data.name;
      this.form.trayId = res.data.data.id;
    });
  },
  watch: {
    tableData: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
    },
  },
  methods: {
    //字典数据
    async getDiction() {
      Promise.all([
        getDictionary({ code: "shop_order_density" }), //密度
        getDictionary({ code: "shop_order_intensity" }), //强度
      ]).then((values) => {
        this.densityList = values[0].data.data;
        this.intensityList = values[1].data.data;
      });
    },
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
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
    // async getBasicInfo () { // 获取源订单号
    //   const data = await getBasicInfoByType('销售')
    //   this.linkNumberList = data.data.data
    // },
    selectCustomer() {
      this.showCustomer = true;
    },
    closeCustomer() {
      this.showCustomer = false;
    },
    submitCustomer(val) {
      this.showCustomer = false;
      this.form.organName = val.name;
      this.form.organId = val.id;
    },
    selectDepot() {
      this.showDept = true;
    },
    closeDept() {
      this.showDept = false;
    },
    submitDept(val) {
      this.showDept = false;
      this.deptId = val.id;
      this.form.handsDepot = val.deptName;
      this.form.handsDepotId = val.id;
    },
    selectUser() {
      this.showUser = true;
    },
    closeUser() {
      this.showUser = false;
    },
    submitUser(val) {
      this.showUser = false;
      this.form.handsPersonName = val.name;
      this.form.handsPersonId = val.id;
    },
    handleCancel() {
      // 关闭产品选择
      this.show = false;
    },
    addProductList(list) {
      // 处理选择的商品数据
      //  let newList = []
      //  for (let item of this.tableData) {
      //    newList = this.tableData.find
      //  }
      // console.log(newList)
      this.show = false;
      if (this.keyWord === "") {
        if (list.length === 0 && this.tableData.length === 1) {
          return;
        }
        list.forEach((item, index) => {
          const obj = {
            productSn: item.productSn, // 编号
            productName: item.name, // 名称
            productId: item.id, // 产品id
            stock: item.stock, // 库存
            productType: item.model, // 型号
            unit: item.unitName, // 单位
            unitPrice: item.priceSuggest, // 价格
            depotId: "",
            depotName: "", // 仓库
            num: 1, // 数量
            pic: item.pic, // 图片
            allPrice: 1 * item.priceSuggest,
            remark: "",
            changeNumber: 0,
            waitNumber: 0,
            productQuantity: 0, // 订单数量
          };
          findDepotByProductId(obj.productId).then((res) => {
            obj.depotList = res.data.data;
          });
          setTimeout(() => {
            this.tableData.push(obj);
          }, 1000);
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
      } else {
        this.form.tray = list[0].name;
        this.form.trayId = list[0].id;
      }
    },
    showProduct(index) {
      // 展示产品选择
      this.keyWord = "";
      this.show = true;
      this.currentIndex = index;
    },
    handleBack() {
      this.$router.push({
        path: "/salesManage/saleOutbound",
      });
    },
    confirm() {
      this.$refs.form.validate((v) => {
        if (!v) {
          this.$message.error({
            message: "请完善必填信息",
          });
          return;
        }
        if (this.form.tray === "" || this.form.trayNum === "") {
          this.$confirm("托盘规格/托盘数量为空，是否填写", "提示", {
            confirmButtonText: "填写",
            cancelButtonText: "否",
            type: "warning",
          })
            .then((action) => {})
            .catch((err) => {
              this.handleSubmit();
            });
        } else {
          this.handleSubmit();
        }
      });
    },
    async handleSubmit() {
      const params = {
        data: {
          ...this.form,
          depotItemList: this.tableData,
        },
        codeName: "销售出库",
      };
      let subApi = "";
      if (this.type === "add") {
        subApi = saleOutCheck;
        // params.codeName = '销售出库'
      } else {
        subApi = updateSaleOutCheck;
      }
      this.requesting = true;
      try {
        const data = await subApi(params);
        this.$message.success({
          message: "操作成功",
        });
        this.requesting = false;
        this.handleBack();
      } catch {
        this.requesting = false;
      }
    },
    async changelinkNumber(val, val1, type) {
      console.log("123", val, val1, type);
      if (type == 0) {
        this.showBasicInfo = false;
        this.form.linkNumber = val.orderSn;
        this.form.subTypeName = val.subTypeName;
        this.form.subTypeId = val.subTypeId;
        const id = val.id;
        this.tableData = [];
        await getOrderById({ id: id }).then((res) => {
          const data = res.data.data;
          val1.map((el) => {
            data.orderItemList.push(el);
          });
          console.log("allData", data.orderItemList);
          this.form.organName = data.memberUserName;
          this.form.organId = data.memberId;
          this.form.handsDepot = data.salesDepot;
          this.form.handsDepotId = data.salesDepotId;
          this.form.handsPersonName = data.salesMan;
          this.form.handsPersonId = data.salesManId;
          this.form.projectSn = data.projectSn;
          this.form.projectName = data.projectName;
          this.form.linkName = data.shipInformation.linkName;
          this.form.phone = data.shipInformation.linkPhone;
          data.orderItemList.forEach((item) => {
            const obj = {
              // 查询的订单就是新增的商品表tableData的数据，不可修改
              productId: item.productId,
              pic: item.pic,
              productName: item.productName,
              productSn: item.productSn,
              // productType: item.productCategoryId,
              productType: item.model, // 规格型号
              unit: item.sp1,
              depotName: "",
              depotId: "",
              stock: "",
              num: 0,
              unitPrice: item.realAmount,
              allPrice: 0,
              remark: item.sp2,
              linkNumber: item.id,
              changeNumber: item.productAlreadyNum,
              waitNumber: item.productWaitNum,
              productQuantity: item.productQuantity,
            };
            findDepotByProductId(obj.productId).then((res) => {
              obj.depotList = res.data.data;
              this.tableData.push(obj);
            });
          });
        });
      } else {
        // 改变源订单
        this.showBasicInfo = false;
        this.form.linkNumber = val.orderSn;
        this.form.subTypeName = val.subTypeName;
        this.form.subTypeId = val.subTypeId;
        const id = val.id;
        this.tableData = [];
        await getOrderById({ id: id }).then((res) => {
          const data = res.data.data;
          this.form.organName = data.memberUserName;
          this.form.organId = data.memberId;
          this.form.handsDepot = data.salesDepot;
          this.form.handsDepotId = data.salesDepotId;
          this.form.handsPersonName = data.salesMan;
          this.form.handsPersonId = data.salesManId;
          this.form.projectSn = data.projectSn;
          this.form.projectName = data.projectName;
          this.form.linkName = data.shipInformation.linkName;
          this.form.phone = data.shipInformation.linkPhone;
          data.orderItemList.forEach((item) => {
            const obj = {
              // 查询的订单就是新增的商品表tableData的数据，不可修改
              productId: item.productId,
              pic: item.pic,
              productName: item.productName,
              productSn: item.productSn,
              // productType: item.productCategoryId,
              productType: item.model, // 规格型号
              unit: item.sp1,
              depotName: "",
              depotId: "",
              stock: "",
              num: 0,
              unitPrice: item.realAmount,
              allPrice: 0,
              remark: item.sp2,
              linkNumber: item.id,
              changeNumber: item.productAlreadyNum,
              waitNumber: item.productWaitNum,
              productQuantity: item.productQuantity,
            };
            findDepotByProductId(obj.productId).then((res) => {
              obj.depotList = res.data.data;
              this.tableData.push(obj);
            });
          });
        });
      }
    },
    // async changeDepot1(val, index) {
    //   console.log(val, index);
    //   val.depotList.map((el) => {
    //     if (el.id == val.depotId) {
    //       val.depotName = el.depotName;
    //     }
    //   });
    //   const res = await findStockByDepotIdAndProductId({
    //     depotId: val.depotId,
    //     productId: val.productId,
    //   });
    //   val.stock = res.data.data.stock;
    //   this.itemKey = Math.random()
    // },
    // changeDepot (val, index) { // 改变仓库
    //   this.depotList.forEach(item => {
    //     if (item.id === val) {
    //       this.tableData[index].depotName = item.depotName
    //     }
    //   })
    // },
    changeNum(val, index) {
      this.tableData[index].allPrice = val * this.tableData[index].unitPrice;
    },
    // 表格总计
    getSummaries(param) {
      const { columns, data } = param;
      var a = data.map((item) => Number(item.waitNumber));
      var b = data.map((item) => Number(item.num));
      let values = a.reduce((prev, curr) => {
        return prev + curr;
      });
      let values1 = b.reduce((prev, curr) => {
        return prev + curr;
      });
      // console.log(a);
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "waitNumber":
            sums[index] = values;
            break;
          case "num":
            sums[index] = values1;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "合计";
    //       return;
    //     }
    //     if (index !== 12) {
    //       sums[index] = "";
    //       return;
    //     }
    //     const values = data.map((item) => Number(item[column.property]));
    //     if (!values.every((value) => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         if (!isNaN(value)) {
    //           let total = parseFloat(prev) + parseFloat(curr);
    //           return parseFloat(total).toFixed(2);
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //       return sums[index];
    //     } else {
    //       sums[index] = "";
    //     }
    //   });

    //   return sums;
    // },
    calSalePrice(val, index) {
      // 计算采购金额
      this.tableData[index].allPrice =
        this.tableData[index].num * this.tableData[index].unitPrice;
    },
    selectProduct() {
      this.keyWord = "托盘";
      this.show = true;
    },
    selectBasicInfo() {
      this.showBasicInfo = true;
    },
    closeBasicInfo() {
      this.showBasicInfo = false;
    },
    //选择车牌
    onVehicleSelect(val) {
      this.form.licenseNumber = val.licenseNumber;
      this.form.carId = val.id;
      this.form.carSn = val.carSn;
      this.form.driverName = val.driverName;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-option {
  font-size: 14px;
  color: #606266;
}
</style>
