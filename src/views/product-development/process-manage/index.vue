// 工序管理
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.processManage_expore"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        size="small"
        type="primary"
        >搜索</el-button
      >
      <el-button
        v-if="permission.processManage_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="$router.push('/product-development/process-manage/add')"
        >新增
      </el-button>
      <el-button
        v-if="permission.processManage_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >删除
      </el-button>
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="工序编号"></el-table-column>
        <el-table-column prop="procName" label="工序名称"></el-table-column>
        <el-table-column prop="processTypeName" label="工序类型">
        </el-table-column>
        <el-table-column prop="descInfo" label="工序描述"></el-table-column>
        <el-table-column label="工序状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createUsername" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.processManage_edit">
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
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.processManage_detail">
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
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <el-tooltip
              v-if="permission.processManage_delete"
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
        :current-page.sync="currentPage"
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="工序编码">
          <el-input v-model="searchForm.procCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-input v-model="searchForm.procName" clearable></el-input>
        </el-form-item>
        <el-form-item label="工序类型">
          <el-select
            size="small"
            v-model="searchForm.procType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in processType"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工序状态">
          <el-select
            size="small"
            v-model="searchForm.enabled"
            placeholder="请选择"
          >
            <el-option
              v-for="item in enabledList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            size="small"
            v-model="searchDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import { findProcessList, deleteProcess } from "@/api/process/process";
import { getDictionary } from "@/api/system/dictbiz";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      // 工序状态
      enabledList: [
        {
          value: "0",
          label: "启用",
        },
        {
          value: "1",
          label: "不启用",
        },
      ],
      searchDialogVisible: false,
      processType: [],
      tableData: [],
      searchForm: {},
      recordForm: {},
      searchDate: [],
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改工序管理" || from.name === "工序管理详情") {
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
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  async mounted() {
    const dictRes = await getDictionary({ code: "mes_proc_type" });
    if (dictRes.data.code === 200) {
      this.processType = dictRes.data.data;
      console.log(this.processType);
    }
  },
  methods: {
    onSearch() {
      if (this.searchDate) {
        this.searchForm.startTime = this.searchDate[0];
        this.searchForm.endTime = this.searchDate[1];
      }
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchDate = [];
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      const res = await findProcessList(params);
      this.tableData = res.data.data.processVOList;
      this.total = res.data.data.total;
      this.tableData.forEach((ele) => {
        const processType = this.processType.find(
          (processTypeItem) => processTypeItem.dictKey === ele.procType
        );
        if (processType) {
          ele.processTypeName = processType.dictValue;
        }
      });
    },
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        ids = this.multipleSelection.map((ele) => ele.id);
      }
      if (ids.length === 0) {
        this.$message.error("请选择要删除的工序");
        return;
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await deleteProcess(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.error("已取消删除");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatStatus(array) {
      array.forEach(
        (ele) => (ele.enabled = ele.enabled === "0" ? true : false)
      );
    },
    toEdit(row) {
      this.$router.push({
        path: "/product-development/process-manage/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/product-development/process-manage/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
