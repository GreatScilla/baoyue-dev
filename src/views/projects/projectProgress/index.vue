<template>
  <div>
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
        :model="params"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="项目编号">
          <el-input placeholder="请输入项目编号" v-model="params.projectSn"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input placeholder="请输入项目名称" v-model="params.projectName"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input placeholder="请输入产品名称" v-model="params.productName"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input placeholder="请输入规格" v-model="params.model"></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <avue-crud
      ref="crud"
      :option="option"
      :page.sync="page"
      :table-loading="loading"
      @on-load="getList"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
      v-model="form"
      :data="data"
      @selection-change="muiltiSelect"
      @search-change="searchChange"
      @refresh-change="refreshChange"
    >
      <template slot="menuLeft">
        <el-button
          v-if="permission.project_progress_search && !searchShow"
          type="primary"
          size="small"
          @click="openSearchPop"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button
          v-if="searchShow"
          type="primary"
          size="small"
          @click="openSearchPop"
        >
          收起查询</el-button
        >
        <!-- <el-button type="primary" size="small" @click="$refs.crud.rowAdd()">
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        > -->
      </template>
      <template slot="accomplish" slot-scope="scope">
        <span v-if="scope.row.accomplish !== '0.00'">
          {{ parseInt(scope.row.accomplish) + "%" }}</span
        >
        <span v-else> {{ parseInt(scope.row.accomplish) }}</span>
      </template>
      <template slot-scope="scope" slot="menu">
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="编辑"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$refs.crud.rowEdit(scope.row)"
          >
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider> -->
        <el-tooltip
          class="item"
          effect="dark"
          content="查看"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-view"
            @click="$refs.crud.rowView(scope.row)"
          >
          </el-button>
        </el-tooltip>
        <!-- <el-divider direction="vertical"></el-divider>
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
            :disabled="scope.row.status == 1"
            @click="rowDel(scope.row)"
          >
          </el-button>
        </el-tooltip> -->
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getList, update, add, del } from "@/views/test.js";
// import { getList, submit, del } from "@/api/humanResources/insurance.js";
import { getList } from "@/api/projects/projectProgress.js";
import { getEmployeeList } from "@/api/humanResources/employeeFile.js";
export default {
  data() {
    return {
      searchDialogVisible: false,
      page: {},
      form: {
        jobNumber: "",
      },
      params: {},
      loading: false,
      searchShow: false,
      data: [],
      selectedRows: [],
      option: {
        // index: true,
        align: "center",
        headerAlign: "center",
        border: true,
        stripe: true,
        editBtn: false,
        delBtn: false,
        formslot: true,
        searchShowBtn: false,
        searchShow: false,
        addBtn: false,
        addTitle: "新增",
        editTitle: "编辑",
        viewTitle: "查看",
        selection: true,
        tip: false,
        dialogClickModal: false,
        column: [
          {
            label: "项目编号",
            prop: "projectSn",
            search: true,
            width: 120,
          },
          {
            label: "项目名称",
            prop: "projectName",
            search: true,
          },
          {
            label: "产品",
            prop: "productName",
            search: true,
            width: 120,
          },
          {
            label: "规格",
            prop: "model",
            search: true,
            span: 12,
          },
          {
            label: "总数量",
            prop: "productNum",
            span: 12,
          },
          {
            label: "累计完成数量",
            prop: "accomplishNum",
            width: 120,
            span: 12,
          },
          {
            label: "完成率",
            prop: "accomplish",
            span: 12,
            slot: true,
          },
          {
            label: "可用库存量",
            prop: "inventory",
            span: 12,
            width: 100,
          },
          {
            label: "开工人数",
            prop: "startWork",
            span: 12,
          },
          {
            label: "制单人",
            prop: "createUser",
            span: 12,
          },
        ],
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters(["permission", "userInfo"]),
    formWorkName() {
      if (!this.form.jobNumber) return "";
      let i = this.option.column[0].dicData.findIndex(
        (x) => x.jobNumber == this.form.jobNumber
      );
      return this.option.column[0].dicData[i].name;
    },
  },
  methods: {
    // openSearchPop() {
    //   this.$refs.crud.$refs.headerSearch.searchShow = !this.$refs.crud.$refs
    //     .headerSearch.searchShow;
    //   this.searchShow = !this.searchShow;
    // },
    openSearchPop() {
      this.searchDialogVisible = true;
    },
    //搜索点击触发
    searchRole() {
      this.page.currentPage = 1;
      this.getList();
      this.searchDialogVisible = false;
      // this.$message.success("搜索成功");
    },
    reset() {
      this.params = {};
      this.getList();
      // this.searchDialogVisible = false;
      // this.$message.success("刷新成功");
    },
    getList() {
      this.loading = true;
      this.data = [];
      getList(this.page.currentPage, this.page.pageSize, this.params).then(
        (res) => {
          const data = res.data.data;
          this.loading = false;
          this.page.total = data.total;
          const result = data.records;
          this.data = result;
        }
      );
    },
    //新增提交触发
    rowSave(row, done, loading, msg = "新增成功") {
      console.log(row);
      const params = {
        ...row,
        name: this.formWorkName,
      };
      submit(params)
        .then(() => {
          this.$message.success(msg);
          done();
          this.getList();
        })
        .catch(() => {
          loading();
        });
    },
    rowUpdate(row, done, loading) {
      this.rowSave(row, done, loading, "修改成功");
    },
    //删除操作
    rowDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return del({
            ids: row.id,
          });
        })
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        });
    },
    //搜索点击触发
    searchChange(params, done) {
      if (done) done();
      this.params = params;
      this.page.currentPage = 1;
      this.getList();
      this.$message.success("搜索成功");
    },
    refreshChange() {
      this.getList();
      this.$message.success("刷新成功");
    },
    //多选时触发
    muiltiSelect(e) {
      this.selectedRows = e;
    },
    //批量删除
    muiltiDelete() {
      if (this.selectedRows.length == 0)
        return this.$message.info("您还未选中任何数据！");
      this.$confirm("确认批量删除选中的数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return del({
            ids: this.selectedRows.map((x) => x.id).join(","),
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        })
        .catch(() => {});
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.avue-crud__right button:nth-child(3) {
  display: none;
}
</style>