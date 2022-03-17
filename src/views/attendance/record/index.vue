// 考勤记录
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
        <el-form-item label="姓名">
          <el-input v-model="searchForm.personName"></el-input>
        </el-form-item>
        <el-form-item label="考勤日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考勤状态">
          <el-select v-model="searchForm.signInStatus" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
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
      v-if="permission.record_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      >
      <!-- <el-button
        v-if="permission.laboratory_delete"
        plain
        size="small"
        @click="handleDelRole()"
        >批量删除</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="jobNumber" label="工号"> </el-table-column>
        <el-table-column prop="signInUserName" label="姓名"> </el-table-column>
        <el-table-column prop="createTime" label="考勤日期"> </el-table-column>
        <el-table-column prop="signInTime" label="签到时间">
          <template slot-scope="scope">
            {{ scope.row.signInTime.split(" ")[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="signOutTime" label="签退时间">
          <template slot-scope="scope">
            {{ scope.row.signOutTime.split(" ")[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="signInStatus" label="考勤状态">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              type="success"
              v-if="scope.row.signInStatus === '0'"
              >{{ getStatuName(scope.row.signInStatus) }}</el-link
            >
            <el-link :underline="false" type="danger" v-else>{{
              getStatuName(scope.row.signInStatus)
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <span   v-if="permission.record_calendar">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看考勤日历"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-date"
                  @click="toDate(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span   v-if="permission.record_edit">
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
                  @click="openDialog(scope.row, 'edit')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <el-tooltip
              v-if="permission.record_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="openDialog(scope.row, 'detail')"
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
      :visible.sync="infoDialogVisible"
      :before-close="handleClose"
      title="考勤"
      append-to-body
      width="680px"
    >
      <el-form :model="form" label-width="100px" class="form-footer">
        <el-form-item label="姓名:">
          <span>{{ form.signInUserName }}</span>
        </el-form-item>
        <el-form-item label="工号:">
          <span>{{ form.jobNumber }}</span>
        </el-form-item>
        <el-form-item label="考勤日期:">
          <span>{{ form.createTime }}</span>
        </el-form-item>
        <el-form-item label="签到时间:">
          <el-time-picker
            :disabled="type === 'detail'"
            value-format="HH:mm:ss"
            v-model="form.signInTime"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="签退时间:">
          <el-time-picker
            :disabled="type === 'detail'"
            value-format="HH:mm:ss"
            v-model="form.signOutTime"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="infoDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            size="small"
            @click="submit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getAllList,
  getAttendanceStatusList,
  update,
} from "@/api/attendance/index";
import paginationMixin from "@/mixins/pagination";
import { deepClone } from "@/util/util";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      requesting: false,
      searchForm: {},
      form: {
        // signInTime: "",
        // signOutTime: "",
      },
      createDate: [],
      list: [], //考勤状态
      tableData: [],
      searchDialogVisible: false,
      infoDialogVisible: false,
      type: "", //类型
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    getAttendanceStatusList({}).then((res) => {
      this.list = res.data.data;
    });
    this.handleList();
  },
  methods: {
    //列表数据
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      getAllList(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //重置
    reset() {
      this.createDate = [];
      this.searchForm = {};
      this.handleList();
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      if (this.createDate.length !== 0) {
        this.searchForm.createTimeStart = this.createDate[0];
        this.searchForm.createTimeEnd = this.createDate[1];
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //考勤状态名称
    getStatuName(code) {
      let name = null;
      this.list.forEach((el) => {
        if (el.code === code) {
          name = el.name;
        }
      });
      return name;
    },
    //打开弹窗
    openDialog(info, type) {
      let form = deepClone(info);
      form.signInTime = form.signInTime.split(" ")[1];
      form.signOutTime = form.signOutTime.split(" ")[1];
      this.form = form;
      console.log(this.form);
      this.type = type;
      this.infoDialogVisible = true;
    },
    //修改
    async submit() {
      let form = deepClone(this.form);
      form.signInTime = form.createTime + " " + form.signInTime;
      form.signOutTime = form.createTime + " " + form.signOutTime;
      let res = await update(form);
      if (res.data.code === 200) {
        this.form = {};
        this.handleList();
        this.$message.success("修改成功");
          this.infoDialogVisible = false;
      }
      console.log(this.form);
    },
    //跳转考勤日历
    toDate(info) {
      this.$router.push({
        path: "/attendance/calendar",
        query: { id: info.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 650;
  line-height: 24px;

  color: #303133;
}
.ipt_320 {
  width: 320px;
}
.ipt_160 {
  width: 160px;
}
.ipt_120 {
  width: 120px;
}
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.search-footer {
  margin: 20px 0 0;
}
</style>
