<template>
  <div class="pages addPages">
    <el-row>
      <div class="title">基本信息</div>
      <el-divider class="detail-divider"></el-divider>
    </el-row>
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
              v-else
              disabled
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据编号">
            <span v-if="type === 'detail'">{{ form.pricingSn }}</span>
            <el-input v-else v-model="form.pricingSn" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商名称">
            <span v-if="type === 'detail'">{{ form.supplierName }}</span>
            <el-input
              v-else
              v-model="form.supplierName"
              @focus="selectCustomer"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="title">订单明细</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-table :data="tableData" border class="detail-table">
          <el-table-column type="index" align="center" width="80px">
            <template slot="header">
              <i class="el-icon-plus icon-size" @click="handleAdd"></i>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <i
                v-if="scope.row.status !== 1"
                class="el-icon-minus icon-size"
                @click="handleDelete(scope.$index, tableData)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <el-image :src="row.productPic"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" prop="productSn" width="160px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.productSn }}</span>
              <el-input
                v-else
                v-model="row.productSn"
                :disabled="row.status"
                @focus="showProduct($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            prop="productName"
            width="120px"
          ></el-table-column>
          <!-- <el-table-column
            label="产品分类"
            prop="productCategoryName"
          ></el-table-column> -->
          <el-table-column label="规格型号" prop="model"></el-table-column>
          <el-table-column label="单位" prop="purchaseUnit"></el-table-column>
          <el-table-column label="生效时间" prop="startTime" width="160px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.startTime }}</span>
              <el-date-picker
                v-else
                v-model="row.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="row.traceStart"
                @focus="changeTraceStart(row)"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="失效日期" prop="endTime" width="160px">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.endTime }}</span>
              <el-date-picker
                v-else
                v-model="row.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="row.traceEnd"
                @focus="changeTraceEnd(row)"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="money">
            <template slot-scope="{ row, $index }">
              <span v-if="type === 'detail'">{{ row.productPrice }}</span>
              <el-input v-else v-model="row.productPrice"  ></el-input>
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
      <el-row style="margin-top: 20px">
        <el-form-item label="上传附件">
          <upload-file
            @on-success="handleSuccess"
            @on-remove="handleRemove"
            :imageList="file"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-row class="footer-box margin-top-20">
        <el-button v-if="!examine" @click="cancel" size="small">取消</el-button>
        <el-button
         v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="onCheck"
          :loading="requesting"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择供应商">
      <customer
        category="1"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <el-dialog :visible.sync="show" append-to-body width="80%">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
  </div>
</template>

<script>
import {
  addPricingManage,
  updatePricingManage,
  check,
} from "@/api/purchase/pricing";
import common from "@/mixins/common";
import productSelect from "@/components/productSelect";
import uploadFile from "@/components/uploadFile";
import upload from "@/mixins/upload";
// import { delete } from 'vue/types/umd';
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
  name: "addPricing",
  data() {
    return {
      requesting: false,
      tableData: [
        {
          depotId: "",
          productId: "",
          pic: "",
          startTime: "", //生效时间
          endTime: "", //失效时间
        },
      ],
      form: {},
      show: false, // 展示选择产品
      file: [],
    };
  },
  components: {
    productSelect,
    uploadFile,
  },
  mixins: [common, upload],
  created() {
    const info = JSON.parse(localStorage.getItem("saber-userInfo"));
    this.form.createPersonName = info.content["nick_name"];
    if (this.type !== "add") {
      this.form.createTime = this.data.createTime;
      this.form.status = this.data.status;
      this.form.pricingSn = this.data.pricingSn;
      this.form.supplierName = this.data.supplierName;
      this.form.supplierId = this.data.supplierId;
      this.tableData = this.data.pricingManageDetails;
      if (this.form.status === 1) {
        this.tableData.forEach((el) => {
          el.status = 1;
        });
      }
      console.log(this.tableData);
      this.form.id = this.data.id;
      this.file = this.data.file.split(" ");
    }
  },
  mounted() {
    // this.$nextTick(() => {
    // })
  },
  methods: {
    changeTraceStart(item) {
      //生效时间限制
      if (item.startTime !== null) {
        //当前值为空 也会进行判断 所以条件最好不要非空验证
        item.traceEnd = {
          disabledDate: (time) => {
            return time.getTime() < new Date(item.startTime).getTime(); //小于开始时间的不选
          },
        };
      } else {
        item.traceEnd = {};
      }
    },
    changeTraceEnd(item) {
      //失效时间限制
      if (item.endTime !== null) {
        //当前值为空 也会进行判断 所以条件最好不要非空验证
        item.traceStart = {
          disabledDate: (time) => {
            return time.getTime() > new Date(item.endTime).getTime(); //大于结束时间的不选
          },
        };
      } else {
        item.traceStart = {};
      }
    },
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
    addProductList(list) {
      // 处理选择的商品数据
      this.show = false;
      console.log(list);
      list.forEach((item, index) => {
        const obj = {
          productSn: item.productSn, // 编码
          productName: item.name, // 名称
          productCategoryName: item.productCategoryName, //产品分类
          productId: item.id,
          model: item.model, // 型号
          purchaseUnit: item.unitName, // 单位
          money: item.purPriceSuggest, // 价格
          note: "",
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
        // if (index === 0) {
        //   this.tableData[this.currentIndex] = obj
        // } else {
        //   this.tableData.push(obj)
        // }
      });
    },
    async onCheck() {
      //先检验
      this.tableData.forEach((el) => {
        if (el.endTime) {
          el.endTime += " 23:59:59";
        }
        if (el.startTime) {
          el.startTime += " 00:00:00";
        }
        delete el.traceEnd;
        delete el.traceStart;
      });
      this.form.file = this.file.join(",");
      const params = {
        data: {
          ...this.form,
          pricingManageDetails: this.tableData,
        },
        codeName: "采购核价",
      };
      const res = await check(params);
      if (res.data.data.code === 200) {
        this.submit(params);
      } else if (res.data.data.code === 400) {
        this.$confirm(res.data.data.msg, "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: (action, instance) => {
            if (action === "confirm") {
              this.submit(params);
            } else if (action === "cancel") {
              return;
            }
          },
        });
      }
    },
    async submit(params) {
      if (this.tableData.length === 0) {
        return this.$message.error("产品不能为空!");
      }
      let submitApi = "";
      if (this.type === "add") {
        submitApi = addPricingManage;
      } else {
        submitApi = updatePricingManage;
      }
      this.requesting = true;
      try {
        const res = await submitApi(params);
        this.requesting = false;
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/purchaseManage/pricing",
        });
      } catch {
        this.requesting = false;
      }
    },
    cancel() {
      //返回
      this.$router.push({
        path: "/purchaseManage/pricing",
      });
    },
  },
};
</script>