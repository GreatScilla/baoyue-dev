//其他假期统计
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="工号">
          <el-input v-model="searchForm.jobNumber" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.personName" placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.otherHolidayStatistics_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column prop="jobNumber" label="工号"> </el-table-column>
        <el-table-column prop="personName" label="姓名"> </el-table-column>
        <el-table-column prop="marriageLeave" label="已休婚假">
        </el-table-column>
        <el-table-column prop="maternityLeave" label="已休产假"> </el-table-column>
        <el-table-column prop="paternityLeave" label="已休陪产假">
        </el-table-column>
        <el-table-column prop="lactationLeave" label="已休哺乳假">
        </el-table-column>
        <el-table-column prop="bereavementLeave" label="已休丧假">
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
import { getOtherHolidayStatisticsPage } from "@/api/attendance/index";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      requesting: false,
      searchForm: {},
        searchDialogVisible: false,
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.handleList();
  },
  methods: {
    //列表数据
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getOtherHolidayStatisticsPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 650;
  line-height: 24px;

  color: #303133;
}
.ipt_320 {
  width: 320px;
}
.ipt_160 {
  width: 160px;
}
.ipt_120 {
  width: 120px;
}
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.search-footer {
  margin: 20px 0 0;
}
</style>
