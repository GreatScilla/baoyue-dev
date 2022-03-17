// 员工档案
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function" style="display: flex">
      <el-col :span="4" class="el-col-span5">
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="searchDialogVisible = true"
          v-if="permission.employeeFile_search"
          >查 询</el-button
        >
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="$router.push('/human-resources/employeeFile/add')"
          v-if="permission.employeeFile_add"
          >新 增</el-button
        >
        <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain @click="toExport" v-if="permission.employeeFile_export">导出</el-button> -->
      </el-col>
      <el-col :span="5" class="el-col-span5">
        <el-tabs
          v-model="employeeFileSearchForm.condition"
          @tab-click="handleClick"
          class="tab"
          style="margin-top: -4px"
        >
          <el-tab-pane label="全部人员" :name="1"></el-tab-pane>
          <el-tab-pane label="同部门" :name="2"></el-tab-pane>
          <el-tab-pane label="我的下属" :name="3"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索表单 -->
    <!-- <el-row style="display:flex;font-size:14px">
      <el-col :span="5">
        
      </el-col>
      <el-col :span="13">
        <el-form
          label-width="100px"
          :inline="true"
          :model="employeeFileSearchForm"
          ref="setUpForm"
        >
          <el-form-item>
            <el-select size="small" v-model="employeeFileSearchForm.status" clearable  placeholder="请选择员工状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              size="small"
              v-model="employeeFileSearchForm.name"
              clearable
              placeholder="搜索员工">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select size="small" v-model="employeeFileSearchForm.deptId" clearable  placeholder="请选择部门">
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:20px">
            <el-button size="small" type="primary" @click="searchEmployeeFile">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->
    <!-- 统计 -->
    <el-row class="statistics">
      <div style="flex: 1; line-height: 60px; text-align: center">
        在职员工 {{ statistics.onJobCount }}
      </div>
      <!-- <div class="div-item">
        <div class="item">
          <span>全职</span>
          <span>{{statistics.fullTimeCount}}</span>
        </div>
        <div class="item">
          <span>兼职</span>
          <span>{{statistics.partTimeCount}}</span>
        </div>
        <div class="item">
          <span>实习</span>
          <span>{{statistics.practiceCount}}</span>
        </div>
      </div> -->
      <div class="div-item">
        <div class="item">
          <span>正式</span>
          <span>{{ statistics.officialCount }}</span>
        </div>
        <div class="item">
          <span>试用</span>
          <span>{{ statistics.tryOutCount }}</span>
        </div>
        <div class="item">
          <span>兼职</span>
          <span>{{ statistics.practiceCount }}</span>
        </div>
      </div>
    </el-row>
    <!-- <el-col :span="6" style="margin-bottom:20px">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">新建人员</el-button>
      <el-button size="small" icon="el-icon-upload2" type="success" plain @click="toExport">导出</el-button>
    </el-col> -->
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="employeeFileTableData"
      border
    >
      <el-table-column prop="jobNumber" label="工号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <!-- <el-table-column prop="englishName" label="英文名"> </el-table-column> -->
      <el-table-column prop="address" label="籍贯" width="200">
      </el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="postName" label="职务"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | status }}
        </template>
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
              @click="toEdit(scope.row)"
              v-if="permission.employeeFile_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.employeeFile_edit && permission.employeeFile_details
            "
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
              @click="toDetail(scope.row)"
              v-if="permission.employeeFile_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.employeeFile_details && permission.employeeFile_delete
            "
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
              @click="handleDelete(scope.$index, scope.row)"
              v-if="permission.employeeFile_delete"
            >
            </el-button>
          </el-tooltip>
        </template>
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
    <!-- 查询 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form
        ref="employeeFileSearchForm"
        :model="employeeFileSearchForm"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="工号">
          <el-input
            placeholder="请输入工号"
            v-model="employeeFileSearchForm.jobNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入姓名"
            v-model="employeeFileSearchForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-select
            size="small"
            v-model="employeeFileSearchForm.deptId"
            clearable
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.deptName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务">
          <el-select
            size="small"
            v-model="employeeFileSearchForm.postName"
            clearable
            placeholder="请选择职务"
          >
            <el-option
              v-for="item in postNameOptions"
              :key="item.id"
              :label="item.postName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            placeholder="请输入联系电话"
            v-model="employeeFileSearchForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select
            size="small"
            v-model="employeeFileSearchForm.status"
            clearable
            placeholder="请选择员工状态"
          >
            <el-option
              v-for="item in statusOptions"
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
    <!-- 设置表格项 -->
    <el-dialog
      title="往来单位-新增"
      append-to-body
      :visible.sync="setUpDialogVisible"
    >
      <el-checkbox
        v-model="checked"
        v-for="(item, index) in setUpItemData"
        :key="index"
        style="margin-bottom: 15px"
        >{{ item }}</el-checkbox
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="setUpDialogVisible = false" size="small">
          取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="confimsetUpDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getEmployeeFileList,
  delEmployeeFile,
  getDutiesList,
} from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      postNameOptions: [],
      employeeFileSearchForm: {
        condition: 1,
      },
      recordForm: {}, //暂存数据
      employeeFileTableData: [
        {
          code: "123",
        },
      ],
      statistics: {},
      setUpItemData: [
        "部门",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "部门",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "部门",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "部门",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
        "姓名",
      ],
      setUpDialogVisible: false,
      statusOptions: [
        {
          value: 4,
          label: "正式",
        },
        {
          value: 5,
          label: "试用",
        },
        {
          value: 2,
          label: "兼职",
        },
      ],
      deptOptions: [],
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑人员管理" || from.name === "人员管理详情") {
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
    const res = await getDutiesList({ current: 1, size: 10000 });
    this.postNameOptions = res.data.data.records;
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.employeeFileSearchForm = recordObj;
    }
    this.handleList(this.employeeFileSearchForm);
    this.initDept();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getEmployeeFileList(params);
      this.employeeFileTableData = res.data.data.pages.records;
      this.statistics = res.data.data;
      this.total = res.data.data.pages.total;
    },
    // 获取部门
    async initDept() {
      let res = await getDepartmentList();
      this.deptOptions = res.data.data;
    },
    // tans点击
    handleClick(value) {
      this.employeeFileSearchForm = {};
      this.employeeFileSearchForm.condition = value.name;
      this.handleList(this.employeeFileSearchForm);
    },
    // 查询
    onSearch() {
      this.currentPage = 1;
      this.handleList(this.employeeFileSearchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.employeeFileSearchForm = { condition: 1 };
      this.handleList(this.employeeFileSearchForm);
      // this.searchDialogVisible = false;
    },
    // 删除
    async handleDelete(index, row) {
      try {
        await this.$confirm("确定要删除该员工吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delEmployeeFile({ ids: row.id });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    toEdit(row) {
      this.$router.push({
        path: "/human-resources/employeeFile/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/human-resources/employeeFile/detail",
        query: {
          data: row,
        },
      });
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
.el-input,
.el-select {
  width: 160px;
}
.tab {
  /deep/ .el-tabs__active-bar,
  /deep/.el-tabs__nav-wrap::after {
    width: 0px !important;
  }
  #tab-first::after,
  #tab-second::after {
    content: "";
    position: absolute;
    right: 1px;
    top: 10px;
    width: 1px;
    height: 22px;
    background-color: #dcdfe6;
    z-index: 1;
  }
}
.statistics {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  display: flex;
  background-color: #f2f2f2;
  & > div {
    border-right: 1px solid #ccc;
  }
  .div-item {
    display: flex;
    flex: 2;
    justify-content: space-around;
    align-items: center;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.el-col-span5 {
  margin-bottom: 0px;
  height: 32px !important;
}
</style>