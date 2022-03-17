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
          <el-form-item label="班组:">
            <el-select
              size="mini"
              v-model="searchForm.job"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamList"
                :key="item.id"
                :label="item.className"
                :value="item.className"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="切割工单号:">
            <el-input
              size="mini"
              placeholder="请输入切割工单号"
              v-model="searchForm.cuttingSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="7">
          <el-form-item label="规格:">
            <el-input
              size="mini"
              placeholder="请输入规格"
              v-model="searchForm.model"
            ></el-input>
          </el-form-item>
        </el-col> -->
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
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        prop="cuttingSn"
        width="160"
        label="切割工单号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="fambe"
        v-if="showSearch"
        label="窑号"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="规格">
        <template slot-scope="scope">
          <span style="color: #2ca2ac">{{ scope.row.model }}</span>
        </template>
      </el-table-column>
            <el-table-column v-if="showSearch" show-overflow-tooltip label="并入规格">
        <template slot-scope="scope">
          <span style="color: #2ca2ac">{{ scope.row.inModel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品名称"
        prop="materialName"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="materialSn"
        width="130"
        v-if="showSearch"
        label="产品编码"
      ></el-table-column>
      <el-table-column label="模数" prop="modulus">
        <template slot-scope="scope">
          <span style="color: #407ec0">{{ scope.row.modulus }}</span>
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
        label="客户名称"
        prop="organName"
      >
      </el-table-column>
      <el-table-column
        width="160"
        show-overflow-tooltip
        v-if="showSearch"
        prop="artisanTime"
        label="报工时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        width="120"
        v-if="showSearch"
        prop="manufacturingShop"
        label="生产车间"
      ></el-table-column>
      <el-table-column
        width="120"
        show-overflow-tooltip
        v-if="showSearch"
        prop="productionLine"
        label="生产产线"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        prop="job"
        width="130"
        label="浇筑班组"
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
import { getCuttingWorkOrderByPageBI } from "@/api/manufacture/productionExecutionDataBig";
import { getShiftList } from "@/api/humanResources/shift";
export default {
  mixins: [paginationMixin],
  props: ["showSearch", "nowTime"],
  data() {
    return {
      sumAll: null,
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
    this.handleList(this.searchForm);
    this.timer = setInterval(() => {
      setTimeout(() => {
        this.handleList(this.searchForm);
      }, 0);
    }, 30000);
    // const table = this.$refs["reader-table"];
    // const divData = table.bodyWrapper;
    // setInterval(() => {
    //   divData.scrollTop += 1;
    //   if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
    //     divData.scrollTop = 0;
    //   }
    // }, 1000);
  },
  methods: {
    changeDay1(nowTime) {
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
      const res = await getCuttingWorkOrderByPageBI(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      const res1 = await getCuttingWorkOrderByPageBI({
        current: 1,
        size: this.total,
        artisanStatus: 1,
        artisanTime: this.searchForm.artisanTime,
      });
      this.sumAll = res1.data.data.records.reduce(
        (totalPrice, item) => totalPrice + Number(item.modulus),
        0
      );
      this.$emit("childData", this.sumAll);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>