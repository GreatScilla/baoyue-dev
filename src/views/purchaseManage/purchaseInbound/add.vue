// 采购进货
<template>
  <div class="pages addPages">
    <el-form
      :inline="true"
      :model="form"
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
            >
            </el-date-picker>
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
          <el-form-item label="采购订单号">
            <span v-if="type === 'detail'">{{ form.linkNumber }}</span>
            <el-input
              v-else
              v-model="form.linkNumber"
              @focus="selectBasicInfo"
            ></el-input>
            <!-- <el-select v-else v-model="form.linkNumber" @change="changeLinkNumber">
              <el-option v-for="item of linknumberOption" :key="item.id" :label="item.orderSn" :value="item.orderSn"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购类型">
            <span v-if="type === 'detail'">{{ form.purTypeName }}</span>
            <div v-else>
              <el-select
                v-if="form.linkNumber === ''"
                v-model="form.purTypeId"
                @change="changeTypes"
              >
                <el-option
                  v-for="item of typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                <!-- <span class="add-option" @click="handleAddType">
                  <i class="el-icon-plus"></i>
                  新增
                </span> -->
              </el-select>
              <el-input v-else disabled v-model="form.purTypeName"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商">
            <span v-if="type === 'detail'">{{ form.supplierName }}</span>
            <el-input
              v-else
              v-model="form.supplierName"
              @focus="selectCustomer"
              :disabled="form.linkNumber !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购部门">
            <span v-if="type === 'detail'">{{ form.purchaseDepot }}</span>
            <el-input
              v-else
              v-model="form.purchaseDepot"
              @focus="selectDepot"
              :disabled="form.linkNumber !== ''"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购员">
            <span v-if="type === 'detail'">{{ form.purchaseMan }}</span>
            <el-input
              v-else
              v-model="form.purchaseMan"
              @focus="selectUser"
              :disabled="form.linkNumber !== '' || form.purchaseDepot === ''"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="送货单号">
            <span v-if="type === 'detail'">{{ form.sendOrderNo }}</span>
            <el-input v-else v-model="form.sendOrderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号">
            <span v-if="type === 'detail'">{{ form.carLicense }}</span>
            <el-input v-else v-model="form.carLicense"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="采购类型">
            <el-select>
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <!-- <el-row>
        <el-form-item label="扫码">
          <el-input></el-input>
        </el-form-item>
      </el-row> -->
      <el-row>
        <el-table
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
          class="detail-table"
        >
          <el-table-column type="index" align="center" width="130px">
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
            v-if="form.linkNumber === ''"
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
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <el-image :src="row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品编号" prop="productSn" width="160px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.productSn }}</span>
              <el-input
                v-else
                v-model="row.productSn"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品" prop="productName" width="120px">
          </el-table-column>
          <el-table-column label="规格型号" prop="model"> </el-table-column>
          <el-table-column label="单位" prop="sp1"> </el-table-column>
          <el-table-column label="仓库名称" prop="depotName" width="120px">
            <template slot-scope="{ row }">
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
          <el-table-column label="现存量" prop="stock" v-if="type === 'add'">
          </el-table-column>
          <el-table-column
            v-if="type === 'add'"
            label="采购数量"
            prop="purchaseNum"
          >
          </el-table-column>
          <el-table-column label="进货数量" prop="num" width="120px">
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
            v-if="type === 'add'"
            label="已进货数量"
            prop="productSendNum"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            v-if="type === 'detail'"
            label="验收数量"
            prop="checkNum"
          >
          </el-table-column>
          <el-table-column
            v-if="type === 'detail'"
            label="验退数量"
            prop="refundNum"
          >
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
          </el-table-column>
          <!-- <el-table-column label="到货日期" prop="createTime">
          </el-table-column> -->
          <el-table-column label="备注" prop="note">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.note }}</span>
              <el-input v-else v-model="row.note"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="是否赠品" width="120px">
            <template slot-scope="{row}">
              <span v-if="type === 'detail'">{{row.type}}</span>
              <el-select v-else v-model="row.type">
                <el-option :value="1" label="普通商品"></el-option>
                <el-option :value="2" label="赠品"></el-option>
              </el-select>
            </template>
          </el-table-column> -->
        </el-table>
      </el-row>
      <el-row>
        <el-form-item label="合格证书">
          <upload-file
            @on-success="handleSuccess"
            @on-remove="handleRemove"
            :imageList="file"
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
          <el-form-item label="开票类型">
            <span v-if="type === 'detail'">{{ form.taxType }}</span>
            <el-select v-else v-model="form.taxType">
              <el-option
                value="增值税专用发票"
                label="增值税专用发票"
              ></el-option>
              <el-option value="普通发票" label="普通发票"></el-option>
              <el-option value="专业发票" label="专业发票"></el-option>
              <el-option value="其他" label="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ form.createPersonName }}</span>
            <el-input
              v-else
              v-model="form.createPersonName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="type === 'detail'">
          <el-form-item label="审核人">
            <span>{{ form.checkPerson }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <div>
          <el-button v-if="!examine" @click="handleBack" size="small">取消</el-button>
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
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog
      :visible.sync="showBasicInfo"
      append-to-body
      width="40%"
      title="选择采购订单号"
    >
      <basic-info
        @on-cancel="closeBasicInfo"
        @on-submit="changeLinkNumber"
        type="purchase"
        name="采购订单号"
      ></basic-info>
    </el-dialog>
  </div>
</template>

<script>
import { getId } from "@/api/common";
import { getPurchaseOrderById } from "@/api/purchase/common";
import {
  addOrUpdatePurchaseStockOrder,
  getBasicPurchaseInfoByType,
} from "@/api/purchase/purchaseInbound";
import common from "@/mixins/common";
import depotList from "@/mixins/depot";
import addTypes from "@/mixins/addType";
import productSelect from "@/components/productSelect";
import uploadFile from "@/components/uploadFile";
import upload from "@/mixins/upload";
import { formatter } from "@/util/util";
import basicInfo from "@/components/basicInfo";
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
  name: "addPurchaseInbound",
  data() {
    return {
      requesting: false,
      types: "采购",
      menu: "采购进货",
      module: 1, // 新增类型使用，采购是1
      tableData: [
        {
          depotId: "",
          productId: "",
          pic: "",
        },
      ],
      form: {
        linkNumber: "",
        supplierId: "",
        purchaseDepotId: "",
        purchaseDepot: "",
        purchaseManId: "",
        purTypeId: "",
        carLicense: "",
        file: "", // 附件上传
      },
      show: false, // 展示选择产品
      file: [],
      showBasicInfo: false,
    };
  },
  components: {
    productSelect,
    uploadFile,
    basicInfo,
  },
  mixins: [common, depotList, addTypes, upload],
  created() {
    if (this.type === "add") {
      // this.getOrderSn()
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createPersonName = info.content["nick_name"];
      // const dates = new Date();
      // this.form.createTime =  formatter.date(dates, "yyyy-MM-dd")
    } else {
      this.form = this.data;
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
      this.tableData = this.data.purchaseStockItemList;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    // })
  },
  methods: {
    handleAdd() {
      this.tableData.push({});
    },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
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
      this.form.file.push(result.url);
      this.fileList.push({ name: result.name, url: file.url });
      return false;
    },
    addProductList(list) {
      // 处理选择的商品数据
      this.show = false;
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item, index) => {
        const obj = {
          productSn: item.productSn, // 编号
          productName: item.name, // 名称
          productId: item.id,
          stock: "", // 库存
          model: item.model, // 型号
          sp1: item.unitName, // 单位
          realAmount: item.purPriceSuggest, // 价格
          num: 1,
          purchaseNum: 0,
          salePrice: 1 * item.purPriceSuggest,
          note: "",
          type: "",
          depotId: "", // 仓库
          depotName: "",
          checkNum: "", // 验收数量
          refundNum: "", // 验退数量
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
    async changeLinkNumber(val) {
      // 改变源单号
      // debugger
      this.showBasicInfo = false;
      this.form.purTypeName = val.subTypeName;
      this.form.purTypeId = val.subTypeId;
      this.form.linkNumber = val.orderSn;
      const id = val.id;
      this.tableData = [];
      await getPurchaseOrderById({ id: id }).then((res) => {
        const data = res.data.data;
        this.form.supplierName = data.supplierName;
        this.form.supplierId = data.supplierId;
        this.form.purchaseDepot = data.purchaseDepot;
        this.form.purchaseDepotId = data.purchaseDepotId;
        this.form.purchaseMan = data.purchaseMan;
        this.form.purchaseManId = data.purchaseManId;
        data.purchaseOrderItemList.forEach((item) => {
          const obj = {
            // 查询的订单就是新增的商品表tableData的数据，不可修改
            purchaseItemId: item.id,
            pic: item.pic,
            productName: item.productName,
            productId: item.productId,
            productSn: item.productSn,
            model: item.model,
            sp1: item.sp1,
            stock: "",
            num: item.num - item.productSendNum, // 进货数量等于采购数量-已进货数量
            purchaseNum: item.num, // 采购数量
            productSendNum: item.productSendNum, // 已进货数量
            realAmount: item.realAmount,
            salePrice: item.salePrice,
            note: item.sp2,
            type: item.type,
            depotId: "", // 仓库
            depotName: "",
            checkNum: "", // 验收数量
            refundNum: "", // 验退数量
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
    async getOrderSn() {
      // 获取单据编号
      const res = await getId({ codeName: "采购进货" });
      this.form.number = res.data.data;
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
    async submit() {
      const params = {
        purchaseOrderAddRequest: {
          ...this.form,
          purchaseStockItemList: this.tableData,
          file: this.file.join(","),
        },
        codeName: "采购进货",
      };
      // params.file = params.file.join(',')
      this.requesting = true;
      try {
        const res = await addOrUpdatePurchaseStockOrder(params);
        this.requesting = false;
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/purchaseManage/purchaseInbound",
        });
      } catch {
        this.requesting = false;
      }
    },
    handleBack() {
      this.$router.push({
        path: "/purchaseManage/purchaseInbound",
      });
    },
    handleSuccess(data) {
      this.form.file.push(data.url);
    },
    selectBasicInfo() {
      this.showBasicInfo = true;
    },
    closeBasicInfo() {
      this.showBasicInfo = false;
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
