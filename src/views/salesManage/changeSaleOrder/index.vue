// 销售变更单
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form ref="form" :model="form" label-width="90px" class="form-footer">
        <el-form-item label="出库状态:" prop="deliveryStatus">
          <el-select v-model="form.deliveryStatus">
            <el-option label="待出库" :value="0"></el-option>
            <el-option label="部分出库" :value="1"></el-option>
            <el-option label="已出库" :value="2"></el-option>
            <el-option label="部分发货" :value="3"></el-option>
            <el-option label="已发货" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据编号:" prop="orderSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.orderSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:" prop="memberUsername">
          <el-input
            placeholder="请输入客户名称"
            v-model="form.memberUsername"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称:" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="form.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售员:" prop="salesMan">
          <el-input
            placeholder="请输入销售员"
            v-model="form.salesMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售金额:">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.totalAmountType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="form.totalAmount"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="单据日期:">
          <el-date-picker
            @change="changeTime"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交货日期:">
          <el-date-picker
            @change="changeExpectReceiveDate"
            v-model="expectReceiveDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="handleReset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row class="operation-function">
      <el-button
        v-if="permission.changeSaleOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <!-- <el-button
        v-if="permission.changeSaleOrder_audit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAduit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.changeSaleOrder_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter()"
        >打印</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="单据状态" prop="statusName" width="160px">
          <template slot-scope="{ row }">
            <span class="margin-right-20">{{ row.status | approvalName }}</span>
            <span>{{ row.deliveryStatus | deliveryStatus }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="附件" prop="pic"> </el-table-column> -->
        <el-table-column prop="orderSn" label="单据编号" width="160px">
          <template slot-scope="scope">
            <el-tooltip>
              <div slot="content" style="font-size: 14px">
                <div style="padding: 0 0 10px 0; font-size: 16px">产品信息</div>
                <table
                  border="1px solid #dedede"
                  id="Aclass"
                  cellpadding="1"
                  cellspacing="1"
                  align="center"
                  bgcolor="#303133"
                >
                  <tr bgcolor="#303133">
                    <td>产品编码</td>
                    <td>产品名称</td>
                    <td>规格型号</td>
                    <td>单位</td>
                    <td>数量</td>
                    <td>单价</td>
                    <td>金额</td>
                  </tr>
                  <tr
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.orderItemList"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.sp1 }}</td>
                    <td width="auto">{{ item.productQuantity }}</td>
                    <td width="auto">{{ item.realAmount }}</td>
                    <td width="auto">{{ item.salePrice }}</td>
                  </tr>
                </table>
                <div>
                  <div style="padding: 10px 0; font-size: 16px">发货信息</div>
                  <div style="display: flex">
                    <div style="flex: 1; text-algin: left">
                      联系人:{{ scope.row.shipInformation.linkName }}
                    </div>
                    <div style="flex: 1; text-algin: left">
                      联系电话:{{ scope.row.shipInformation.linkPhone }}
                    </div>
                  </div>
                </div>
              </div>
              <div>{{ scope.row.orderSn }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="160px">
        </el-table-column>
        <!-- <el-table-column prop="contractSn" label="关联合同">
        </el-table-column>
        <el-table-column prop="sendAddress" label="客户地区">
        </el-table-column> -->
        <el-table-column prop="memberUserName" label="客户名称" width="120px">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="120px" />
        <el-table-column
          prop="expectReceiveDate"
          label="交货日期"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="salesDepot" label="部门名称" width="120px">
        </el-table-column>
        <el-table-column prop="salesMan" label="销售员" width="120px">
        </el-table-column>
        <el-table-column prop="payAmount" label="销售金额" width="120px">
        </el-table-column>
        <el-table-column prop="discountAmount" label="折让金额" width="120px">
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.changeSaleOrder_audit"
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                :loading="auditLoading"
                @click="handleAduit(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.changeSaleOrder_audit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.changeSaleOrder_edit"
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.changeSaleOrder_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.changeSaleOrder_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="handleDetail(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.changeSaleOrder_detail"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.changeSaleOrder_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper margin-bottom-20">
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
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getOrderByPage,
  deleteOrderBatch,
  updateOrderStatus,
} from "@/api/salesManage/saleOrder";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      form: {
        deliveryStatus: "",
        orderSn: "",
        type: 1,
        memberUsername: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      auditLoading:false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑销售订单" || from.name === "销售订单详情") {
      recordObj = JSON.parse(sessionStorage.getItem("recordForm"));
      next();
    } else {
      recordObj = "";
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    if (recordObj) {
      this.currentPage = recordObj.pageNum;
      this.pageSize = recordObj.pageSize;
      delete recordObj.pageNum;
      this.form = recordObj.data;
    }
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      if (this.form.totalAmountType && !this.form.totalAmount) {
        return this.$message.warning("请输入销售金额");
      }
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getOrderByPage(params);
      this.tableData = res.data.data.orderList;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter((ele) => ele.status !== 0);
          if (arr.length > 0) {
            this.$message.warning("请选择未审核的单据");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await deleteOrderBatch(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消删除");
      }
    },
    handleEdit(row) {
      // 详情
      this.$router.push({
        path: "/salesManage/changeSaleOrder/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/salesManage/changeSaleOrder/detail",
        query: {
          data: row,
        },
      });
    },
    async handleAduit(row) {
      // 审核
      let ids = [];
      if (row) {
        // 单选
        ids.push(row.id);
      } else {
        // 批量处理
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter((ele) => ele.status !== 0);
          if (arr.length > 0) {
            this.$message.warning("请选择未审核的单据");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定该数据提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        var params = {
          ids: ids,
          type:'35',
        };
        this.auditLoading = true
        const res = await updateOrderStatus(params);
        if (res.data.code === 200) {
          this.auditLoading = false
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.auditLoading = false
        // this.$message.error("已取消审核");
      }
    },
    handleOutbound(id) {
      // 出库
      this.$router.push({
        path: "/salesManage/saleOrder/outbound",
        query: {
          id: id,
        },
      });
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeTime(value) {
      if (value !== null) {
        this.form.startTime = value[0];
        this.form.endTime = value[1];
      } else {
        this.form.startTime = this.form.endTime = "";
      }
    },
    changeExpectReceiveDate(value) {
      if (value !== null) {
        this.form.expectReceiveDateStart = value[0];
        this.form.expectReceiveDateEnd = value[1];
      } else {
        this.form.expectReceiveDateStart = this.form.expectReceiveDateEnd = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#Aclass {
  font-size: 14px;
  td {
    padding: 5px;
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
}
.search-dialog {
  .el-form-item__content {
    height: 37px !important;
  }
  .el-form-item {
    padding-left: 80px !important;
  }
  .el-form-item__label {
    line-height: 37px !important;
  }
  .el-input,
  .el-select,
  .el-date-editor {
    width: 320px !important;
  }
  .search-footer {
    text-align: right;
  }
  .form-footer {
    padding-bottom: 8px;
  }
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>
