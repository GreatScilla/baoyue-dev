// 产品数据新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">基本信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form
        label-width="140px"
        :model="form"
        inline-message
        ref="form"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              prop="name"
              required
              :label="pallet !== 'pallet' ? '产品名称：' : '托盘名称：'"
            >
              <span v-if="type === 'detail'"> {{ form.name }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.name"
                placeholder="请输入产品名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="规格型号：">
              <span v-if="type === 'detail'"> {{ form.model }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.model"
                placeholder="请输入产品型号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="长：">
              <span v-if="type === 'detail'"> {{ form.length }}</span>
              <el-input
                size="small"
                  
                v-model="form.length"
                placeholder="请输入"
                @input="changeInput($event)"
                v-else
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="高：">
              <span v-if="type === 'detail'"> {{ form.high }}</span>
              <el-input
                size="small"
                  
                v-model="form.high"
                placeholder="请输入"
                @input="changeInput($event)"
                v-else
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="关联BOM：" v-if="form.productType == '1'">
              <el-select
                size="small"
                :disabled="type === 'detail'"
                v-model="form.bomSn"
              >
                <el-option
                  v-for="item in associatedList"
                  :key="item.id"
                  :label="item.proBomName"
                  :value="item.bomSn"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="type === 'detail'" required label="产品编码：">
              <span> {{ form.productSn }}</span>
            </el-form-item>
            <el-form-item
              prop="productList"
              required
              :label="pallet !== 'pallet' ? '产品分类：' : '托盘分类：'"
            >
              <span v-if="type === 'detail'">
                {{ form.productCategoryName }}</span
              >
              <el-cascader
                v-else
                v-model="form.productList"
                :options="productCateList"
                :props="cateProp"
                :disabled="this.pallet ? true : false"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="单重：">
              <span v-if="type === 'detail'"> {{ form.weight }}</span>
              <el-input
                size="small"
                  
                v-model="form.weight"
                placeholder="请输入单重"
                v-else
              >
                <template slot="append">KG</template>
              </el-input>
            </el-form-item>
            <el-form-item label="宽：">
              <span v-if="type === 'detail'"> {{ form.width }}</span>
              <el-input
                size="small"
                  
                v-model="form.width"
                placeholder="请输入"
                @input="changeInput($event)"
                v-else
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="singleModeVolume" label="单模体积：">
              <span v-if="type === 'detail'"> {{ form.singleModeVolume }}</span>
              <el-input
                size="small"
                  
                v-model="form.singleModeVolume"
                placeholder="请输入"
                v-else
              >
                <template slot="append">方</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="productGrade" required label="产品层级：">
              <span v-if="operationState === 'details'">
                {{ form.productGrade | statusName }}</span
              >
              <el-select
                v-else
                size="small"
                @change="changeProductGrade"
                :disabled="type === 'detail'"
                v-model="form.productGrade"
                value-key="label"
              >
                <el-option
                  v-for="item in productGradeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="permission.product_data_isStatus" :span="8">
            <el-form-item label="是否启用：">
              <el-switch
                :disabled="type === 'detail'"
                v-model="form.status"
                active-value="0"
                inactive-value="1"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col v-if="permission.product_data_isSometimes" :span="8">
            <el-form-item label="同进同出">
              <el-switch
                :disabled="type === 'detail'"
                v-model="form.isSometimes"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col v-if="permission.product_data_isExemption" :span="8">
            <el-form-item label="是否免检：">
              <el-switch
                :disabled="type === 'detail'"
                v-model="form.isExemption"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="display: flex">
            <div class="title" style="margin-right: 20px">
              {{ pallet !== "pallet" ? "产品信息" : "托盘信息" }}
            </div>
            <el-radio-group
              @change="changeProductType"
              v-model="form.productType"
            >
              <el-radio
                :disabled="operationState === 'details'"
                v-model="form.productType"
                label="1"
              >
                自制件
              </el-radio>
              <el-radio
                v-if="pallet !== 'pallet'"
                :disabled="operationState === 'details'"
                v-model="form.productType"
                label="2"
              >
                委外件
              </el-radio>
              <el-radio
                v-if="pallet !== 'pallet'"
                :disabled="operationState === 'details'"
                v-model="form.productType"
                label="3"
              >
                外购件
              </el-radio>
            </el-radio-group>
          </div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-row v-if="pallet !== 'pallet'">
          <el-col :span="12">
            <el-form-item label="供应商：">
              <el-select
                size="small"
                :disabled="type === 'detail'"
                v-model="form.supplierId"
              >
                <el-option
                  v-for="item in supplierList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="库存上限：">
              <!-- <span v-if="type === 'detail'"> {{ form.purchaseMax }}</span>
              <el-input
                v-else
                v-int
                size="small"
                v-model="form.purchaseMax"
                placeholder="请输入库存上限"
              >
              </el-input> -->
              <span v-if="type === 'detail'"> {{ form.stockMax }}</span>
              <el-input
                v-else
                v-int
                size="small"
                v-model="form.stockMax"
                placeholder="请输入库存上限"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="库存下限：">
              <span v-if="type === 'detail'"> {{ form.stockMin }}</span>
              <el-input
                v-else
                v-int
                size="small"
                v-model="form.stockMin"
                placeholder="请输入库存下限"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="产品有效期：">
              <span v-if="type === 'detail'"> {{ form.expTime }}天</span>
              <el-input
                v-else
                size="small"
                v-int
                v-model="form.expTime"
                placeholder="请输入产品有效期"
              >
                <span slot="append"> 天 </span>
              </el-input>
            </el-form-item>
            <el-form-item label="采购提前期：">
              <span v-if="type === 'detail'">
                {{ form.purchasePreItem }}天</span
              >
              <el-input
                size="small"
                v-int
                v-model="form.purchasePreItem"
                v-else
              >
                <span slot="append">天</span>
              </el-input>
            </el-form-item>
            <el-form-item label="预计销售周期：">
              <span v-if="type === 'detail'"> {{ form.saleItem }}天</span>
              <el-input
                size="small"
                v-model="form.saleItem"
                v-int
                placeholder="请输入"
                v-else
              >
                <span slot="append">天</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="lossScale" label="损耗率：">
              <span v-if="type === 'detail'"> {{ form.lossScale }}</span>
              <el-input
                size="small"
                v-input-limit="2"
                v-model="form.lossScale"
                placeholder="请输入损耗率"
                v-else
              >
              </el-input>
            </el-form-item>
            <el-form-item label="安全库存：">
              <span v-if="type === 'detail'"> {{ form.stockSafe }}</span>
              <el-input
                v-else
                  
                size="small"
                v-model="form.stockSafe"
                placeholder="请输入安全库存"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="计价方式：">
              <span v-if="type === 'detail'"> {{ form.priceType }}</span>
              <el-select
                size="small"
                v-model="form.priceType"
                placeholder="请选择"
                v-else
              >
                <el-option label="先进先出法" :value="1"></el-option>
                <el-option label="个别计价法" :value="2"></el-option>
                <el-option label="全月平均法" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="失效提前期：">
              <span v-if="type === 'detail'"> {{ form.expPreTime }}天</span>
              <el-input v-else size="small" v-int v-model="form.expPreTime">
                <span slot="append"> 天 </span>
              </el-input>
            </el-form-item>
            <el-form-item label="采购入库超量上限：">
              <span v-if="type === 'detail'"> {{ form.stockMax }}%</span>
              <el-input size="small"    v-model="form.stockMax" v-else>
                <span slot="append">%</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">价格策略</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-form-item label="是否含税：" v-if="pallet !== 'pallet'">
          <el-radio
            :disabled="type === 'detail'"
            v-model="form.contTax"
            :label="1"
            >含税
          </el-radio>
          <el-radio
            :disabled="type === 'detail'"
            v-model="form.contTax"
            :label="0"
            >不含税
          </el-radio>
        </el-form-item>
        <el-form-item label="可开具票类型：" v-if="pallet !== 'pallet'">
          <el-checkbox-group
            :disabled="type === 'detail'"
            @change="selectReceiptType"
            v-model="form.receiptTypeList"
          >
            <el-checkbox label="增值税专用发票"></el-checkbox>
            <el-checkbox label="增值税普通发票"></el-checkbox>
            <el-checkbox label="普通发票"></el-checkbox>
            <el-checkbox label="收款收据"></el-checkbox>
            <el-checkbox label="其它"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提成比例：" v-if="pallet !== 'pallet'">
              <span v-if="type === 'detail'"> {{ form.commissionScale }}%</span>
              <el-input
                size="small"
                  
                v-model="form.commissionScale"
                v-else
              >
                <span slot="append">%</span>
              </el-input>
            </el-form-item>
            <el-form-item required label="采购单位：" prop="purchaseUnitList">
              <span v-if="type === 'detail'">{{ form.purchaseUnitName }}</span>
              <el-cascader
                v-else
                v-model="form.purchaseUnitList"
                :options="unitList"
                :props="{ label: 'name', value: 'id', children: 'unitList' }"
                @change="changePurchaseUnitName"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="库存单位：" required>
              <span v-if="type === 'detail'">{{ form.unitName }}</span>
              <el-cascader
                v-else
                v-model="form.unitList"
                :options="unitList"
                :props="{ label: 'name', value: 'id', children: 'unitList' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="换算比例：">
              <span v-if="type === 'detail'">
                {{ form.purchaseCovertScale }}%</span
              >
              <el-input
                size="small"
                v-int
                v-model="form.purchaseCovertScale"
                placeholder="请选择"
                v-else
              >
                <span slot="append">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建议进价：" v-if="pallet !== 'pallet'">
              <span v-if="type === 'detail'"> {{ form.purPriceSuggest }}</span>
              <el-input
                size="small"
                  
                v-model="form.purPriceSuggest"
                placeholder="请选择"
                v-else
              >
              </el-input>
            </el-form-item>
            <el-form-item label="最高进价：" v-if="pallet !== 'pallet'">
              <span v-if="type === 'detail'"> {{ form.purPriceMax }}</span>
              <el-input
                size="small"
                  
                v-model="form.purPriceMax"
                placeholder="请选择"
                v-else
              >
              </el-input>
            </el-form-item>
            <el-form-item label="建议售价：" v-if="pallet !== 'pallet'">
              <span v-if="type === 'detail'"> {{ form.priceSuggest }}</span>
              <el-input
                  
                size="small"
                v-model="form.priceSuggest"
                placeholder="请选择"
                v-else
              >
              </el-input>
            </el-form-item>
            <el-form-item label="最低售价：" v-if="pallet !== 'pallet'">
              <span v-if="type === 'detail'"> {{ form.priceMin }}</span>
              <el-input
                size="small"
                  
                v-model="form.priceMin"
                placeholder="请选择"
                v-else
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">图片信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-form-item  label="产品图片：">
          <upload-file
            v-if="type !== 'detail'"
            listType="picture-card"
            :imageList="fileList"
            @on-success="onSuccess"
            @on-remove="onRemove"
          >
          </upload-file>
          <div class="block" v-for="fit in fileList" :key="fit">
            <el-image style="width: 100px; height: 100px" :src="fit"></el-image>
          </div>
        </el-form-item>
        <el-row>
          <div class="title">产品备注</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-form-item label="备注说明：">
          <span v-if="type === 'detail'"> {{ form.remark }}</span>
          <el-input
            v-else
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        size="small"
        type="primary"
        v-if="type !== 'detail'"
        @click="save"
        >保存
      </el-button>
    </el-row>
  </basic-container>
</template>

<script>
import {
  saveOrUpdateProduct,
  listProductByCate,
  listSupplier,
  getUnitTree,
  productDetail,
} from "@/api/base-data/product-data.js";
import uploadFile from "@/components/uploadFile";
import { getProductBomList } from "@/api/product/product-bom.js";
import { getCode, upload } from "@/api/common";
import uploadUrl from "@/config/uploadConfig";
import { saveOrUpdateProductCate } from "@/api/product/pruduct-categroy";
import { mapGetters } from "vuex";
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
  },
  data() {
    return {
      productGradeList: [
        { value: "1", label: "成品" },
        { value: "2", label: "半成品" },
      ],
      productGradeList2: [
        { value: "1", label: "成品" },
        { value: "2", label: "半成品" },
      ],
      productGradeList1: [
        { value: "1", label: "成品" },
        { value: "2", label: "半成品" },
        { value: "3", label: "原材料" },
      ],
      ProductType: "",
      form: {
        bomSn: "",
        status: 0,
        length: 0,
        width: 0,
        high: 0,
        name: "", // 产品名称
        productList: [],
        productCateId: [], // 产品分类Id
        model: "", // 产品型号
        specificationName: "", // 规格名称
        productType: "1", // 产品类型
        supplierId: "", // 供应商ID
        supplierName: "", // 供应商名称
        lossScale: "", // 损耗率
        purchasePreItem: "", // 采购提前期
        stockMax: "", // 采购入库超量上限
        stockSafe: "", // 安全库存
        saleItem: "", //  预计销售周期
        purchaseMax: "", // 库存上限
        stockMin: "", // 库存下限
        priceType: "", // 计价方式
        expTime: "", // 有效期
        expPreTime: "", // 失效提前期
        commissionScale: "", // 提成比例
        contTax: "", // 是否含税
        receiptType: "", // 发票类型
        receiptTypeList: [],
        unit: "", // 库存单位
        purchaseUnit: "", // 采购单位
        purchaseCovertScale: 100, //	换算比例
        purPriceSuggest: "", //建议进价
        purPriceMax: "", // 最高进价
        priceSuggest: "", // 建议售价
        priceMin: "", // 最低售价
        pic: "", // 图片链接地址
        remark: "", // 备注
        codeName: "产品数据",
        isSometimes: "0", //是否同进同出
        isExemption: "0", //是否检验
      },
      associatedList: [],
      productCateList: [], // 产品分类列表
      supplierList: [], // 供应商列表
      unitList: [], // 单位列表
      receiptTypeEnum: [
        "",
        "增值税专用发票",
        "增值税普通发票",
        "普通发票",
        "收款收据",
        "其它",
      ],
      cateProp: {
        label: "cateName",
        value: "id",
        // checkStrictly: true,
        children: "productCateList",
      },
      fileList: [],
      action: "",
      pallet: null, //新增托盘
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
        ],
        productList: [
          {
            required: true,
            message: "请选择产品分类",
            trigger: ["blur", "change"],
          },
        ],
        singleModeVolume: [
          {
            required: true,
            message: "请选择单模体积",
            trigger: ["blur", "change"],
          },
        ],
        // supplierId: [
        //   {
        //     required: true,
        //     message: "请选择供应商",
        //     trigger: ["blur", "change"],
        //   },
        // ],
        purchaseUnitList: [
          {
            required: true,
            message: "请选择采购单位",
            trigger: ["blur", "change"],
          },
        ],
        lossScale: [
          {
            required: true,
            message: "请输入损耗率",
            trigger: ["blur", "change"],
          },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  components: {
    uploadFile,
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    if (this.$route.query.data.productType == "1") {
      this.productGradeList=this.productGradeList2
    }else {
      this.productGradeList=this.productGradeList1
    }
    const res = await getProductBomList({ current: 1, size: 99999, status: 0 });
    console.log(res);
    this.associatedList = res.data.data.records;
  },
  async mounted() {
    this.action = `${uploadUrl}api/blade-base/file/upload`;
    await this.getInitResource();
    // 托盘产品分类
    if (this.$route.query.pallet) {
      this.pallet = this.$route.query.pallet;
      // 新增托盘产品分类默认是托盘
      this.selectedPallet(this.productCateList);
      this.form.productType = 1;
    }

    if (this.$route.query.data && !this.$route.query.pallet) {
      this.form = this.$route.query.data;
      if (this.form.productCategoryName === "托盘/托盘") {
        this.pallet = "pallet";
      }
    } else if (this.type !== "add" && this.$route.query.pallet) {
      let res = await productDetail({ id: this.data.productId });
      this.form = res.data.data;
      console.log(this.form);
      // Object.assign(this.form,res.data.data)
    }

    if (this.form.productCateIds) {
      this.form.productList = this.form.productCateIds.split(",");
    }
    if (this.form.purchaseUnit) {
      this.form.purchaseUnitList = this.form.purchaseUnit.split(",");
    }
    if (this.form.unit) {
      this.form.unitList = this.form.unit.split(",");
    }
    if (this.form.receiptType) {
      this.form.receiptTypeList = this.form.receiptType
        .split(",")
        .map((ele) => {
          return this.receiptTypeEnum[Number(ele)];
        });
    } else {
      this.form.receiptTypeList = [];
    }
    if (this.form.pic) {
      console.log(this.form.pic);
      //加载编辑时的图片列表
      this.fileList = this.form.pic.split(",").map((ele) => {
        return `${uploadUrl}${ele}`;
      });
      console.log("load", this.fileList);
    }
    if (this.form.specificationName) {
      this.form.specificationName = this.form.specificationName.split(",");
      this.form.length = this.form.specificationName[0];
      this.form.width = this.form.specificationName[1];
      this.form.high = this.form.specificationName[2];
    }
  },
  methods: {
    changeProductType(val) {
      this.ProductType = val;
      if (val == "1") {
        this.productGradeList = this.productGradeList2;
      } else {
        this.productGradeList = this.productGradeList1;
      }
    },
    async changeProductGrade(val) {
      if (this.form.productType == "1" || this.ProductType == "1") {
        const res = await getProductBomList({
          current: 1,
          size: 99999,
          status: 0,
          productGrade: val,
        });
        console.log(res);
        this.associatedList = res.data.data.records;
      }
    },
    // 附件上传
    onSuccess(value) {
      console.log(value);
      if (value) {
        this.fileList.push(value);
        console.log(this.fileList);
      }
    },
    // 附件删除
    onRemove(fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleBeforeUpload(param) {
      const fd = new FormData();
      fd.append("file", param.file);
      upload(fd).then((res) => {
        if (res.data.code === 200) {
          this.fileList.push({
            name: param.file.name,
            url: res.data.data.url,
          });
        }
      });
    },
    handleRemove(file) {
      console.log(file);
      console.log(this.fileList);
      this.fileList = this.fileList.filter((item) => item.url !== file.url);
      console.log(this.fileList);
    },
    // 选择采购单位
    changePurchaseUnitName(value) {
      console.log(value);
      this.form.unitList = value;
    },
    async getInitResource() {
      // 获取编码
      // const codeRes = await getCode({codeName: '产品数据'})
      // this.form.productSn = codeRes.data.data
      // 获取分类
      const productCateListRes = await listProductByCate();
      this.productCateList = productCateListRes.data.data;
      this.getTreeData(this.productCateList, "productCateList");
      // 获取供应商
      const listSupplierRes = await listSupplier();
      this.supplierList = listSupplierRes.data.data;

      // 获取单位
      const unitListRes = await getUnitTree();
      this.unitList = unitListRes.data.data;
    },

    // 剔除空级联 productCateList
    getTreeData(data, childrenName) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][childrenName].length < 1) {
          // children若为空数组，则将children设为undefined
          data[i][childrenName] = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i][childrenName], childrenName);
        }
      }
      return data;
    },

    // 输入框更新视图
    changeInput(e) {
      this.$forceUpdate();
    },

    // 保存
    save() {
      this.form.specificationName = `${this.form.length},${this.form.width},${this.form.high}`;
      if (this.form.productList && this.form.productList.length > 0) {
        this.form.productCateIds = this.form.productList.join();
        this.form.productCateId =
          this.form.productList[this.form.productList.length - 1];
      }
      if (this.form.unitList && this.form.unitList.length > 0) {
        this.form.unit = this.form.unitList.join();
      }
      if (this.form.purchaseUnitList && this.form.purchaseUnitList.length > 0) {
        this.form.purchaseUnit = this.form.purchaseUnitList.join();
      }
      if (this.fileList.length > 0) {
        const reg = new RegExp(uploadUrl, "g");
        const tempArr = this.fileList.map((file) => {
          if (!file.url) file = { url: file };
          file.url = file.url.replace(reg, "");
          return file.url;
        });
        this.form.pic = tempArr.join();
      }
      //  else {
      //   this.form.pic = "";
      //   return this.$message.error("请上传产品图片!");
      // }
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveOrUpdateProduct(this.form)
            .then((res) => {
              console.log(res.data.data.code);
              if (res.data.data.code === 200) {
                this.$message.success("保存成功");
                this.$router.back();
              } else {
                this.$message.error(res.data.data.msg);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancel() {
      this.$router.back();
    },

    reverseReceiptType() {},

    selectReceiptType(value) {
      if (this.form.receiptTypeList.length > 0) {
        let tempList = this.form.receiptTypeList.map((receiptType) => {
          if (receiptType === "增值税专用发票") {
            return 1;
          } else if (receiptType === "增值税普通发票") {
            return 2;
          } else if (receiptType === "普通发票") {
            return 3;
          } else if (receiptType === "收款收据") {
            return 4;
          } else if (receiptType === "其它") {
            return 5;
          } else {
            return receiptType;
          }
        });
        this.form.receiptType = tempList.join(",");
      }
    },

    selectedPallet(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].cateName === "托盘") {
          console.log(this.form);
          this.form.productList.push(data[i].id);
          if (data[i].productCateList) {
            this.selectedPallet(data[i].productCateList);
          }
        }
      }
      return this.form.productList;
    },
  },
  filters: {
    statusName(val) {
      if (val == 1) {
        return (val = "成品");
      }
      if (val == 2) {
        return (val = "半成品");
      }
      if (val == 3) {
        return (val = "原材料");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select,
.el-cascader {
  width: 360px;
}
</style>
