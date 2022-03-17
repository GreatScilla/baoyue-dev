// 选择执行人
<template>
  <div>
    <el-dialog
      :title="'选择' + title"
      width="60%"
      append-to-body
      :visible.sync="checkUserVisible"
      :before-close="handleClose"
    >
      <!-- <div style="margin-bottom: 10px">
        <el-input
          class="serchIpt"
          size="small"
          suffix-icon="el-icon-search"
          v-model="form.keywords"
          placeholder="输入账号或姓名"
          clearable
        >
        </el-input>
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </div> -->

      <el-table
        highlight-current-row
        :data="tableData"
        @selection-change="handleSelectionChange"
        @row-click="clickRow"
      >
         <el-table-column
          type="selection"
        ></el-table-column>
          <el-table-column prop="approverDescription" label="角色"> </el-table-column>
             <el-table-column prop="approverRightsDescription" label="权限描述"> </el-table-column>
                <el-table-column prop="accountUserName" label="用户名称"> </el-table-column>
                  <el-table-column prop="accountDept" label="部门"> </el-table-column>
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
import { getRole} from "@/api/flow2/flowConfigSetting.js"
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
      keywords:""
      },
      deptOptions: [],
      multipleSelection: [],
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取资源
    async handleList(...arg) {
      // let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getRole( this.currentPage, this.pageSize);
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
      this.handleList(this.form);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定
    confim() {
       if (this.multipleSelection.length!==0) {
      this.$emit("on-selected", this.multipleSelection);
      this.$emit("update:checkUserVisible", false);
      }else {
        this.$message.info("请选择审批人");
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
  filters: {
    status: function (value) {
      if (value === 2) {
        value = "兼职";
      } else if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      }
      return value;
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