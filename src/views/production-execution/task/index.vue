//生产任务
<template>
  <div class="container">
    <div class="title">
      <div>
        <div class="item">
          <i class="icon-mes-211dingdan-shi"></i>
          <span class="font">生产任务</span>
        </div>
      </div>
      <div class="back" @click="routerBack()">
        <i class="icon-mes-fanhui"></i>
        <span class="font">返回</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content">
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
                v-model="scheduleForm.jobSn"
                placeholder="请输入工单编号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="班组号">
              <el-input
                size="small"
                v-model="scheduleForm.job"
                placeholder="请输入班组号"
              >
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="时间">
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
            </el-form-item> -->
            <el-form-item class="search-footer">
              <el-button @click="reset" size="small">重置</el-button>
              <el-button type="primary" size="small" @click="searchSchedule"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-row style="margin-bottom: 10px">
          <el-button
            size="small"
            @click="searchDialogVisible = true"
            icon="el-icon-search"
            type="primary"
          >
            查询
          </el-button>
        </el-row>
        <el-table
          @row-click="singleElection"
          :data="scheduleTableData"
          style="width: 100%"
        >
          <el-table-column label="" width="65">
            <template slot-scope="scope">
              <el-radio
                class="radio"
                v-model="templateSelection"
                :label="scope.row"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" />
          <el-table-column prop="jobSn" label="工单编号"> </el-table-column>
          <el-table-column prop="job" label="班组号"> </el-table-column>
          <el-table-column prop="materialSn" label="产品编码">
          </el-table-column>
          <el-table-column prop="materialName" label="产品名称">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称">
          </el-table-column>
          <el-table-column prop="organName" label="客户名称"> </el-table-column>
          <el-table-column prop="model" label="规格型号"> </el-table-column>
          <el-table-column prop="sum" label="计划数量"> </el-table-column>
          <el-table-column prop="startTime" width="150" label="计划开始时间">
          </el-table-column>
          <el-table-column prop="endTime" width="150" label="计划结束时间">
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
        <div class="footer">
          <el-button size="small" type="primary" @click="confim"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getScheduleState } from "@/api/planning/schedule";
import { getCutMendWorkOrderByPage } from "@/api/manufacture/cutMendWorkOrder";
import { getMeshWorkOrderByPage } from "@/api/manufacture/meshWorkOrder";
import { getJobWorkOrderByPage } from "@/api/manufacture/teamWorkOrder";
import { getUserInfo } from "@/api/system/user";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      scheduleForm: {
        type: 0,
      },
      scheduleStateOptions: [],
      scheduleTableData: [],
      ids: [],
      searchDialogVisible: false,
      searchDate: "", //搜索日期
      templateSelection: "",
      // 返回数据
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    let id = await getUserInfo();
    // this.scheduleForm.userId = id.data.data.id;
    if (id.data.code === 200) {
      if (this.$route.query.workType == "home") {
        this.scheduleForm.type = 0;
      } else if (this.$route.query.workType == "cuttingWork") {
        this.scheduleForm.type = 1;
      } else if (this.$route.query.workType == "irigamaWork") {
        this.scheduleForm.type = 2;
      } else if (this.$route.query.workType == "outKettleWork") {
        this.scheduleForm.type = 4;
      } else if (this.$route.query.workType == "qualityControlWork") {
        this.scheduleForm.type = 3;
      } else if (this.$route.query.workType == "cutMendWork") {
        this.scheduleForm.type = "";
        this.scheduleForm.artisanStatus = 0;
      } else if (this.$route.query.workType == "meshWork") {
        this.scheduleForm.type = "";
        this.scheduleForm.artisanStatus = 0;
      }
      this.handleList(this.scheduleForm);
    }

    // this.initScheduleState();
  },
  mounted() {},
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
    // 查询排成状态
    // initScheduleState() {
    //   getScheduleState()
    //     .then((res) => {
    //       this.scheduleStateOptions = res.data.data;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    // 查询角色
    async handleList(...arg) {
      let getJobWorkOrderApi = "";
      if (this.$route.query.workType == "cutMendWork") {
        getJobWorkOrderApi = getCutMendWorkOrderByPage;
      } else if (this.$route.query.workType == "meshWork") {
        getJobWorkOrderApi = getMeshWorkOrderByPage;
      } else {
        getJobWorkOrderApi = getJobWorkOrderByPage;
      }
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        type: this.scheduleForm.type,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      // const res = await getJobWorkOrderByPage(params);
      const res = await getJobWorkOrderApi(params);
      this.scheduleTableData = res.data.data.records;
      this.total = res.data.data.total;
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

      this.handleList(this.scheduleForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      // for (let key in this.scheduleForm) {
      //   if (key === "status") {
      //     this.scheduleForm[key] = "0";
      //   } else {
      //     this.scheduleForm[key] = "";
      //   }
      // }
      this.scheduleForm.jobSn = "";
      this.scheduleForm.job = "";
      this.handleList(this.scheduleForm);
    },
    // 表格单选
    singleElection(row) {
      this.templateSelection = row;
    },
    //返回
    routerBack() {
      this.$router.replace({
        path: `/production-execution/${this.$route.query.workType}`,
        query: {
          data: this.templateSelection,
        },
      });
    },
    //确定
    confim() {
      console.log(this.$route.query.workType);
      if (!this.templateSelection) {
        return this.$message.error("请选择数据");
      }
      this.$router.replace({
        path: `/production-execution/${this.$route.query.workType}`,
        query: {
          data: this.templateSelection,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";

.container {
  min-height: 100%;
  .content-wrapper {
    padding: 20px;
    background: #f7f8fa;
    .content {
      padding: 30px;
      background-color: #fff;
      .header {
        margin-bottom: 30px;
      }
    }
  }
}
.footer {
  margin: 20px 0;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
