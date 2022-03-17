// 选择检验项目
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="checkProjectVisible"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="checkSelectable"
        ></el-table-column>
        <el-table-column
          prop="inspectionName"
          label="检验项目"
        ></el-table-column>
        <el-table-column
          prop="inspectionStandard"
          label="检验标准"
        ></el-table-column>
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
import { selectInspectionItemPage } from "@/api/quality/index";
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  props: {
    checkProjectVisible: Boolean,
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
      multipleSelection: [],
    };
  },
  watch:{
    checkProjectVisible(){
     if(this.checkProjectVisible===true){
        this.$refs.multipleTable.clearSelection();
     }
    }
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
        let data = {
        inspectionName: this.searchParams,
        status: 1
      };
      const res = await selectInspectionItemPage(params,data);
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
      if (this.multipleSelection.length!==0) {
        this.$emit("on-selected", this.multipleSelection);
        this.$emit("update:checkProjectVisible", false);
      } else {
        this.$message.info("请选择检验项目");
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
      this.$emit("update:checkProjectVisible", false);
    },
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
</style>