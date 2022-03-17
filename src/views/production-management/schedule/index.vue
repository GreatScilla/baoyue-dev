// 排程管理
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
      <el-form ref="form" label-width="90px" class="form-footer">
        <el-form-item label="工单编号">
          <el-input
            size="small"
            v-model="scheduleForm.productionOrdersEncode"
            placeholder="请输入工单编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="排程号">
          <el-input
            size="small"
            v-model="scheduleForm.schedulesOrdersEncode"
            placeholder="请输入排程号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="排程数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="scheduleForm.minNum"
            ></el-input>
            <div style="text-algin: center; padding: 0 10px">-</div>
            <el-input
              placeholder="请输入"
              v-model="scheduleForm.maxNum"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="车间">
          <el-input
            size="small"
            v-model="scheduleForm.workShopName"
            placeholder="请输入车间"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="产线">
          <el-input
            size="small"
            v-model="scheduleForm.assemblyLineName"
            placeholder="请输入产线"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="工位">
          <el-input
            size="small"
            v-model="scheduleForm.factoryName"
            placeholder="请输入工位"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="产品">
          <el-input
            size="small"
            v-model="scheduleForm.matNoAndMatName"
            placeholder="请输入编码或名称"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="时间">
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
        <el-form-item label="排成状态">
          <el-select
            size="small"
            v-model="scheduleForm.schedulesStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in scheduleStateOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否指派">
          <el-select
            size="small"
            v-model="scheduleForm.isDesignate"
            placeholder="请选择"
          >
            <el-option
              v-for="item in isDesignateOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制状态">
          <el-select
            size="small"
            v-model="scheduleForm.controlStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in controlStatusOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchSchedule"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-top: 10px">
      <el-button
        v-if="permission.schedule_expore"
        size="small"
        @click="searchDialogVisible = true"
        icon="el-icon-search"
        type="primary"
      >
        查询
      </el-button>
      <el-button
        v-if="permission.schedule_designate"
        size="small"
        plain
        icon="el-icon-document-checked"
        @click="release()"
      >
        批量下达
      </el-button>
      <el-button
        v-if="permission.schedule_delete"
        size="small"
        icon="el-icon-delete"
        plain
        @click="handleDelSchedule()"
      >
        批量删除
      </el-button>
    </el-row>
    <el-table
      @selection-change="handleSelectionChange"
      :data="scheduleTableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="productionOrdersEncode" label="工单号">
      </el-table-column>
      <el-table-column prop="schedulesOrdersEncode" label="排程号">
      </el-table-column>
      <el-table-column prop="schedulesNumber" label="排程数量">
      </el-table-column>
      <!-- <el-table-column prop="productEncode" label="产品编码"> </el-table-column>
      <el-table-column prop="productName" label="产品名称"> </el-table-column> -->
      <el-table-column prop="workShopName" label="车间"></el-table-column>
      <el-table-column prop="productionOrdersWorkShopId" label="产线">
      </el-table-column>
      <el-table-column prop="factoryName" label="工位"> </el-table-column>
      <el-table-column prop="planStartTime" width="150" label="计划开始时间">
      </el-table-column>
      <el-table-column prop="planEndTime" width="150" label="计划结束时间">
      </el-table-column>
      <el-table-column width="80" label="是否指派">
        <template slot-scope="scope">
          {{ scope.row.isDesignate | assignName }}
        </template>
      </el-table-column>
      <el-table-column width="80" label="排程状态">
        <template slot-scope="scope">
          {{ scope.row.schedulesStatus | schedulesName }}
        </template>
      </el-table-column>
      <el-table-column width="80" label="控制状态">
        <template slot-scope="scope">
          {{ scope.row.controlStatus | controlName }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <span
            v-if="scope.row.isDesignate === '0' || permission.schedule_assign"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="指派"
              placement="bottom"
            >
              <el-button
                :disabled="!(scope.row.schedulesStatus === '0')"
                size="small"
                icon="el-icon-thumb"
                type="text"
                @click="toAssign(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>
          <span
            v-if="
              scope.row.isDesignate === '1' || permission.schedule_designate
            "
          >
            <el-tooltip
              class="item"
              effect="dark"
              content=" 下达"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-document-checked"
                @click="release(scope.row)"
                :disabled="!(scope.row.schedulesStatus == '4')"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>

          <span v-if="permission.schedule_edit">
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
                :disabled="!(scope.row.schedulesStatus === '0')"
                @click="operation(scope.row, 'edit')"
              ></el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>
          <router-link
            v-if="permission.schedule_detail"
            :to="{
              path: '/production-management/schedule/detail',
              query: { data: scope.row },
            }"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button type="text" size="small" icon="el-icon-tickets">
              </el-button>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
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
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getSchedulePage,
  getScheduleState,
  delSchedule,
  issued,
} from "@/api/planning/schedule";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      isDesignateOptions: [
        { code: 0, name: "否" },
        { code: 1, name: "是" },
      ],
      controlStatusOptions: [
        { code: 0, name: "正常" },
        { code: 1, name: "暂停" },
        { code: 2, name: "冻结" }
      ],
      scheduleForm: {
        matNoAndMatName: "",
        planEndTime: "",
        planStartTime: "",
        schedulesStatus: "",
        productionOrdersEncode: "",
        schedulesOrdersEncode: "",
      },
      recordForm: {}, //暂存数据
      scheduleStateOptions: [],
      scheduleTableData: [],
      ids: [],
      multipleSelection: [],
      searchDialogVisible: false,
      searchDate: "", //搜索日期
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.name === "排程指派" ||
      from.name === "编辑排程" ||
      from.name === "排程详情"
    ) {
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
      this.scheduleForm = recordObj;
    }
    this.handleList(this.scheduleForm);
    this.initScheduleState();
  },
  filters: {
    assignName(val) {
      if (val === "0") {
        return "否";
      } else if (val === "1") {
        return "是";
      }
    },
    schedulesName(val) {
      switch (val) {
        case "0":
          return "新建";
        case "1":
          return "下达";
        case "2":
          return "生产中";
        case "3":
          return "已完成";
        case "4":
          return "已指派";
      }
    },
    controlName(val) {
      switch (val) {
        case "0":
          return "正常";
        case "1":
          return "暂停";
        case "2":
          return "冻结";
      }
    },
  },
  methods: {
    //跳转指派
    toAssign(data) {
      this.$router.push({
        path: "/production-management/schedule/assign",
        query: { data: data },
      });
    },
    //
    operation(data, type) {
      this.$router.push({
        path: "/production-management/schedule/" + type,
        query: { data: data },
      });
    },
    // 查询排成状态
    initScheduleState() {
      getScheduleState()
        .then((res) => {
          this.scheduleStateOptions = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 分页查询计划排程
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      getSchedulePage(params)
        .then((res) => {
          this.scheduleTableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 搜索
    searchSchedule() {
      if (this.searchDate) {
        this.scheduleForm.planStartTime = this.searchDate[0];
        this.scheduleForm.planEndTime = this.searchDate[1];
      } else {
        this.scheduleForm.planStartTime = "";
        this.scheduleForm.planEndTime = "";
      }
      this.currentPage = 1;
      this.handleList(this.scheduleForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.scheduleForm = {
        schedulesStatus: "0",
      };
      this.handleList(this.scheduleForm);
      this.searchDialogVisible = false;
    },
    // 多行删除
    async handleDelSchedule(row) {
      let ids = [];
      if (row) {
        // 单选
        ids.push(row.id);
      } else {
        // 批量处理
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => ele.schedulesStatus !== "0"
          );
          if (arr.length > 0) {
            this.$message.warning("请选择新建的单据");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该计划排程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await delSchedule({ schedulesIdList: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList(this.scheduleForm);
        }
      } catch (error) {}
    },

    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },

    // 下达
    async release(row) {
      let ids = [];
      if (row) {
        // 单选
        ids.push(row.id);
      } else {
        // 批量处理
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          const arr = this.multipleSelection.filter(
            (ele) => ele.schedulesStatus !== "4"
          );
          if (arr.length > 0) {
            this.$message.warning("请选择已指派的单据");
            return;
          }
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要下达该计划排程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await issued({ schedulesId: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList(this.scheduleForm);
        }
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row:nth-of-type(1),
.el-row:nth-of-type(2) {
  margin-bottom: 20px;
}
.el-row {
  display: flex;
  & > div {
    display: flex;
    align-items: center;
  }
  .timeSearch {
    span {
      margin: 0 10px;
    }
  }
  .operationButton {
    margin-left: 30px;
  }
  .tableName {
    margin-right: 10px;
  }
  .el-input,
  .el-select {
    width: 160px;
    margin-right: 20px;
  }
  .el-date-editor {
    width: 190px;
    margin-right: 0;
  }
}
.el-table {
  margin-top: 20px;
}
</style>
