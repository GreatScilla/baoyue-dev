// 产品BOM新增、编辑、详情
<template>
  <basic-container>
    <el-form
      :model="formInline"
      ref="formInline"
      label-width="100px"
      :rules="rules"
      inline-message
      :show-message="false"
    >
      <el-row>
        <el-row>
          <div class="title">基本信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- <el-form-item label="清单编码:">
              <el-input disabled size="small" v-model="formInline.bomSn"></el-input>
            </el-form-item> -->
            <el-form-item prop="proBomName" label="清单名称:">
              <span v-if="type === 'detail'">{{ formInline.proBomName }}</span>
              <el-input
                v-else
                size="small"
                v-model="formInline.proBomName"
              ></el-input>
            </el-form-item>
            <el-form-item label="来源单据:">
              <span v-if="type === 'detail'">
                {{ formInline.billSn }}
              </span>
              <el-input
                v-else
                size="small"
                v-model="formInline.billSn"
              ></el-input>
            </el-form-item>
            <el-form-item label="领料方式:">
              <el-select
                :disabled="type === 'detail'"
                size="small"
                v-model="formInline.pickMaterielType"
              >
                <el-option label="正常领料" :value="1"></el-option>
                <el-option label="倒冲领料" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="清单类型:">
              <el-radio
                :disabled="type === 2"
                v-model="formInline.proBomType"
                :label="1"
                >主BOM</el-radio
              >
              <el-radio
                :disabled="type === 2"
                v-model="formInline.proBomType"
                :label="2"
                >辅BOM</el-radio
              >
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="清单来源:">
              <el-select
                :disabled="type === 'detail'"
                size="small"
                v-model="formInline.proBomFrom"
              >
                <el-option label="手动添加" :value="1"></el-option>
                <el-option label="设计" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父件数量:">
              <span>{{ formInline.num }}</span>
            </el-form-item>
            <el-form-item prop="bomGrade" required label="产品等级:">
              <span v-if="type === 'detail'">{{
                formInline.bomGrade | statusName
              }}</span>
              <el-select
                @change="changeProductGrade"
                v-else
                size="small"
                v-model="formInline.bomGrade"
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
          <el-col :span="12"> </el-col>
        </el-row>
      </el-row>
      <el-row>
        <!-- <el-row>
          <div class="title">父件信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row> -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item prop="productName" label="产品名称:">
              <span v-if="type === 'detail'">{{ formInline.productName }}</span>
              <el-input
                @click.native="addProduct('form')"
                size="small"
                v-else
                suffix-icon="el-icon-search"
                v-model="formInline.productName"
              >
              </el-input>
              <el-input
              
                size="small"
                disabled
                suffix-icon="el-icon-search"
                v-model="formInline.productName"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="产品编码:">
              <el-input disabled size="small" v-model="formInline.productSn">
              </el-input>
            </el-form-item>

            <el-form-item label="产品角色:">
              <el-input
                v-if="!formInline.productType"
                disabled
                size="small"
                v-model="formInline.productType"
              >
              </el-input>
              <span v-else>
                {{ formInline.productType | productType }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品型号:">
              <el-input disabled size="small" v-model="formInline.model">
              </el-input>
            </el-form-item>
            <el-form-item label="单位:">
              <el-input
                disabled
                size="small"
                v-model="formInline.unitName"
              ></el-input>
            </el-form-item>
            <el-form-item label="损耗率:">
              <el-input disabled size="small" v-model="formInline.lossScale">
                <template slot="append">
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="领料方式:">
              <el-select
                :disabled="type === 'detail'"
                size="small"
                v-model="formInline.pickMaterielType"
              >
                <el-option label="正常领料" :value="1"></el-option>
                <el-option label="倒冲领料" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-row>
      <el-row>
        <el-row>
          <div class="title">子件信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-table :data="formInline.productBomComponents">
          <el-table-column type="index" width="50">
            <template slot="header">
              <el-button
                v-if="type !== 'detail'"
                type="text"
                icon="el-icon-plus"
                circle
                @click="addProduct('table')"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                @click="
                  handleDelete(scope.$index, formInline.productBomComponents)
                "
                v-if="type !== 'detail'"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column prop="productSn" label="产品编码"></el-table-column>
          <el-table-column prop="model" label="产品型号"></el-table-column>
          <el-table-column prop="unitName" label="单位"></el-table-column>
          <!--        <el-table-column prop="amount3" label="产品比例"></el-table-column>-->
          <el-table-column label="数量" width="120">
            <template slot-scope="scope">
              <span v-if="type === 'detail'"> {{ scope.row.num.toFixed(4) }} </span>
              <el-form-item
                v-else
                label-width="0px"
                :prop="'productBomComponents.' + scope.$index + '.num'"
                :rules="rules.num"
              >
                <el-input v-model="scope.row.num"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="产品角色">
            <template slot-scope="scope">
              {{ scope.row.productType | productType }}
            </template>
          </el-table-column>
          <el-table-column prop="lossScale" label="损耗率"></el-table-column>
          <el-table-column label="领料方式" width="150">
            <template slot-scope="scope">
              <el-select
                :disabled="type === 'detail'"
                size="small"
                v-model="scope.row.pickMaterielType"
              >
                <el-option label="正常领料" :value="1"></el-option>
                <el-option label="倒冲领料" :value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="specificationName"
            label="规格"
          ></el-table-column>
        </el-table>
        <el-row style="margin-top: 20px">
          <div class="title">其他信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-form :model="formInline" label-width="100px" class="form-inline">
          <el-form-item label="概要备注">
            <span v-if="type === 'detail'">{{ formInline.remark }}</span>
            <el-input
              v-else
              style="max-width: 500px"
              v-model="formInline.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button
          size="small"
          @click="$router.push('/product-development/bom-manage')"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="handleSave"
          :loading="requesting"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="productDialogVisible"
      :modal-append-to-body="false"
      title="选择产品"
      width="800px"
    >
      <productSelect
        @on-cancel="productDialogVisible = false"
        :productGrade="productGrade"
        @on-submit="selectProduct"
      >
      </productSelect>
    </el-dialog>
    <!-- 选择BOM -->
    <el-dialog
      :visible.sync="productBomDialogVisible"
      :modal-append-to-body="false"
      title="选择BOM"
    >
      <el-table
        border
        :data="productBomList"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="bomSn" label="BOM编码"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="proBomType" label="bom类型"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-dialog>
  </basic-container>
</template>

<script>
import productSelect from "@/components/productSelect";
import {
  listProductBomByProductId,
  saveOrUpdateProductBom,
  getProductBom,
} from "@/api/product/product-bom";
import { deepClone } from "@/util/util";
import { getCode } from "@/api/common";

export default {
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
  },
  async mounted() {
    if (this.$route.query) {
      if (this.type !== "add") {
        const getProductBomRes = await getProductBom({
          id: this.$route.query.data.id,
        });
        if (getProductBomRes.data.code === 200) {
          let data = getProductBomRes.data.data;
          // this.tableData =

          let info = {
            productSn: data.product.productSn,
            model: data.product.model,
            unit: data.product.unit,
            unitName: data.product.unitName,
            lossScale: data.product.lossScale,
            productType: data.product.productType,
          };
          data.productBomComponents = data.productBomComponents.map((ele) => {
            ele.product.pickMaterielType = ele.pickMaterielType;
            ele.product.num = ele.num;
            return ele.product;
          });
          let form = deepClone(Object.assign(data, info));
          this.formInline = form;
        }
      } else {
        // console.log('新增s')
        // const codeRes = await getCode({codeName: '产品bom'})
        // this.formInline.bomSn = codeRes.data.data
      }
    }
  },
  data() {
    return {
      productGrade: "",
      productGrade1: "",
      productGradeList: [
        { value: "1", label: "成品" },
        { value: "2", label: "半成品" },
      ],
      requesting: false,
      productDialogVisible: false,
      productBomDialogVisible: false,
      productDialogType: "", // table form
      selectedProduct: {},
      productBomList: [],
      tableData: [],
      formInline: {
        bomGrade: "",
        proBomName: "", // 清单名称
        proBomType: "", // 清单类型 1 主bom 2辅bom
        proBomFrom: "", // 清单来源 1手动添加 2合同 3销售订单
        billSn: "", // 单据编号
        num: "1", // 数量
        pickMaterielType: "", // 	领料方式（1正常领料 2倒冲领料）
        remark: "",
        codename: "产品bom",
        name: "", //产品名称
        productName: "",
        unitName: "",
        productBomComponents: [], //字附件信息
      },
      rules: {
        proBomName: [
          {
            required: true,
            message: "请输入清单名称",
            trigger: ["blur", "change"],
          },
        ],
        productName: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "change",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        bomGrade: [
          {
            required: true,
            message: "请选择产品等级",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  watch: {
    productGrade(val) {
      this.productGrade1 = val;
    },
  },
  methods: {
    changeProductGrade(val) {
      this.productGrade1 = val;
      // this.formInline.productBomComponents = [];
    },
    //添加
    addProduct(e) {
      if (!this.formInline.bomGrade) {
        return this.$message.error("请选择产品等级");
      }
      this.productGrade = this.productGrade1;
      this.productDialogType = e;
      this.productDialogVisible = true;
    },
    //删除
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },

    // 打开产品BOM弹窗
    async openProductBomDialog(row) {
      this.productBomDialogVisible = true;
      this.selectedProduct = row;
      const res = await listProductBomByProductId({ productId: row.id });
      this.productBomList = res.data.data;
    },

    handleCurrentChange(val) {
      if (val.proBomType === 1) {
        val.proBomType = `主bom`;
      } else if (val.proBomType === 2) {
        val.proBomType = `辅bom`;
      }
      this.$set(this.selectedProduct, "bomId", val.id);
      this.$set(this.selectedProduct, "num", val.num);
      this.$set(this.selectedProduct, "proBomType", val.proBomType);
      this.productBomDialogVisible = false;
    },

    async selectProduct(e) {
      console.log(e);
      if (e.length > 0) {
        if (this.productDialogType === "form") {
          this.formInline.productId = e[0].id;
          this.formInline.name = e[0].name;
          this.formInline.productSn = e[0].productSn;
          this.formInline.model = e[0].model;
          this.formInline.unit = e[0].unit;
          this.formInline.unitName = e[0].unitName;
          this.formInline.productName = e[0].name;
          this.formInline.productCateId = e[0].productCateId;
          this.formInline.lossScale = e[0].lossScale;
          this.formInline.productType = e[0].productType;
        } else if (this.productDialogType === "table") {
          this.formInline.productBomComponents.push(...e);
        }
      }
      this.productDialogVisible = false;
    },

    async handleSave() {
      try {
        await this.$refs.formInline.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let form = deepClone(this.formInline);
      form.productBomComponents = form.productBomComponents.map((ele) => {
        return {
          productId: ele.id,
          bomId: ele.bomId,
          num: ele.num,
          pickMaterielType: ele.pickMaterielType,
        };
      });
      // this.formInline.productBomComponents.forEach(ele => delete ele.id)
      this.requesting = true;
      const res = await saveOrUpdateProductBom(form);
      this.requesting = false;
      if (res.data.success) {
        this.$message.success("保存成功");
        this.$router.back();
      }
    },
  },
  filters: {
    productType(value) {
      if (value === 1) {
        return "自制件";
      } else if (value === 2) {
        return "委外件";
      } else {
        return "外购件";
      }
    },
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
.el-select {
  width: 360px;
}
.el-table {
  .el-select,
  .el-input {
    margin: 4px 0;
  }
  .el-select {
    width: 120px;
  }
  .el-input {
    width: 90px;
  }
}
</style>
