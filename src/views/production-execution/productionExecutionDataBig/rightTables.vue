<template>
  <div>
    <el-form
      v-if="showPage"
      ref="searchForm"
      :model="searchForm"
      :label-position="labelPosition"
      label-width="100px"
      class="form-footer"
    >
      <el-row class="searchRow">
        <el-col :span="7" v-if="showTableColumn == 3">
          <!-- <el-form-item label="班组:">
            <el-select
              size="mini"
              clearable
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
          </el-form-item> -->
          <el-form-item label="浇注工单号:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入浇注工单号"
              v-model="searchForm.pouringSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="showTableColumn == 8">
          <el-form-item label="规格:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入规格"
              v-model="searchForm.modelOne"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="showTableColumn == 8">
          <el-form-item label="操作员:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入操作员"
              v-model="searchForm.userName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="showTableColumn == 4">
          <el-form-item label="入釜工单号:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入"
              v-model="searchForm.irigamaSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="showTableColumn == 5">
          <el-form-item label="出釜工单号:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入"
              v-model="searchForm.outletSn"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="showTableColumn != 8">
          <el-form-item label="项目名称:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入项目名称"
              v-model="searchForm.projectName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="showTableColumn != 8">
          <el-form-item label="产品编码:">
            <el-input
              size="mini"
              clearable
              placeholder="请输入产品编码"
              v-model="searchForm.materialSn"
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
      <el-table-column label="序号" v-if="!showPage" type="index">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 1"
        width="140"
        prop="planSn"
        label="计划号"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="scheduleSn"
        width="140"
        v-if="showTableColumn == 2"
        label="排程号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="pouringSn"
        width="140"
        v-if="showTableColumn == 3"
        label="浇注工单号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 4"
        prop="irigamaSn"
        width="140"
        label="入釜工单号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 5"
        prop="outletSn"
        width="140"
        label="出釜工单号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 6"
        prop="cuttingSn"
        width="140"
        label="切割工单号"
      ></el-table-column>
      <el-table-column width="120" show-overflow-tooltip label="规格">
        <template slot-scope="scope">
          <span style="color: #2ca2ac">{{
            type == 8 ? scope.row.modelOne : scope.row.model
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="
          showTableColumn == 1 ||
          showTableColumn == 2 ||
          showTableColumn == 3 ||
          showTableColumn == 4 ||
          showTableColumn == 5 ||
          showTableColumn == 6
        "
        prop="materialSn"
        width="140"
        label="产品编码"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="产品名称">
        <template slot-scope="scope">
          <span>{{ type == 8 ? "钢丝" : scope.row.materialName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="type == 1"
        prop="sum"
        label="方数"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="projectName"
        v-if="
          showTableColumn == 1 ||
          showTableColumn == 2 ||
          showTableColumn == 3 ||
          showTableColumn == 4 ||
          showTableColumn == 5 ||
          showTableColumn == 6 ||
          showTableColumn == 7
        "
        label="项目名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="organName"
        v-if="
          showTableColumn == 1 ||
          showTableColumn == 2 ||
          showTableColumn == 3 ||
          showTableColumn == 4 ||
          showTableColumn == 5 ||
          showTableColumn == 6 ||
          showTableColumn == 7
        "
        label="客户名称"
      ></el-table-column>
      <el-table-column show-overflow-tooltip v-if="type == 8" label="时间">
        <template slot-scope="scope">
          <span style="color: #407ec0">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="type == 8"
        prop="userName"
        label="操作员"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 1"
        prop="sum"
        label="数量(方)"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 1"
        prop="wordCount"
        label="块数"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="
          showTableColumn == 1 ||
          showTableColumn == 2 ||
          showTableColumn == 3 ||
          showTableColumn == 4 ||
          showTableColumn == 5
        "
        width="160"
        prop="productionLine"
        label="生产产线"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="type == 4 || type == 5"
        prop="still"
        label="釜号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="type == 6"
        prop="fambe"
        label="窑号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="
          type == 1 ||
          type == 2 ||
          type == 3 ||
          type == 4 ||
          type == 5 ||
          type == 6
        "
        label="模数"
        prop="modulus"
      >
        <template slot-scope="scope">
          <span style="color: #407ec0">{{ scope.row.modulus }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="showTableColumn == 7"
        label="合格数"
      >
        <template slot-scope="scope">
          <span style="color: #407ec0">{{ scope.row.qualifiedSum }}</span>
        </template></el-table-column
      >
      <el-table-column
        show-overflow-tooltip
        prop="artisanTime"
        v-if="showTableColumn == 7"
        label="报工时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="job"
        v-if="showTableColumn == 7"
        label="班组"
      ></el-table-column>
    </el-table>
    <el-row v-if="showPage" class="pagination-wrapper">
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
import moment from "moment";
import paginationMixin from "@/mixins/pagination";
import { getShiftList } from "@/api/humanResources/shift";
import { getProductionPlanByPage } from "@/api/manufacture/producePlan"; //生产计划
import { getScheduleWorkOrderByPage } from "@/api/manufacture/scheduleSingle"; //生产排程
import { getMeshWorkOrderByPage } from "@/api/manufacture/meshWorkOrder.js"; //网片库存
import { getIrigamaWorkOrderByPage } from "@/api/manufacture/IntoKettleWorkOrder"; //蒸养釜内状态
import { getSteelWireByPageBI } from "@/api/manufacture/productionExecutionDataBig"; //
import { getOutletWorkOrderByPage } from "@/api/manufacture/outKettleWorkOrder"; //出釜待检状态
import { getCuttingWorkOrderByPageBI } from "@/api/manufacture/productionExecutionDataBig";
import { getPouringWorkOrderByPageBI } from "@/api/manufacture/cuttingWorkOrder"; //浇注未切割
export default {
  mixins: [paginationMixin],
  props: ["showSearch1", "type", "showPage", "showTableColumn"],
  data() {
    return {
      sumAll: null,
      searchForm: {
        artisanTime: moment().format("YYYY-MM-DD"),
      },
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
    this.timer = setInterval(() => {
      setTimeout(() => {
        this.handleList(this.searchForm);
      }, 0);
    }, 30000);
    this.handleList(this.searchForm);
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
      console.log('参数',...arg);
      let workOrderApi = "";
      let createTime = "";
      let artisanStatus = 1;
      let outletArtisanStatus = "";
      let cuttingStatus = "";
      let irigamaStatus = "";
      let qualityStatus = "";
      let status = "";
      let allSum = 0;
      //今天的时间
      let day2 = new Date();
      day2.setTime(day2.getTime());
      let mou2 = day2.getMonth() + 1;
      if (mou2 < 10) mou2 = "0" + mou2;
      let day = day2.getDate();
      if (day < 10) day = "0" + day;
      let s2 = day2.getFullYear() + "-" + mou2 + "-" + day;
      if (this.type == 1) {
        workOrderApi = getProductionPlanByPage;
        status = 5;
        artisanStatus = "";
      } else if (this.type == 2) {
        status = 5;
        artisanStatus = "";
        this.searchForm.artisanTime =''
        workOrderApi = getScheduleWorkOrderByPage;
      } else if (this.type == 3) {
        workOrderApi = getPouringWorkOrderByPageBI;
        artisanStatus = 1;
        cuttingStatus = 0;
      } else if (this.type == 4) {
        workOrderApi = getIrigamaWorkOrderByPage;
        artisanStatus = 1;
        outletArtisanStatus = 0;
      } else if (this.type == 5) {
        workOrderApi = getOutletWorkOrderByPage;
        artisanStatus = "";
        qualityStatus = 0;
        outletArtisanStatus = 1;
      } else if (this.type == 6) {
        workOrderApi = getCuttingWorkOrderByPageBI;
        artisanStatus = 1;
        irigamaStatus = 0;
      } else if (this.type == 7) {
        workOrderApi = getMeshWorkOrderByPage;
      } else if (this.type == 8) {
        workOrderApi = getSteelWireByPageBI;
        artisanStatus = "";
        createTime = s2;
      }
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        artisanStatus,
        outletArtisanStatus,
        createTime,
        cuttingStatus,
        irigamaStatus,
        qualityStatus,
        status,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await workOrderApi(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      if (this.type == 3) {
        var s3 = 0;
        params.current = 1;
        params.size = this.total;
        const res3 = await getPouringWorkOrderByPageBI(params);
        res3.data.data.records.forEach((value) => {
          for (var key in value) {
            if (key == "pouringSn" && artisanStatus == 1) {
              s3 += value.modulus;
            }
          }
        });
        this.$emit("childData", s3);
      } else if (this.type == 4) {
        var s4 = 0;
        params.current = 1;
        params.size = this.total;
        const res4 = await getIrigamaWorkOrderByPage(params);
        res4.data.data.records.forEach((value) => {
          for (var key in value) {
            if (key == "irigamaSn" && value.outletArtisanStatus == 0) {
              s4 += value.modulus;
            }
          }
        });
        this.$emit("childData", s4);
      } else if (this.type == 5) {
        var s5 = 0;
        params.current = 1;
        params.size = this.total;
        const res5 = await getOutletWorkOrderByPage(params);
        res5.data.data.records.forEach((value) => {
          for (var key in value) {
            if (key == "outletSn" && value.outletArtisanStatus == 1) {
              s5 += value.modulus;
            }
          }
        });
        this.$emit("childData", s5);
      } else if (this.type == 6) {
        var s6 = 0;
        params.current = 1;
        params.size = this.total;
        const res6 = await getCuttingWorkOrderByPageBI(params);
        res6.data.data.records.forEach((value) => {
          for (var key in value) {
            if (key == "cuttingSn" && value.artisanStatus == 1) {
              s6 += value.modulus;
            }
          }
        });
        this.$emit("childData", s6);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>