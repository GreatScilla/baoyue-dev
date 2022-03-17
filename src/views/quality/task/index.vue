// 质检任务
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
            v-model="searchForm.taskNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属计划">
          <el-input
            placeholder="请输入所属计划"
            v-model="searchForm.planNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="执行单位">
          <el-select v-model="searchForm.labId" placeholder="请选择">
            <el-option
              v-for="item in labList"
              :key="item.id"
              :label="item.labName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次批号">
          <el-input
            placeholder="请输入批次批号"
            v-model="searchForm.batchNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="计划状态">
          <el-select v-model="searchForm.taskStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务开始时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.taskBeginTime"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务结束时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.taskEndTime"
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
        v-if="permission.qualitytask_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.qualitytask_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        >新增</el-button
      >

      <el-button
        v-if="permission.qualitytask_delete"
        plain
        size="small"
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
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="taskNo"
          width="130"
          label="单据编号"
        ></el-table-column>
        <el-table-column
          width="130"
          prop="planNo"
          label="所属计划"
        ></el-table-column>
        <el-table-column width="130" prop="productSn" label="产品编号">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="model" label="规格型号"> </el-table-column>
        <el-table-column
          width="130"
          prop="labName"
          label="执行单位"
        ></el-table-column>
        <el-table-column prop="hour" label="工时"></el-table-column>
        <el-table-column
          width="150"
          prop="batchNo"
          label="批次批号"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="taskBeginTime"
          label="任务开始日期"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="taskEndTime"
          label="任务结束日期"
        ></el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.qualitytask_signfor">
              <el-tooltip
                v-if="scope.row.status === 1"
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
                v-if="scope.row.status === 1"
                direction="vertical"
              ></el-divider>
            </span>
            <span v-if="permission.qualitytask_issue">
              <el-tooltip
                v-if="scope.row.status === 2"
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
                v-if="scope.row.status === 2"
                direction="vertical"
              ></el-divider>
            </span>
            <router-link
              v-if="permission.qualitytask_edit"
              :to="{
                path: '/quality/task/edit',
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
                  :disabled="scope.row.planNo !== ''"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>

            <router-link
              v-if="permission.qualitytask_detail"
              :to="{
                path: '/quality/task/detail',
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
            <span v-if="permission.qualitytask_return">
              <el-tooltip
                class="item"
                effect="dark"
                content="退回"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.status !== 1 || scope.row.planNo === ''"
                  type="text"
                  size="small"
                  icon="el-icon-refresh-left"
                  @click="refresh(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.qualitytask_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                :disabled="scope.row.planNo !== ''"
                type="text"
                size="small"
                icon="el-icon-delete"
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
      title="下发"
      append-to-body
      width="640px"
    >
      <el-form ref="searchForm" label-width="100px" class="form-footer">
        <el-form-item required label="执行人">
          <el-input
            v-model="executeUserName"
            suffix-icon="el-icon-search"
            placeholder="请选择执行人"
            @focus="checkUserVisible = true"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="lssueDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="lssue">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择执行人弹窗 -->
    <leadingCadres
      title="执行人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  taskPage,
  taskOperation,
  selectCategoryList,
  createWorkOrder,
  removeTask,
} from "@/api/quality/process";
import { selectLabNameList } from "@/api/quality/index";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import leadingCadres from "@/components/quality/leadingCadres";

export default {
  mixins: [paginationMixin],
  components: { leadingCadres },
  data() {
    return {
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      options: [
        {
          value: 1,
          label: "待签收",
        },
        {
          value: 2,
          label: "已签收",
        },
        {
          value: 3,
          label: "退回",
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
      lssueDialogVisible: false,
      checkUserVisible: false,
      labList: [], //化验室列表
      lssueForm: {
        executeUserId: "",
      },
      executeUserName: "", //执行人显示
      typeData: [],
      planId: "",
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改质检任务" || from.name === "质检任务详情") {
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
      const res = await taskPage(params, data);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      if (this.searchForm.taskBeginTime && !this.searchForm.taskEndTime) {
        return this.$message.error({ message: "请选择任务结束时间" });
      }
      if (!this.searchForm.taskBeginTime && this.searchForm.taskEndTime) {
        return this.$message.error({ message: "请选择任务开始时间" });
      }
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //签收
    async operation(info) {
      try {
        await this.$confirm("是否确认签收该条质检任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          taskId: info.id,
          tag: info.status,
        };
        const res = await taskOperation(params);
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
        await this.$confirm("是否退回该条质检任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          taskId: info.id,
          tag: 2,
        };
        const res = await taskOperation(params);
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
    async getType(id) {
      //获取类别
      let res = await selectCategoryList({ labId: id });
      if (res.data.code === 200) {
        this.typeData = res.data.data;
      }
    },
    //打开下发弹窗
    openlssueDialog(info) {
      this.taskId = info.id;
      this.lssueDialogVisible = true;
    },
    //选择执行人
    addUser(list) {
      let idList = [];
      let nameList = [];
      list.forEach((res) => {
        idList.push(res.id);
        nameList.push(res.name);
      });
      this.lssueForm.executeUserId = idList.join(",");
      this.executeUserName = nameList.join(",");
    },
    //下发
    async lssue() {
      if (!this.executeUserName) {
        return this.$message.error("请选择执行人!");
      }
      let res = await createWorkOrder(
        this.taskId,
        this.lssueForm.executeUserId
      );
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
          removeTask({ ids: ids })
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
      if (this.multipleSelection.length === 0) {
        return this.$message.warning("请至少选择一条数据!");
      }
      const arr = this.multipleSelection.filter((ele) => ele.planNo !== "");
      if (arr.length > 0) {
        this.$message.warning("下发任务不能删除!");
        return;
      }
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/task/add");
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
        case 1:
          return "送样检验";

        case 2:
          return "进料检验";

        case 3:
          return "生产入库检验";

        case 4:
          return "销退检验";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
