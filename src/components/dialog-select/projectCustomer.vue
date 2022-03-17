// 选择订单
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      append-to-body
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="10">
          <div class="order-title">{{ name }}组</div>
          <el-input
            size="small"
            suffix-icon="el-icon-search"
            v-model="searchCustomerParams"
            placeholder="请输入名称查找"
            @keyup.enter.native="searchCustomer"
            @change="searchCustomer"
            style="margin-bottom: 10px"
          >
          </el-input>
          <el-table
            ref="project"
            highlight-current-row
            :data="customerTableData"
            @row-click="clickRowCustomer"
            :show-header="false"
          >
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  {{ scope.row.projectName }}项目 {{ scope.row.customerName }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination> -->
        </el-col>
        <el-col :span="14">
          <div class="order-title">销售发票(单选)</div>
          <!-- <el-input
            size="small"
            suffix-icon="el-icon-search"
            v-model="searchOrderParams"
            placeholder="请输入编号"
            @keyup.enter.native="searchOrder"
            @change="searchOrder"
            style="margin-bottom: 10px"
          >
          </el-input> -->
          <el-table
            ref="table"
            :data="orderTableData"
            :show-header="false"
            @selection-change="handleSelectionChange"
            @select="dialogCheck"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>销售金额 {{ scope.row.allMoney }}</div>
                <div>{{ scope.row.orderSn }} {{ scope.row.createTime }}</div>
                <div>对账单号 {{ scope.row.accountStaSn }}</div>
                <div>账期 {{ scope.row.accountPeriod }}</div>
                <div>未转金额 {{ scope.row.notTurnedAmount }}</div>
                <div>已转金额 {{ scope.row.haveTransferAmount }}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="salesMessage">
            <div>
              <span>信用额度 {{ form.authorizationLimit }}</span>
              <span>信用余额 {{ form.creditBalanceMoney }}</span>
            </div>
            <div>
              <span>项目发货金额 {{ form.allMoney }}</span>
              <span>项目已收金额 {{ form.receivedMoney }}</span>
            </div>
            <div>
              <span>项目欠款金额 {{ form.arrearsMoney }}</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取 消 </el-button>
        <el-button size="small" type="primary" @click="confim">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getContactUnitBase } from "@/api/common";
import {
  getOrderCustomerGroup,
  getCustomerOrder,
  selectProjectAndCustomerDisList,
  listProjectAllMoney,
  getProjectBySn,
} from "@/api/financial/financial";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "customer",
  mixins: [paginationMixin],
  props: {
    category: {
      // 1供应商2客户
      type: "String",
      default: "2",
    },
    visible: Boolean,
    title: String,
  },
  data() {
    return {
      form: {},
      selectioned: "",
      customerTableData: [],
      orderTableData: [],
      searchCustomerParams: "",
      searchOrderParams: "",
      clickRowData: {}, // 当前选中行
      tableRowData: [],
    };
  },
  created() {
    this.handleList();
  },
  computed: {
    name() {
      return "项目";
      if (this.category === "1") {
        return "供应商";
      } else {
        return "客户";
      }
    },
  },
  methods: {
    async handleList() {
      await this.getOrderCustomer();
      if (this.customerTableData[0]) {
        await this.getCustomerOrder(
          this.customerTableData[0].customerId,
          this.customerTableData[0].projectSn
        );
      }
    },
    // 获取项目
    async getOrderCustomer(...arg) {
      let params = {};
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await selectProjectAndCustomerDisList(params);
      if (res.data.success) {
        let data = res.data.data;
        this.customerTableData = data;
        this.clickRowData = this.customerTableData[0];
        // this.$nextTick(() => {
        //   this.$refs.project.setCurrentRow(this.customerTableData[0]);
        // });

        // let newData = []
        // if (data.length>0) {
        //   data.forEach(item => {
        //     newData.push({
        //       id:item.split('_')[0],
        //       name:item.split('_')[1],
        //     })
        //   })
        //   this.customerTableData = newData
        //   this.clickRowData = this.customerTableData[0]
        // }
      }
    },
    // 订单
    async getCustomerOrder(id, sn) {
      let res = await listProjectAllMoney({
        customerId: id,
        projectSn: sn,
      });
      if (res.data.success) {
        this.orderTableData = res.data.data;
      }
           let res1 = await getProjectBySn({
        projectSn: sn,
      });
      this.form = res1.data.data;
    },
    // 搜索客户
    async searchCustomer() {
      await this.getOrderCustomer({ keyParam: this.searchCustomerParams });
      if (this.customerTableData.length > 0) {
        await this.getCustomerOrder(
          this.customerTableData[0].customerId,
          this.customerTableData[0].projectSn
        );
      }
    },
    // 搜索订单
    async searchOrder() {
      await this.getCustomerOrder(
        this.clickRowData.customerId,
        this.clickRowData.projectSn
      );
    },
    //点击选择客户
    clickRowCustomer(val) {
      this.clickRowData = val;
      this.getCustomerOrder(
        this.clickRowData.customerId,
        this.clickRowData.projectSn
      );
    },
    // 多选订单
    handleSelectionChange(value) {
      // this.tableRowData = value;
    },
    dialogCheck(selection, row) {
      this.tableRowData = [];
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.tableRowData.push(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    // 确定
    confim() {
      if (this.tableRowData.length > 0) {
        this.$emit(
          "on-selected-contactUnit-order",
          this.clickRowData,
          this.tableRowData
        );
      } else {
        this.$message.info("请选择订单");
      }
    },
    // 取消
    cancel() {
      this.closeDialog();
    },
    // 关闭
    handleClose() {
      this.closeDialog();
    },
    // 表单初始
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.salesMessage {
  padding-top: 2%;
  div {
    display: flex;
    //  justify-content: ;
    span {
      width: 50%;
      padding-left: 12%;
    }
  }
}
.el-input {
  width: 240px;
  margin-left: 15px;
}
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  height: 30px;
  line-height: 30px;
  list-style: none;
  padding-left: 15px;
  margin-bottom: 5px;
}
li:focus {
  background: #e8f2ea;
}
.el-row {
  border: 1px solid #ccc;
}
.el-col {
  margin-bottom: 0px;
  height: 300px;
  overflow-y: scroll;
}
.el-col-10 {
  border-right: 1px solid #ccc;
}
.order-title {
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  padding-left: 15px;
}
</style>