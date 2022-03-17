// 选择生产弹窗
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="checkUserVisible"
      :before-close="handleClose"
    >
      <div style="margin-bottom: 10px">
        <el-input
          class="serchIpt"
          size="small"
          suffix-icon="el-icon-search"
          v-model="form.planNumber"
          placeholder="输入编号"
          clearable
        >
        </el-input>
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </div>

      <el-table highlight-current-row :data="tableData" @row-click="clickRow">
        <el-table-column prop="receiptNo" label="单据编号"> </el-table-column>
        <el-table-column prop="deliveryDate" label="交货日期">
        </el-table-column>
        <el-table-column prop="makingPeople" label="制单人"> </el-table-column>
        <el-table-column prop="reviewerName" label="审核人"> </el-table-column>
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
        >
        </el-pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取 消 </el-button>
        <el-button size="small" type="primary" @click="confim">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProducePlanList } from "@/api/manufacture/produce-plan";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    checkUserVisible: Boolean,
    title: String,
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      form: {
        receiptNo: "",
      },
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getProducePlanList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.pages.total;
    },
    // 单击选择
    clickRow(row) {
      this.clickRowDate = row;
    },
    // 搜索
    async search() {
      this.currentPage = 1;
      this.handleList(this.form);
    },
    // 确定
    confim() {
      if (this.clickRowDate) {
        this.$emit("on-selected", this.clickRowDate);
        this.$emit("update:checkUserVisible", false);
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
      this.$emit("on-selected", false);
      this.$emit("update:checkUserVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.serchIpt {
  width: 180px;
  margin-right: 8px;
}
</style>