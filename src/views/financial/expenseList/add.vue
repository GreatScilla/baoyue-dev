// 支出单详情
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="incomeStatementForm"
      ref="incomeStatementForm"
      :rules="rules"
      class="detail-form"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <!-- <el-form-item label="单据日期:" v-if="incomeStatementForm.billTime">
            <span v-if="type === 'detail'"> {{incomeStatementForm.billTime}}</span>
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.billTime"
              :disabled="true">
            </el-input>
          </el-form-item> -->
          <el-form-item required label="供应商:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.organName }}</span
            >
            <el-input
              v-else
              @click.native="contactUnitOrderDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="incomeStatementForm.organName"
              placeholder="请选择供应商"
              @focus="focusSalesman"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="业务部门:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.businessDeptName }}</span
            >
            <el-select
              size="small"
              v-model="incomeStatementForm.businessDept"
              placeholder="请选择业务部门"
              @change="changeDept"
              v-else
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经手人:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.handsUsername }}</span
            >
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="incomeStatementForm.handsUsername"
              placeholder="请选择经手人"
              @focus="focusManager"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="单据编号:" v-if="incomeStatementForm.billSn">
            <span v-if="type === 'detail'"> {{incomeStatementForm.billSn}}</span>
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.billSn"
              :disabled="true">
            </el-input>
          </el-form-item> -->
          <el-form-item label="应付金额:" prop="roleName">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.amount }}</span
            >
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.amount"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="业务员:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.businessUsername }}</span
            >
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="incomeStatementForm.businessUsername"
              placeholder="请选择业务员"
              @focus="focusSalesman"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="incomeStatementForm.billAccountAmountList"
        style="margin-bottom: 20px"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
          v-if="type !== 'detail'"
        >
        </el-table-column>
        <el-table-column width="120" align="center" v-if="type !== 'detail'">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-plus"
              circle
              @click="addRow"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              circle
              @click="delRow(scope.$index)"
              :disabled="scope.$index === 0"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="结算账户" align="center">
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>结算账户
          </template>
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.payAccount }}</span>
            <el-select
              size="small"
              v-model="scope.row.payAccountId"
              placeholder="请选择结算账户"
              v-else
              @change="(value, index) => changePayAccount(value, scope.$index)"
            >
              <el-option
                v-for="item in paymentAccountOptions"
                :key="item.id"
                :label="item.openAccountName || '现金'"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="付款金额" align="center">
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>付款金额
          </template>
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.amount }}</span>
            <el-input
              v-else
              size="small"
              v-model="scope.row.amount"
              placeholder="请输入收款金额"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="结算方式" align="center" prop="payType">
        </el-table-column>
        <el-table-column label="结算号" align="center">
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.paySn }}</span>
            <el-input
              v-else
              size="small"
              v-model="scope.row.paySn"
              placeholder="请输入结算号"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.remark }}</span>
            <el-input
              v-else
              size="small"
              v-model="scope.row.remark"
              placeholder="请输入备注"
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="12">
          <el-form-item label="折让金额:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.discount }}</span
            >
            <el-input
              v-else
                
              size="small"
              v-model="incomeStatementForm.discount"
              placeholder="请输入金额"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合计金额:">
            <span v-if="type === 'detail'">
              {{ incomeStatementForm.allMoney }}</span
            >
            <el-input
              v-else
                
              size="small"
              disabled
              v-model="totalAmount"
              placeholder="自动带出"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item required label="摘要:">
        <span v-if="type === 'detail'"> {{ incomeStatementForm.remark }}</span>
        <el-input
          v-else
          size="small"
          v-model="incomeStatementForm.remark"
          placeholder="请输入摘要信息"
        >
        </el-input>
      </el-form-item>
      <el-row>
        <div class="title">附件信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form-item label="附件信息:" style="margin-bottom: 6px">
        <upload-file
          :status="type"
          message=""
          :imageList="fileList"
          @on-success="onSuccess"
          @on-remove="onRemove"
        >
        </upload-file>
      </el-form-item>
      <!-- <el-row>
        <div class="title">更多信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人:">
            <span v-if="type === 'detail'"> {{incomeStatementForm.makeBillUsername}}</span>
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.makeBillUsername"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="审核时间:" v-if="type === 'detail'">
            <span v-if="type === 'detail'"> {{incomeStatementForm.auditTime}}</span>
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.auditTime"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人:" v-if="type === 'detail'">
            <span v-if="type === 'detail'"> {{incomeStatementForm.auditUsername}}</span>
            <el-input
              v-else
              size="small"
              v-model="incomeStatementForm.auditUsername"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <el-row class="button-wrapper-footer">
      <el-button
        v-if="!examine"
        size="small"
        @click="$router.push('/financial/expenseList')"
        >取消</el-button
      >
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveIncomeStatement"
        >保存</el-button
      >
    </el-row>
    <!-- 选择人员 -->
    <dialog-select-personnel
      :title="employeeType === 1 ? '业务员' : '经手人'"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- 选择供应商订单 -->
    <dialog-select-contactUnit-order
      title="供应商"
      category="1"
      :visible.sync="contactUnitOrderDialogVisible"
      @on-selected-contactUnit-order="onSelectedContactUnit"
    >
    </dialog-select-contactUnit-order>
  </basic-container>
</template>

