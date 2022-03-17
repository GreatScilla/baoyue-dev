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
        <el-form-item label="分类">
          <el-input
            placeholder="请输入分类"
            v-model="params.complaintType"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            placeholder="请输入名称"
            v-model="params.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            placeholder="请输入联系人"
            v-model="params.principal"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input
            placeholder="请输入联系人电话"
            v-model="params.principalPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="提交日期">
          <el-date-picker
            size="small"
            v-model="searchDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投诉内容">
          <el-input
            placeholder="请输入投诉内容"
            v-model="params.complaintContent"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理人">
          <el-input
            placeholder="请输入处理人"
            v-model="params.updateUser"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input
            placeholder="请输入处理意见"
            v-model="params.handlingSuggestion"
          ></el-input>
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
          v-if="permission.complaint_search && !searchShow"
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
        <el-button
          type="primary"
          size="small"
          @click="$refs.crud.rowAdd()"
          v-if="permission.complaint_add"
        >
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button
          type="default"
          size="small"
          @click="muiltiDelete"
          v-if="permission.complaint_delete"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="status">
        <div>
          {{ scope.row.status == 1 ? "已处理" : "未处理" }}
        </div>
      </template>
      <template slot-scope="scope" slot="statusForm">
        <div>
          {{ scope.row.status == 1 ? "已处理" : "未处理" }}
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          class="item"
          effect="dark"
          content="处理"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-thumb"
            @click="goHandle(scope.row)"
            :disabled="scope.row.status == 1"
          >
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
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
            @click="goEdit(scope.row)"
            :disabled="scope.row.status == 1"
            v-if="permission.complaint_edit"
          >
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
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
        <el-divider direction="vertical"></el-divider>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="bottom"
          v-if="permission.complaint_delete"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="rowDel(scope.row)"
            :disabled="scope.row.status == 1"
          >
          </el-button>
        </el-tooltip>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getList, submit, del } from "@/api/projects/complaint.js";
export default {
  data() {
    return {
      searchDate: [],
      page: {},
      form: {},
      params: {},
      loading: false,
      searchShow: false,
      searchDialogVisible: false,
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
            label: "状态",
            prop: "status",
            addDisplay: false,
            editDisplay: false,
            slot: true,
            formslot: true,
          },
          {
            label: "投诉人名称",
            prop: "complaint",
            searchLabelWidth: 120,
            editDisabled: false,
            search: true,
            labelWidth: 120,
            rules: [
              {
                required: true,
                trigger: "blur",
                message: "请输入投诉人名称",
              },
            ],
          },
          {
            label: "分类",
            prop: "complaintType",
            type: "select",
            editDisabled: false,
            search: true,
            dicData: [
              {
                label: "监理投诉",
                value: "监理投诉",
              },
              {
                label: "客户投诉",
                value: "客户投诉",
              },
            ],
            rules: [
              {
                required: true,
                trigger: "blur",
                message: "请选择分类",
              },
            ],
          },
          {
            label: "联系人",
            prop: "principal",
            editDisabled: false,
            search: true,
            rules: [
              {
                required: true,
                trigger: "blur",
                message: "请输入联系人",
              },
            ],
          },
          {
            label: "联系人电话",
            prop: "principalPhone",
            editDisabled: false,
            labelWidth: 120,
            rules: [
              {
                required: true,
                trigger: "blur",
                message: "请输入联系人电话",
              },
            ],
          },
          {
            label: "提交时间",
            prop: "createTime",
            addDisplay: false,
            editDisabled: true,
            width: 160,
          },
          {
            label: "投诉内容",
            prop: "complaintContent",
            type: "textarea",
            span: 24,
            editDisabled: false,
          },
          {
            label: "处理人",
            prop: "updateUser",
            addDisplay: false,
            editDisplay: false,
            editDisabled: true,
          },
          {
            label: "处理意见",
            prop: "handlingSuggestion",
            type: "textarea",
            span: 24,
            addDisplay: false,
            editDisplay: false,
            editDisabled: false,
          },
        ],
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters(["permission", "userInfo"]),
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
      if (this.searchDate) {
        this.params.createStartTime = this.searchDate[0];
        this.params.createEndTime = this.searchDate[1];
      }
      this.page.currentPage = 1;
      this.getList();
      this.searchDialogVisible = false;
      // this.$message.success("搜索成功");
    },
    reset() {
      this.searchDate = [];
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
          this.getList();
          done();
        })
        .catch(() => {
          loading();
        });
    },
    rowUpdate(row, done, loading) {
      row.status = 1;
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
      if (this.selectedRows.find((x) => x.status == 1))
        return this.$message.info("您选中了已处理的数据！");
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
    goEdit(row) {
      this.type = "edit";

      let c = this.option.column;
      this.option.editTitle = "编辑";
      this.option.editBtnText = "修改";
      c[1].editDisabled = false;
      c[2].editDisabled = false;
      c[3].editDisabled = false;
      c[4].editDisabled = false;
      c[6].editDisabled = false;
      c[8].editDisplay = false;

      this.$refs.crud.rowEdit(row);
    },
    goHandle(row) {
      this.type = "handle";

      let c = this.option.column;
      this.option.editTitle = "处理";
      this.option.editBtnText = "处理";
      c[1].editDisabled = true;
      c[2].editDisabled = true;
      c[3].editDisabled = true;
      c[4].editDisabled = true;
      c[6].editDisabled = true;
      c[8].editDisplay = true;

      this.$refs.crud.rowEdit(row);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__right button:nth-child(3) {
  display: none;
}
</style>