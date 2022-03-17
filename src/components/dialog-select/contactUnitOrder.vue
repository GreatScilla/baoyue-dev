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
            style="margin-bottom: 10px"
            clearable
          >
          </el-input>
          <el-table
            highlight-current-row
            :data="customerTableDataS"
            @row-click="clickRowCustomer"
            :show-header="false"
          >
            <el-table-column prop="name"></el-table-column>
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
          <div class="order-title">采购单发票(单选)</div>
          <el-input
            size="small"
            suffix-icon="el-icon-search"
            v-model="searchOrderParams"
            placeholder="请输入编号"
            style="margin-bottom: 10px"
            clearable=""
          >
          </el-input>
          <el-table
            ref="table"
            highlight-current-row
            :data="orderTableDataS"
            :show-header="false"
            @selection-change="handleSelectionChange"
            @select="dialogCheck"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>采购金额 {{ scope.row.allMoney }}</div>
                <div>
                  {{ scope.row.accountStaSn }} {{ scope.row.createTime }}
                </div>
                <div>未转金额 {{ scope.row.notTurnedAmount }}</div>
                <div>已转金额 {{ scope.row.haveTransferAmount }}</div>
              </template>
            </el-table-column>
          </el-table>
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
      selectioned: "",
      customerTableData: [],
      orderTableData: [],
      searchCustomerParams: "",
      searchOrderParams: "",
      clickRowDate: {}, // 当前选中行
      tableRowData: [],
    };
  },
  created() {
    this.handleList();
  },
  computed: {
    customerTableDataS() {
      return this.customerTableData.filter(
        (x) => x.name.indexOf(this.searchCustomerParams) > -1
      );
    },
    orderTableDataS() {
      return this.orderTableData;
    },
    name() {
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
        await this.getCustomerOrder("", this.customerTableData[0].id);
      }
    },
    // 客户
    async getOrderCustomer(...arg) {
      let params = { type: this.category === "1" ? 2 : 1 };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getOrderCustomerGroup(params);
      if (res.data.success) {
        let data = res.data.data.records;

        let newData = data.map((x) => ({
          id: x.id,
          name: x.name,
        }));
        this.customerTableData = newData;
        this.clickRowDate = this.customerTableData[0];
      }
    },
    // 订单
    async getCustomerOrder(code, id) {

      let res = await getCustomerOrder({
        customerId: id,
        type: 1,
        isFinance: 0
      });
      if (res.data.success) {
        this.orderTableData = res.data.data.records;
      }
    },
    //点击选择客户
    clickRowCustomer(val) {
      this.clickRowDate = val;
      this.getCustomerOrder("", val.id);
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
          this.clickRowDate,
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