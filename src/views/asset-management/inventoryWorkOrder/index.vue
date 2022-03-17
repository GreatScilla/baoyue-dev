//台账工单
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
        <el-form-item label="单据编号:" prop="inventoryWorkSn">
          <el-input
            placeholder="请输入单据编号"
            v-model="form.inventoryWorkSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="制单人:" prop="executor">
          <el-input
            placeholder="请输入制单人"
            v-model="form.executor"
          ></el-input>
        </el-form-item>
        <el-form-item label="计划日期:" prop="date">
          <el-date-picker
            type="date"
            v-model="form.date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
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
        v-if="permission.inventoryWorkOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <!-- <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      > -->
      <!-- <el-button size="small" plain @click="assignShow = true">指派</el-button> -->
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
        <el-table-column label="状态" prop="status" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="inventoryWorkSn" label="单据编号">
        </el-table-column>
        <el-table-column prop="planDate" label="盘点日期"> </el-table-column>
        <el-table-column prop="startTime" label="开始时间"> </el-table-column>
        <el-table-column prop="inventoryRange" label="盘点范围">
        </el-table-column>
        <el-table-column prop="executor" label="执行人"> </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.inventoryWorkOrder_return"
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
              v-if="permission.inventoryWorkOrder_feedback"
              class="item"
              effect="dark"
              content="盘点结果反馈"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.status == 0 || scope.row.status == 2"
                icon="el-icon-s-help"
                @click="handleSubmit(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.inventoryWorkOrder_detail"
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
              v-if="permission.inventoryWorkOrder_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                :disabled="scope.row.status != 0"
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
        <el-form-item label="执行盘点部门:" prop="billNo">
          <el-select
            v-model="ruleForm.executiveArmId"
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
            v-model="ruleForm.executorId"
            placeholder="请选择"
            @change="applicantTypes1"
            :disabled="!ruleForm.executiveArmId"
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
import {
  getInventoryWorkByPage,
  deleteAssetInventoryWork,
  updateOrderStatus,
  designate,
} from "@/api/asset-management/inventoryWorkOrder.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
import { getDept, getByDept } from "@/api/common";
export default {
  name: "contract",
  mixins: [paginationMixin, deleteOrAudit],
  data() {
    return {
      form: {},
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      deleteApi: deleteAssetInventoryWork,
      auditApi: updateOrderStatus,
      auditLoading: false,
      assignShow: false,
      ruleForm: {},
      selectedData: [],
      deptList: [],
    };
  },
  async created() {
    // 获取部门
    const data = await getDept({
      current: 1,
      size: 100,
    });
    this.deptList = data.data.data.records;
  },
  mounted() {
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    // 指派弹框显示
    assignShowLosh(val) {
      this.selectedData = val;
      this.assignShow = true;
    },
    //指派
    async assign() {
      console.log(89);
      const data = {
        id: this.selectedData.id,
        ...this.ruleForm,
      };
      const res = await designate(data);
      if (res.data.code === 200) {
        this.$message.success("操作成功");
        this.assignShow = false;
        await this.handleList();
      }
    },
    async applicantTypes(value) {
      this.deptList.forEach((item) => {
        if (item.id === value) {
          this.ruleForm.executiveArmId = value;
          this.ruleForm.executiveArm = item.deptName;
        }
      });
      // 获取人
      const res = await getByDept({
        name: this.name,
        current: 1,
        size: 100,
        deptName: this.ruleForm.executiveArm,
        deptId: this.ruleForm.executiveArmId,
      });
      this.userList = res.data.data.records;
    },
    applicantTypes1(value) {
      this.userList.forEach((item) => {
        if (item.id === value) {
          console.log(item);
          this.ruleForm.executorId = value;
          this.ruleForm.executor = item.name;
        }
      });
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
        // inventoryPlanningSn: this.form.billNo,
        // planDate: this.form.purchaseDate,
        // createUserName: this.form.contractName,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getInventoryWorkByPage(params);
      console.log(res);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    //提交
    handleSubmit(row) {
      this.$router.push({
        path: "/asset-management/inventoryWorkOrder/add",
        query: {
          data: row,
        },
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/inventoryWorkOrder/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/inventoryWorkOrder/detail",
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
    // 关闭指派弹框
    assignClose() {
      this.assignShow = false;
    },
  },
  filters: {
    //状态 0 未执行 1 执行中 2已执行
    statusName(value) {
      if (value == "0") {
        value = "未执行";
      } else if (value == "1") {
        value = "执行中";
      } else if (value == "2") {
        value = "已执行";
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
