<template>
  <div>
    <el-dialog
      title="盘点单详情"
      append-to-body
      :visible.sync="dialogVisible"
      width="60%"
      @opened="openAll"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row class="D-flex">
        <el-col :span="14"
          ><div>
            <strong>● 单据信息</strong>
          </div></el-col
        >
        <el-col :span="9" v-if="falg == '0'"
          ><div class="grid-content bg-purple-dark">
<!--            <el-button type="primary" @click="$emit('updateFalgC')"-->
<!--              >实盘编辑</el-button-->
<!--            >-->
          </div></el-col
        >
        <el-col :span="9" v-if="falg == '2'"
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="editForm"
              >确认调整</el-button
            >
          </div></el-col
        >
        <el-col :span="10" v-if="falg == '1'"
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="$emit('updateFalg')"
              >取消编辑</el-button
            >
            <el-button type="primary" @click="editForm">保存编辑</el-button>
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
              <el-form-item label="单据日期" prop="documentTime">
                <el-date-picker
                  v-model="ruleForm.documentTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="盘点仓库" prop="makeStockId">
                <el-select
                  class="select"
                  v-model="ruleForm.makeStockName"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in locationoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-itemL" label="执行部门" prop="">
                <el-select
                  class="select"
                  v-model="ruleForm.handleDeptId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handleDeptIdoptions"
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
              <el-form-item class="form-itemL" label="执行人" prop="">
                <el-select
                  class="select"
                  v-model="ruleForm.handlePersonId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handlePersonIdoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-itemL" label="制单人">
                <el-input></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 5 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 设备 -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.equipmentInventoryList"
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
                <el-table-column prop="amount" label="账面数量">
                </el-table-column>
                <el-table-column prop="price" label="购置金额">
                </el-table-column>
                <el-table-column prop="allPrice" label="合计金额">
                </el-table-column>
                <el-table-column prop="stockNum" label="盘点数量">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.stockNum"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="changeNumber"
                  label="盈亏数量"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="fullPrice"
                  label="盈亏金额"
                >
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <!-- 6 备件 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 备件Table -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.equipmentPartList"
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
                <el-table-column prop="amount" label="账面数量">
                </el-table-column>
                <el-table-column prop="price" label="购置金额">
                </el-table-column>
                <el-table-column prop="allPrice" label="合计金额">
                </el-table-column>
                <el-table-column prop="stockNum" label="盘点数量">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.stockNum"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="changeNumber"
                  label="盈亏数量"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="fullPrice"
                  label="盈亏金额"
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
import { stockHeadupdate } from "@/api/shebei/InventoryManagement";
export default {
  name: "",
  components: {},
  props: {
    falg: {
      type: [String, Number, Object, Array]
    },
    detailAll: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      dialogVisible: false,
      rules: {
        number: [
          { required: true, message: "单据编号不为空", trigger: "blur" }
        ],
        documentTime: [
          { required: true, message: "请输入单据日期", trigger: "blur" }
        ],
        makeStockId: [
          { required: true, message: "请输入盘点仓库", trigger: "blur" }
        ]
      },
      ruleForm: {
        makeStockId: "", // 盘点仓库id
        makeStockName: "", // 盘点仓库name
        number: "", // 单据编号
        documentTime: "", // 单据日期
        handleDeptId: "", // 执行部门
        handlePersonId: "", // 执行人
        remark: "", // 备注
        equipmentInventoryList: [
          {
            productSn: "312",
            productName: "312",
            productCate: "312",
            productType: "312",
            unit: "312",
            productPrice: "312",

            amount: "123",
            stockNum: "65",
            allPrice: "66",
            changeNumber: "67",
            fullPrice: "68"
          }
        ], // 设备table

        equipmentPartList: [
          {
            productSn: "312",
            productName: "312",
            productCate: "312",
            productType: "312",
            unit: "312",
            productPrice: "312",

            amount: "123",
            stockNum: "65",
            allPrice: "66",
            changeNumber: "67",
            fullPrice: "68"
          }
        ] // 备件table
      }
    };
  },
  activated() {},
  watch: {
    detailAll(val) {
      this.ruleForm = val;
    }
  },
  created() {},
  mounted() {},
  methods: {
    openAll(){
      this.$refs.ruleForm.disabled=true
      if(this.falg==1){
        this.$refs.ruleForm.disabled=false
        console.log(this.$refs.ruleForm.disabled)
      }
    },
     detailialogClosed() {
      this.$emit("updateditTab");
      this.dialogVisible = false;
    },

    // 编辑
    async editForm() {
      this.ruleForm.type = "调整";
      const { data: res } = await stockHeadupdate(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.detailialogClosed();
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
