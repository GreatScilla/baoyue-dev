// 采购进货
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
        <el-form-item label="单据编号" prop="number">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            placeholder="请输入供应商"
            v-model="form.supplierName"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购员" prop="purchaseMan">
          <el-input
            placeholder="请输入采购员"
            v-model="form.purchaseMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="送货单号" prop="sendOrderNo">
          <el-input
            placeholder="请输入送货单号"
            v-model="form.sendOrderNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人" prop="createPersonName">
          <el-input
            placeholder="请输入制单人"
            v-model="form.createPersonName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="checkPerson">
          <el-input
            placeholder="请输入审核人"
            v-model="form.checkPerson"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期" prop="date">
          <el-date-picker
            @change="changeTime"
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期"
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
        v-if="permission.purchase_inbound_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.purchase_inbound_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_inbound_aduit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.purchase_inbound_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_inbound_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('PurchaseStockVersionV1.7.2采购进货单.ureport')"
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
        <el-table-column label="单据状态" width="140px">
          <template slot-scope="{ row }">
            <span class="margin-right-20">{{ row.status | approvalName }}</span>
            <span>{{ row.checkStatus | checkStatus }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="合格证书">
          <template slot-scope="{row}">
            <el-image :src="row.file"></el-image>
          </template> -->
        <!--</el-table-column>-->
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
                    <td>仓库名称</td>
                    <td>进货数量</td>
                    <td>验收数量</td>
                    <td>验退数量</td>
                    <td>采购单价</td>
                    <td>采购金额</td>
                  </tr>
                  <tr
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.purchaseStockItemList"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.sp1 }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.num }}</td>
                    <td width="auto">{{ item.checkNum }}</td>
                    <td width="auto">{{ item.refundNum }}</td>
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
        <el-table-column prop="supplierName" label="供应商名称" width="110px">
        </el-table-column>
        <el-table-column prop="purchaseDepot" label="部门名称" width="100px">
        </el-table-column>
        <el-table-column prop="purchaseMan" label="采购员" width="100px">
        </el-table-column>
        <el-table-column prop="totalPrice" label="采购金额" width="100px">
        </el-table-column>
        <!-- <el-table-column prop="processTypeName" label="折让金额">
        </el-table-column> -->
        <el-table-column prop="createPersonName" label="制单人" width="100px">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人" width="100px">
        </el-table-column>
        <el-table-column width="210" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.purchase_inbound_aduit"
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
              v-if="permission.purchase_inbound_aduit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.purchase_inbound_check"
              class="item"
              effect="dark"
              content="检验"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-document-checked"
                @click="handleExamine(scope.row)"
                :disabled="
                  scope.row.checkStatus != 0 || !(scope.row.status === 2)
                "
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="permission.purchase_inbound_check"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.purchase_inbound_edit"
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
              v-if="permission.purchase_inbound_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.purchase_inbound_detail"
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
              v-if="permission.purchase_inbound_detail"
              direction="vertical"
            ></el-divider>
            <span v-if="permission.purchase_inbound_delete">
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
              v-if="permission.purchase_inbound_printer"
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
  getPurchaseStockByPage,
  deleteApi,
  audit,
} from "@/api/purchase/purchaseInbound";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  name: "saleOutbound",
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      pdfIdApi: "/erp/purchaseStock/getPurchaseStockBillsReportPDF",
      searchDialogVisible: false,
      auditLoading:false,
      deleteApi: deleteApi,
      auditApi: audit,
      tableData: [],
      multipleSelection: [],
      form: {
        purchaseMan: "",
        number: "",
        endTime: "",
        startTime: "",
        date: [],
      },
      recordForm: {}, //暂存数据
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑采购进货" || from.name === "采购进货详情") {
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
      const res = await getPurchaseStockByPage(params);
      this.recordForm = params;
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
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/purchaseManage/purchaseInbound/add",
      });
    },
    handleEdit(row) {
      // 编辑
      this.$router.push({
        path: "/purchaseManage/purchaseInbound/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/purchaseManage/purchaseInbound/detail",
        query: {
          data: row,
        },
      });
    },
    async handleExamine(row) {
      // 检验
      this.$router.push({
        path: "/purchaseManage/purchaseInbound/check",
        query: {
          data: row,
          type: "add",
        },
      });
      // const params = {
      //   purchaseOrderAddRequest: row,
      //   codeName: "采购进货",
      // };
      // try {
      //   // 减少服务器压力
      //   await this.$confirm("确定检验吗?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   });
      //   const res = await addOrUpdatePurchaseCheckOrder(params);
      //   if (res.data.code === 200) {
      //     this.handleList();
      //   }
      // } catch (error) {
      //   this.$message.info("已取消");
      // }
    },
    changeTime(value) {
      // 选择时间
      if (value !== null) {
        this.form.startTime = value[0];
        this.form.endTime = value[1];
      } else {
        this.form.startTime = this.form.endTime = "";
      }
    },
    handleReset(formName) {
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
</style>
