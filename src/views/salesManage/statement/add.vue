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
        <el-col :span="8">
          <el-form-item required label="项目名称">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.projectName"
              @focus="projectDialogVisible = true"
            ></el-input>
            <span v-else>{{ form.projectName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="name">
            <el-input
              disabled
              v-if="type !== 'detail'"
              v-model="form.memberUserName"
              @focus="selectCustomer"
            ></el-input>
            <span v-else>{{ form.memberUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item required label="导入账期">
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
              <el-button size="small" @click="resetField">重置</el-button>
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
          <el-table-column
            label="产品分类"
            prop="productCategory"
            width="100px"
          ></el-table-column>
          <el-table-column label="单位" prop="productUnit"></el-table-column>
          <el-table-column label="强度" prop="intensity"> </el-table-column>
          <el-table-column label="密度" prop="density"> </el-table-column>
          <el-table-column label="数量" prop="productNum"></el-table-column>
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
          @click="$router.push('/salesManage/statement')"
          size="small"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
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
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
    <!-- 未审核数据展示 -->
    <el-dialog
      title="提示"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="margin-bottom: 10px; font-size: 16px">
        以下订单未审核，请及时处理
      </div>
      <div v-for="(item, index) in notReviewVoList" :key="index">
        <div v-if="item.orderType === 6">销售退货:{{ item.number }}</div>
        <div v-if="item.orderType === 7">销售出库:{{ item.number }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      data: [],
      form: {
        memberUserName: "",
        memberId: "",
        accountPeriod: "",
      },
      date: [],
      tableData: [],
      notReviewVoList: [],
      showCustomer: false, // 选择用户弹窗
      params: {},
      multipleSelection: [], // 已选择数据
      projectDialogVisible: false, //项目弹窗
      dialogVisible: false, //未审核数据弹窗
    };
  },
  computed: {
    name() {
      return "客户";
    },
    codeName() {
      return "销售对账单";
    },
    category() {
      return 2;
    },
  },
  created() {
    const info = JSON.parse(localStorage.getItem("saber-userInfo"));
    this.form.createUserName = info.content["nick_name"];
    if (this.type !== "add") {
      this.form.projectSn = this.data.projectSn;
      this.form.projectName = this.data.projectName;
      //
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
      console.log(this.data);
      this.tableData = this.data.accountStatementDetailList;
      delete this.params.accountStatementDetailList;
    }
  },
  methods: {
    async handleLeading() {
      // 导入
      if (!this.form.projectName) {
        this.$message.error("请选择项目");
        return;
      }
      const params = this.form;
      params.codeName = this.codeName;
      params.type = 0;
      const res = await selectUsableImportOrder(params);
      if (res.data.code === 200 && res.data.data.notReviewVoList.length !== 0) {
        this.notReviewVoList = res.data.data.notReviewVoList;
        console.log(this.notReviewVoList);
        this.dialogVisible = true;
      }
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
      console.log(val);
      this.showCustomer = false;
      this.form.memberId = val.id;
      this.form.memberUserName = val.name;
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
      if (!this.form.projectName) {
        return this.$message.error("请选择项目名称");
      }
      if (!this.form.accountPeriod) {
        return this.$message.error("请选择导入账期");
      }
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
      const res = await addOrUpdatePurchaseOrder(params);
      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/salesManage/statement",
      });
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
      const nSums = [];
      const nums = [];
      //  var data1 =data
      data.forEach((info) => {
        if (info.orderType === 6) {
          nums.push(-Number(info.allPrice));
        } else {
          nums.push(Number(info.allPrice));
        }
        return nums;
      });
      data.forEach((info) => {
        if (info.orderType === 6) {
          nSums.push(-Number(info.productNum));
        } else {
          nSums.push(Number(info.productNum));
        }
        return nSums;
      });
      // console.log('1',nSums);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        // const values = data1.map((item) => Number(item[column.property]));
        if (column.label === "数量") {
          sums[index] = nSums.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(4);
            } else {
              return prev;
            }
          }, 0);
        } else if (column.label === "金额") {
          sums[index] = nums.reduce((prev, curr) => {
            const num = Number(curr);
            if (!isNaN(num)) {
              return (Number(prev) + Number(curr)).toFixed(2);
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
    resetField() {
      this.form = {
        memberUserName: "",
        memberId: "",
        accountPeriod: "",
      };
      this.date = [];
    },
  },
};
</script>