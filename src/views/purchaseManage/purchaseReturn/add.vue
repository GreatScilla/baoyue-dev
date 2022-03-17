
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
          <el-form-item label="供应商">
            <span v-if="type === 'detail'">{{ form.supplierName }}</span>
            <el-input
              v-else
              v-model="form.supplierName"
              @focus="selectCustomer"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退货日期">
            <span v-if="type === 'detail'">{{ form.sendTime }}</span>
            <el-date-picker
              v-else
              v-model="form.sendTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="退货仓库">
            <span v-if="type === 'detail'">{{form.depotName}}</span>
             <el-select v-else v-model="form.depotId" @change="changeReturnDepot">
                <el-option v-for="item of depotList" :key="item.id" :label="item.depotName" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row class="margin-bottom-20">
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
          <el-table-column width="80" align="center" v-if="type !== 'detail'">
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
              <el-image :src="row.file"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productName" width="140px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productName }}</span>
              <el-input
                v-else
                v-model="row.productName"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品编号" prop="productSn"> </el-table-column>
          <el-table-column label="规格型号" prop="model"> </el-table-column>
          <el-table-column label="单位" prop="sp1"> </el-table-column>
          <el-table-column label="仓库名称" width="140px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.depotName }}</span>
              <el-select
                v-else
                v-model="row.depotId"
                @change="(val) => changeDepot(val, $index, 'rowDepot')"
              >
                <el-option
                  v-for="item of row.depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="productNum" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productNum }}</span>
              <el-input
                v-else
                v-model="row.productNum"
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="productPrice" width="120px">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productPrice }}</span>
              <el-input
                v-else
                v-model="row.productPrice"
                  
                @blur="(val) => calSalePrice(val, $index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="退货金额" prop="allPrice" width="120px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.allPrice }}</span>
              <el-input v-else v-model="row.allPrice" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="note">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.note }}</span>
              <el-input v-else v-model="row.note"></el-input>
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
            <span v-if="type === 'detail'">{{ returnAmount }}</span>
            <el-input v-else v-model="returnAmount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <span v-if="type === 'detail'">{{ form.note }}</span>
            <el-input v-else type="textArea" v-model="form.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row> </el-row>
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
        <div class="title">物流信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人">
            <span v-if="type === 'detail'">{{
              form.shipInformation.linkName
            }}</span>
            <el-input v-else v-model="form.shipInformation.linkName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <span v-if="type === 'detail'">{{
              form.shipInformation.linkPhone
            }}</span>
            <el-input
              v-else
              v-model="form.shipInformation.linkPhone"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="到货地址">
          <div v-if="type === 'detail'">
            <span>{{ this.form.shipInformation.sendArea }}</span
            ><span>{{ form.shipInformation.sendAddress }}</span>
          </div>
          <div v-else>
            <v-distpicker
              @selected="selected"
              :province="sendArea[0]"
              :city="sendArea[1]"
              :area="sendArea[2]"
            ></v-distpicker>
            <el-input v-model="form.shipInformation.sendAddress"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开票类型">
            <el-select v-if="type !== 'detail'" v-model="form.taxType">
              <el-option
                value="增值税专用发票"
                label="增值税专用发票"
              ></el-option>
              <el-option value="普通发票" label="普通发票"></el-option>
              <el-option value="专业发票" label="专业发票"></el-option>
              <el-option value="其他" label="其他"></el-option>
            </el-select>
            <span v-else>{{ form.taxType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="结算方式">
            <el-input></el-input>
          </el-form-item> -->
          <el-form-item label="制单人">
            <el-input v-model="form.createUserName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核人" v-if="type === 'detail'">
            <!-- <el-input></el-input> -->
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
    <el-dialog :visible.sync="show" append-to-body width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/mixins/common";
// import depot from '@/mixins/depot'
import { findDepotByProductId } from "@/api/common";
import productSelect from "@/components/productSelect";
import { addOrUpdatePurchaseReturn } from "@/api/purchase/return";
import { getId } from "@/api/common";
import upload from "@/mixins/upload";
import { formatter } from "@/util/util";
export default {
  name: "addPurchaseReturn",
  mixins: [common, upload],
  components: {
    productSelect,
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
      module: "采购退货",
      tableData: [
        {
          requesting: false,
          file: "",
          productName: "",
          productSn: "",
          specificationName: "",
          sp1: "",
          depotId: "",
          depotName: "",
          productNum: "",
          productPrice: "",
          allPrice: "",
          productId: "",
        },
      ],
      form: {
        sendTime: "",
        shipInformation: {
          linkPhone: "",
        }, // 物流信息
        discountAmount: 0,
      },
      file: [],
      show: false, // 展示产品
      sendArea: [],
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
  created() {
    if (this.type === "add") {
      // this.getOrderSn()
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUserName = info.content["nick_name"];
      const dates = new Date();
      this.form.sendTime = formatter.date(dates, "yyyy-MM-dd");
    } else {
      this.form = this.data;
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
      this.tableData = this.data.shopOrderReturnDetail;
      this.sendArea = this.form.shipInformation.sendArea.split(",");
    }
  },
  mounted() {},
  methods: {
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
    selected(value) {
      this.sendArea[0] = value.province.value;
      this.sendArea[1] = value.city.value;
      this.sendArea[2] = value.area.value;
    },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
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
          productId: item.id, // 产品id
          stock: item.stock, // 库存
          model: item.model, // 型号
          sp1: item.unitName, // 单位
          depotId: "",
          depotName: "",
          productPrice: item.purPriceSuggest, // 单价
          pic: item.pic, // 图片
          allPrice: 1 * item.purPriceSuggest, // 退货金额
          productNum: 1, // 数量
          note: "",
        };
        findDepotByProductId(obj.productId).then((res) => {
          obj.depotList = res.data.data;
        });
        setTimeout(() => {
          this.tableData.push(obj);
        }, 1000);
      });
      this.tableData = this.tableData.filter((ele) => {
        if (!ele.productName || Object.keys(ele).length === 0) {
          return false;
        } else {
          return true;
        }
        this.tableData.push({});
        this.tableData.pop();
      });
    },
    calSalePrice(val, index) {
      // 计算采购金额
      this.tableData[index].allPrice =
        this.tableData[index].productPrice * this.tableData[index].productNum;
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
    async getOrderSn() {
      // 获取单据编号
      const res = await getId({ codeName: "采购退货" });
      this.form.returnOrderSn = res.data.data;
    },
    // changeReturnDepot (val) {
    //   this.depotList.forEach(item => {
    //     if (item.id === val) {
    //       this.form.depotName = item.depotName
    //     }
    //   })
    // },
    submit() {
      this.form.totalAmount = this.totalAmount;
      this.form.returnAmount = this.returnAmount;
      const params = {
        orderReturnRequest: {
          ...this.form,
          shopOrderReturnDetail: this.tableData,
          file: this.file.join(","),
        },
        codeName: "采购退货",
      };
      params.orderReturnRequest.shipInformation.sendArea =
        this.sendArea.join(",");
      this.requesting = true;
      addOrUpdatePurchaseReturn(params)
        .then((res) => {
          this.requesting = false;
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/purchaseManage/purchaseReturn");
        })
        .catch((e) => {
          this.requesting = false;
        });
    },
    handleBack() {
      this.$router.push("/purchaseManage/purchaseReturn");
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
