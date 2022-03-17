// 员工班次
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.employeeShift_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/human-resources/employeeShift/add')"
        v-if="permission.employeeShift_add"
        >新 增</el-button
      >
      <!-- <el-button size="small" type="primary" plain @click="relation">批量关联</el-button>
      <el-button size="small" type="success" plain @click="synchronization">同步班次</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <!-- <el-row style="display:flex;margin-bottom: 25px;">
      <el-input
        size="small"
        style="margin-right:30px;"
        placeholder="输入工号或名称"
        v-model="searchParams">
      </el-input>
      <el-button size="small" type="primary" @click="searchEmployeeShift">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">新增</el-button>
      <el-button size="small" type="primary" plain @click="relation">批量关联</el-button>
      <el-button size="small" type="success" plain @click="synchronization">同步班次</el-button>
    </el-row> -->
    <!-- 表格table -->
    <el-table :data="employeeShiftData" border>
      <el-table-column prop="mesClassName" label="班次名称"> </el-table-column>
      <el-table-column prop="jobNumber" label="工号"> </el-table-column>
      <el-table-column prop="personName" label="姓名"> </el-table-column>
      <el-table-column prop="depotName" label="部门"> </el-table-column>
      <el-table-column prop="startTime" label="生效时间"> </el-table-column>
      <el-table-column prop="endTime" label="失效时间"> </el-table-column>
      <el-table-column prop="createUserName" label="创建人"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150px">
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
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
              v-if="permission.employeeShift_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.employeeShift_edit && permission.employeeShift_details
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
              v-if="permission.employeeShift_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.employeeShift_details &&
              permission.employeeShift_delete
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
              v-if="permission.employeeShift_delete"
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
        ref="searchForm"
        :model="searchForm"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="工号">
          <el-input
            placeholder="请输入工号"
            v-model="searchForm.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入姓名"
            v-model="searchForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            size="small"
            v-model="searchForm.depotId"
            placeholder="请选择"
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
        <el-form-item label="班次">
          <el-select
            size="small"
            v-model="searchForm.mesClassId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in employeeShiftOptions"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效日期">
          <el-date-picker
            v-model="takeStartDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期">
          <el-date-picker
            v-model="takeStartDate1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.createUserName"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
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
  getEmployeeShift,
  deleteEmployeeShift,
} from "@/api/humanResources/employeeShift";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import { getDepartmentList } from "@/api/humanResources/department";
import { getShiftList } from "@/api/humanResources/shift";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      takeStartDate: [],
      takeStartDate1: [],
      deptOptions: [],
      employeeShiftOptions: [],
      employeeShiftData: [],
      searchForm: {}, // 搜索条件
      recordForm: {}, //暂存数据
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑员工班次" || from.name === "员工班次详情") {
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
    const res = await getShiftList({ current: 0, size: 10000 });
    this.employeeShiftOptions = res.data.data.records;
    const res1 = await getDepartmentList();
    this.deptOptions = res1.data.data;
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
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
      let res = await getEmployeeShift(params);
      this.employeeShiftData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 删除
    async handleDelete(index, row) {
      try {
        await this.$confirm("确定要删除该员工班次吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await deleteEmployeeShift({ ids: row.id });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 搜索
    searchRole() {
      if (this.takeStartDate) {
        this.searchForm.takeStartTime = this.takeStartDate[0];
        this.searchForm.takeEndTime = this.takeStartDate[1];
      } else {
        this.searchForm.takeStartTime = "";
        this.searchForm.takeEndTime = "";
      }
      if (this.takeStartDate1) {
        this.searchForm.loseStartTime = this.takeStartDate1[0];
        this.searchForm.loseEndTime = this.takeStartDate1[1];
      } else {
        this.searchForm.loseStartTime = "";
        this.searchForm.loseEndTime = "";
      }
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.takeStartDate = [];
      this.takeStartDate1 = [];
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 批量关联
    relation() {
      // this.$router.push({
      //   path: "/human-resources/employeeShift/batchCorrelation"
      // });
    },
    toEdit(row) {
      this.$router.push({
        path: "/human-resources/employeeShift/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/human-resources/employeeShift/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>