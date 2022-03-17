// 获取车牌号
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="vehicleDialogVisible"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="inboundManageForm" ref="setUpForm">
        <el-form-item label-width="100px" label="车辆号:">
          <el-input size="small" v-model="form.licenseNumber" placeholder="请输入车辆号"></el-input>
        </el-form-item>
          <el-form-item label-width="100px" label="车型:">
          <el-input size="small" v-model="form.carType" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px;margin-top:-1px">
          <el-button size="small" type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table highlight-current-row :data="tableData" @row-click="clickRow">
        <el-table-column prop="licenseNumber" label="车辆号"></el-table-column>
        <el-table-column prop="carType" label="车型"></el-table-column>
        <el-table-column prop="driverName" label="默认司机"></el-table-column>
        <el-table-column prop="driverPhone" label="联系电话"></el-table-column>
        <el-table-column prop="area" label="区域"></el-table-column>
      </el-table>
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
        ></el-pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCarByPage } from "@/api/logistics/vehicle/vehicle.js";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    vehicleDialogVisible: Boolean,
    title: String
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      searchParams: "",
      value1: "",
      form: {
        licenseNumber: "",
        carType:''
      }
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form
      };
      let res = await getCarByPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.pages.total;
    },
    //查询
    query() {
      this.handleList();
    },
    // 单击选择人员
    clickRow(row) {
      this.clickRowDate = row;
    },
    // 搜索人员
    async search() {
      let res = await getContractList({
        current: this.currentPage,
        size: this.pageSize,
        name: this.searchParams
      });
      if (res.data.success) {
        this.tableData = res.data.data.pages.records;
      }
    },
    // 确定
    confim() {
      if (this.clickRowDate) {
        this.$emit("on-selected-contact", this.clickRowDate);
        this.$emit("update:vehicleDialogVisible", false);
      } else {
        this.$message.info("请选择人员");
      }
    },
    // 取消
    cancel() {
      this.closeDialog();
    },
    // 关闭
    handleClose() {
      this.closeDialog();
    },
    // 表单初始
    closeDialog() {
      this.$emit("on-selected-personnel", false);
      this.$emit("update:vehicleDialogVisible", false);
    },
    // 选择日期
    changeBillDate(value) {
      this.form.contractStartDate = value[0];
      this.form.contractEndDate = value[1];
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>