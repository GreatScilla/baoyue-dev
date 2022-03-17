<template>
  <div>
    <el-dialog
      title="上传发票"
      append-to-body
      :visible.sync="dialogVisible"
      width="60%"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <!-- 单据信息 -->
      <el-row class="D-flex">
        <el-col :span="14"
          ><div>
            <strong>● 单据信息</strong>
          </div></el-col
        >
        <el-col :span="9"
          ><div class="grid-content bg-purple-dark">
            <el-button size="small" type="primary" @click="addfrom">保存</el-button>
          </div></el-col
        >
      </el-row>
      <el-divider></el-divider>

      <el-form
        inline
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 2 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="采购单号" prop="purchaseNumber">
                <el-input v-model="ruleForm.purchaseNumber"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item prop="invoiceHead" label="发票抬头">
                <el-input v-model="ruleForm.invoiceHead"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="发票代码" prop="invoiceCode">
                <el-input v-model="ruleForm.invoiceCode"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="开票日期" prop="numberDate">
                <el-date-picker
                  v-model="ruleForm.numberDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="发票金额" prop="invoiceAmount">
                <el-input v-model="ruleForm.invoiceAmount"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item
                class="form-item"
                label="上传人 "
                prop="createPersonName"
              >
                <el-input v-model="ruleForm.createPersonName"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="附件信息">
                <el-upload
                  class="upload-demo"
                  action="#"
                  :before-upload="myUpload"
                >
                  <el-button size="small">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 采购设备明细</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>
        <!-- 5 设备 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 设备 -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.deviceDatebaseList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column prop="equipmentCoding" label="设备编号">
                </el-table-column>
                <el-table-column prop="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="category" label="设备类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="supplierName" label="供应商">
                </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="purchaseNum" label="采购数量">
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column prop="tax" label="税率金额"> </el-table-column>
                <el-table-column prop="totalAmount" label="总金额">
                </el-table-column>
                <el-table-column prop="invoiceAmount" label="发票金额">
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 采购备件明细</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

        <!-- 6 备件 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 备件Table -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.spareDatebaseList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column prop="equipmentCoding" label="备件编号">
                </el-table-column>
                <el-table-column prop="name" label="备件名称">
                </el-table-column>
                <el-table-column prop="category" label="备件类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="supplierName" label="供应商">
                </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="purchaseNum" label="采购数量">
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column prop="tax" label="税率金额"> </el-table-column>
                <el-table-column prop="totalAmount" label="总金额">
                </el-table-column>
                <el-table-column prop="invoiceAmount" label="发票金额">
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <!-- 备注 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 备注</strong>
            </div></el-col
          >

          <el-col :span="24">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { FPaddOrUpdateInvoiceOrder } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      // 自己的
      dialogVisible: false,
      ruleForm: {
        purchaseNumber: "", // 采购单号
        invoiceHead: "", // 发票抬头
        invoiceCode: "", // 发票代码
        remark: "", // 备注
        numberDate: "", // 开票日期
        invoiceAmount: "", // 发票金额
        createPersonName: "", // 上传人

        deviceDatebaseList: [
          {
            equipmentCoding: "1",
            name: "2",
            category: "3",
            model: "4",
            unit: "5",
            supplierName: "6",
            price: "6",
            purchaseNum: "6",
            taxRate: "6",
            tax: "6",
            totalAmount: "6",
            invoiceAmount: "6"
          }
        ], // 设备table

        spareDatebaseList: [
          {
            equipmentCoding: "666",
            name: "666",
            category: "666",
            model: "666",
            unit: "666",
            supplierName: "6",
            price: "6",
            purchaseNum: "6",
            taxRate: "6",
            tax: "6",
            totalAmount: "6",
            invoiceAmount: "6"
          }
        ] // 备件table
      },
      // 校验
      rules: {
        purchaseNumber: [
          { required: true, message: "请输入采购单号", trigger: "blur" }
        ],
        invoiceHead: [
          { required: true, message: "请输入发票抬头", trigger: "blur" }
        ],
        createPersonName: [
          { required: true, message: "上传人不为空", trigger: "blur" }
        ],
        invoiceCode: [
          { required: true, message: "请输入发票代码", trigger: "blur" }
        ],
        numberDate: [
          { required: true, message: "请输入开票日期", trigger: "chage" }
        ],
        invoiceAmount: [
          { required: true, message: "请输入发票金额", trigger: "blur" }
        ]
      }
    };
  },
  activated() {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 添加
    async addfrom() {
      this.mergeTab();
      const { data: res } = await FPaddOrUpdateInvoiceOrder(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.detailialogClosed();
    },
    // 合二为一
    mergeTab() {
      this.ruleForm.equipmentInvoiceOrderItemList = [];
      this.ruleForm.deviceDatebaseList.forEach(ele => {
        ele.type = "设备";
        this.ruleForm.equipmentInvoiceOrderItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        ele.type = "备件";
        this.ruleForm.equipmentInvoiceOrderItemList.push(ele);
      });
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("addupdate");
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/.el-dialog__body {
  padding: 0px 20px;
}
/deep/ .el-form-item__content {
  width: 185px;
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
}

/deep/.select {
  width: 190px;
}

.form-item {
  padding-left: 10px;
}
.form-itemL {
  padding-left: 22px;
}

/deep/ .D-flex .grid-content {
  display: flex;
  justify-content: flex-end;
}
</style>
