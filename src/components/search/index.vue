// 查询
<template>
  <div>
    <el-dialog
      class="search-dialog"
      title="查询条件"
      width="640px"
      append-to-body
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
    >
      <avue-form
        :option="option"
        v-model="obj"
        ref="form"
        class="search-avue-form"
      >
        <template slot-scope="scope" slot="menuForm">
          <el-button @click="reset">重 置</el-button>
          <el-button @click="search" type="primary">查 询</el-button>
        </template>
      </avue-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    searchDialogVisible: { type: Boolean, default: false },
    column: Array,
  },
  watch: {
    column: {
      handler(value) {
        this.column = value;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      obj: {},
      option: {
        emptyBtn: false,
        submitBtn: false,
        menuPosition: "right",
        column: this.column,
      },
    };
  },
  created() {
    this.formatFormColumn();
  },
  methods: {
    formatFormColumn() {
      this.column.forEach((item) => {
        item["span"] = 24;
      });
    },
    // 查询
    search() {
      this.$emit("on-search", this.obj);
    },
    // 重置
    reset() {
      this.$refs.form.resetForm();
    },
    // 关闭
    handleClose() {
      this.$emit("update:searchDialogVisible", false);
      this.closeDialog();
    },
    // 表单初始
    closeDialog() {
      this.$refs.form.resetForm();
      this.$emit("on-search");
    },
  },
};
</script>

<style lang="scss">
.search-dialog {
  .search-avue-form {
    .el-form-item__label{
      width: 100px!important;
    }
    .avue-form__row {
      padding-left: 0 !important;
      height: 37px !important;
    }
    .el-input,
    .el-select,
    .el-date-editor {
      width: 320px !important;
    }
  }
  .avue-form__menu--right {
    height: 40px;
  }
  .el-col {
    margin-bottom: 5px;
  }
}
</style>