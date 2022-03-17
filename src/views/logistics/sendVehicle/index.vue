// 托盘管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.sendVehicle_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="to('add', null, 'pallet')"
        v-if="permission.sendVehicle_add"
        >新 增</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="default"
        @click="muiltiDelete"
        v-if="permission.sendVehicle_delete"
        >批量删除</el-button
      >
    </el-row>
    <el-divider></el-divider>
    <!-- <div @click="ddd">1111</div> -->
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="sendCarData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="receiptSn" label="单据编号"></el-table-column>
        <el-table-column prop="sendTime" label="派车时间">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.sendCarDrivers[0] &&
                scope.row.sendCarDrivers[0].sendTime
              }}
              {{ scope.row.sendCarDrivers.length > 1 ? "，..." : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="departureTime" label="发车时间">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.sendCarDrivers[0] &&
                scope.row.sendCarDrivers[0].departureTime
              }}
              {{ scope.row.sendCarDrivers.length > 1 ? "，..." : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="carType" label="派车类型"> </el-table-column>
        <el-table-column prop="unit" label="车辆司机">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.sendCarDrivers[0] &&
                scope.row.sendCarDrivers[0].driver
              }}
              {{ scope.row.sendCarDrivers.length > 1 ? "，..." : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="车牌号">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.sendCarDrivers[0] &&
                scope.row.sendCarDrivers[0].licenseNumber
              }}
              {{ scope.row.sendCarDrivers.length > 1 ? "，..." : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="theSourceNumber" label="源单号">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
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
                @click="to('edit', scope.row, 'pallet')"
                v-if="permission.sendVehicle_edit"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="
                permission.sendVehicle_edit && permission.sendVehicle_details
              "
            ></el-divider>
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
                @click="to('detail', scope.row, 'pallet')"
                v-if="permission.sendVehicle_details"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="
                permission.sendVehicle_details && permission.sendVehicle_delete
              "
            ></el-divider>
            <el-tooltip
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
                v-if="permission.sendVehicle_delete"
              >
              </el-button>
            </el-tooltip>
            <!-- <el-button type="text" size="small" @click="handleDelpallet(scope.row)">
              报废
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
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
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.receiptSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户">
          <el-input
            placeholder="请输入客户"
            v-model="searchForm.client"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input
            placeholder="请输入客户ID"
            v-model="searchForm.clientId"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            placeholder="请输入项目名称"
            v-model="searchForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input
            placeholder="请输入项目编号"
            v-model="searchForm.projectSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="发车时间">
          <el-date-picker
            v-model="sendCarDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="派车类型">
          <el-select v-model="searchForm.carType" placeholder="请选择">
            <el-option
              v-for="item in carTypes"
              :key="item.name"
              :label="item.carType"
              :value="item.carType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆司机">
          <el-input
            placeholder="请输入车辆司机"
            v-model="searchForm.driver"
          ></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input
            placeholder="请输入车牌号"
            v-model="searchForm.licenseNumber"
          ></el-input>
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
import {
  getCarByPage,
  deleteSendCarBatch,
  dlg,
  getCarType,
} from "@/api/logistics/sendVehicle/sendVehicle.js";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      sendCarDate: [],
      searchDialogVisible: false,
      sendCarData: [],
      searchForm: {},
      recordForm: {}, //暂存数据
      selectedRows: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "派车管理编辑" || from.name === "派车管理详情") {
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
  async created() {
    const res = await getCarType();
    this.carTypes = res.data.data;

    if (recordObj) {
      this.currentPage = recordObj.params.pageNum;
      this.pageSize = recordObj.params.pageSize;
      delete recordObj.params.pageNum;
      this.searchForm = recordObj.data;
    }
    this.handleList();
  },
  methods: {
    ddd() {
      var params = {
        current: 1,
        size: 5,
      };
      dlg(params).then((res) => {
        // 处理返回的文件流
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=UTF-8",
        });
        const fileName =
          res.headers["content-disposition"].match(/filename=(\S*).xls/)[1];
        let formatString = decodeURIComponent(unescape(fileName));
        const elink = document.createElement("a");
        elink.download = formatString;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    // 获取列表
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
      let data = this.searchForm;
      this.recordForm = { params, data };
      let res = await getCarByPage(params, data);
      this.sendCarData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 查询
    onSearch() {
      if (this.sendCarDate) {
        this.searchForm.startDay = this.sendCarDate[0];
        this.searchForm.endDay = this.sendCarDate[1];
      } else {
        this.searchForm.startDay = "";
        this.searchForm.endDay = "";
      }
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.sendCarDate = [];
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确定要删除该派车信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((e) => {
          deleteSendCarBatch({
            ids: row.id,
          })
            .then((res) => {
              this.$message.success("删除成功！");
              this.handleList();
            })
            .catch((e) => {
              this.$message.success(e);
            });
        })
        .catch((e) => {});
    },
    handleSelectionChange(e) {
      this.selectedRows = e;
    },
    muiltiDelete() {
      this.$confirm("确定要删除选中的派车信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((e) => {
          deleteSendCarBatch({
            ids: this.selectedRows.map((x) => x.id).join(","),
          })
            .then((res) => {
              this.$message.success("删除成功！");
              this.selectedRows = [];
              this.handleList();
            })
            .catch((e) => {
              this.$message.success(e);
            });
        })
        .catch((e) => {});
    },
    // 跳转
    to(operationState, row) {
      this.$router.push({
        path: "/logistics/sendVehicle/" + operationState,
        query: {
          operationState,
          row,
        },
      });
    },
  },
  filters: {
    status: function (value) {
      if (value === 0) {
        return "闲置";
      } else if (value === 1) {
        return "使用中";
      } else {
        return "报废";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
</style>
