// 报工管理
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
      <el-form label-position="right" label-width="80px">
        <el-form-item label="工单号">
          <el-input
            size="small"
            v-model="searchForm.orderSn"
            placeholder="请输入工单号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="排程号">
          <el-input
            size="small"
            v-model="searchForm.planSn"
            placeholder="请输入排程号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="工序">
          <el-input
            size="small"
            v-model="searchForm.process"
            placeholder="请输入工序"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="工位">
          <el-input
            size="small"
            v-model="searchForm.stationName"
            placeholder="请输入工位"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="报工日期">
          <el-date-picker
            size="small"
            v-model="searchTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            size="small"
            v-model="productionTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="工序">
          <el-select
            size="small"
            v-model="searchForm.processId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in process"
              :key="item.id"
              :label="item.procName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工位">
          <el-select
            size="small"
            v-model="searchForm.stationId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in workShop"
              :key="item.id"
              :label="item.factoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="报工数量">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="searchForm.minNum"
            ></el-input>
            <div style="text-algin: center; padding: 0 10px">-</div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.maxNum"
            ></el-input>
          </div>
        </el-form-item>
        <!-- <el-form-item label="产品号">
          <el-input
            size="small"
            v-model="searchForm.productSn"
            placeholder="请输入产品编码"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin: 20px 0">
      <el-button
        v-if="permission.reportingManage_expore"
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <!-- <el-button
        v-if="permission.reportingManage_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('MesJobBookingV1.7.3报工单.ureport')"
        >导出</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        :data="roleTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column
          type="index"
          width="50">
          <template slot="header">
            序号
          </template>
        </el-table-column> -->
        <el-table-column prop="orderSn" label="工单号"></el-table-column>
        <el-table-column prop="planSn" label="排程号"></el-table-column>
        <!-- <el-table-column prop="productSn" label="产品号"></el-table-column> -->
        <el-table-column prop="process" label="工序"></el-table-column>
        <el-table-column prop="station" label="工位"></el-table-column>
        <el-table-column prop="planNum" label="完成数量"></el-table-column>
        <el-table-column
          prop="jobBookingNum"
          label="报工数量"
        ></el-table-column>
        <el-table-column prop="planStartTime" label="生产开始时间">
        </el-table-column>
        <el-table-column prop="planEndTime" label="生产结束时间">
        </el-table-column>
        <el-table-column prop="createTime" label="报工时间"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 0 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注信息"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.reportingManage_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
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
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
import {
  getReporting,
  queryWorkshop,
  getListByName,
} from "@/api/product/reporting-manage";
import { delRole } from "@/api/base-data/role";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      searchTime: "",
      productionTime: "",
      pdfIdApi: "/mes/jobBooking/getJobBookingBillsReportPDF",
      searchForm: {},
      roleTableData: [],
      workShop: [], // 工位下拉数据
      process: [], // 工序下啦数据
      multipleSelection: [],
      searchDialogVisible: false, //查询弹框
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async mounted() {
    await this.initResource();
    await this.handleList();
  },
  methods: {
    async initResource() {
      const queryWorkshopRes = await queryWorkshop();
      this.workShop = queryWorkshopRes.data.data;
      const getListByNameRes = await getListByName();
      this.process = getListByNameRes.data.data;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      ids = this.multipleSelection.map((ele) => ele.id);
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // debugger;
        //  页面跳转
        ids = ids.join(",");
        var win = window.open(
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 查询工位
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
        console.log(params);
      }
      const res = await getReporting(params);
      this.roleTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    search() {
      if (this.searchTime) {
        this.searchForm.createTimeMin = this.searchTime[0];
        this.searchForm.createTimeMax = this.searchTime[1];
      }
      if (this.productionTime) {
        this.searchForm.productionTimeMin = this.productionTime[0];
        this.searchForm.productionTimeMax = this.productionTime[1];
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchTime = "";
      this.productionTime = "";
      this.searchForm = {};
      this.handleList();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  .right-button {
    display: flex;
    align-items: flex-end;
    margin-bottom: 50px;
  }
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 80px !important;
  }
}
</style>
