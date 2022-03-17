<template>
  <div class="pages addPages">
    <el-form :inline="true" label-width="80px" class="detail-form">
      <el-row v-if="type !== 'add'">
        <el-col :span="12">
          <el-form-item label="单据日期">
            <el-date-picker
              disabled
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据编号">
            <el-input v-model="form.accountStaSn" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="name">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.memberUserName"
              @focus="selectCustomer"
            ></el-input>
            <span v-else>{{ form.memberUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="导入账期">
            <el-date-picker
              v-if="type !== 'detail'"
              v-model="form.accountPeriod"
              type="month"
              placeholder="选择日期"
              value-format="yyyy-MM"
            ></el-date-picker>
            <span v-else>{{ form.accountPeriod }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="日期">
            <el-date-picker
              v-if="type !== 'detail'"
              v-model="date"
              type="daterange"
              @change="changeTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span v-else>{{ date[0] }} 至 {{ date[1] }}</span>
            <div v-if="type !== 'detail'" class="margin-left-20 inline-box">
              <el-button type="primary" size="small" @click="handleLeading"
                >导入</el-button
              >
              <el-button size="small">重置</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" size="small" @click="handleLeading">导入</el-button>
            <el-button size="small">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row class="operation-function">
        <el-button
          v-if="type !== 'detail'"
          size="small"
          icon="el-icon-delete"
          type="danger"
          plain
          @click="handleDeleteArr()"
          >批量删除</el-button
        >
      </el-row>
      <el-row>
        <el-table
          border
          @selection-change="handleSelectionChange"
          show-summary
          :summary-method="getSummaries"
          :data="tableData"
        >
          <el-table-column
            v-if="type !== 'detail'"
            type="selection"
            width="60"
          ></el-table-column>
          <el-table-column
            label="单据日期"
            prop="checkTime"
            width="120px"
          ></el-table-column>
          <el-table-column
            label="单据编号"
            prop="orderSn"
            width="160px"
          ></el-table-column>
          <el-table-column label="单据类型" prop="orderType">
            <template slot-scope="{ row }">
              <span>{{ row.orderType | orderTypeText }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" prop="linkNumber">
            <template slot-scope="{ row }">
              <el-image :src="row.productPic"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="产品编码"
            prop="productSn"
            width="140px"
          ></el-table-column>
          <el-table-column label="产品" prop="productName"></el-table-column>
          <el-table-column
            label="规格型号"
            prop="model"
            width="120px"
          ></el-table-column>
          <el-table-column label="单位" prop="productUnit"></el-table-column>
          <el-table-column label="进货数量" prop="num"></el-table-column>
          <el-table-column label="验收数量" prop="productNum"></el-table-column>
          <el-table-column
            label="单价"
            align="center"
            width="100px"
            prop="productPrice"
          >
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.productPrice }}</span>
              <el-input
                v-else
                style="width: 75px"
                v-model="scope.row.productPrice"
                @blur="(val) => calSalePrice(val, scope.$index)"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="allPrice">
            <template slot-scope="scope">
              {{
                scope.row.orderType === 6 || scope.row.orderType === 2
                  ? "-" + scope.row.allPrice
                  : scope.row.allPrice
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="送货单号"
            prop="sendOrderNo"
          ></el-table-column>
          <el-table-column label="车牌号" prop="carLicense"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="type !== 'detail'"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <p>更多信息</p>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ form.createUserName }}</span>
            <el-input v-else v-model="form.createUserName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type === 'detail'">
          <el-form-item label="审核人">
            <span>{{ form.checkPerson }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <el-button
          v-if="!examine"
          @click="$router.push('/purchaseManage/statement')"
          size="small"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          :loading="requesting"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <el-dialog
      append-to-body
      :visible.sync="showCustomer"
      :title="`选择${name}`"
    >
      <customer
        :category="category"
        :type="statement"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </div>
</template>

<script>
import projectSelect from "@/components/projectSelect";
import customer from "@/components/customer";
import {
  selectUsableImportOrder,
  addOrUpdatePurchaseOrder,
} from "@/api/salesManage/statement";
import deleteOrAudit from "@/mixins/deleteOrAudit";
export default {
  name: "addStatement",
  mixins: [deleteOrAudit],
  props: {
    type: {
      // 类型分add,edit,detail
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
    projectSelect,
  },
  data() {
    return {
      statement: "statement",
      requesting: false,
      data: [],
      form: {
        memberUserName: "",
        memberId: "",
        accountPeriod: "",
      },
      date: [],
      tableData: [],
      showCustomer: false, // 选择用户弹窗
      params: {},
      multipleSelection: [], // 已选择数据
      projectDialogVisible: false, //项目弹窗
    };
  },
  computed: {
    name() {
      return "供应商";
    },
    codeName() {
      return "采购对账单";
    },
    category() {
      return 1;
    },
  },
  created() {
    const info = JSON.parse(localStorage.getItem("saber-userInfo"));
    this.form.createUserName = info.content["nick_name"];
    if (this.type !== "add") {
      this.form.memberUserName = this.data.customerName;
      this.form.memberId = this.data.customerId;
      this.form.accountPeriod = this.data.accountPeriod;
      this.date = [];
      this.date[0] = this.form.startDay = this.data.startDay;
      this.date[1] = this.form.endDay = this.data.endDay;
      this.form.id = this.data.id;
      this.form.createTime = this.data.createTime;
      this.form.accountStaSn = this.data.accountStaSn;
      this.params = this.data;
      this.tableData = this.data.accountStatementDetailList;
      delete this.params.accountStatementDetailList;
    }
  },
  methods: {
    async handleLeading() {
      // 导入
      // const params = {
      //   memberId: this.form.memberId,
      //   memberUserName: this.form.memberUserName,
      //   startDay: this.form.startDay,
      //   endDay: this.form.endDay,
      //   accountPeriod:
      // }
      const params = this.form;
      params.codeName = this.codeName;

      params.type = 1;
      console.log(params);
      const res = await selectUsableImportOrder(params);
      this.tableData = res.data.data.detailVoList;
      this.params = res.data.data;
      if (this.type !== "add") {
        this.params.accountStaSn = params.accountStaSn;
        this.params.id = params.id;
      }

      delete this.params.detailVoList;
    },
    selectCustomer() {
      this.showCustomer = true;
    },
    closeCustomer() {
      this.showCustomer = false;
    },
    submitCustomer(val) {
      this.showCustomer = false;
      this.form.memberId = val.id;
      this.form.memberUserName = val.name;
      this.form.paymentTypeId = val.settlementContactUnitId;
      this.form.paymentType = val.settlementContactUnitName;
      console.log(this.form);
    },
    changeTime(value) {
      // 选择时间
      if (value !== null) {
        this.form.startDay = `${value[0]} 00:00:00`;
        this.form.endDay = `${value[1]} 23:59:59`;
      } else {
        this.form.startDay = this.form.endDay = "";
      }
    },
    async submit() {
      this.params.accountPeriod = this.form.accountPeriod;
      const params = {
        accountStatement: {
          ...this.params,
          accountStatementDetailList: this.tableData,
        },
      };
      if (this.type === "add") {
        params.codeName = this.codeName;
      } else {
        params.codeName = "";
      }
      console.log(params);
      this.requesting = true;
      try {
        const res = await addOrUpdatePurchaseOrder(params);
        this.requesting = false;
        this.$message.success({
          message: "操作成功",
        });

        this.$router.push({
          path: "/purchaseManage/statement",
        });
      } catch {
        this.requesting = false;
      }
    },
    //选择项目
    onProjectSelect(e) {
      if (e.customerId) {
        this.form.projectSn = e.projectSn;
        this.form.projectName = e.projectName;
        this.form.memberUserName = e.customerName;
        this.form.memberId = e.customerId;
      } else {
        this.$message.error("该客户缺少客户id");
      }
    },
    handleDeleteArr() {
      //批量删除
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          const idSet = this.multipleSelection.reduce((acc, v) => {
            acc[v.orderId] = true;
            return acc;
          }, {});
          this.tableData = this.tableData.filter((v) => !idSet[v.orderId]);
        });
      }
    },
    handleDelete(index) {
      this.$confirm("确定要删除该数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.splice(index, 1);
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const nums = [];
      data.forEach((info) => {
        if (info.orderType === 6) {
          nums.push(-Number(info.allPrice));
        } else {
          nums.push(Number(info.allPrice));
        }
        return nums;
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.label === "数量") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else if (column.label === "金额") {
          sums[index] = nums.reduce((prev, curr) => {
            const num = Number(curr);
            if (!isNaN(num)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    handleSelectionChange(val) {
      // 已选择数据
      this.multipleSelection = val;
    },
    calSalePrice(val, index) {
      // 计算金额
      this.tableData[index].allPrice =
        this.tableData[index].productNum *
        Number(this.tableData[index].productPrice);
    },
  },
};
</script>