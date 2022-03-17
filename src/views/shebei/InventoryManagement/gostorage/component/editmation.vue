<template>
  <div class="add-com">
    <el-dialog
      title="入库单详情"
      append-to-body
      :visible.sync="editdialogVisible"
      width="65%"
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
        <el-col :span="9" v-if="falg == '0'"
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
      <div class="box" v-if="falg == '0'"></div>
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
              <el-form-item label="入库类别" prop="typeClass">
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
              <el-form-item label="入库日期" prop="documentTime">
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
              <el-form-item label="源单号" class="M-left">
                <el-input
                  v-model="ruleForm.singleNumber"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="制单人" class="M-left-s">
                <el-input
                  v-model="ruleForm.createUser"
                  placeholder="当前账号name"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="供应商" prop="organId">
                <el-select
                  @change="changeOrganName"
                  v-model="ruleForm.organId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in organNameOptions"
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
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <el-form-item label="送货单号" prop="orderNumber">
                <el-input
                  v-model="ruleForm.orderNumber"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 入库明细</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

        <!-- 入库明细 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">扫码:</div></el-col
          >
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
                    <el-select v-model="row.location" placeholder="请选择">
                      <el-option
                        v-for="item in depotNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="repositoryName" label="入库库位">
                  <template slot-scope="{ row }">
                    <el-select v-model="row.barCode" placeholder="请选择">
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
                    <el-select v-model="row.location" placeholder="请选择">
                      <el-option
                        v-for="item in depotNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="repositoryName" label="入库库位">
                  <template slot-scope="{ row }">
                    <el-select v-model="row.barCode" placeholder="请选择">
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
import {
  Gostorage,
  InfoUpdate
} from "../../../../../api/shebei/InventoryManagement";
export default {
  name: "",
  components: {},
  props: {
    editdialogVisible: {
      type: [String, Number, Object, Array]
    },
    falg: {
      type: [String, Number, Object, Array]
    },
    detailAll: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      // 表单需要的数据

      ruleForm: {
        type: "",
        typeClass: "", // 分类字体
        organId: "", // 供应商id
        number: '',
        organName: "", // 供应商字体
        documentTime: "", // 入库日期
        createUser: "admin", // 制单人
        orderNumber: "", // 送货单号
        remark: "这是一条备注" //备注
      },

      //表单的校验
      rules: {
        number: [{ required: true, message: "单据编号" }],
        typeClass: [
          { required: true, message: "请输入入库类别", trigger: "change" }
        ],
        documentTime: [
          { required: true, message: "请输入入库日期", trigger: "change" }
        ],
        organId: [
          { required: true, message: "请输入供应商", trigger: "change" }
        ],
        orderNumber: [
          { required: true, message: "请输入送货单号", trigger: "blur" }
        ]
      },

      // 表格数据
      tableData: [],

      // 入库类别的下拉框
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

      // 供应商下拉框
      organNameOptions: [
        {
          value: "0",
          label: "x供应商"
        },
        {
          value: "1",
          label: "xx供应商"
        },
        {
          value: "2",
          label: "xxx供应商"
        }
      ],

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
    // 通知父组件 关闭
    updateVisible() {
      this.$emit("updateEditVisible");
    },
    // 真正关闭的回调
    detailialogClosed() {
      this.$refs.ruleForm.resetFields();
    },

    // 入库类别
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

    // 供应商
    changeOrganName(val) {
      switch (true) {
        case val === "0":
          this.ruleForm.organName = "x供应商";
          break;
        case val === "1":
          this.ruleForm.typeClass = "xx供应商";
          break;
        case val === "2":
          this.ruleForm.typeClass = "xxx供应商";
          break;
        default:
          null;
      }
    },

    // 设备入库仓库
    changeDepot(val, i) {
      console.log(val, i);
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
      console.log(val, i);
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

    // 编辑
    async editForm() {
      this.ruleForm.type = "入库";
      const { data: res } = await InfoUpdate(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.$emit("upTAb");
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
@import "../../../../../styles/onedit";
/deep/.el-dialog__body {
  padding: 0px 20px;
}

/deep/ .M-left {
  margin-left: 23px;
}
/deep/ .M-left-s {
  margin-left: 38px;
}

/deep/ .D-flex .grid-content {
  display: flex;
  justify-content: flex-end;
}
</style>
