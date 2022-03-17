// 资产管理
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
        <el-form-item label="证照编码:" prop="licenseSn">
          <el-input placeholder="请输入" v-model="form.licenseSn"></el-input>
        </el-form-item>
        <el-form-item label="证照类型:" prop="licenseType">
          <el-input placeholder="请输入" v-model="form.licenseType"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="staffName">
          <el-input placeholder="请输入" v-model="form.staffName"></el-input>
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
        v-if="permission.IDPhoto_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.IDPhoto_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.salesManage_contract_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      > -->
      <el-button
        v-if="permission.IDPhoto_export"
        size="small"
        type="default"
        plain
        @click="handlePrinter('BillV1.02.1财务支出单.ureport')"
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
        <el-table-column prop="licenseSn" label="证照编码" width="160px">
        </el-table-column>
        <el-table-column prop="licenseType" label="证照类型" width="160px">
        </el-table-column>
        <el-table-column prop="staffName" label="姓名" width="120px">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="120px">
        </el-table-column>
        <el-table-column prop="post" label="职务" width="120px">
        </el-table-column>
        <el-table-column
          prop="'licenseStatus"
          label="证件是否有效"
          width="120px"
        >
          <span>{{ licenseStatus == 0 ? "无效" : "有效" }}</span>
        </el-table-column>
        <el-table-column prop="validDate" width="130" label="有效期至">
        </el-table-column>
        <el-table-column label="证照图片" prop="licensePic">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.licensePic"
              style="width: 100px; height: 100px"
              :src="scope.row.licensePic[0]"
              fit="cover"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.IDPhoto_edit"
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
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.IDPhoto_detail"
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
            <el-tooltip
              v-if="permission.IDPhoto_delete"
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
import { audit } from "@/api/salesManage/contract";
import {
  getList,
  deleteLicenseBankBatch,
} from "@/api/asset-management/IDPhoto.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {
        staffName: "",
        licenseSn: "",
        licenseType: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteLicenseBankBatch,
      auditApi: audit,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑合同" || from.name === "合同详情") {
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
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.form,
      };
      this.recordForm = params;
      const res = await getList(params);
      console.log(res);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/IDPhoto/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/IDPhoto/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/IDPhoto/detail",
        query: {
          data: row,
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
    changeTime(val) {
      // 选择时间
      if (val !== null) {
        this.form.contractStartDate = `${val[0]}`;
        this.form.contractEndDate = `${val[1]}`;
      } else {
        this.form.contractStartDate = this.form.contractEndDate = "";
      }
    },
  },
  filters: {
    //0 正常 1 保养中 2 维修中
    runningStatusName(value) {
      if (value == 0) {
        value = "正常";
      } else if (value == 1) {
        value = "保养中";
      } else if (value == 2) {
        value = "维修中";
      }
      return value;
    }, // 0 闲置 1 使用中 2 已报废
    statusName(value) {
      if (value == 0) {
        value = "闲置";
      } else if (value == 1) {
        value = "使用中";
      } else if (value == 2) {
        value = "已报废";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
