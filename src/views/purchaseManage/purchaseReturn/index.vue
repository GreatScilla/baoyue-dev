// 采购退货
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
        <!-- <el-form-item label="退货仓库">
            <el-select>
              <el-option v-for="item of this.depotList" :key="item.id" :label="item.depotName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
        <el-form-item label="单据编号" prop="returnOrderSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.returnOrderSn"
          ></el-input>
          <el-input v-model="form.returnOrderSn"></el-input>
        </el-form-item>
        <!-- <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="form.supplierName"></el-input>
        </el-form-item> -->
        <el-form-item label="单据日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            @change="changeTime"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商名称" prop="memberUserName">
          <el-input
            placeholder="请输入供应商名称"
            v-model="form.memberUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="退货金额">
          <div class="allNum">
            <el-select
              size="small"
              v-model="form.returnAmountType"
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
              v-model="form.returnAmount"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="制单人" prop="createUserName">
          <el-input
            placeholder="请输入制单人"
            v-model="form.createUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="checkPerson">
          <el-input
            placeholder="请输入审核人"
            v-model="form.checkPerson"
          ></el-input>
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
        v-if="permission.purchase_return_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.purchase_return_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_return_aduit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.purchase_return_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.purchase_return_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('PuechaseOrderReturnV1.4.1采购退货单.ureport')"
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
        <el-table-column prop="status" label="单据状态">
          <template slot-scope="{ row }">
            <span>{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="procName" label="附件">
          <template slot-scope="{row}">
            <el-image :src="row.file"></el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="returnOrderSn" label="单据编号" width="160px">
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
                    <td>仓库名称</td>
                    <td>单价</td>
                    <td>退货金额</td>
                  </tr>
                  <tr
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.shopOrderReturnDetail"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.sp1 }}</td>
                    <td width="auto">{{ item.productNum }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.productPrice }}</td>
                    <td width="auto">{{ item.allPrice }}</td>
                  </tr>
                </table>
                <div>
                  <div style="padding: 10px 0; font-size: 16px">物流信息</div>
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
              <div>{{ scope.row.returnOrderSn }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="160px">
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商名称" width="120px">
        </el-table-column>
        <!-- <el-table-column prop="processTypeName" label="退货仓库">
        </el-table-column> -->
        <el-table-column prop="returnAmount" label="退货金额">
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="210" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.purchase_return_aduit"
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
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.purchase_return_edit"
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
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.purchase_return_detail"
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
            <el-divider direction="vertical"></el-divider>
            <span v-if="permission.purchase_return_delete">
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
              v-if="permission.purchase_return_printer"
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
  getPurchaseReturnInfoByPage,
  deleteApi,
  audit,
} from "@/api/purchase/return";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  name: "purchaseReturn",
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      pdfIdApi: "/erp/purchaseReturn/getPurchaseReturnBillsReportPDF",
      searchDialogVisible: false,
      auditLoading:false,
      deleteApi: deleteApi,
      auditApi: audit,
      tableData: [],
      form: {
        returnOrderSn: "",
        memberUserName: "",
        startTime: "",
        endTime: "",
        date: [],
      },
      recordForm: {}, //暂存数据
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑采购退货" || from.name === "采购退货详情") {
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
    //打印
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
      const res = await getPurchaseReturnInfoByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/purchaseManage/purchaseReturn/add",
      });
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
    handleEdit(row) {
      // 编辑
      this.$router.push({
        path: "/purchaseManage/purchaseReturn/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/purchaseManage/purchaseReturn/detail",
        query: {
          data: row,
        },
      });
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    handleReset(formName) {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
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
