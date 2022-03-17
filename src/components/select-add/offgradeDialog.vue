// 选择不合格特征
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="checkVisible"
      :before-close="handleClose"
    >
      <el-input
        size="small"
        suffix-icon="el-icon-search"
        v-model="searchParams"
        placeholder="输入名称"
        @keyup.enter.native="search"
        @change="search"
        style="margin-bottom: 10px"
      >
      </el-input>
      <el-table
        border
        highlight-current-row
        :data="tableData"
        @row-click="clickRow"
        ref="multipleTable"
      >
        <el-table-column prop="traitName" label="特征名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
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
import { selectFailTraitPage } from "@/api/quality/index";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    checkVisible: Boolean,
    title: String,
    checkData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [],
      clickRowDate: null,
      searchParams: "",
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
      let info = {
        traitName: this.searchParams,
      };
      const res = await selectFailTraitPage(params, info);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 单击选择人员
    clickRow(row) {
      this.clickRowDate = row;
    },
    // 搜索人员
    async search() {
      this.currentPage = 1;
      this.handleList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    checkSelectable(row) {
      //已选择禁止点击
      if (
        this.checkData.some((el) => {
          return el.id === row.id;
        })
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 确定
    confim() {
      if (this.clickRowDate) {
        this.$emit("on-selected", this.clickRowDate);
        this.$emit("update:checkVisible", false);
      } else {
        this.$message.info("请选择数据");
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
      this.$emit("update:checkVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>