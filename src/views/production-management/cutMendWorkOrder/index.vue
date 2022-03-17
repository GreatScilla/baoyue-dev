// 切补工单
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
        :label-position="labelPosition"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="工单号:">
          <el-input
            placeholder="请输入工单号"
            v-model="searchForm.cutMendWorkSn"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.cutMendWorkOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
       v-if="permission.cutMendWorkOrder_export"
        style="margin-left: 10px"
        size="small"
        plain
        @click="exports(exportApi, searchForm)"
      >
        导出
      </el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="报工状态">
          <template slot-scope="scope">
            {{ scope.row.artisanStatus | statusName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cutMendWorkSn"
          width="160"
          label="工单号"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          width="160"
          label="项目名称"
        ></el-table-column>
        <el-table-column
          prop="organName"
          width="160"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          prop="materialName"
          label="原产品名称"
        ></el-table-column>
        <el-table-column prop="materialSn" label="原产品编码"></el-table-column>
        <el-table-column prop="model" label="原产品规格"></el-table-column>
        <el-table-column prop="location" label="预进库位"></el-table-column>
        <el-table-column prop="qualifiedSum" label="合格数量"></el-table-column>
        <el-table-column prop="scrapSum" label="报废数量"></el-table-column>
        <el-table-column width="80" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.cutMendWorkOrder_detail"
              :to="{
                path: '/production-management/cutMendWorkOrder/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                ></el-button>
              </el-tooltip>
            </router-link>
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
  </basic-container>
</template>
<script>
import paginationMixin from "@/mixins/pagination";
import {
  getCutMendWorkOrderByPage,
  getCutMendWorkOrderExport,
} from "@/api/manufacture/cutMendWorkOrder";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      deleteApi: "",
      exportApi: getCutMendWorkOrderExport,
      ids: [], //id
      form: {},
      labelPosition: "right",
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    this.handleList(this.searchForm);
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getCutMendWorkOrderByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "未报工";
      } else if (value == 1) {
        value = "已报工";
      } else if (value == 2) {
        value = "已交接";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
