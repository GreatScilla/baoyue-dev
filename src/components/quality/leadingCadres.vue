// 选择执行人
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="checkUserVisible"
      :before-close="handleClose"
    >
      <div style="margin-bottom: 10px">
        <el-input
          class="serchIpt"
          size="small"
          suffix-icon="el-icon-search"
          v-model="form.keywords"
          placeholder="输入账号或姓名"
          clearable
        >
        </el-input>
        <!-- <el-select
          class="serchIpt"
          v-model="form.deptId"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in deptOptions"
            :key="item.id"
            :label="item.deptName"
            :value="item.id"
          >
          </el-option>
        </el-select> -->
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </div>

      <el-table
        highlight-current-row
        :data="tableData"
        row-key="id"
        @selection-change="handleSelectionChange"
        @row-click="clickRow"
      >
        <el-table-column type="selection" reserve-selection></el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="name" label="用户名称">
          <template slot-scope="scope">
            {{ scope.row.name || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="所属部门"> </el-table-column>
        <el-table-column prop="realName" label="人员姓名"> </el-table-column>
        <el-table-column prop="phone" label="电话">
          <template slot-scope="scope">
            {{ scope.row.phone || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="createUsername" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150">
        </el-table-column>
      </el-table>
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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取 消 </el-button>
        <el-button size="small" type="primary" @click="confim">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeeFileList } from "@/api/humanResources/employeeFile";
import { getUser } from "@/api/base-data/user";
import { getDepartmentList } from "@/api/humanResources/department";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    checkUserVisible: Boolean,
    title: String,
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      form: {
        keywords: "",
      },
      deptOptions: [],
      multipleSelection: [],
    };
  },
  created() {
    this.handleList();
    this.initDept();
  },
  methods: {
    // 获取资源
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getUser(params);
      // this.tableData = res.data.data.records;
      this.tableData = res.data.data.records.filter((el) => {
        if (el.realName) {
          return el;
        }
      });
      this.total = this.tableData.length;
    },
    // 单击选择人员
    clickRow(row) {
      this.clickRowDate = row;
    },
    // 获取部门
    async initDept() {
      let res = await getDepartmentList();
      this.deptOptions = res.data.data;
    },
    // 搜索人员
    async search() {
      this.currentPage = 1;
      this.handleList(this.form);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定
    confim() {
      if (this.multipleSelection.length !== 0) {
        this.$emit("on-selected", this.multipleSelection);
        this.$emit("update:checkUserVisible", false);
      } else {
        this.$message.info("请选择执行人");
      }
    },
    // 取消
    cancel() {
      this.closeDialog();
    },
    // 关闭
    handleClose() {
      this.closeDialog();
    },
    // 表单初始
    closeDialog() {
      this.$emit("on-selected", false);
      this.$emit("update:checkUserVisible", false);
    },
  },
  filters: {
    status: function (value) {
      if (value === 2) {
        value = "兼职";
      } else if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.serchIpt {
  width: 180px;
  margin-right: 8px;
}
</style>