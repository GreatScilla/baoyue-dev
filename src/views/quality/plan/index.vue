// 质检计划
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
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.planNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="质检计划类别">
          <el-select v-model="searchForm.planType" placeholder="请选择">
            <el-option
              v-for="item in planTypeList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划来源">
          <el-select v-model="searchForm.planSource" placeholder="请选择">
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.deptName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成状态:">
          <el-select v-model="searchForm.completionStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.planBeginTime"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划结束时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.planEndTime"
            value-format="yyyy-MM-dd 23:59:59"
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
        v-if="permission.qualityPlan_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        size="small"
        v-if="permission.qualityPlan_add"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        >新增</el-button
      >

      <el-button
        plain
        size="small"
        v-if="permission.qualityPlan_delete"
        @click="handleDelRole()"
        >批量删除</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.planStatus | statusName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="planNo"
          width="130"
          label="单据编号"
        ></el-table-column>
        <el-table-column
          prop="productSn"
          width="130"
          label="产品编号"
        ></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column prop="planType" width="120" label="质检计划类别">
          <template slot-scope="scope">
            {{ scope.row.planType | planTypeName }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="计划来源"></el-table-column>
        <el-table-column
          prop="batchNo"
          width="130"
          label="批次批号"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="planBeginTime"
          label="计划开始日期"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="planEndTime"
          label="计划结束日期"
        ></el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <div class="ellipsis">
              {{ scope.row.remark }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.qualityPlan_signfor">
              <el-tooltip
                v-if="scope.row.planStatus === 1"
                class="item"
                effect="dark"
                content="签收"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  @click="operation(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider
                v-if="scope.row.planStatus === 1"
                direction="vertical"
              ></el-divider>
            </span>
            <span v-if="permission.qualityPlan_issue">
              <el-tooltip
                v-if="scope.row.planStatus === 2"
                class="item"
                effect="dark"
                content="下发"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-thumb"
                  @click="openlssueDialog(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider
                v-if="scope.row.planStatus === 2"
                direction="vertical"
              ></el-divider>
            </span>
            <router-link
              v-if="permission.qualityPlan_edit"
              :to="{
                path: '/quality/plan/edit',
                query: { data: scope.row },
              }"
            >
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
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>

            <router-link
              v-if="permission.qualityPlan_detail"
              :to="{
                path: '/quality/plan/detail',
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
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <span v-if="permission.qualityPlan_return">
              <el-tooltip
                class="item"
                effect="dark"
                content="退回"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.planStatus !== 1"
                  type="text"
                  size="small"
                  icon="el-icon-refresh-left"
                  @click="refresh(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.qualityPlan_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                :disabled="scope.row.planStatus === 2"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
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
    <el-dialog
      class="search-dialog"
      :visible.sync="lssueDialogVisible"
      :before-close="handleClose"
      title="任务下发"
      append-to-body
      width="640px"
    >
      <el-form
        :model="lssueForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        :show-message="false"
        class="form-footer"
      >
        <el-form-item prop="labId" label="执行单位:">
          <el-select
            class="iptWidth"
            v-model="lssueForm.labId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labList"
              :key="item.id"
              :label="item.labName"
              :value="item.id"
              @click.native="getType(item.id)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="hour" label="工时">
          <el-input v-model="lssueForm.hour"></el-input>
        </el-form-item>
        <el-form-item prop="taskBeginTime" label="任务开始时间">
          <el-date-picker
            class="iptWidth"
            v-model="lssueForm.taskBeginTime"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="taskEndTime" label="任务结束时间">
          <el-date-picker
            class="iptWidth"
            v-model="lssueForm.taskEndTime"
            value-format="yyyy-MM-dd 23:59:59"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="lssueDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="lssue">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  planPage,
  operation,
  createTask,
  removePlan,
} from "@/api/quality/process";
import { selectLabNameList } from "@/api/quality/index";
import { getDepartmentList } from "@/api/humanResources/department";
import { getDictionary } from "@/api/system/dictbiz";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      options: [
        {
          value: 0,
          label: "未完成",
        },
        {
          value: 1,
          label: "已完成",
        },
      ],
      planTypeList: [],
      multipleSelection: [],
      searchDialogVisible: false,
      lssueDialogVisible: false,
      labList: [], //化验室列表
      lssueForm: {},
      planId: "",
      deptOptions: [], //部门列表
      rules: {
        labId: [{ required: true, message: "请选择", trigger: "change" }],
        taskBeginTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        taskEndTime: [{ required: true, message: "请选择", trigger: "change" }],
        hour: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改质检计划" || from.name === "质检计划详情") {
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
    if (recordObj) {
      this.currentPage = recordObj.params.pageNum;
      this.pageSize = recordObj.params.pageSize;
      delete recordObj.params.pageNum;
      this.searchForm = recordObj.data;
    }
    this.handleList();
    let res = await selectLabNameList({});
    this.labList = res.data.data;
    let info = await getDepartmentList();
    this.deptOptions = info.data.data;
    let list = await getDictionary({ code: "mes_plan_type" });
    this.planTypeList = list.data.data;
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
      let data = this.searchForm;
      this.recordForm = { params, data };
      const res = await planPage(params, data);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //签收
    async operation(info) {
      try {
        await this.$confirm("是否确认签收该条质检计划?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          planId: info.id,
          tag: info.planStatus,
        };
        const res = await operation(params);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //退回
    async refresh(info) {
      try {
        await this.$confirm("是否退回该条质检计划?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          planId: info.id,
          tag: 2,
        };
        const res = await operation(params);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //打开下发弹窗
    openlssueDialog(info) {
      this.planId = info.id;
      this.lssueForm.planNo = info.planNo;
      this.lssueDialogVisible = true;
    },
    //下发
    async lssue() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息1",
        });
        return;
      }
      let res = await createTask(this.planId, this.lssueForm);
      if (res.data.code === 200) {
        this.lssueForm = {};
        this.lssueDialogVisible = false;
        this.$message.success({
          message: "操作成功",
        });
        this.handleList();
      }
    },
    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removePlan({ ids: ids })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole([row.id]);
    },
    // 多行删除
    handleDelRole() {
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/plan/add");
    },
  },
  filters: {
    statusName(val) {
      if (val === 1) {
        return (val = "待签收");
      }
      if (val === 2) {
        return (val = "已签收");
      }
      if (val === 3) {
        return (val = "退回");
      }
      if (val === 4) {
        return (val = "已下发");
      }
    },
    planTypeName(val) {
      switch (val) {
        case "1":
          return "送样检验";

        case "2":
          return "进料检验";

        case "3":
          return "生产入库检验";

        case "4":
          return "销退检验";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
