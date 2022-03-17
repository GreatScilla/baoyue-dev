<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :show-message="false"
      label-width="100px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盘点编号:">
              <span>{{ form.receiptSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="盘点日期:">
              <span>{{ form.planDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间:">
              <span>{{ form.startTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间:">
              <span>{{ form.endTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行部门:">
              <span>{{ form.executiveArm }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行人:">
              <span>{{ form.executor }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="盘点范围:">
              <span>{{ form.inventoryRange }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="制单人:">
              <span>{{ form.createUserName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <div class="inventoryDetailsBox">
          <div>盘点明细</div>
        </div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-table
          ref="table"
          :data="tableData"
          height="250"
          show-summary
          :summary-method="getSummaries"
          border
          style="width: 100%"
        >
          <el-table-column width="60" type="index" label="序号">
          </el-table-column>
          <el-table-column prop="assetSn" label="资产编号"> </el-table-column>
          <el-table-column prop="assetName" label="资产名称"> </el-table-column>
          <el-table-column prop="assetType" label="资产类别"> </el-table-column>
          <el-table-column prop="model" label="规格型号"> </el-table-column>
          <el-table-column prop="assetBrand" label="品牌"> </el-table-column>
          <el-table-column prop="location" label="所在位置"> </el-table-column>
          <el-table-column prop="whomBelongs" label="所属人员">
          </el-table-column>
          <el-table-column prop="unit" label="单位"> </el-table-column>
          <el-table-column prop="purchaseAmount" label="购置金额">
          </el-table-column>
          <el-table-column prop="amount" label="账面数量"> </el-table-column>
          <el-table-column prop="physicalInventory" label="盘点数量">
          </el-table-column>
          <el-table-column prop="deficientNumber" label="盘亏数量">
          </el-table-column>
          <el-table-column prop="deficientAmount" label="盘亏金额">
          </el-table-column>
          <el-table-column label="结果处置" width="180" prop="actionResults">
            <template slot-scope="scope">
              <el-select
                :disabled="type === 'detail'"
                v-model="scope.row.actionResults"
              >
                <el-option
                  v-for="item of actionResultsList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="140" prop="remark" label="备注">
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.remark }}</span>
              <el-input
                v-else
                type="text"
                placeholder="请输入备注"
                v-model="scope.row.remark"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <p>其它信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="备注:">
          <span v-if="type === 'detail'">{{ form.remark }}</span>
          <el-input
            placeholder="请输入备注"
            v-else
            v-model="form.remark"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
        <el-button
          v-if="type == 'add'"
          type="primary"
          size="small"
          @click="submitInventoryResults"
          >提交盘点结果</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getInventoryWorkByPage,
  getInventoryWorkSubunit,
  addOrUpdateInventoryWork,
  UpdateInventoryWork,
} from "@/api/asset-management/inventoryWorkOrder.js";
import {
  getInventorySurplusLossesByPage,
  UpdateInventorySurplusLosses,
  profitLossSingleDetail,
} from "@/api/asset-management/profitLossSingle.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
export default {
  name: "addContract",
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    examine: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
  },
  components: {
    customer,
    productSelect,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      module: "",
      show: false,
      form: {},
      data1: {},
      tableData: [],
      rules: {},
      actionResultsList: ["自动入库", "待部门负责人处置"],
    };
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  computed: {},
  async created() {
    console.log(this.data, this.type);
  },
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[13] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[13] += " ";
        }
      });
      return sums;
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      console.log(this.$route.query.data);
      this.form.id = this.data.id;
      // console.log('data',this.data.records[0].type);
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await profitLossSingleDetail({ id: id });
      console.log("121", res);
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].inventoryWorkSubunitList;
    },
    async submit() {
      this.form.inventoryWorkSubunitList = this.tableData;
      UpdateInventorySurplusLosses(this.form).then((res) => {
        console.log(res);
      });
      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/profitLossSingle",
      });
    },
    //提交盘点结果
    async submitInventoryResults() {
      if (this.tableData.some((val) => val.physicalInventory == null)) {
        return this.$message.warning("请输入盘点数量");
      }
      this.form.inventoryWorkSubunitList = this.tableData;
      this.form.totalPrice = this.totalAmount;
      const res = await UpdateInventoryWork(this.form);
      if (res.data.code == 200) {
        setTimeout(() => {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/asset-management/inventoryWorkOrder",
          });
        }, 2000);
      }
    },
    handAssetsParameter() {
      this.$router.push({
        path: "/asset-management/assetsParameter",
      });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/inventoryWorkOrder",
      });
    },
  },
  filters: {
    statusName(val) {
      if (val == "0") {
        val = "闲置";
      } else if (val == "1") {
        val = "使用中";
      } else if (val == "2") {
        val = "已报废";
      }
      return val;
    },
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>
<style lang="scss" scoped>
</style>