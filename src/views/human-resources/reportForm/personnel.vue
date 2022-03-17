//库存调整明细报表
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
        <el-form-item label="员工工号">
          <el-input v-model="searchForm.job_number" clearable></el-input>
        </el-form-item>
        <el-form-item label="员工名称">
          <el-input v-model="searchForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="searchForm.dept_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            value-format="yyyy-MM-dd 00:00:00"
            v-model="searchForm.startTime"
            type="date"
            placeholder="请选择"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            value-format="yyyy-MM-dd 23:59:59"
            v-model="searchForm.endTime"
            type="date"
            placeholder="请选择"
            clearable
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
    <el-row style="margin: 10px 0">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      >
      <el-button
        @click="exports(exportApi, searchForm)"
        size="small"
        icon="el-icon-download"
        >导出</el-button
      >
      <el-button
        @click="getPdf(pdfApi, searchForm)"
        size="small"
        icon="el-icon-printer"
        >打印</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="job_number" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="dept_name" label="部门"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="post_name" label="职务"></el-table-column>
        <el-table-column
          width="160"
          prop="id_number"
          label="身份证号码"
        ></el-table-column>
        <el-table-column
          prop="politics_status"
          label="政治面貌"
        ></el-table-column>
        <el-table-column
          prop="marital_status"
          label="婚姻状况"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="current_address"
          label="现居住地"
        ></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column
          prop="second_link_name"
          label="紧急联系人姓名"
        ></el-table-column>
        <el-table-column
          prop="second_link_relation"
          label="紧急联系人关系"
        ></el-table-column>
        <el-table-column
          prop="second_link_phone"
          label="紧急联系人电话"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="join_date"
          label="入职时间"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="positive_date"
          label="转正时间"
        ></el-table-column>
        <el-table-column prop="status_name" label="员工状态"></el-table-column>
        <el-table-column
          prop="speed_dimission_date"
          label="离职时间"
        ></el-table-column>
        <el-table-column prop="description" label="职责描述"></el-table-column>
        <el-table-column
          prop="accumulation_fund_account"
          label="公积金账户"
        ></el-table-column>
        <el-table-column
          prop="social_security_account"
          label="社保账号"
        ></el-table-column>
        <el-table-column
          prop="social_security_account"
          label="社保缴纳地"
        ></el-table-column>
        <el-table-column prop="card_number" label="工资卡号"></el-table-column>
        <el-table-column
          prop="opening_bank"
          label="工资开户支行"
        ></el-table-column>
        <el-table-column prop="wx_id" label="微信号"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
import {
  getPersonnelDetailsReport,
  exportPersonnelDetailsReport,
} from "@/api/humanResources/reportForm";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],

  data() {
    return {
      searchForm: {},
      tableData: [],
      searchDialogVisible: false,
      multipleSelection: [],
      exportApi: exportPersonnelDetailsReport,
      pdfApi: "/hr/personnelFileBase/getPersonnelDetailsReportPDF",
      options: [
        {
          value: 1,
          label: "全职",
        },
        {
          value: 2,
          label: "兼职",
        },
        {
          value: 3,
          label: "实习",
        },
        {
          value: 4,
          label: "正式",
        },
        {
          value: 5,
          label: "试用",
        },
        {
          value: 6,
          label: "离职",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    this.handleList();
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
      const res = await getPersonnelDetailsReport(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList(this.searchForm);
      // this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
