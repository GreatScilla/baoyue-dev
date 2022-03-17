<template>
  <div class="add-com">
    <el-dialog
      title="设备/备件转资产"
      append-to-body
      :visible.sync="adddialogVisible"
      width="65%"
      @close="detailialogClosed"
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
            <el-button type="primary" @click="addForm">保存</el-button>
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
              <el-form-item label="入库类别" prop="typeClassId">
                <el-select
                  @change="changeType"
                  v-model="ruleForm.typeClassId"
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
              <strong>● 明细</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

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
                <el-table-column prop="assetTag" label="资产编号">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.assetTag"
                      placeholder="请输入内容"
                    ></el-input>
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
                <el-table-column prop="depotName" label="入库仓库">
                  <!-- v-slot:default="{row, $index}" -->
                  <template slot-scope="{ row }">
                    <el-select v-model="row.warehouse" placeholder="请选择">
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
                <el-table-column prop="assetTag" label="资产编号">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.assetTag"
                      placeholder="请输入内容"
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
    </el-dialog>
  </div>
</template>
<script>
import {
  InfoisAsset,
  getPurchaseOrderByNumber
} from "@/api/shebei/InventoryManagement";
export default {
  name: "",
  components: {},
  props: {
    InfoisAssetall: {
      type: [Number, Object, Array]
    }
  },
  data() {
    return {
      // 表单需要的数据
      adddialogVisible: false,
      ruleForm: {
        type: "",
        typeClassId: "", // 分类类别
        typeClass: "", // 分类字体
        organId: "", // 供应商id
        organName: "", // 供应商字体
        documentTime: "", // 入库日期
        createUser: "admin", // 制单人
        orderNumber: "", // 送货单号
        remark: "这是一条备注", //备注
        number: "", // 单据编号
        singleNumber: "", // 原单号

        // 表格数据
        // 设备
        equipmentInventoryList: [],
        // 备件
        equipmentPartList: []
      },

      // 表单的校验
      rules: {
        number: [
          { required: true, message: "单据编号不能为空", trigger: "blur" }
        ],
        typeClassId: [
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
    InfoisAssetall(val) {
      this.ruleForm = val;
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 真正关闭的回调
    detailialogClosed() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.singleNumber = "";
      this.adddialogVisible = false;
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
          this.ruleForm.organName = "xx供应商";
          break;
        case val === "2":
          this.ruleForm.organName = "xxx供应商";
          break;
        default:
          null;
      }
    },

    // 转资产
    async addForm() {
      const rest = await this.$confirm("是否转资产?", "转资产", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消转资产");
      const { data: res } = await InfoisAsset({ids: this.ruleForm.id});
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("转资产成功");
      this.$emit("updateIsAsset");
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
    }

    // // 下拉框的数据
    // async initsele() {
    //   const {data:res} = await getContactUnitBase('2');
    //   console.log(res.data);
    // }
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
</style>
