//假期类型
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
        <el-form-item label="姓名">
          <el-input v-model="searchForm.personName" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="searchForm.deptName" placeholder="请选择">
            <el-option
              v-for="item in deptList"
              :key="item.id"
              :label="item.deptName"
              :value="item.deptName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请假类型">
          <el-select v-model="searchForm.processName" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="searchForm.years"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
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
        v-if="permission.leaveStatistics_expore"
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
        <el-table-column prop="deptName" label="部门"> </el-table-column>
        <el-table-column prop="processName" label="请假类型"> </el-table-column>
        <el-table-column label="考勤日期">
          <template slot-scope="scope">
            {{ scope.row.data.data[1].value[0].split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="请假时长">
          <template slot-scope="scope">
            {{ scope.row.data.data[1].title }}
          </template>
        </el-table-column>
        <el-table-column label="请假原因">
          <template slot-scope="scope">
            {{ scope.row.data.data[2].value }}
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
import { getByPage } from "@/api/attendance/index";
import { getDept } from "@/api/common.js";
import { getProcessType } from "@/api/flow2/flowConfig.js";
import paginationMixin from "@/mixins/pagination";
import { deepClone } from "@/util/util";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      requesting: false,
      searchForm: {},
      form: {},
      tableData: [],
      searchDialogVisible: false,
      infoDialogVisible: false,
      type: "", //类型
      rules: {
        leaveName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      multipleSelection: [], //列表选中数据
      deptList: [], //部门下拉数据
      options: [], //请假类型下拉数据
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.getOptions();
    this.handleList();
  },
  methods: {
    //列表数据
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize ,moduleName:'假'};
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getByPage(params);

      this.tableData = res.data.data.records;
      this.tableData.forEach((el) => {
        el.data = JSON.parse(el.data);
      });
      console.log(this.tableData);
      this.total = res.data.data.total;
    },
    getOptions() {
      Promise.all([getDept({}), getProcessType({})]).then((values) => {
        this.deptList = values[0].data.data;
        this.options = values[1].data.data;
      });
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
  filters: {
    workingAgeName(num) {
      switch (num) {
        case 0:
          return "一年以下";
        case 1:
          return "1-10年";
        case 2:
          return "10-20年";
        case 3:
          return "20年以上";
      }
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
