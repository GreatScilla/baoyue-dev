
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
        <el-form-item label="标准编码:">
          <el-input v-model="form.standardSn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="标准名称:">
          <el-input v-model="form.standardName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="保养分类:">
          <el-input v-model="form.maintainType" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="保养位置:">
          <el-input
            v-model="form.maintenanceParts"
            placeholder="请输入"
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
    <el-row class="operation-function">
      <el-button
        v-if="permission.maintainStandard_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.maintainStandard_add"
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
        <el-table-column type="index" label="序号" width="60px">
        </el-table-column>
        <el-table-column prop="standardSn" label="标准编码" width="150px">
        </el-table-column>
        <el-table-column prop="standardName" label="标准名称">
        </el-table-column>
        <el-table-column prop="maintainType" label="保养分类" width="130px">
        </el-table-column>
        <el-table-column prop="maintenanceParts" label="保养位置">
        </el-table-column>
        <el-table-column prop="maintenanceMethod" label="保养方法">
        </el-table-column>
        <el-table-column prop="maintenanceCycle" label="保养周期">
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170px">
        </el-table-column>
        <el-table-column width="160" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.maintainStandard_edit"
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
              v-if="permission.maintainStandard_detail"
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
              v-if="permission.maintainStandard_delete"
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
import {
  getList,
  deleteMaintenanceStandard,
} from "@/api/asset-management/maintainStandard.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { getContractList, deleteApi, audit } from "@/api/salesManage/contract";
import { mapGetters } from "vuex";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      form: {
        billNo: "",
        person: "",
        data: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteMaintenanceStandard,
    };
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
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
        data: this.form,
      };
      const res = await getList(params);
      console.log(res);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/maintainStandard/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/maintainStandard/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(data) {
      // 详情
      console.log(data);
      this.$router.push({
        path: "/asset-management/maintainStandard/detail",
        query: {
          data,
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
    async handleAduit(row) {
      // 审核
      console.log(row);
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
        const res = await updateOrderStatus({ ids: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        // this.$message.error("已取消删除");
      }
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
