<template>
  <div>
    <el-dialog
      title="采购订单详情"
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
            <strong>● 采购信息</strong>
          </div></el-col
        >
        <el-col :span="9" v-if="flag == '0'"
          ><div class="grid-content bg-purple-dark">
<!--            <el-button type="primary" @click="$emit('updateFalgC')"-->
<!--              >编辑</el-button-->
<!--            >-->
          </div></el-col
        >
        <el-col :span="10" v-if="flag == '1'"
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
        <!-- 1 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="合同编号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="合同名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="合同日期" prop="numberDate">
                <el-date-picker
                  v-model="ruleForm.numberDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 2 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="签订日期">
                <el-date-picker
                  v-model="ruleForm.signedDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="结束日期">
                <el-date-picker
                  v-model="ruleForm.endDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                class="form-item"
                label="制单人"
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
              <el-form-item class="form-itemM" label="采购人">
                <el-select
                  class="select"
                  v-model="ruleForm.purchaseMan"
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
              <el-form-item prop="purchaseDepot" label="采购部门">
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
            ><div class="grid-content bg-purple">
              <el-form-item
                class="form-itemL"
                prop="supplierName"
                label="供应商"
              >
                <el-select
                  class="select"
                  v-model="ruleForm.supplierName"
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
        </el-row>

        <!-- 合同 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 合同条款</strong>
            </div></el-col
          >

          <el-col :span="24">
            <el-input
              type="textarea"
              v-model="ruleForm.contractTerm"
              placeholder="请输入合同条款"
            ></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 请购设备明细</strong>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="addmessage('0')"
                >添加设备</el-button
              >
              <el-button type="primary">移除设备</el-button>
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
                  <template v-slot:default="slotProps">
                    <el-select
                      v-model="slotProps.row.supplierName"
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
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="purchaseNum" label="采购数量">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.purchaseNum"
                      placeholder="手动输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column fixed="right" prop="tax" label="税金">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="totalAmount"
                  label="总金额"
                >
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
              <el-button type="primary" @click="addmessage('1')"
                >添加备件</el-button
              >
              <el-button type="primary">移除备件</el-button>
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
                  <template v-slot:default="slotProps">
                    <el-select
                      v-model="slotProps.row.supplierName"
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
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="purchaseNum" label="采购数量">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.purchaseNum"
                      placeholder="手动输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率"> </el-table-column>
                <el-table-column fixed="right" prop="tax" label="税金">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="totalAmount"
                  label="总金额"
                >
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>
        <el-divider></el-divider>

        <!-- 上传 -->
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

        <el-divider></el-divider>
        <el-row>
          <el-col :span="21"
            ><div class="grid-content bg-purple-dark">
              <strong>● 更多信息</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="收获地址">
                <el-select
                  class="select"
                  v-model="value"
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
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">
              <el-form-item>
                <el-select class="select" v-model="value" placeholder="请选择">
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
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <el-form-item>
                <el-select
                  class="select-min"
                  v-model="value"
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
          <el-col :span="4"
            ><div class="grid-content bg-purple-light">
              <el-form-item>
                <el-input
                  class="w"
                  v-model="ruleForm.receiptAddress"
                  placeholder="详细地址"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-itemL" label="联系人">
                <el-input v-model="ruleForm.contactPerson"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="联系电话">
                <el-input v-model="ruleForm.contactPhone"></el-input>
              </el-form-item></div
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
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <!-- 设备组件 -->
        <infor-ele @addTabData="addTabData" v-if="falg == '0'"></infor-ele>
        <replac-ement
          @bjaddTabData="bjaddTabData"
          v-if="falg == '1'"
        ></replac-ement>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import inforEle from "./infor";
import replacEment from "./replacement";
import { addOrUpdateContractOrder } from "@/api/shebei/purchase";
export default {
  name: "",
  components: { inforEle, replacEment },
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
      // 内层的
      innerVisible: false,
      falg: null,
      ruleForm: {
        number: "", // 合同编号
        name: "", // 合同名称
        numberDate: "", // 合同日期
        signedDate: "", // 签订日期
        endDate: "", // 结束日期
        purchaseMan: "", // 采购人
        purchaseDepot: "", // 采购部门
        supplierName: "", // 供应商
        createPersonName: "", // 制单人
        contractTerm: "", // 合同条款
        remark: "", // 备注
        contactPerson: "", // 联系人
        contactPhone: "", // 联系电话
        receiptAddress: "", // 地址
        remark: "", // 备注

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
            totalAmount: "6"
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
            totalAmount: "6"
          }
        ] // 备件table
      },
      // 校验
      rules: {
        name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        number: [
          { required: true, message: "合同编号不为空", trigger: "blur" }
        ],
        numberDate: [
          { required: true, message: "请输入合同日期", trigger: "blur" }
        ],
        createPersonName: [
          { required: true, message: "请输入制单人", trigger: "blur" }
        ],
        purchaseDepot: [
          { required: true, message: "请输入采购部门", trigger: "blur" }
        ],
        supplierName: [
          { required: true, message: "请输入供应商", trigger: "blur" }
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
        this.ruleForm.equipmentContractOrderItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        this.ruleForm.equipmentContractOrderItemList.push(ele);
      });

      const { data: res } = await addOrUpdateContractOrder(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("updatedit");
      this.ruleForm = {}
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

    // // 批量删除
    handleSelectionChange(val) {
      // val 是需要被删除的数组
      console.log(val);
    },

    changeList(val) {
      val.deviceDatebaseList = [];
      val.spareDatebaseList = [];
      val.equipmentContractOrderItemList.forEach(ele => {
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
/deep/.select-min {
  width: 80px;
}
/deep/.w {
  width: 250px;
}
.form-itemM {
  padding-left: 25px;
}
.form-item {
  padding-left: 10px;
}
.form-itemL {
  padding-left: 15px;
}

/deep/ .D-flex .grid-content {
  display: flex;
  justify-content: flex-end;
}
</style>
