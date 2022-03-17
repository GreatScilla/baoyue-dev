// 获取源单号的弹窗
<template>
  <div class="add-dialog">
    <el-tabs
      v-if="type === 'saleOutbound'"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="销售订单号" name="0"></el-tab-pane>
      <el-tab-pane label="销售变更单号" name="1"></el-tab-pane>
    </el-tabs>
    <el-row>
      <div
        class="search-box"
        style="margin-right: 50px"
        v-if="type === 'saleReturn'"
      >
        <el-input
          clearable
          v-model="keyword"
          placeholder="出库单/客户名/项目名"
        ></el-input>
        <i
          class="el-icon-search padding-right-10 cursor-style"
          @click="searchProduct"
        ></i>
      </div>
    </el-row>
    <el-row
      v-if="type === 'saleOutbound' || type === 'purchase'"
      :style="type === 'saleOutbound' ? 'display: flex;' : ''"
    >
      <div
        class="search-box"
        style="margin-right: 30px"
        v-if="type === 'saleOutbound'"
      >
        <el-input
          v-model="keyword"
          size="small"
          placeholder="项目名/客户名/销售员"
        ></el-input>
        <i
          class="el-icon-search padding-right-10 cursor-style"
          @click="searchProduct"
        ></i>
      </div>
      <div class="search-box" v-if="type === 'saleOutbound'">
        <el-select
          size="small"
          placeholder="请选择订单状态"
          v-model="deliveryStatus"
          clearable
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <i
          class="el-icon-search padding-right-10 cursor-style"
          @click="searchProduct"
        ></i>
      </div>
      <div style="display: flex">
        <div
          class="search-box"
          style="margin-right: 50px"
          v-if="type === 'purchase'"
        >
          <el-input
            clearable
            v-model="keyword"
            placeholder="订单号/供应商名"
          ></el-input>
          <i
            class="el-icon-search padding-right-10 cursor-style"
            @click="searchProduct"
          ></i>
        </div>
        <div class="search-box" v-if="type === 'purchase'">
          <el-select
            size="small"
            placeholder="请选择订单状态"
            clearable
            v-model="stockStatus"
          >
            <el-option
              v-for="item in typeList1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <i
            class="el-icon-search padding-right-10 cursor-style"
            @click="searchProduct"
          ></i>
        </div>
      </div>
    </el-row>
    <el-row class="margin-bottom-20">
      <el-table
        border
        :data="tableData"
        class="margin-bottom-20"
        highlight-current-row
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="clickRowCustomer"
        @current-change="handleColumnChange"
      >
        <el-table-column v-if="type === 'saleOutbound'&&orderType==0" type="expand">
          <template slot-scope="scopes">
            <el-table
              ref="multipleTable"
              :data="scopes.row.orderList"
              :show-header="false"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div>变更单编号: {{ scope.row.orderSn }}</div>
                  <div>客户名称: {{ scope.row.memberUserName }}</div>
                  <div>销售员: {{ scope.row.salesMan }}</div>
                  <div>项目名称: {{ scope.row.projectName }}</div>
                  <div>变更原因: {{ scope.row.note }}</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="orderSn" :label="name"></el-table-column>
        <el-table-column
          v-if="name === '销售出库单号'"
          prop="orderNumber"
          label="销售订单号"
        ></el-table-column>
        <el-table-column
          prop="supplierName"
          :label="supplierName"
        ></el-table-column>
        <el-table-column
          prop="salesMan"
          :label="type === 'purchase' ? '采购员' : '销售员'"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          :label="type === 'purchase' ? '经营类型' : '项目名称'"
        ></el-table-column>
      </el-table>
      <el-row class="pagination-wrapper float-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-row>
    </el-row>
    <div class="margin-bottom-20 footer-box">
      <el-button @click="handleCancel" size="small">取消</el-button>
      <el-button type="primary" @click="submit" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
