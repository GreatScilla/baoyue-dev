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
          <el-form-item label="浇注工单号:">
            <el-input
              size="mini"
              placeholder="请输入工单号"
              v-model="searchForm.pouringSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="浇注工单号:">
            <el-input
              size="mini"
              placeholder="请输入工单号"
              v-model="searchForm.pouringSn"
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
      @row-click="clickData"
      :row-class-name="tableClass"
    >
      <el-table-column label="序号" v-if="!showSearch" type="index">
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span style="color: #2ca2ac">{{ scope.row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品名称"
        prop="materialName"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip label="时间" prop="modulus">
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
        prop="artisanTime"
        label="浇筑时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showSearch"
        prop="job"
        label="浇筑班组"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="job"
        label="操作员"
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
import { getPouringWorkOrderByPage } from "@/api/manufacture/pouringWorkOrder";
import { getShiftList } from "@/api/humanResources/shift";
import bus from "@/mixins/eventBus";
export default {
  mixins: [paginationMixin],
  props: ["showSearch"],
  data() {
    return {
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
    this.handleList(this.searchForm);
        this.timer = setInterval(() => {
      setTimeout(() => {
        this.handleList(this.searchForm);
        console.log(123);
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
    clickData(row) {
      // console.log(row.num);
      bus.$emit("sendBybus", row.num);
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
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getPouringWorkOrderByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>