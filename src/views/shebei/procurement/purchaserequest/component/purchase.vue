<template>
  <div>
    <el-dialog
      title="请购单详情"
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
            <strong>● 调拨信息</strong>
          </div></el-col
        >
        <el-col :span="9"
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="editForm">转采购</el-button>
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
              <el-form-item label="单据日期" prop="numberDate">
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
            ><div class="grid-content bg-purple">
              <el-form-item label="制单人" prop="createPersonName">
                <el-input v-model="ruleForm.createPersonName"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="申请部门">
                <el-select
                  class="select"
                  v-model="ruleForm.purchaseDepot"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item class="form-itemL" label="申请人">
                <el-input v-model="ruleForm.purchaseMan"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 请购设备明细</strong>
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
                <el-table-column prop="arrivalNum" label="请购数量">
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column prop="tax" label="税率金额"> </el-table-column>
                <el-table-column prop="totalAmount" label="总金额">
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 请购备件明细</strong>
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
                <el-table-column prop="arrivalNum" label="请购数量">
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column prop="tax" label="税率金额"> </el-table-column>
                <el-table-column prop="totalAmount" label="总金额">
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
import { addOrUpdatePurchaseOrder } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: {
    detailAll: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      // 自己的
      dialogVisible: false,
      // 内层的
      innerVisible: false,
      falg: null,
      ruleForm: {
        number: "", // 单据编号
        numberDate: "", // 单据日期
        createPersonName: "", // 制单人
        remark: "", // 备注

        deviceDatebaseList: [
          {
            equipmentCoding: "1",
            name: "2",
            category: "3",
            model: "4",
            unit: "5",
            arrivalNum: "6"
          }
        ], // 设备table

        spareDatebaseList: [
          {
            equipmentCoding: "666",
            name: "666",
            category: "666",
            model: "666",
            unit: "666",
            arrivalNum: "666"
          }
        ] // 备件table
      },
      // 校验
      rules: {
        number: [
          { required: true, message: "单据编号不为空", trigger: "blur" }
        ],
        numberDate: [
          { required: true, message: "请输入单据日期", trigger: "blur" }
        ],
        createPersonName: [
          { required: true, message: "请输入制单人", trigger: "blur" }
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
    // 转采购
    async editForm() {
      this.mergeTab();
      const { data: res } = await addOrUpdatePurchaseOrder(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.ruleForm = {};
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("purchaseupdate");
    },

    changeList(val) {
      val.deviceDatebaseLis = [];
      val.spareDatebaseList = [];
      val.equipmentPurchaseStockItemList.forEach(ele => {
        if (ele.type == "设备") {
          val.deviceDatebaseList.push(ele);
        } else if (ele.type == "备件") {
          val.spareDatebaseList.push(ele);
        }
      });
    },

    // 合二为一
    mergeTab() {
      this.ruleForm.id = "";
      if (this.ruleForm.deviceDatebaseList && this.ruleForm.spareDatebaseList) {
        this.ruleForm.equipmentPurchaseOrderItemList = [];
      }
      this.ruleForm.equipmentPurchaseOrderItemList = this.ruleForm.equipmentPurchaseStockItemList;
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
