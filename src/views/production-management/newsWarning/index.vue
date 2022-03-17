// 消息预警
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
        :label-position="labelPosition"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="预警类型:">
          <el-select v-model="searchForm.warnTypeId">
            <el-option
              v-for="item of warningList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
              @click.native="searchForm.warnTypeValue = item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-select v-model="searchForm.isEnable">
            <el-option
              v-for="item of isEnableList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        size="small"
        v-if="permission.changeWireForm_add"
        type="primary"
        @click="add"
        icon="el-icon-plus"
        >新增</el-button
      >
      <el-button
        v-if="permission.changeWireForm_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.changeWireForm_delete"
        size="small"
        @click="handleDelete()"
      >
        批量删除
      </el-button>
      <!-- <el-button
        v-if="permission.changeWireForm_export"
        style="margin-left: 10px"
        size="small"
        plain
        @click="exports(exportApi, searchForm)"
      >
        导出
      </el-button> -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column> -->
        <el-table-column
          prop="warnTypeValue"
          label="预警类型"
        ></el-table-column>
        <el-table-column prop="isEnable" label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.isEnable | statusName }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="配置日期"></el-table-column>
        <el-table-column prop="createUserName" label="配置人"></el-table-column>
        <el-table-column width="100" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.changeWireForm_edit"
              :to="{
                path: '/production-management/newsWarning/edit',
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
              v-if="permission.changeWireForm_detail"
              :to="{
                path: '/production-management/newsWarning/detail',
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
            <el-tooltip
              v-if="permission.changeWireForm_delete"
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
  </basic-container>
</template>
<script>
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import {
  getInfoWarnByPage,
  infoWarnRemove,
} from "@/api/manufacture/newsWarning";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
import { getDictionary } from "@/api/system/dictbiz";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      warningList: [],
      isEnableList: [
        { code: 0, name: "启用" },
        { code: 1, name: "停用" },
      ],
      dateValue: [],
      auditApi: "",
      deleteApi: infoWarnRemove,
      exportApi: "",
      ids: [], //id
      teamList: [],
      form: {},
      labelPosition: "right",
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
      getDictionary({ code: "warn_type" }),
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.warningList = res[1].data.data;
    this.handleList(this.searchForm);
  },
  methods: {
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
         ids = ids.join(",");
        const res = await infoWarnRemove(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.error("已取消删除");
      }
    },
    // 选择单据日期
    changeDate(value) {
      this.searchForm.steelWireTimeStart = value[0];
      this.searchForm.steelWireTimeEnd = value[1];
    },
    // 跳转新增
    add() {
      this.$router.push("/production-management/newsWarning/add");
    },
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
      const res = await getInfoWarnByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.dateValue = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "启用";
      } else if (value == 1) {
        value = "停用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
