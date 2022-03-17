// 出库管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.outbound_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        v-if="permission.outbound_add"
        >新 增</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.outbound_examine"
        >批量提交审核</el-button
      > -->
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelInboundManage"
        v-if="permission.outbound_delete"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.outbound_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('JshDepotHeadV.1.2.0仓库出库单.ureport')"
        >导出</el-button
      > -->
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.outbound_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.outbound_print">打 印</el-button>-->
    </el-row>
    <el-divider></el-divider>
    <!-- <el-form
      :inline="true"
      :model="inboundManageForm"
      ref="setUpForm"
    >
      <el-form-item label="单据日期:">
        <el-date-picker
          v-model="billDate"
          size="small"
          :clearable="false"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeBillDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="100px" label="出库类别:">
        <el-select size="small" v-model="inboundManageForm.typeClassId"  placeholder="请选择出库类别" @change="changeTypeClass">
          <el-option
            v-for="item in inAndOutBoundCategoryOptions"
            :key="item.dictKey"
            :label="item.dictValue"
            :value="item.dictKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px" label="产品名称:">
        <el-input
          size="small"
          v-model="inboundManageForm.productName"
          placeholder="请输入产品名称">
        </el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="出库状态:">
          <el-select size="small" v-model="inboundManageForm.status"  placeholder="请选择出库状态">
            <el-option
              v-for="item in inboundOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:20px;margin-top:-1px">
          <el-button size="small" type="primary" @click="searchInboundManage">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">新增</el-button> 
    </el-row>-->
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="inboundManageTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="单据状态">
          <template slot-scope="scope">{{
            scope.row.status | approvalName
          }}</template>
        </el-table-column>
        <el-table-column prop="procName" label="附件">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.file"
              style="width: 100px; height: 100px; padding-top: 5px"
              :src="scope.row.file[0]"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="productName" label="产品名称">
        </el-table-column>-->
        <el-table-column prop="number" label="单据号" width="150">
          <template slot-scope="scope">
            <el-tooltip :manual="true" v-model="scope.row.showIndex">
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
                    <td>出库仓库</td>
                    <td>数量</td>
                    <td>单价</td>
                    <td>总价</td>
                  </tr>
                  <tr v-if="scope.row.depotItems.length == 0">
                    <td colspan="8" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.depotItems"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.productType }}</td>
                    <td width="auto">{{ item.unit }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.operNumber }}</td>
                    <td width="auto">{{ item.unitPrice }}</td>
                    <td width="auto">{{ item.unitTotalPrice }}</td>
                  </tr>
                </table>
              </div>
              <div
                @mouseenter="mouseenter(scope.row.id)"
                @mouseleave="mouseLeave"
              >
                {{ scope.row.number }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="processTypeName" label="数量">
          <template slot-scope="scope">
            {{scope.row.depotItemList.operNumber}}
          </template>
        </el-table-column>-->
        <el-table-column
          prop="createTime"
          label="出库日期"
          width="150"
        ></el-table-column>
        <el-table-column prop="typeClass" label="出库类别"></el-table-column>
        <el-table-column prop="processTypeName" label="出库状态">
          <template slot-scope="scope">{{
            scope.row.status | bePutStatus
          }}</template>
        </el-table-column>
        <el-table-column prop="createUser" label="制单人"></el-table-column>
        <el-table-column prop="checkPerson" label="审核人"></el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                :disabled="!(scope.row.status === 0)"
                @click="examine(scope.row)"
                v-if="permission.outbound_examine"
              ></el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.outbound_examine && permission.outbound_edit"
            ></el-divider>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/outboundManage/edit',
                  query: { data: scope.row },
                }"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  :disabled="!(scope.row.status === 0)"
                  v-if="permission.outbound_edit"
                ></el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.outbound_edit && permission.outbound_details"
            ></el-divider>
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/outboundManage/detail',
                  query: { data: scope.row },
                }"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                  v-if="permission.outbound_details"
                ></el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.outbound_details && permission.outbound_delete"
            ></el-divider>
            <span v-if="permission.outbound_delete">
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
                  :disabled="!(scope.row.status === 0)"
                  @click="handleDelInboundManage(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.outbound_printer"
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
      ></el-pagination>
    </el-row>
    <!-- 查询 -->
    <!-- <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    ></search> -->
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期">
          <el-date-picker
            v-model="billDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchForm.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input
            placeholder="请输入规格型号"
            v-model="searchForm.productType"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input
            placeholder="请输入仓库名称"
            v-model="searchForm.depotName"
          ></el-input>
        </el-form-item>
        <el-form-item label="出库类别">
          <el-select v-model="searchForm.typeClassId" placeholder="请选择">
            <el-option
              v-for="item in typeClassIdList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in inboundOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getInAndOutBoundPage,
  examineInAndOutBoundPage,
  delInAndOutBoundPage,
  detailsInAndOutBoundPage,
} from "@/api/storageManage/inAndOutBound";
import { getDictionary } from "@/api/system/dictbiz";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import search from "@/components/search/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, exportMixin],
  components: {
    search,
  },
  data() {
    return {
      pdfIdApi: "/erp/depotHead/getDeliveryBillsReportPDF",
      searchForm: {},
      recordForm: {}, //暂存数据
      inboundManageTableData: [],
      ids: [],
      tableRowData: [],
      inAndOutBoundCategoryOptions: [],
      typeClassIdList: [],
      billDate: [],
      inboundOptions: [
        {
          value: 0,
          label: "待出库",
        },
        {
          value: 1,
          label: "已出库",
        },
      ],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑出库管理" || from.name === "出库管理详情") {
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
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    await this.handleList(this.searchForm);
    await this.initSearchCondition();
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        type: "出库",
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getInAndOutBoundPage(params);
      res.data.data.records.forEach((item) => {
        item.depotItems = [];
        item.showIndex = false;
        if (item.file) {
          item.file = item.file.split(",");
        }
      });
      this.inboundManageTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async mouseenter(id) {
      this.inboundManageTableData.map((item, index) => {
        if (id == item.id) {
          console.log(id);
          item.showIndex = true;
          detailsInAndOutBoundPage({ id: id }).then((res) => {
            this.inboundManageTableData[index].depotItems =
              res.data.data.depotItems;
          });
        }
      });
    },

    mouseLeave() {
      this.inboundManageTableData.map((item) => {
        item.showIndex = false;
      });
    },
    // 查询
    onSearch() {
      this.currentPage = 1;
      if (this.billDate) {
        this.searchForm.beginTime = this.billDate[0];
        this.searchForm.endTime = this.billDate[1];
      } else {
        this.searchForm.beginTime = "";
        this.searchForm.endTime = "";
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.billDate = [];
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 初始查询条件
    async initSearchCondition() {
      // 出库类别
      let res = await getDictionary({ code: "out_type_class" });
      this.typeClassIdList = res.data.data;
    },
    // 获取出库类别
    async handleResources() {
      let res = await getDictionary({ code: "out_type_class" });
      this.inAndOutBoundCategoryOptions = res.data.data;
    },
    // 审核
    async examine(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的单据");
        return;
      }
      try {
        await this.$confirm("确定该出库单提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await examineInAndOutBoundPage({ ids: ids, type: 2 });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 删除
    async handleDelInboundManage(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未审核的单据");
        return;
      }
      try {
        await this.$confirm("确定要删除该出库单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delInAndOutBoundPage({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 选择单据日期
    changeBillDate(value) {
      this.inboundManageForm.beginTime = value[0];
      this.inboundManageForm.endTime = value[1];
    },
    // 选择出库类别
    changeTypeClass(value) {
      let item = this.inAndOutBoundCategoryOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.inboundManageForm.typeClass = item[0].dictValue;
    },
    // 选择表格
    handleSelectionChange(value) {
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
    add() {
      this.$router.push("/storageManage/outboundManage/add");
    },
    // 跳转
    to(operationState, row) {
      this.$router.push({
        path: "/storageManage/outboundManage/detail",
        query: {
          operationState,
          row,
        },
      });
    },
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.tableRowData.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status
      let flag = this.tableRowData.filter((item) => {
        return item.status == 2;
      });
      //   已审核  1
      if (flag.length <= 0 || flag.length != this.tableRowData.length) {
        this.$message.warning("请选择已审核的数据导出");
        return;
      }
      ids = this.tableRowData.map((ele) => ele.id);
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
  },
  filters: {
    billStatus: function (value) {
      if (value === 0) {
        return "未审核";
      } else {
        return "已审核";
      }
    },
    bePutStatus: function (value) {
      if (value === 0) {
        return "未出库";
      } else {
        return "已出库";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
#Aclass {
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
