// 巡检工单
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
        <el-form-item label="工单编号:" prop="spotCheckOrderSn">
          <el-input placeholder="请输入" v-model="form.spotCheckOrderSn"></el-input>
        </el-form-item>
        <el-form-item label="工单名称:" prop="spotCheckName">
          <el-input placeholder="请输入" v-model="form.spotCheckName"></el-input>
        </el-form-item>
        <el-form-item label="巡检部门:" prop="spotCheckDepartment">
          <el-input
            placeholder="请输入"
            v-model="form.spotCheckDepartment"
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
        v-if="permission.workPatrol_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="状态" prop="statusName" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.status | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="spotCheckOrderSn" label="工单单号">
        </el-table-column>
        <el-table-column prop="spotCheckName" label="工单名称">
        </el-table-column>
        <el-table-column prop="spotCheckDepartment" label="巡检部门">
        </el-table-column>
        <el-table-column prop="spotCheckTime" label="巡检时间">
        </el-table-column>
        <el-table-column prop="" label="计划周期">
          <template slot-scope="{ row }">
            <span>{{ row.planningCycle }}/{{ row.planningCycleUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.workPatrol_return"
              class="item"
              effect="dark"
              content="指派"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-thumb"
                @click="assignShowLosh(scope.row)"
                :disabled="scope.row.status != 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.workPatrol_set"
              class="item"
              effect="dark"
              content="操作"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-setting"
                @click="handleEdit(scope.row)"
                :disabled="scope.row.status == 0 || scope.row.status == 4"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.workPatrol_detail"
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
              v-if="permission.workPatrol_delete"
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
                :disabled="scope.row.status != 0"
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
    <!-- 指派弹框 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="assignShow"
      :before-close="assignClose"
      title="计划指派"
      append-to-body
      width="640px"
    >
      <el-form
        ref="ruleForm"
        :model="form"
        label-width="110px"
        class="form-footer"
      >
        <el-form-item label="执行巡检部门:" prop="billNo">
          <el-select
            v-model="ruleForm.spotCheckDepartmentId"
            placeholder="请选择"
            @change="applicantTypes"
          >
            <el-option
              v-for="item of deptList"
              :key="item.id"
              :label="item.deptName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行人:" prop="billNo">
          <el-select
            v-model="ruleForm.spotCheckPersonId"
            placeholder="请选择"
            @change="applicantTypes1"
            :disabled="!ruleForm.spotCheckDepartmentId"
          >
            <el-option
              v-for="item of userList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="assignShow = false" size="small">取消</el-button>
          <el-button type="primary" size="small" @click="assign"
            >指派</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import { audit } from "@/api/salesManage/contract";
import {
  getList,
  deleteMaintenanceWorkOrder,
} from "@/api/asset-management/workPatrol.js";
import { designate } from "@/api/asset-management/workCheck.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
import { getDept, getByDept } from "@/api/common";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {
        contractName: "",
        memberName: "",
        salesMan: "",
        contractStartDate: "",
        contractEndDate: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteMaintenanceWorkOrder,
      auditApi: audit,
      assignShow: false,
      ruleForm: {},
      name: "",
      deptList: [],
      userList: [],
      selectedData: [],
    };
  },
  async created() {
    this.handleList();
    // 获取部门
    const data = await getDept({
      name: this.name,
      current: 1,
      size: 100,
    });
    this.deptList = data.data.data.records;
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    async applicantTypes(value) {
      this.deptList.forEach((item) => {
        if (item.id === value) {
          this.ruleForm.spotCheckDepartmentId = value;
          this.ruleForm.spotCheckDepartment = item.deptName;
        }
      });
      // 获取人
      const res = await getByDept({
        name: this.name,
        current: 1,
        size: 100,
        deptName: this.ruleForm.spotCheckDepartment,
        deptId: this.ruleForm.spotCheckDepartmentId,
      });
      this.userList = res.data.data.records;
    },
    applicantTypes1(value) {
      this.userList.forEach((item) => {
        if (item.id === value) {
          this.ruleForm.spotCheckPersonId = value;
          this.ruleForm.spotCheckPerson = item.name;
        }
      });
    },
    // 指派弹框显示
    assignShowLosh(val) {
      this.selectedData = val;
      this.assignShow = true;
    },
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    // 关闭指派弹框
    assignClose() {
      this.assignShow = false;
    },
    //指派
    async assign() {
      const data = {
        id: this.selectedData.id,
        ...this.ruleForm,
      };
      const res = await designate(data, 0);
      if (res.data.code === 200) {
        this.$message.success("操作成功");
        this.assignShow = false;
        await this.handleList();
      }
    },
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
      this.recordForm = params;
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleEdit(row) {
      // 操作
      console.log(row);
      // if(row.status==3){}
      this.$router.push({
        path: "/asset-management/workPatrol/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/workPatrol/detail",
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
    statusName(value) {
      if (value == 0) {
        value = "待指派";
      } else if (value == 1) {
        value = "待执行";
      } else if (value == 2) {
        value = "执行中";
      } else if (value == 3) {
        value = "待验收";
      } else if (value == 4) {
        value = "已完成";
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
