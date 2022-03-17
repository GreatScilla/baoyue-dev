// 操作日志
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
        <el-form-item label="编号">
          <el-input v-model="searchForm.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作者">
          <el-input v-model="searchForm.createBy" clearable></el-input>
        </el-form-item>
        <el-form-item label="服务id">
          <el-input v-model="searchForm.serviceId" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="searchForm.remoteIp" clearable></el-input>
        </el-form-item>
        <el-form-item label="软件环境">
          <el-input v-model="searchForm.env" clearable></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-input v-model="searchForm.method" clearable></el-input>
        </el-form-item>
        <el-form-item label="请求接口">
          <el-input v-model="searchForm.requestUri" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作记录">
          <el-input v-model="searchForm.params" clearable></el-input>
        </el-form-item>
        <el-form-item label="记录日期">
          <el-date-picker
            v-model="billDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00','23:59:59']"
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
        v-if="permission.log_operation_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.log_operation_export"
        size="small"
        icon="el-icon-download"
        @click="exports(exportApi, searchForm)"
        plain
        >导出</el-button
      >
    </el-row>
    <el-row>
      <el-form style="float: right" label-width="100px">
        <el-form-item label="清除日志：">
          <el-select v-model="time" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-button
            style="margin-left: 10px"
            @click="clearLog(time)"
            size="small"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" width="180" label="编号"></el-table-column>
        <el-table-column prop="createBy" label="操作者"></el-table-column>
        <el-table-column width="130" prop="serviceId" label="服务id">
        </el-table-column>
        <el-table-column width="120" prop="remoteIp" label="地址">
        </el-table-column>
        <el-table-column prop="env" label="软件环境"> </el-table-column>
        <el-table-column prop="method" label="请求方法"></el-table-column>
        <el-table-column prop="requestUri" label="请求接口"></el-table-column>
        <el-table-column prop="params" label="操作记录"></el-table-column>
        <el-table-column
          width="150"
          prop="createTime"
          label="操作时间"
        ></el-table-column>
        <el-table-column width="80" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.log_operation_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="getDetail(scope.row)"
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
    <!-- 详情弹窗 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      title="详情"
      append-to-body
      width="640px"
    >
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 编号： </el-col>
        <el-col :span="18">
          {{ infoForm.id }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 操作者： </el-col>
        <el-col :span="18">
          {{ infoForm.createBy }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 日志标题： </el-col>
        <el-col :span="18">
          {{ infoForm.title }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 服务id： </el-col>
        <el-col :span="18">
          {{ infoForm.serviceId }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 服务器名： </el-col>
        <el-col :span="18">
          {{ infoForm.serverHost }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 地址： </el-col>
        <el-col :span="18">
          {{ infoForm.remoteIp }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 请求方法： </el-col>
        <el-col :span="18">
          {{ infoForm.method }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 请求接口： </el-col>
        <el-col :span="18">
          {{ infoForm.requestUri }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 操作记录： </el-col>
        <el-col :span="18">
          {{ infoForm.params }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 方法类： </el-col>
        <el-col :span="18">
          {{ infoForm.methodClass }}
        </el-col>
      </el-row>
      <el-row class="row_p">
        <el-col class="col_title" :span="6"> 用户代理： </el-col>
        <el-col :span="18">
          {{ infoForm.userAgent }}
        </el-col>
      </el-row>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getOperationList,
  getTimeList,
  deleteOperationLogs,
  getOperationDetail,
  getLogExport,
} from "@/api/logs";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],

  data() {
    return {
      searchForm: {},
      tableData: [],
      billDate: [],
      searchDialogVisible: false,
      dialogFormVisible: false, //详情弹窗
      multipleSelection: [],
      options: [],
      time: "",
      infoForm: {},
      exportApi: getLogExport,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    this.handleList();
    let list = await getTimeList();
    this.options = list.data.data;
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList(arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg) {
        params = { ...params, ...arg };
      }
      const res = await getOperationList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      if (this.billDate) {
        this.searchForm.startTime = this.billDate[0];
        this.searchForm.endTime = this.billDate[1];
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.billDate = [];
      this.handleList();
      this.searchDialogVisible = false;
    },
    //清除日志
    clearLog(info) {
      this.$confirm("此操作将清除日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOperationLogs({ time: info }).then((res) => {
            if (res.data.code === 200) {
              this.handleList(this.searchForm);
              this.$message.success("清除成功!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //获取详情
    async getDetail(info) {
      let res = await getOperationDetail({ id: info.id });
      if (res.data.code === 200) {
        this.infoForm = res.data.data;
        this.dialogFormVisible = true;
      }
    },
  },
  filters: {},
};
</script>

<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
.row_p {
  margin-bottom: 10px;
}
.col_title {
  text-align: right;
}
</style>