<script>
import {
  addEditIncomeAndExpenditure,
  detailsIncomeAndExpenditure,
} from "@/api/financial/financial";
import { getDepartmentList } from "@/api/humanResources/department";
import { getFullList } from "@/api/system/settleAccount.js";
import { getUserInfo } from "@/api/system/user.js";
import { getPaymentAccountList } from "@/api/common";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import dialogSelectContactUnitOrder from "@/components/dialog-select/contactUnitOrder";
import uploadFile from "@/components/uploadFile";
export default {
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
    dialogSelectContactUnitOrder,
    dialogSelectPersonnel,
    uploadFile,
  },
  data() {
    return {
      incomeStatementForm: {
        amount: 0,
        billAccountAmountList: [{}],
        billOrderItemList: [],
        type: 1,
        makeBillUsername: "",
      },
      deptOptions: [], // 部门
      paymentAccountOptions: [], // 结算账户
      settlementMethodOptions: [], // 结算方式
      employeeTableData: [], //业务员数据
      employeeDialogVisible: false,
      fileList: [],
      contactUnitOrderDialogVisible: false, //选择客户对话框
      employeeType: 1, //1 业务员 ，2 经手人
      rules: {
        organName: [
          {
            required: true,
            message: "请选择客户",
            trigger: ["blur", "change"],
          },
        ],
        remark: [
          {
            required: true,
          },
        ],
      },
    };
  },
  created() {
    this.initResources();
    if (this.type !== "add") {
      this.handleDetails();
    }
    getFullList({
      size: 9999,
    }).then((res) => {
      this.paymentAccountOptions = res.data.data.records;
    });
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.incomeStatementForm.billAccountAmountList.forEach((item) => {
        if (item.amount) {
          total = (+total + +item.amount).toFixed(2);
        }
      });
      return total;
    },
  },
  methods: {
    // 获取资源
    async initResources() {
      let promiseArray = [
        getDepartmentList(),
        // getPaymentAccountList(),
        getUserInfo(),
      ];
      let handlePromise = Promise.all(
        promiseArray.map((promiseItem) => {
          return promiseItem.catch(function (err) {
            return err;
          });
        })
      );
      let res = await handlePromise;
      this.deptOptions = res[0].data.data;
      return;
      this.paymentAccountOptions = res[1].data.data;
      this.paymentAccountOptions.forEach((item) => {
        if (item.type === 1) {
          item.typeName = "现金";
        } else {
          item.typeName = "银行卡";
        }
      });
      this.incomeStatementForm.makeBillUsername = res[2].data.data.realName;
      this.incomeStatementForm.makeBillUser = res[2].data.data.id;
    },
    // 详情
    async handleDetails() {
      let res = await detailsIncomeAndExpenditure({
        id: this.data.id,
      });
      if (res.data.success) {
        this.incomeStatementForm = res.data.data;
        if (this.incomeStatementForm.img) {
          this.fileList = this.incomeStatementForm.img.split(",");
        }
      }
    },
    // 选择供应商
    onSelectedContactUnit(customer, order) {
      console.log(customer, order);
      if (order.length > 0) {
        order.forEach((item) => {
          this.incomeStatementForm.billOrderItemList.push({
            amount: item.allMoney,
            orderId: item.id,
            type: 1,
          });
          this.incomeStatementForm.amount = Number(item.notTurnedAmount);
        });
         this.incomeStatementForm.accountStaSn = order[0].accountStaSn;
        this.incomeStatementForm.organName = customer.name;
        this.incomeStatementForm.organId = customer.id;
      }
      this.contactUnitOrderDialogVisible = false;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        if (this.employeeType === 1) {
          this.incomeStatementForm.businessUsername = value.name;
          this.incomeStatementForm.businessUser = value.id;
        } else {
          this.incomeStatementForm.handsUsername = value.name;
          this.incomeStatementForm.handsUser = value.id;
        }
      }
      this.employeeDialogVisible = false;
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.incomeStatementForm.businessDeptName = item[0].deptName;
    },
    // 选择结算账户
    // changePayAccount(value,index){
    //   let item = this.paymentAccountOptions.filter((item) => {
    //     return item.id === value
    //   })
    //   this.incomeStatementForm.billAccountAmountList[index].payAccount = item[0].type
    // },
    changePayAccount(value, index) {
      let item = this.paymentAccountOptions.filter((item) => {
        return item.id === value;
      });

      this.incomeStatementForm.billAccountAmountList[index].payType =
        item[0].xfType == 0 ? "现金" : "银行卡";
    },
    // 选择业务员
    focusSalesman() {
      this.employeeType = 1;
    },
    // 选择经手人
    focusManager() {
      this.employeeType = 2;
    },
    // 附件上传
    onSuccess(value) {
      if (value) {
        this.fileList.push(value);
        this.incomeStatementForm.img = this.fileList.toString();
      }
    },
    // 附件删除
    onRemove(file) {
      this.fileList.forEach((item, index) => {
        if (file.url === item) {
          return this.fileList.splice(index, 1);
        }
      });
      this.incomeStatementForm.img = this.fileList.toString();
    },
    // 保存
    async saveIncomeStatement() {
      this.incomeStatementForm.allMoney = this.totalAmount;
      try {
        await this.$refs.incomeStatementForm.validate();
        if (!this.incomeStatementForm.organName) {
          this.$message.error("请选择供应商");
          return;
        }
        if (!this.incomeStatementForm.remark)
          return this.$message.error("请输入摘要");
        this.incomeStatementForm.billAccountAmountList.forEach((item) => {
          if (!item.payAccountId) {
            throw "请选择结算账户";
          } else if (!item.amount) {
            throw "请输入付款金额";
          }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      let res = await addEditIncomeAndExpenditure(this.incomeStatementForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.back();
      }
    },
    // 添加一行
    addRow() {
      this.incomeStatementForm.billAccountAmountList.push({});
    },
    // 删除一行
    delRow(index) {
      this.incomeStatementForm.billAccountAmountList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
.el-table {
  .el-input,
  .el-select {
    width: 150px;
  }
}
</style>

