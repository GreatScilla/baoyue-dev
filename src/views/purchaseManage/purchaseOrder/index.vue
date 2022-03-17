// 采购订单
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
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option :value="0" label="未提交"></el-option>
            <el-option :value="1" label="待审核"></el-option>
            <!-- <el-option :value="2" label="已完成"></el-option>
              <el-option :value="3" label="已关闭"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="进货状态" prop="stockStatus">
          <el-select v-model="form.stockStatus">
            <el-option :value="0" label="待进货"></el-option>
            <el-option :value="1" label="部分进货"></el-option>
            <el-option :value="2" label="已进货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据编号" prop="number">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input
            placeholder="请输入供应商名称"
            v-model="form.supplierName"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购员" prop="purchaseMan">
          <el-input
            placeholder="请输入采购员"
            v-model="form.purchaseMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购金额">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.payAmountType"
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
            <el-input placeholder="请输入" v-model="form.payAmount"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="单据日期" prop="date">
          <el-date-picker
            v-model="date"
            type="daterange"
            @change="changeTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到货日期" prop="date1">
          <el-date-picker
            v-model="date1"
            type="daterange"
            @change="changeTime1"
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
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.purchase_order_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.purchase_order_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_order_aduit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.purchase_order_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_order_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('PurchaseOrderV1.3.05采购单.ureport')"
        >导出</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="单据状态" width="140px">
          <template slot-scope="{ row }">
            <span class="margin-right-20">{{ row.status | approvalName }}</span>
            <span>{{ row.stockStatus | inboundStatus }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="procName" label="附件">
          <template slot-scope="{row}">
            <el-image :src="row.file"></el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="number" label="单据编号" width="160px">
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
                    <td>采购金额</td>
                  </tr>
                  <tr
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.purchaseOrderItemList"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.sp1 }}</td>
                    <td width="auto">{{ item.num }}</td>
                    <td width="auto">{{ item.realAmount }}</td>
                    <td width="auto">{{ item.salePrice }}</td>
                  </tr>
                </table>
              </div>
              <div>{{ scope.row.number }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="160px">
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商名称" width="120px">
        </el-table-column>
        <el-table-column prop="purchaseDepot" label="部门名称">
        </el-table-column>
        <el-table-column prop="purchaseMan" label="采购员"> </el-table-column>
        <el-table-column prop="payAmount" label="采购金额" width="100px">
        </el-table-column>
        <el-table-column prop="discountAmount" label="折让金额" width="100px">
        </el-table-column>
        <el-table-column prop="createPersonName" label="制单人" width="100px">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人" width="100px">
        </el-table-column>
        <el-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.purchase_order_aduit"
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
                @click="handleAudit(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.purchase_order_aduit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.purchase_order_edit"
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
              v-if="permission.purchase_order_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.purchase_order_detail"
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
              v-if="permission.purchase_order_detail"
              direction="vertical"
            ></el-divider>
            <span v-if="permission.purchase_order_delete">
              <el-tooltip
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
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.purchase_order_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                :disabled="!(scope.row.status == 2)"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper">
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
  getPurchaseOrderByPage,
  deleteApi,
  audit,
} from "@/api/purchase/purchaseOrder";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  name: "purchaseOrder",
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      pdfIdApi:'/erp/purchaseOrder/getPurchaseOrderBillsReportPDF',
      searchDialogVisible: false,
      auditLoading:false,
      deleteApi: deleteApi,
      auditApi: audit,
      tableData: [],
      multipleSelection: [],
      form: {
        status: "",
        number: "",
        supplierName: "",
        purchaseMan: "",
        startTime: "",
        endTime: "",
        stockStatus: "",
      },
      recordForm: {}, //暂存数据
      date: [], // 单据时间
      date1: [], // 单据时间
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑采购订单" || from.name === "采购订单详情") {
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
    //  (打印报表)
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status 0待审核;1已审核;2已完成;3已关闭
      let flag = this.multipleSelection.filter((item) => {
        return item.status === 2;
      });
      // 未审核：0  已审核  1
      if (flag.length <= 0 || flag.length != this.multipleSelection.length) {
        this.$message.warning("请选择已审核的数据导出");
        return;
      }
      ids = this.multipleSelection.map((ele) => ele.id);
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // debugger;
        //  页面跳转
        ids = ids.join(",");
        var win = window.open(
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      const params = {
        data: this.form,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.recordForm = params;
      const res = await getPurchaseOrderByPage(params);

      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    // (将参数处理为参数的形式拼接)
    objToform(obj) {
      let result = [];
      Object.keys(obj).forEach((ele) => {
        result.push(`${ele}=${obj[ele]}`);
      });
      return result.join("&");
    },
    // 选择表格 (只能选择一行数据)
    handleSelectionChange(value) {
      this.multipleSelection = value;
      console.log("=====＞value: " + value);
      this.tableRowData = value;
      console.log(this.tableRowData);
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    changeTime(value) {
      if (value !== null) {
        this.form.startTime = value[0];
        this.form.endTime = value[1];
      } else {
        this.form.startTime = this.form.endTime = "";
      }
    },
    changeTime1(value) {
      if (value !== null) {
        this.form.expectReceiveDateStart = value[0];
        this.form.expectReceiveDateEnd = value[1];
      } else {
        this.form.expectReceiveDateStart = this.form.expectReceiveDateEnd = "";
      }
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/purchaseManage/purchaseOrder/add",
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/purchaseManage/purchaseOrder/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: "/purchaseManage/purchaseOrder/detail",
        query: {
          data: row,
        },
      });
    },
    handleReset() {
      // 重置
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    handleClose() {
      this.searchDialogVisible = false;
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
