// 销售出库
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
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="单据编号:" prop="number">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:" prop="memberUserName">
          <el-input
            placeholder="请输入客户名称"
            v-model="searchForm.memberUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称:" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="searchForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售员:" prop="handsPersonName">
          <el-input
            placeholder="请输入销售员"
            v-model="searchForm.handsPersonName"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人:" prop="createUser">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.createUser"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人:" prop="checkPerson">
          <el-input
            placeholder="请输入审核人"
            v-model="searchForm.checkPerson"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期" prop="date">
          <el-date-picker
            v-model="searchForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button size="small" @click="handleReset('searchForm')"
            >重置</el-button
          >
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.saleOutbound_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.saleOutbound_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.saleOutbound_audit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.saleOutbound_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <el-button
        v-if="permission.saleOutbound_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="printReport('JshDepotHeadV.1.4.15销售出库单')"
        >导出</el-button
      >
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="status" label="单据状态">
          <template slot-scope="{ row }">
            <span>{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="procName" label="附件">
          <template slot-scope="{row}">
            <el-image style="width: 100px; height: 100px" :src="row.file">
            </el-image>
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
                    <td>强度</td>
                    <td>密度</td>
                    <td>单位</td>
                    <td>数量</td>
                    <td>仓库名称</td>
                    <td>单价</td>
                    <td>销售金额</td>
                  </tr>
                  <tr v-if="scope.row.depotItemList.length == 0">
                    <td colspan="10" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.depotItemList"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.productType }}</td>
                    <td width="auto">{{ item.intensity }}</td>
                    <td width="auto">{{ item.density }}</td>
                    <td width="auto">{{ item.unit }}</td>
                    <td width="auto">{{ item.num }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.unitPrice }}</td>
                    <td width="auto">{{ item.allPrice }}</td>
                  </tr>
                </table>
                <div>
                  <div style="padding: 10px 0; font-size: 16px">发货信息</div>
                  <div style="display: flex">
                    <div style="flex: 1; text-algin: left">
                      联系人:{{ scope.row.linkName }}
                    </div>
                    <div style="flex: 1; text-algin: left">
                      联系电话:{{ scope.row.phone }}
                    </div>
                  </div>
                </div>
                <div>
                  <div style="padding: 10px 0; font-size: 16px">其他信息</div>
                  <div style="display: flex">
                    <div style="flex: 1; text-algin: left">
                      车辆号:{{ scope.row.licenseNumber }}
                    </div>
                    <div style="flex: 1; text-algin: left">
                      托盘数量:{{ scope.row.trayNum }}
                    </div>
                  </div>
                </div>
              </div>
              <div>{{ scope.row.number }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="160px">
        </el-table-column>
        <el-table-column prop="organName" label="客户名称" width="100px">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="100px">
        </el-table-column>
        <el-table-column prop="handsDepot" label="部门名称" width="100px">
        </el-table-column>
        <el-table-column prop="handsPersonName" label="销售员" width="100px">
        </el-table-column>
        <el-table-column prop="payMoney" label="销售金额" width="100px">
        </el-table-column>
        <!-- <el-table-column prop="discountMoney" label="折让金额">
        </el-table-column> -->
        <el-table-column label="回执">
          <template slot-scope="scope">
            <span>{{ scope.row.isReplied == 0 ? "未回执" : "已回执" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUser" label="制单人"> </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="210" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.saleOutbound_audit"
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
              v-if="permission.saleOutbound_edit"
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
              v-if="permission.saleOutbound_detail"
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
            <span v-if="permission.saleOutbound_delete">
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

            <span v-if="permission.saleOutbound_receipt">
              <el-tooltip
                class="item"
                effect="dark"
                content="回执"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-postcard"
                  @click="handleReceipt(scope.row)"
                  :disabled="scope.row.status !== 2 || scope.row.isReplied == 1"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <el-tooltip
              v-if="permission.saleOutbound_printer"
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
                @click="getPdfBill(scope.row.id)"
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
  selectDepotHeadInfo,
  deleteDepotHead,
  updateSaleStatus,
  documentReceipt,
  getShopDeliveryBillsReportPDF,
} from "@/api/salesManage/saleOutbound";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import { queryParams } from "@/util/util.js";
export default {
  name: "saleOutbound",
  mixins: [paginationMixin],
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchForm: {
        date: [],
        number: "",
        memberUserName: "",
        beginTime: "",
        endTime: "",
        type: "出库",
        typeClass: "销售",
      },
      recordForm: {}, //暂存数据
      searchDialogVisible: false,
      auditLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑销售出库" || from.name === "销售出库详情") {
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
    console.log(this.permission);
    if (recordObj) {
      this.currentPage = recordObj.pageNum;
      this.pageSize = recordObj.pageSize;
      delete recordObj.pageNum;
      this.searchForm = recordObj.data;
    }
    this.handleList();
  },
  methods: {
    //回执
    async handleReceipt(row) {
      console.log(row.id);
      try {
        await this.$confirm("确定回执该条数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await documentReceipt({ headId: row.id });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.error("已取消");
      }
    },
    //  (打印报表)
    async printReport(reportName) {
      // debugger;
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status 0待审核;1已审核;2已完成;3已关闭
      let flag = this.tableRowData.filter((item) => {
        return item.status === 2;
      });
      // debugger;
      // 未审核：0  已审核  1
      if (flag.length <= 0 || flag.length != this.tableRowData.length) {
        this.$message.warning("请选择已审核的数据导出");
        return;
      }
      this.$confirm("是否导出单价?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action, instance) => {
          if (action === "confirm") {
            var win = window.open(
              this.$report +
                `/ureport/preview?_u=blade-${reportName}(带单价).ureport.xml&ids=${this.ids}`
            );
            win.document.title = "暂未成功设置title";
          } else if (action === "cancel") {
            var win = window.open(
              this.$report +
                `/ureport/preview?_u=blade-${reportName}(不带单价).ureport.xml&ids=${this.ids}`
            );
            win.document.title = "暂未成功设置title";
          }
        },
      });
    },
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.searchForm,
      };
      this.recordForm = params;
      const res = await selectDepotHeadInfo(params);
      this.tableData = res.data.data.depotHeadList;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },

    /* -------------------------------------------------------------------------- */
    /*                                    打印报表  开始                            */
    /* -------------------------------------------------------------------------- */
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
    //  (打印报表)
    async getPdfBill(id) {
      this.$confirm("是否打印单价?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action, instance) => {
          if (action === "confirm") {
            const link = document.createElement("a");
            link.style.display = "none";
            link.target = "_blank";
            link.href =
              "/erp/depotHead/getShopDeliveryBillsReportPDF" +
              queryParams({ id: id, type: true });
            link.click();
          } else if (action === "cancel") {
            const link = document.createElement("a");
            link.style.display = "none";
            link.target = "_blank";
            link.href =
              "/erp/depotHead/getShopDeliveryBillsReportPDF" +
              queryParams({ id: id, type: false });
            link.click();
          }
        },
      });
    },
    /* -------------------------------------------------------------------------- */
    /*         xuza                         打印报表  (结束)                           */
    /* -------------------------------------------------------------------------- */

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
        const res = await deleteDepotHead(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消删除");
      }
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/salesManage/saleOutbound/add",
      });
    },
    changeTime(value) {
      if (value !== null) {
        this.searchForm.beginTime = value[0];
        this.searchForm.endTime = value[1];
      } else {
        this.searchForm.beginTime = this.searchForm.endTime = "";
      }
    },
    handleEdit(row) {
      // 编辑
      this.$router.push({
        path: "/salesManage/saleOutbound/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/salesManage/saleOutbound/detail",
        query: {
          data: row,
        },
      });
    },
    // (前面有了)
    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // },
    async handleAudit(row) {
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
        this.auditLoading = true;
        const res = await updateSaleStatus(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          this.auditLoading = false;
          await this.handleList();
        }
      } catch (error) {
        this.auditLoading = false;
        // this.$message.error("已取消删除");
      }
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.searchForm = {};
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
