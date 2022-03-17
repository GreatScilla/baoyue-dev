// 其他收付详情
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="otherPayableForm"
      ref="otherPayableForm"
      :rules="rules"
      class="detail-form"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务类型:" required prop="businessType">
            <span v-if="type === 'detail'">
              {{ otherPayableForm.billTime }}</span
            >
            <el-select
              size="small"
              v-model="otherPayableForm.businessType"
              placeholder="请选择业务类型"
              @change="changeBusiness"
              v-else
            >
              <el-option
                v-for="item in businessTypeOptions"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              >
              </el-option>
              <div :slot="businessTypeOptions.length > 0 ? null : 'empty'">
                <div
                  :class="[
                    businessTypeOptions.length > 0
                      ? 'selectAdd'
                      : 'noDataSelectAdd',
                  ]"
                  @click="selectAddDialogVisible = true"
                >
                  <i class="el-icon-plus"></i>
                  新增业务类型
                </div>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="结算账号:">
            <span v-if="type === 'detail'">
              {{ otherPayableForm.account }}</span
            >
            <el-select
              size="small"
              v-model="otherPayableForm.account"
              placeholder="请选择结算账户"
              v-else
            >
              <el-option
                v-for="item in paymentAccountOptions"
                :key="item.id"
                :label="item.openAccountName || '现金'"
                :value="item.openAccountName || '现金'"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务员:">
            <span v-if="type === 'detail'">
              {{ otherPayableForm.businessUsername }}</span
            >
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="otherPayableForm.businessUsername"
              placeholder="请选择业务员"
              @focus="focusSalesman"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="供应商:">
            <span v-if="type === 'detail'">
              {{ otherPayableForm.organName }}</span
            >
            <el-input
              v-else
              @click.native="showContract"
              suffix-icon="el-icon-search"
              size="small"
              v-model="otherPayableForm.organName"
              placeholder="请选择供应商"
              @focus="focusSalesman"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="业务部门:">
            <span v-if="type === 'detail'">
              {{ otherPayableForm.businessDeptName }}</span
            >
            <el-select
              size="small"
              v-model="otherPayableForm.businessDept"
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
              {{ otherPayableForm.handsUsername }}</span
            >
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="otherPayableForm.handsUsername"
              placeholder="请选择经手人"
              @focus="focusManager"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="otherPayableForm.billOtherItemList"
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
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>收支项目
          </template>
          <template slot-scope="scope">
            <el-select
              size="small"
              v-model="scope.row.type"
              placeholder="请选择收支项目"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in revenueExpenditureOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- <el-table-column label="科目" align="center">
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{scope.row.subjectName}}</span>
            <el-select size="small" v-model="scope.row.subjectId" placeholder="请选择科目" v-else  @change="(value,index) => changeSubject(value,scope.$index)">
              <el-option
                v-for="item in subjectOptions"
                :key="item.id"
                :label="item.subjectsName"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>金额
          </template>
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.amount }}</span>
            <el-input
              v-else
              size="small"
              v-model="scope.row.amount"
              placeholder="请输入付款金额"
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
      <el-form-item label="本次付款:">
        <span v-if="type === 'detail'"> {{ otherPayableForm.amount }}</span>
        <el-input
          v-else
            
          size="small"
          v-model="otherPayableForm.amount"
          placeholder="请输入金额"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="摘要:" required>
        <span v-if="type === 'detail'"> {{ otherPayableForm.remark }}</span>
        <el-input
          v-else
          size="small"
          v-model="otherPayableForm.remark"
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
    </el-form>
    <el-row class="button-wrapper-footer">
      <el-button
        v-if="!examine"
        size="small"
        @click="$router.push('/financial/otherPayable')"
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
    <!-- 选择供应商 -->
    <dialog-select-contactUnit
      title="供应商"
      :category="1"
      :contactUnitDialogVisible="contactUnitDialogVisible"
      @on-selected-contactUnit="onSelectedContactUnit"
    >
    </dialog-select-contactUnit>
    <!-- 新增业务类型 -->
    <select-add
      label="业务类型"
      code="business_type"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    >
    </select-add>
  </basic-container>
</template>

