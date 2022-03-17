<template>
  <div>
    <el-dialog
      title="新增盘点单"
      append-to-body
      :visible.sync="dialogVisible"
      width="60%"
      @opened="open_all"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple-dark">
            <strong>● 单据信息</strong>
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary" @click="addForm" size="small">保存</el-button>
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
                  v-model="ruleForm.makeStockId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in locationoptions"
                    :key="item.id"
                    :label="item.depotName"
                    :value="item.id"
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
              <el-form-item class="form-item" label="执行部门" prop="">
                <el-select
                  class="select"
                  v-model="ruleForm.handleDeptId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handleDeptIdoptions"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id"
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
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
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
                <el-table-column prop="stockNum" label="调整数量">
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
                <el-table-column prop="operNumber" label="账单数量">
                </el-table-column>
                <el-table-column prop="price" label="购置金额">
                </el-table-column>
                <el-table-column prop="allPrice" label="合计金额">
                </el-table-column>
                <el-table-column prop="stockNum" label="调整数量">
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
import { addMakeStock } from "@/api/shebei/InventoryManagement";
import {depotList, deptList, userList} from "@/api/shebei/commit";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      handleDeptIdoptions:[],
      dialogVisible: false,
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
            equipmentCoding: "1",
            name: "2",
            category: "3",
            model: "4",
            unit: "5",
            price: "6",

            operNumber: "7",
            stockNum: "8",
            allPrice: "9",
            changeNumber: "67",
            fullPrice: "68"
          }
        ], // 设备table

        equipmentPartList: [
          {
            equipmentCoding: "666",
            name: "666",
            category: "666",
            model: "666",
            unit: "666",
            price: "666",

            operNumber: "123",
            stockNum: "65",
            allPrice: "66",
            changeNumber: "67",
            fullPrice: "68"
          }
        ] // 备件table
      },
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
      }
    };
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
    async open_all(){
      console.log(777)
      let deptRes = await deptList()
      let depotRes = await depotList()
      let userRes = await userList()
      this.locationoptions=depotRes.data.data
      console.log(this.locationoptions)
      this.handleDeptIdoptions=deptRes.data.data
      this.handlePersonIdoptions=userRes.data.data.records
    },
    // 添加
    async addForm() {
      this.ruleForm.type = "调整";
      const { data: res } = await addMakeStock(this.ruleForm);
      if (res.code !== 200) return this.$message.error("新增失败");
      this.$message.success("新增成功");
      this.detailialogClosed();
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
</style>
