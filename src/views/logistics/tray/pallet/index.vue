// 托盘管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.pallet_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="to('add', null, 'pallet')"
        v-if="permission.pallet_add"
        >新 增</el-button
      >
      <!-- <el-button size="small" icon="el-icon-download" type="success" plain v-if="permission.pallet_import">导入</el-button>
      <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.pallet_export">导出</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <!-- <el-form
      :inline="true"
      :model="palletForm"
      ref="setUpForm"
    >
      <el-form-item label="日期:">
        <el-date-picker
          v-model="date"
          size="small"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="100px" label="产品名称:">
        <el-input
          size="small"
          v-model="palletForm.trayName"
          placeholder="请输入产品名称">
        </el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="状态:">
        <el-select size="small" v-model="palletForm.status"  placeholder="请选择状态">
          <el-option
            v-for="item in palletStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="searchPallet">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form> -->
    <!-- 操作 -->
    <!-- <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add',null,'pallet')">新增</el-button>
      <el-button size="small" icon="el-icon-download" type="success" plain>导入</el-button>
      <el-button size="small" icon="el-icon-upload2" type="success" plain>导出</el-button>
    </el-row> -->
    <!-- 表单 -->
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="palletTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="托盘状态">
          <template slot-scope="scope">
            {{ scope.row.status | status }}
          </template>
        </el-table-column>
        <el-table-column
          prop="traySn"
          label="托盘编号"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="trayName" label="托盘名称" width="150">
        </el-table-column>
        <el-table-column
          prop="traySpecification"
          label="托盘规格"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="unit" label="单位"> </el-table-column>
        <el-table-column prop="quantity" label="数量"> </el-table-column>
        <el-table-column prop="createUserName" label="创建人员">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="to('edit', scope.row, 'pallet')"
                v-if="permission.pallet_edit"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.pallet_edit && permission.pallet_details"
            ></el-divider>
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
                @click="to('details', scope.row, 'pallet')"
                v-if="permission.pallet_details"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.pallet_details && permission.pallet_delete"
            ></el-divider>
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
                v-if="permission.pallet_delete"
              >
              </el-button>
            </el-tooltip>
            <!-- <el-button type="text" size="small" @click="handleDelpallet(scope.row)">
              报废
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
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
    <!-- 查询 -->
    <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search>
  </basic-container>
</template>

<script>
import { queryPalletPage, delPallet } from "@/api/logistics/pallet/pallet";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      palletForm: {}, // 查询表单
      palletTableData: [], // 表格数据
      date: [], // 日期
      palletStatusOptions: [
        {
          value: 0,
          label: "闲置",
        },
        // {
        //   value:1,
        //   label:'使用中'
        // },
        // {
        //   value:2,
        //   label:'报废'
        // }
      ], // 状态
      searchDialogVisible: false,
      column: [
        {
          label: "托盘状态",
          prop: "status",
          type: "select",
          dicData: [],
        },
        {
          label: "托盘编码",
          prop: "traySn",
        },
        {
          label: "托盘名称",
          prop: "trayName",
        },
        {
          label: "托盘规格",
          prop: "traySpecification",
        },
        {
          label: "产品名称",
          prop: "trayName",
        },
        {
          label: "单位",
          prop: "unit",
        },
        {
          label: "单据日期",
          prop: "date",
          type: "daterange",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  created() {
    this.handleList();
    // 状态
    let palletStatusOptions = this.findObject(this.column, "status");
    palletStatusOptions.dicData = this.palletStatusOptions;
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await queryPalletPage(params);
      this.palletTableData = res.data.data.records;

      this.total = res.data.data.total;
    },
    // 选择单据日期
    changeDate(value) {
      this.palletForm.beginTime = value[0];
      this.palletForm.endTime = value[1];
    },
    // 删除
    async handleDelete(row) {
      try {
        await this.$confirm("确定要删除该托盘吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delPallet({ ids: row.id });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 查询
    onSearch(value) {
      if (value) {
        value.beginTime = value.date[0];
        value.endTime = value.date[1];
        delete value["date"];
        this.handleList(value);
      }
      this.searchDialogVisible = false;
    },
    // 搜索
    searchPallet() {
      if (this.palletForm) {
        this.handleList(this.palletForm);
      }
    },
    // 重置
    reset() {
      this.palletForm = {};
      this.date = [];
      this.handleList();
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
    // 跳转
    to(operationState, row, pallet) {
      this.$router.push({
        path: "/product-development/product-data/detail",
        query: {
          operationState,
          row,
          pallet,
        },
      });
    },
  },
  filters: {
    status: function (value) {
      if (value === 0) {
        return "闲置";
      } else if (value === 1) {
        return "使用中";
      } else {
        return "报废";
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
</style>
