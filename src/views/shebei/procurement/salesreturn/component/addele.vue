<template>
  <div>
    <el-dialog
      title="新增采购退货"
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
            <el-button type="primary" @click="addfrom">保存</el-button>
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
              <el-form-item label="单据编号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item prop="returnReason" label="退货原因">
                <el-input v-model="ruleForm.returnReason"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="退货日期" prop="returnDate">
                <el-date-picker
                  v-model="ruleForm.returnDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-itemL" label="源单号">
                <el-input v-model="ruleForm.linkNumber"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item class="form-itemL" label="制单人">
                <el-input v-model="ruleForm.createPersonName"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="送货单号" prop="deliveryNumber">
                <el-input v-model="ruleForm.deliveryNumber"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 退货设备明细</strong>
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
                <el-table-column type="selection" width="55"> </el-table-column>
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
                <el-table-column
                  prop="totalAmount"
                  label="总金额"
                ></el-table-column>
                <el-table-column
                  fixed="right"
                  prop="returnNum"
                  label="退货数量"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="returnPrice"
                  label="退货金额"
                >
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 退货备件明细</strong>
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
                <el-table-column type="selection" width="55"> </el-table-column>
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
                <el-table-column
                  prop="totalAmount"
                  label="总金额"
                ></el-table-column>
                <el-table-column
                  fixed="right"
                  prop="returnNum"
                  label="退货数量"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="returnPrice"
                  label="退货金额"
                >
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
import { addOrUpdatePurchaseReturn } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      // 自己的
      dialogVisible: false,
      ruleForm: {
        number: "", // 单据编号
        returnReason: "", // 退货原因
        returnDate: "", // 退货日期
        linkNumber: "", // 源单号
        createPersonName: "", // 制单人
        deliveryNumber: "", // 送货单号
        deliveryNumber: "", // 送货单号
        remark: "", // 备注

        deviceDatebaseList: [
          {
            equipmentCoding: "666",
            name: "666",
            category: "666",
            model: "666",
            unit: "666",
            supplierName: "666",
            price: "666",
            purchaseNum: "666",
            totalAmount: "666",
            returnNum: "666",
            returnPrice: "666"
          }
        ], // 设备table

        spareDatebaseList: [
          {
            equipmentCoding: "888",
            name: "888",
            category: "888",
            model: "888",
            unit: "888",
            supplierName: "888",
            price: "888",
            purchaseNum: "888",
            totalAmount: "888",
            returnNum: "888",
            returnPrice: "888"
          }
        ] // 备件table
      },
      // 校验
      rules: {
        number: [
          { required: true, message: "单据编号不为空", trigger: "blur" }
        ],
        returnReason: [
          { required: true, message: "请输入退货原因", trigger: "blur" }
        ],
        returnDate: [
          { required: true, message: "请输入退货日期", trigger: "blur" }
        ],
        deliveryNumber: [
          { required: true, message: "请输入送货单号", trigger: "blur" }
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
      const { data: res } = await addOrUpdatePurchaseReturn(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("addupdate");
    },

    // 合二为一
    mergeTab() {
      this.ruleForm.equipmentPurchaseReturnItemList = [];
      this.ruleForm.deviceDatebaseList.forEach(ele => {
        ele.type = "设备";
        this.ruleForm.equipmentPurchaseReturnItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        ele.type = "备件";
        this.ruleForm.equipmentPurchaseReturnItemList.push(ele);
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