<script>
import {
  addEditIncomeAndExpenditure,
  detailsIncomeAndExpenditure,
  getSubjects,
} from "@/api/financial/financial";
import { getDepartmentList } from "@/api/humanResources/department";
import { getDictionary } from "@/api/system/dictbiz";
import { getFullList } from "@/api/system/settleAccount.js";
import { getUserInfo } from "@/api/system/user.js";
import { getPaymentAccountList } from "@/api/common";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import dialogSelectContactUnit from "@/components/dialog-select/contactUnit";
import uploadFile from "@/components/uploadFile";
import selectAdd from "@/components/select-add/index";
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
    dialogSelectContactUnit,
    dialogSelectPersonnel,
    uploadFile,
    selectAdd,
  },
  data() {
    return {
      otherPayableForm: {
        amount: 0,
        billOtherItemList: [{}],
        type: 3,
        makeBillUsername: "",
        organName: "",
      },
      deptOptions: [], // 部门
      revenueExpenditureOptions: [
        {
          value: 1,
          label: "借出",
        },
      ], // 收支项目
      paymentAccountOptions: [],
      businessTypeOptions: [], // 业务类型
      subjectOptions: [], // 科目
      employeeTableData: [], //业务员数据
      employeeDialogVisible: false,
      selectAddDialogVisible: false,
      fileList: [],
      contactUnitDialogVisible: false, //选择供应商
      employeeType: 1, //1 业务员 ，2 经手人
      rules: {
        businessType: [
          {
            required: true,
            message: "请选择业务类型",
            trigger: ["blur", "change"],
          },
        ],
        organName: [
          {
            required: true,
            message: "请选择供应商",
            trigger: ["blur", "change"],
          },
        ],
      },
      contractFlag: 0,
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

  methods: {
    // 获取资源
    async initResources() {
      let promiseArray = [
        getDepartmentList(),
        getSubjects(),
        getDictionary({ code: "business_type" }),
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
      this.subjectOptions = res[1].data.data;
      this.businessTypeOptions = res[2].data.data;
      this.otherPayableForm.makeBillUsername = res[3].data.data.realName;
      this.otherPayableForm.makeBillUser = res[3].data.data.id;
    },
    // 详情
    async handleDetails() {
      let res = await detailsIncomeAndExpenditure({
        id: this.data.id,
      });
      if (res.data.success) {
        this.otherPayableForm = res.data.data;
        if (this.otherPayableForm.img) {
          this.fileList = this.otherPayableForm.img.split(",");
        }
      }
    },
    // 选择业务类型
    changeBusiness(value) {
      let item = this.businessTypeOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.otherPayableForm.businessName = item[0].dictValue;
    },
    // 选择供应商
    onSelectedContactUnit(value) {
      this.otherPayableForm.organName = value.name;
      this.otherPayableForm.organId = value.id;
      this.contactUnitDialogVisible = false;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        if (this.employeeType === 1) {
          this.otherPayableForm.businessUsername = value.name;
          this.otherPayableForm.businessUser = value.id;
        } else {
          this.otherPayableForm.handsUsername = value.name;
          this.otherPayableForm.handsUser = value.id;
        }
      }
      this.employeeDialogVisible = false;
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.otherPayableForm.businessDeptName = item[0].deptName;
    },
    // 业务类型
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await getDictionary({ code: "business_type" });
        if (res.data.success) {
          this.businessTypeOptions = res.data.data;
        }
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 选择费用科目
    changeSubject(value, index) {
      let item = this.subjectOptions.filter((item) => {
        return item.id === value;
      });
      console.log(item);
      this.otherPayableForm.billOtherItemList[index].subjectName =
        item[0].subjectsName;
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
        this.otherPayableForm.img = this.fileList.toString();
      }
    },
    // 附件删除
    onRemove(file) {
      this.fileList.forEach((item, index) => {
        if (file.url === item) {
          return this.fileList.splice(index, 1);
        }
      });
      this.otherPayableForm.img = this.fileList.toString();
    },
    // 保存
    async saveIncomeStatement() {
      try {
        await this.$refs.otherPayableForm.validate();
        if (!this.otherPayableForm.organName) {
          this.$message.error("请选择供应商");
          return;
        }
        this.otherPayableForm.billOtherItemList.forEach((item) => {
          if (!item.type) {
            throw "请选择收支项目";
          }
          // else if (!item.subjectId) {
          //   throw "请选择科目";
          // }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      let res = await addEditIncomeAndExpenditure(this.otherPayableForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.back();
      }
    },
    // 添加一行
    addRow() {
      this.otherPayableForm.billAccountAmountList.push({});
    },
    // 删除一行
    delRow(index) {
      this.otherPayableForm.billAccountAmountList.splice(index, 1);
    },
    //第一次之后需点击两次才能打开供应商界面
    showContract() {
      this.contractFlag = 1 - this.contractFlag;
      if (this.contractFlag == 1) this.contactUnitDialogVisible = true;
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

