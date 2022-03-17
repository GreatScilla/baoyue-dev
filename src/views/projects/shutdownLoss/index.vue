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
        <el-form-item label="项目名称">
          <el-input
            placeholder="请输入项目名称"
            v-model="params.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item label="停工人数">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="params.lockoutNumStart"
            ></el-input>
            <div style="text-algin: center;color:#dddfe7; padding: 0 10px">一</div>
            <el-input
              placeholder="请输入"
              v-model="params.lockoutNumEnd"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="单价">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="params.unitPriceStart"
            ></el-input>
            <div style="text-algin: center;color:#dddfe7; padding: 0 10px">一</div>
            <el-input
              placeholder="请输入"
              v-model="params.unitPriceEnd"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="停工日">
          <div class="allNum">
            <el-input
              placeholder="请输入"
              v-model="params.shutdownDaysStart"
            ></el-input>
            <div style="text-algin: center;color:#dddfe7; padding: 0 10px">一</div>
            <el-input
              placeholder="请输入"
              v-model="params.shutdownDaysEnd"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="创建日期">
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
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="params.createUser"
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
          v-if="permission.shutdown_loss_search && !searchShow"
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
          @click="rowAdd"
          v-if="permission.shutdown_loss_add"
        >
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button
          type="default"
          size="small"
          @click="muiltiDelete"
          v-if="permission.shutdown_loss_delete"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="shutFormForm">
        <div>
          <form-table
            ref="shutForm"
            :type="formType"
            :list="shutForm"
            :data="shutFormData"
          />
        </div>
      </template>
      <template slot-scope="scope" slot="fileForm">
        <div class="upload-box">
          <upload-file
            listType="picture-card"
            :limit="3"
            :imageList="fileList"
            @on-success="onSuccess"
            @on-remove="onRemove"
          ></upload-file>
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          class="item"
          effect="dark"
          content="编辑"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="rowEdit(scope.row)"
            v-if="permission.shutdown_loss_edit"
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
            @click="rowView(scope.row)"
          >
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="bottom"
          v-if="permission.shutdown_loss_delete"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            :disabled="scope.row.status == 1"
            @click="rowDel(scope.row)"
          >
          </el-button>
        </el-tooltip>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getList, update, add, del } from "@/views/test.js";
import { getList, submit, del } from "@/api/projects/shutdownLoss.js";
import uploadFile from "@/components/uploadFile";

import { getProjectList } from "@/api/projects/members.js";
import formTable from "@/components/formTable";

export default {
  components: {
    formTable,
    uploadFile,
  },
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
      fileList: [],
      shutFormData: "",
      formType: "edit",
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
            label: "项目名称",
            prop: "projectName",
            type: "select",
            search: true,
            filterable: true,
            dicData: [],
            rules: [
              {
                required: true,
                message: "请选择项目名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户名称",
            prop: "projectLead",
          },
          {
            label: "创建日期",
            prop: "createTime",
            addDisplay: false,
            editDisabled: true,
          },
          {
            label: "",
            prop: "shutForm",
            labelWidth: 0,
            span: 24,
            hide: true,
            formslot: true,
          },
          {
            label: "创建时间",
            prop: "createTime",
            type: "dateTime",
            addDisplay: false,
          },
          {
            label: "制单人",
            prop: "createUser",
            addDisplay: false,
            editDisabled: true,
          },
          {
            label: "附件",
            prop: "file",
            hide: true,
            formslot: true,
          },
        ],
      },
      shutForm: [
        {
          label: "停工人数",
          prop: "lockoutNum",
          type: "input",
          amount: true,
        },
        {
          label: "单价",
          prop: "unitPrice",
          type: "input",
        },
        {
          label: "停工日（天）",
          prop: "shutdownDays",
          type: "input",
        },
        {
          label: "合计",
          prop: "money",
          type: "input",
          onfocus: (row) => {
            let s = row.lockoutNum * row.unitPrice * row.shutdownDays;
            if (isNaN(s)) s = "";
            return s;
          },
          amount: true,
        },
        {
          label: "备注",
          prop: "remark",
          type: "input",
        },
      ],
    };
  },
  created() {
    getProjectList({ limit: 9999 }).then((res) => {
      this.option.column[0].dicData = res.data.data.map((x, i) => ({
        label: x.projectName,
        value: i,
        projectLead: x.projectLead,
        projectSn: x.projectSn,
      }));
    });
  },
  watch: {
    ["form.projectName"]: function (e) {
      console.log(this.option.column[0].dicData[e]);
      if (!this.option.column[0].dicData[e]) return;
      this.form.projectLead = this.option.column[0].dicData[e].projectLead;
    },
  },
  computed: {
    ...mapGetters(["permission", "userInfo"]),
  },
  methods: {
    // openSearchPop() {
    //   this.$refs.crud.$refs.headerSearch.searchShow =
    //     !this.$refs.crud.$refs.headerSearch.searchShow;
    //   this.searchShow = !this.searchShow;
    // },
    openSearchPop() {
      this.searchDialogVisible = true;
    },
    //搜索点击触发
    searchRole() {
      if (this.params.lockoutNumStart && !this.params.lockoutNumEnd) {
        return this.$message.warning("请输入正确的停工人数");
      }
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
      this.searchDate=[]
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
      console.log(msg);
      const shut = this.$refs.shutForm.getData();
      const params = {
        ...row,
        projectLead: row.projectLead,
        projectName: row.$projectName,
        projectSn: this.option.column[0].dicData[row.projectName]
          ? this.option.column[0].dicData[row.projectName].projectSn
          : row.projectSn,
        file: this.fileList.join(","),
        projectLockoutSublistList: shut.list,
        lockoutNumTotal: shut.amount[2],
        moneyTotal: shut.amount[5],
      };
      submit(params)
        .then(() => {
          this.$message.success(msg);
          this.fileList = [];
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
    onSuccess(v) {
      this.fileList.push(v);
    },
    onRemove(e) {
      this.fileList = e;
    },
    rowAdd() {
      this.formType = "edit";
      this.shutFormData = "";
      this.$refs.crud.rowAdd();
    },
    rowView(row) {
      this.formType = "detail";
      this.shutFormData = row.projectLockoutSublistList;
      this.fileList = row.file.split(",");
      this.$refs.crud.rowView(row);
    },
    rowEdit(row) {
      this.formType = "edit";
      this.shutFormData = row.projectLockoutSublistList;
      this.fileList = row.file.split(",");
      this.$refs.crud.rowEdit(row);
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.avue-crud__right button:nth-child(3) {
  display: none;
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 80px !important;
  }
}
</style>