import {
  getBasicInfoByOutbound,
  getBasicDepotHeadInfoByType,
} from "@/api/salesManage/common";
import { getProjectStatus } from "@/api/projects/projectOverview";
import { getOrderByPage } from "@/api/salesManage/saleOutbound";
import { getBasicPurchaseInfoByType } from "@/api/purchase/purchaseInbound";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "basicInfo",
  mixins: [paginationMixin],
  props: {
    type: {
      type: String,
      default: "sale",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      RowCustomer: {},
      expands: [],
      orderType: 0,
      activeName: "0",
      deliveryStatus: "",
      stockStatus: 0,
      typeList: [
        { value: "", label: "全部" },
        { value: 0, label: "未发货" },
        { value: 1, label: "部分发货" },
        { value: 2, label: "已发货" },
      ],
      typeList1: [
        { value: "", label: "全部" },
        { value: 0, label: "待进货" },
        { value: 1, label: "部分进货" },
        { value: 2, label: "已进货" },
      ],
      currentRow: [], // 当前选中行
      currentRow1: [], // 当前选中子单行
      tableData: [],
      keyword: "", //关键词
    };
  },
  mounted() {
    this.handleList();
  },
  computed: {
    supplierName() {
      if (this.type === "purchase") {
        return "供应商名";
      } else {
        return "客户名";
      }
    },
  },
  methods: {
    //获取rowId
    getRowKeys(row) {
      return row.id;
    },
    //点击选择
    clickRowCustomer(val, expandedRows) {
      this.RowCustomer = val;
      this.currentRow = val;
      let that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (val) {
          that.expands.push(val.id);
        }
      } else {
        that.expands = [];
      }
      this.getCustomerOrder(1, val.orderSn, val.id);
    },
    //获取子单
    async getCustomerOrder(type, sn, id) {
      const res = await getOrderByPage({
        type: type,
        shopOrderSn: sn,
      });
      this.tableData.forEach((item, index) => {
        if (item.id == id) {
          this.tableData[index].orderList = res.data.data.orderList;
        }
      });
    },
    //子单多选
    handleSelectionChange(val) {
      if (!val) return;
      this.currentRow1 = [];
      val.map((el) => {
        el.orderItemList.map((item) => {
          this.currentRow1.push(item);
        });
      });
    },

    handleClick(event) {
      this.orderType = event.name;
      this.handleList(this.orderType);
    },
    //搜索
    searchProduct() {
      if (this.type === "saleOutbound") {
        this.orderType = this.orderType;
      } else {
        this.orderType = "";
      }
      if (this.type === "purchase") {
        this.deliveryStatus = "";
      }
      this.handleList(this.keyword, this.deliveryStatus);
    },
    async handleList(info) {
      let requestApi = "";
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        keywords: this.keyword,
        deliveryStatus: this.deliveryStatus,
        stockStatus: this.stockStatus,
        type: this.orderType,
      };
      if (this.type === "saleOutbound") {
        // 销售出库
        requestApi = getBasicInfoByOutbound;
        // params = '销售'
      } else if (this.type === "saleReturn") {
        // 销售退货
        requestApi = getBasicDepotHeadInfoByType;
        params.type = 6;
      } else if (this.type === "purchase") {
        // 采购
        requestApi = getBasicPurchaseInfoByType;
        // params = '采购'
      }
      const res = await requestApi(params);
      if (res.data.success) {
        res.data.data.shopOrderBasicVoList.map((item) => {
          item.orderList = [];
        });
        this.tableData = res.data.data.shopOrderBasicVoList;
        this.total = res.data.data.total;
      }
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
    submit() {
      this.$emit("on-submit", this.currentRow, this.currentRow1, 0);
      this.expands = [];
    },
    async handleColumnChange(val) {
      if (this.type === "saleReturn" || this.type === "purchase") {
        this.currentRow = val;
      } else {
        const res = await getProjectStatus({ projectSn: val.projectSn });
        if (res.data.code == 400) {
          return;
        } else {
          this.currentRow = val;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .search-box {
  margin-bottom: 10px;
  width: 240px;
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  .el-input {
    width: 216px;
  }
  .el-input__inner {
    border: none;
  }
}
</style>