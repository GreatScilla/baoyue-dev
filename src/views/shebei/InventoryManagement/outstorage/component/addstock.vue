<template>
  <div class="add-com">
    <el-dialog
      title="新增出库单"
      append-to-body
      :visible.sync="adddialogVisible"
      width="65%"
      @opened="open_all"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>

      <!-- 单据信息 -->
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple-dark">
            <strong>● 单据信息</strong>
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
        <!-- 1 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="单据编号" prop="number">
                <el-input
                  v-model="ruleForm.number"
                  placeholder="自动生成"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="出库类别" prop="typeClass">
                <el-select
                  @change="changeType"
                  v-model="ruleForm.typeClass"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in typeClassOptions"
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
              <el-form-item label="出库日期" prop="documentTime">
                <el-date-picker
                  v-model="ruleForm.documentTime"
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
              <el-form-item prop="createUser" label="制单人" class="M-leftx">
                <el-input
                  v-model="ruleForm.createUser"
                  placeholder="当前账号name"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item class="" label="领用部门" prop="handsDepotId">
                <el-select
                  @change="changehandsDepot"
                  v-model="ruleForm.handsDepotId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handsDepotNameOptions"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="M-leftx" label="领用人" prop="handsPersonID">
                <el-select
                  class="select"
                  @change="changehandsPersonName"
                  v-model="ruleForm.handsPersonID"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handsPersonNameOptions"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <el-form-item label="源单号" class="M-left">
                <el-input
                  v-model="ruleForm.singleNumber"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 出库明细</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

        <!-- 入库明细 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-form-item label="扫码:">
                <el-input
                  ref="input"
                  @keyup.enter.native="payCode"
                  v-model="ruleForm.scanaQRcode"
                   @blur="blurNumber"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 设备 表格 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-table
                border
                :data="ruleForm.equipmentInventoryList"
                style="width: 100%"
              >
                <el-table-column
                  prop="equipmentCoding"
                  width="120"
                  label="设备编号"
                >
                </el-table-column>
                <el-table-column prop="name" width="120" label="设备名称">
                </el-table-column>
                <el-table-column prop="category" width="120" label="设备类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="price" label="购置单价">
                </el-table-column>
                <el-table-column prop="changeNum" label="入库数量">
                </el-table-column>
                <el-table-column prop="allPrice" label="合计金额">
                </el-table-column>
                <el-table-column prop="location" label="入库仓库">
                  <!-- v-slot:default="{row, $index}" -->
                  <template slot-scope="{ row }">
                    <el-select
                      v-model="row.location"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in depotNameOptions"
                        :key="item.id"
                        :label="item.depotName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="repositoryName" label="入库库位">
                  <template slot-scope="{ row }">
                    <el-select
                      v-model="row.barCode"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in repositoryNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>
        <!-- 备件 表格 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-table
                border
                :data="ruleForm.equipmentPartList"
                style="width: 100%"
              >
                <el-table-column
                  prop="equipmentCoding"
                  width="120"
                  label="备件编号"
                >
                </el-table-column>
                <el-table-column prop="name" width="120" label="备件名称">
                </el-table-column>
                <el-table-column prop="category" width="120" label="备件类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="price" label="购置单价">
                </el-table-column>
                <el-table-column prop="changeNum" label="入库数量">
                </el-table-column>
                <el-table-column prop="allPrice" label="合计金额">
                </el-table-column>
               <el-table-column prop="location" label="入库仓库">
                  <!-- v-slot:default="{row, $index}" -->
                  <template slot-scope="{ row }">
                    <el-select
                      v-model="row.location"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in depotNameOptions"
                        :key="item.id"
                        :label="item.depotName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="repositoryName" label="入库库位">
                  <template slot-scope="{ row }">
                    <el-select
                      v-model="row.barCode"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in repositoryNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <!-- 备件 备注 -->
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
import { getPurchaseOrderByNumber } from "@/api/shebei/InventoryManagement";
import {deptList,userList,depotList} from "@/api/shebei/commit"
export default {
  name: "",
  components: {},
  props: {
    adddialogVisible: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      // 表单需要的数据

      ruleForm: {
        type: "",
        typeClass: "", // 分类字体

        handsDepotId: "", // 领用部门id
        handsDepotName: "", // 领用部门字体

        handsPersonId: "", // 领用人id
        handsPersonName: "", // 领用人字体

        documentTime: "", // 出库日期
        createUser: "admin", // 制单人
        orderNumber: "", // 送货单号
        remark: "这是一条备注", //备注
        number: "", // 单据编号
        singleNumber: "", // 原单号

        productId: "24", // 设备ID
        partId: "", // 备件ID
        // 表格数据
        // 设备
        equipmentInventoryList: [
          {
            equipmentCoding: "312",
            name: "312",
            category: "312",
            model: "312",
            unit: "312",
            price: "6666",
            changeNumber: "",
            allPrice: "",

            depotId: "", // 入库id
            depotName: "", // 入库仓库
            repositoryId: "", // 入库库位id
            repositoryName: "" // 入库库位
          }
        ],
        // 备件
        equipmentPartList: [
          // {
          //   equipmentCoding: "2",
          //   name: "2",
          //   category: "2",
          //   model: "2",
          //   unit: "2",
          //   price: "2",
          //   changeNumber: "",
          //   allPrice: "",
          //   depotId: "", // 入库id
          //   depotName: "", // 入库仓库
          //   repositoryId: "", // 入库库位id
          //   repositoryName: "" // 入库库位
          // }
        ]
      },

      // 表单的校验
      rules: {
        number: [
          { required: true, message: "单据编号不能为空", trigger: "blur" }
        ],
        typeClass: [
          { required: true, message: "请输入出库类别", trigger: "blur" }
        ],
        documentTime: [
          { required: true, message: "请输入出库日期", trigger: "blur" }
        ],
        handsDepotId: [
          { required: true, message: "请输入领用部门", trigger: "blur" }
        ],
        handsPersonID: [
          { required: true, message: "请输入领用人", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "请输入制单人", trigger: "blur" }
        ]
      },

      // 出库类别的下拉框
      typeClassOptions: [
        {
          value: "0",
          label: "采购"
        },
        {
          value: "1",
          label: "采购退货"
        },
        {
          value: "2",
          label: "其他"
        },
        {
          value: "3",
          label: "零售"
        },
        {
          value: "4",
          label: "销售"
        },
        {
          value: "5",
          label: "调拔"
        }
      ],

      // 领用部门下拉框
      handsDepotNameOptions: [],

      // 领用人员下拉框
      handsPersonNameOptions: [],

      // 入库仓库
      depotNameOptions: [
        {
          value: "0",
          label: "仓库A"
        },
        {
          value: "1",
          label: "仓库B"
        }
      ],

      // 库位
      repositoryNameOptions: [
        {
          value: "0",
          label: "库位A"
        },
        {
          value: "1",
          label: "库位B"
        }
      ]
    };
  },
  activated() {},
  watch: {
    adddialogVisible(val) {
      if (val == true) {
        this.$nextTick(() => {
          // console.log(this);
          this.$refs.input.focus();
        });
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
  async  open_all(){
    let res = await deptList()
    let userRes = await userList()
    let depotRes = await depotList()
    this.handsDepotNameOptions=res.data.data
    this.handsPersonNameOptions=userRes.data.data.records
    this.depotNameOptions=depotRes.data.data
    },
    // 扫码
    async blurNumber() {
      const { data: res } = await getPurchaseOrderByNumber({
        number: this.ruleForm.number
      });

      this.changeList(res.data);
    },

    changeList(val) {
      this.ruleForm.equipmentInventoryList = [];
      this.ruleForm.equipmentPartList = [];
      val.equipmentPurchaseOrderItemList.forEach(ele => {
        if (ele.type == "设备") {
          this.ruleForm.equipmentInventoryList.push(ele);
        } else if (ele.type == "备件") {
          this.ruleForm.equipmentPartList.push(ele);
        }
      });
    },

    // 通知父组件 关闭
    updateVisible() {
      this.$emit("updateAdd");
    },
    // 真正关闭的回调
    detailialogClosed() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.singleNumber = "";
    },

    // 出库类别
    changeType(val) {
      switch (true) {
        case val === "0":
          this.ruleForm.typeClass = "采购";
          break;
        case val === "1":
          this.ruleForm.typeClass = "采购退货";
          break;
        case val === "2":
          this.ruleForm.typeClass = "其他";
          break;
        case val === "3":
          this.ruleForm.typeClass = "零售";
          break;
        case val === "4":
          this.ruleForm.typeClass = "销售";
          break;
        case val === "5":
          this.ruleForm.typeClass = "调拔";
          break;

        default:
          null;
      }
    },

    // 领用部门
    changehandsDepot(val) {
      switch (true) {
        case val === "0":
          this.ruleForm.handsDepotName = "x领用部门";
          break;
        case val === "1":
          this.ruleForm.handsDepotName = "xx领用部门";
          break;
        case val === "2":
          this.ruleForm.handsDepotName = "xxx领用部门";
          break;
        default:
          null;
      }
    },
    // 领用人
    changehandsPersonName(val) {
      switch (true) {
        case val === "0":
          this.ruleForm.handsPersonName = "人员x";
          break;
        case val === "1":
          this.ruleForm.handsPersonName = "人员xx";
          break;
        case val === "2":
          this.ruleForm.handsPersonName = "人员xxx";
          break;
        default:
          null;
      }
    },

    // 添加
    async addForm() {
      this.ruleForm.type = "出库";
      const { data: res } = await Gostorage(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.$emit("updateAdd");
    },

    // 设备入库仓库
    changeDepot(val, i) {
      switch (true) {
        case val === "0":
          this.ruleForm.equipmentInventoryList[i].depotName = "仓库A";
          break;
        case val === "1":
          this.ruleForm.equipmentInventoryList[i].depotName = "仓库B";
          break;
        default:
          null;
      }
    },
    // 设备仓库库位
    changerePository(val, i) {
      console.log(val, i);
      switch (true) {
        case val === "0":
          this.ruleForm.equipmentInventoryList[i].repositoryName = "库位A";
          break;
        case val === "1":
          this.ruleForm.equipmentInventoryList[i].repositoryName = "库位B";
          break;
        default:
          null;
      }
    },
    // 备件入库仓库
    changeDepotA(val, i) {
      switch (true) {
        case val === "0":
          this.ruleForm.equipmentPartList[i].depotName = "仓库A";
          break;
        case val === "1":
          this.ruleForm.equipmentPartList[i].depotName = "仓库B";
          break;
        default:
          null;
      }
    },
    // 备件仓库库位
    changerePositoryA(val, i) {
      console.log(val, i);
      switch (true) {
        case val === "0":
          this.ruleForm.equipmentPartList[i].repositoryName = "库位A";
          break;
        case val === "1":
          this.ruleForm.equipmentPartList[i].repositoryName = "库位B";
          break;
        default:
          null;
      }
    },

    payCode(val) {
      console.log(val);
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

/deep/ .M-left {
  margin-left: 23px;
}
/deep/ .M-left-s {
  margin-left: 38px;
}
.M-leftx {
  margin-left: 12px;
}
.el-date-editor {
  width: 195px;
}
.select {
  width: 200px;
}
</style>
