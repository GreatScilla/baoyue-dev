<template>
  <div>
    <el-dialog
      title="退货单"
      append-to-body
      :visible.sync="dialogVisible"
      width="60%"
      @opened="openAll"
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
        <el-col :span="9" v-if="flag == '0'"
          ><div class="grid-content bg-purple-dark">
<!--            <el-button type="primary" @click="$emit('updateFalgC')"-->
<!--              >编辑</el-button-->
<!--            >-->
          </div></el-col
        >
        <el-col :span="10" v-else
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="$emit('updateFalg')"
              >取消编辑</el-button
            >
            <el-button type="primary" @click="editForm">保存编辑</el-button>
          </div></el-col
        >
      </el-row>
      <div class="box" v-if="falg == '0'">就不让你编辑</div>
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
                  <el-button>点击上传</el-button>
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
  props: {
    flag: {
      type: [String, Number, Object, Array]
    },
    detailAll: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      // 自己的
      dialogVisible: false,
      ruleForm: { },
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
  watch: {
    detailAll(val) {
      this.ruleForm = val;
      this.changeList(val);
    }
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
    openAll(){
      this.$refs.ruleForm.disabled=true
      if(this.flag==1){
        this.$refs.ruleForm.disabled=false
        console.log(this.$refs.ruleForm.disabled)
      }
    },
    // 编辑
    async editForm() {
      this.ruleForm.deviceDatebaseList.forEach(ele => {
        this.ruleForm.equipmentInvoiceOrderItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        this.ruleForm.equipmentInvoiceOrderItemList.push(ele);
      });

      const { data: res } = await FPaddOrUpdateInvoiceOrder(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("updatedit");
      this.ruleForm = {}
    },

    changeList(val) {
      val.deviceDatebaseList = [];
      val.spareDatebaseList = [];
      val.equipmentInvoiceOrderItemList.forEach(ele => {
        if (ele.type == "设备") {
          val.deviceDatebaseList.push(ele);
        } else if (ele.type == "备件") {
          val.spareDatebaseList.push(ele);
        }
      });
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

/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
}

/deep/.select {
  width: 190px;
}
/deep/ .el-form-item__content {
  width: 185px;
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
