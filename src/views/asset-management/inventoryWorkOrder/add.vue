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
              <span>{{ form.inventoryWorkSn }}</span>
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
          <div v-if="data.status == 2">
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              plain
              @click="handAssetsParameter"
              >新增资产</el-button
            >
            <el-tabs @tab-click="tabClick" type="border-card">
              <el-tab-pane label="全部"></el-tab-pane>
              <el-tab-pane label="正常"></el-tab-pane>
              <el-tab-pane label="盘盈"></el-tab-pane>
              <el-tab-pane label="盘亏"></el-tab-pane>
            </el-tabs>
          </div>
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
            <template slot="header">
              <span style="color: #f56c6c">*</span>盘点数量
            </template>
            <template slot-scope="scope">
              <span v-if="type == 'detail'">{{
                scope.row.physicalInventory
              }}</span>
              <el-input
                v-else
                @input="
                  (value, index, number, price) =>
                    changUnitPrice(
                      scope.row.physicalInventory,
                      scope.$index,
                      scope.row.amount,
                      scope.row.purchaseAmount
                    )
                "
                size="small"
                type="number"
                max="1"
                min="0"
                v-model="scope.row.physicalInventory"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="deficientNumber" label="盘亏数量">
          </el-table-column>
          <el-table-column prop="deficientAmount" label="盘亏金额">
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
    };
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  computed: {
    //盘点总金额
    totalAmount() {
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.deficientAmount) {
          total = (+total + +item.deficientAmount).toFixed(2);
        }
      });
      return total;
    },
  },
  async created() {
    if (this.type === "add") {
      this.data1 = this.$route.query.data;
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUserName = info.content["nick_name"];
      this.form.createUserId = info.content["user_id"];
    } else {
      this.data1 = this.data;
    }
  },
  mounted() {
    this.getDetailInfo();
    this.getInventoryWorkSubunit(this.data1.id, 0);
  },
  methods: {
    // 盘亏数量
    changUnitPrice(value, index, number, price) {
      if (value && number) {
        this.$set(
          this.tableData[index],
          "deficientNumber",
          Number(value) - Number(number)
        );
        this.$set(
          this.tableData[index],
          "deficientAmount",
          ((Number(value) - Number(number)) * Number(price)).toFixed(2)
        );
      }
    },
    tabClick(val) {
      //盘点明细类型 0 全部 1 正常 2 盘盈 3 盘亏
      this.getInventoryWorkSubunit(this.data1.id, val.index);
    },
    async getInventoryWorkSubunit(id, type) {
      var data = {
        id: id,
        type: type,
      };
      const res = await getInventoryWorkSubunit(data);
      this.tableData = res.data.data;
    },
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
      this.form.id = this.data1.id;
      const params = {
        data: this.form,
      };
      const res = await getInventoryWorkByPage(params);
      this.form = res.data.data.records[0];
    },
    async submit() {
      this.form.inventoryWorkSubunitList = this.tableData;
      addOrUpdateInventoryWork(this.form).then((res) => {
        console.log(res);
      });
      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/inventoryWorkOrder",
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
.inventoryDetailsBox {
  display: flex;
  align-items: end;
  justify-content: space-between;
  div:nth-child(2) {
    display: flex;
    /deep/.el-button {
      margin-right: 10px;
    }
  }
  /deep/.el-tabs__content {
    padding: 0;
  }
}
</style>