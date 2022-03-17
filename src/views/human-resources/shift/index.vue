// 班次管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.shift_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/human-resources/shift/add')"
        v-if="permission.shift_add"
        >新 增</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        v-if="permission.shift_delete"
      >
        批量删除
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 10px;"
        placeholder="输入编号或名称"
        v-model="searchParam"
      ></el-input>
      <el-button size="small" type="primary" @click="search">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('isCreate')">
        新增
      </el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelete()">
        删除
      </el-button>
    </el-row> -->
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="code" label="班次编号"> </el-table-column>
        <el-table-column prop="className" label="班次名称"> </el-table-column>
        <el-table-column prop="upTime" label="上班时间"> </el-table-column>
        <el-table-column prop="upTimeOne" label="最早上班打卡时间">
        </el-table-column>
        <el-table-column prop="upTimeTwo" label="最迟上班打卡时间">
        </el-table-column>
        <el-table-column prop="belowTime" label="下班时间"> </el-table-column>
        <el-table-column prop="belowTimeOne" label="最早下班打卡时间">
        </el-table-column>
        <el-table-column prop="belowTimeTwo" label="最迟下班打卡时间">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnabled"
              :active-value="0"
              :inactive-value="1"
              inactive-color="#FF4949"
              @change="
                (value) => {
                  handleSwitchChange(value, scope.row);
                }
              "
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createUsername" label="制单人">
        </el-table-column>
        <!-- <el-table-column width="150" prop="createTime" label="创建时间"> </el-table-column> -->
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
                v-if="permission.shift_edit"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.shift_edit && permission.shift_details"
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
                v-if="permission.shift_details"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.shift_details && permission.shift_delete"
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
                @click="handleDelete(scope.row)"
                v-if="permission.shift_delete"
              >
              </el-button>
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
        <el-form-item label="编号或名称">
          <el-input
            placeholder="请输入编号或名称"
            v-model="searchForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            size="small"
            v-model="searchForm.isEnabled"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.createUsername"
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
  getShiftList,
  deleteShift,
  updateState,
} from "@/api/humanResources/shift";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      statusList: [
        { code: 0, label: "开" },
        { code: 1, label: "关" },
      ],
      tableData: [],
      searchForm: {},
      recordForm: {}, //暂存数据
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑排班管理" || from.name === "排班管理详情") {
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
  created() {
    if (recordObj) {
      this.currentPage = recordObj.pageNumber;
      this.pageSize = recordObj.pageSize;
      delete recordObj.pageNumber;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  methods: {
    async handleList(...arg) {
      let params = { pageNumber: this.currentPage, pageSize: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      const res = await getShiftList(params);
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
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        ids = this.multipleSelection.map((ele) => ele.id);
      }
      if (ids.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await deleteShift(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 启用状态
    async handleSwitchChange(value, row) {
      if (value === 0) {
        row.isEnabled = 1;
      } else {
        row.isEnabled = 0;
      }
      let res = await updateState({ mesClassId: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this._init();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toEdit(row) {
      this.$router.push({
        path: "/human-resources/shift/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/human-resources/shift/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select,
.el-date-editor {
  width: 240px;
}
</style>
