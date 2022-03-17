<template>
  <div>
    <el-dialog
      title="新增请购单"
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
            <strong>● 请购信息</strong>
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button size="small" type="primary" @click="addForm">保存</el-button>
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
              <el-form-item label="制单人" prop="createPerson">
                <el-input v-model="ruleForm.createPerson"></el-input>
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
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addmessage('0')"
                >添加设备</el-button
              >
              <el-button size="small" type="primary">移除设备</el-button>
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
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.arrivalNum"
                      placeholder="手动输入"
                    ></el-input>
                  </template>
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
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addmessage('1')"
                >添加备件</el-button
              >
              <el-button size="small" type="primary">移除备件</el-button>
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
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.arrivalNum"
                      placeholder="手动输入"
                    ></el-input>
                  </template>
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

      <!-- 内层 -->
      <el-dialog
        width="60%"
        title="添加设备/备件"
        :visible.sync="innerVisible"
        append-to-body
      >
        <!-- 设备组件 -->
        <infor-ele @addTabData="addTabData" v-if="falg == '0'"></infor-ele>
        <replac-ement @bjaddTabData='bjaddTabData' v-if="falg == '1'"></replac-ement>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import inforEle from "./infor";
import replacEment from "./replacement";
import { addOrPurchase } from "@/api/shebei/purchase";
import {depotList, deptList, userList} from "@/api/shebei/commit";
export default {
  name: "",
  components: { inforEle, replacEment },
  props: {},
  data() {
    return {
      options:[],
      // 自己的
      dialogVisible: false,
      // 内层的
      innerVisible: false,
      falg: null,
      ruleForm: {
        number: "", // 单据编号
        numberDate: "", // 单据日期
        createPerson: "", // 制单人
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
            equipmentCoding: "测试1",
            name: "测试2",
            category: "测试3",
            model: "测试4",
            unit: "测试5",
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
        createPerson: [
          { required: true, message: "请输入制单人", trigger: "blur" }
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

     let depotRes = await deptList()
     this.options=depotRes.data.data
     console.log(this.options)
    },
    // // 添加
    async addForm() {
      this.mergeTab();
      const { data: res } = await addOrPurchase(this.ruleForm);
      if (res.code !== 200) return this.$message.error("新增失败");
      this.$message.success("新增成功");
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("addupdate");
    },

    // 添加设备/备件
    addmessage(val) {
      this.falg = val;
      this.innerVisible = true;
    },

    // 添加设备成功
    addTabData(val) {
      val.forEach(element => {
        this.ruleForm.deviceDatebaseList.push(element);
      });
      this.innerVisible = false;
    },
    // 添加备件成功
    bjaddTabData(val) {
      val.forEach(element => {
        this.ruleForm.spareDatebaseList.push(element);
      });
      this.innerVisible = false;
    },

    // 合二为一
    mergeTab() {
      this.ruleForm.equipmentPurchaseStockItemList = [];
      this.ruleForm.deviceDatebaseList.forEach(ele => {
        ele.type = "设备";
        this.ruleForm.equipmentPurchaseStockItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        ele.type = "备件";
        this.ruleForm.equipmentPurchaseStockItemList.push(ele);
      });
    },

    // // 批量删除
    handleSelectionChange(val) {
      // val 是需要被删除的数组
      console.log(val);
    },


  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item__content {
  width: 185px;
}
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
