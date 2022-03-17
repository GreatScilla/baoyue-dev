// 关联产品新增
<template>
  <basic-container>
    <el-row>
      <div class="title">关联产品新增</div>
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-form label-width="100px" :model="processProduct" class="detail-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品编码：">
              <el-input
                size="small"
                @click.native="dialogVisible = true"
                v-model="processProduct.product.productSn"
                placeholder="请点击选择"
              ></el-input>
            </el-form-item>
            <el-form-item label="追溯方式：">
              <el-select
                size="small"
                v-model="processProduct.dataFromMode"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型：">
              <el-select
                size="small"
                disabled
                v-model="processProduct.product.productType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in productType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位：">
              <el-input
                size="small"
                disabled
                v-model="processProduct.product.unitName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="产品名称：">
              <el-input
                size="small"
                disabled
                v-model="processProduct.product.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="组件数量：">
              <el-input
                v-int
                v-model="processProduct.num"
                placeholder="请输入数量"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="是否替代：">
              <el-select
                size="small"
                v-model="processProduct.isReplace"
                placeholder="请选择"
              >
                <el-option label="是" value="1"> </el-option>
                <el-option label="否" value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="savePerson"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>

    <el-dialog
      title="产品编码"
      :visible.sync="dialogVisible"
      width="723px"
      append-to-body
      :before-close="handleClose"
    >
      <product-select @on-submit="selectProduct"></product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import { saveProcessProduct } from "@/api/product/craft-bom.js";
import productSelect from "@/components/productSelect";
export default {
  components: {
    productSelect,
  },
  data() {
    return {
      requesting: false,
      dialogVisible: false,
      processProduct: {
        product: {},
      },
      productType: [
        {
          label: "自制件",
          value: 1,
        },
        {
          label: "委外件",
          value: 2,
        },
        {
          label: "外购件",
          value: 3,
        },
      ],

      stateOptions: [
        {
          value: 0,
          label: "单体",
        },
        {
          value: 1,
          label: "批次",
        },
      ],
    };
  },
  mounted() {
    this.processProduct.lineId = this.$route.query.selectCraftLine;
    this.processProduct.processId = this.$route.query.selectProcess;
    if (this.$route.query.operationState) {
      this.operationState = this.$route.query.operationState;
    }
  },
  methods: {
    selectProduct(value) {
      if (value.length > 0) {
        this.processProduct.product = value[0];
        this.processProduct.productId = value[0].id;
        this.processProduct.productName = value[0].name;
        this.processProduct.productSn = value[0].productSn;
        this.processProduct.productCateIds = value[0].productCateIds;
      }
      this.dialogVisible = false;
    },

    // 取消
    cancel() {
      this.$router.back();
    },
    // 保存
    async savePerson() {
      this.requesting = true;
      try {
        const res = await saveProcessProduct(this.processProduct);
        this.requesting = false;
        if (res.data.success) {
          this.$message.success("修改成功");
          this.$router.back();
        }
      } catch {
        this.requesting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
/deep/ .el-select {
  width: 100%;
}
</style>
