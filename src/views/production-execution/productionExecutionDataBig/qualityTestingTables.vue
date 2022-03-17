<template>
  <div>
    <el-form
      v-if="showSearch"
      ref="searchForm"
      :model="searchForm"
      :label-position="labelPosition"
      label-width="100px"
      class="form-footer"
    >
      <el-row class="searchRow">
        <el-col :span="7">
          <el-form-item label="产品编码:">
                      <el-input
              size="mini"
              placeholder="请输入产品编码"
              v-model="searchForm.materialSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="项目名称:">
            <el-input
              size="mini"
              placeholder="请输入项目名称"
              v-model="searchForm.projectName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="规格:">
            <el-input
              size="mini"
              placeholder="请输入规格"
              v-model="searchForm.model"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button class="searchButton" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="reader-table"
      :data="tableData"
      style="width: 100%"
      max-height="365"
      :row-class-name="tableClass"
    >
      <el-table-column label="序号" v-if="!showSearch" type="index">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="名称" prop="materialName">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="规格">
        <template slot-scope="scope">
          <span style="color: #2ca2ac">{{ scope.row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="出釜数" prop="sum">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="合格数" prop="qualifiedSum">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="待切数" prop="repairedSum">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="合格率">
        <template slot-scope="scope">
          <span style="color: #407ec0"
            >{{
              parseInt((scope.row.qualifiedSum / scope.row.sum) * 100)
            }}%</span
          >
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        label="项目名称"
        prop="projectName"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        prop="artisanTime"
        width="130"
        label="浇筑时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        prop="job"
        width="130"
        label="班组"
      ></el-table-column>
    </el-table>
    <el-row v-if="showSearch" class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
import paginationMixin from "@/mixins/pagination";
import { getQualityWorkOrderByPageBI } from "@/api/manufacture/productionExecutionDataBig";
import { getShiftList } from "@/api/humanResources/shift";
import bus from "@/mixins/eventBus";
export default {
  mixins: [paginationMixin],
  props: ["showSearch", "nowTime"],
  data() {
    return {
      sumAll: 0,
      searchForm: {},
      tableData: [],
      teamList: [],
      timer: null,
    };
  },
  computed: {},
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
    ]); //班组
    this.teamList = res[0].data.data.records;
  },
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    if (this.nowTime) {
      this.searchForm.artisanTime = this.nowTime;
      this.handleList(this.searchForm);
      return;
    }
    var day2 = new Date();
    day2.setTime(day2.getTime());
    let mou2 = day2.getMonth() + 1;
    if (mou2 < 10) mou2 = "0" + mou2;
    let Day = day2.getDate();
    if (Day < 10) Day = "0" + Day;
    this.searchForm.artisanTime = day2.getFullYear() + "-" + mou2 + "-" + Day;
    this.timer = setInterval(() => {
      setTimeout(() => {
        this.handleList(this.searchForm);
      }, 0);
    }, 30000);
    this.handleList(this.searchForm);
  },
  methods: {
    changeDay2(nowTime) {
      this.searchForm.artisanTime = nowTime;
      this.handleList(this.searchForm);
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
    },
    tableClass({ rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "even-row";
      } else {
        return "";
      }
    },
    // 查询角色
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        artisanStatus: 1,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getQualityWorkOrderByPageBI(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      const res1 = await getQualityWorkOrderByPageBI({
        current: 1,
        size: this.total,
        artisanStatus: 1,
        artisanTime: this.searchForm.artisanTime,
      });
      var sum = 0;
      var qualifiedSum = 0;
      res1.data.data.records.forEach((ele) => {
        sum += ele.sum;
        qualifiedSum += ele.qualifiedSum;
      });
      // let totalPrice = 0;
      // let pfy = res1.data.data.records.reduce(
      //   (totalPrice, item) =>
      //     totalPrice + parseInt((item.qualifiedSum / item.sum) * 100),
      //   0
      // );
      this.sumAll = ((qualifiedSum / sum) * 100).toFixed(0);
      this.$emit("childData", this.sumAll);
      bus.$emit("sendBybus", this.sumAll);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>