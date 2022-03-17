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
          <el-select v-model="params.projectName" placeholder="请选择">
            <el-option
              v-for="item in projectNameList"
              :key="item.projectName"
              :label="item.projectName"
              :value="item.projectName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目人员姓名">
          <el-select v-model="params.projectLead" placeholder="请选择">
            <el-option
              v-for="item in projectLeadList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="params.projectType" placeholder="请选择">
            <el-option
              v-for="item in projectTypes"
              :key="item.id"
              :label="item.projectType"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="params.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="params.email"></el-input>
        </el-form-item>
        <el-form-item label="工序状态">
          <el-select size="small" v-model="params.isEffect" placeholder="请选择">
            <el-option
              v-for="item in enabledList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
          v-if="permission.projects_members_search"
          type="primary"
          size="small"
          @click="openSearchPop"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="$refs.crud.rowAdd()"
          v-if="permission.projects_members_add"
        >
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button
          type="default"
          size="small"
          @click="muiltiDelete"
          v-if="permission.projects_members_delete"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="projectTypeForm">
        <div>
          <el-select
            v-if="!addProjectTypeDialog"
            :value="scope.row.projectType"
            @change="selectType"
          >
            <el-option
              v-for="item in projectTypes"
              :key="item.id"
              :label="item.projectType"
              :value="item.id"
            ></el-option>
            <el-option label="+新增分组" value="-1"></el-option>
          </el-select>
          <div v-else>
            <el-input
              v-model="newProjectType"
              placeholder="分组名称"
            ></el-input>
            <el-button type="primary" size="mini" @click="addProjectType"
              >确认</el-button
            >
            <el-button
              type="default"
              size="mini"
              @click="handleProjectTypeClose"
              >取消</el-button
            >
          </div>
        </div>
      </template>
      <template slot-scope="scope" slot="isEffectForm">
        <el-switch
          v-model="form.isEffect"
          active-color="#157a2c"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </template>
      <template slot-scope="scope" slot="isEffectSearch">
        <el-switch
          v-model="form.isEffect"
          active-color="#157a2c"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          class="item"
          effect="dark"
          content="编辑"
          placement="bottom"
          v-if="permission.projects_members_edit"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$refs.crud.rowEdit(scope.row)"
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
        <el-divider
          v-if="permission.projects_members_delete"
          direction="vertical"
        ></el-divider>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="bottom"
          v-if="permission.projects_members_delete"
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
import {
  getProjectList,
  getProjectType,
  addProjectType,
  submit,
  getList,
  del,
} from "@/api/projects/members.js";
import { getEmployeeList } from "@/api/humanResources/employeeFile.js";
export default {
  data() {
    return {
      // 是否有效
      enabledList: [
        {
          value: "0",
          label: "生效",
        },
        {
          value: "1",
          label: "不生效",
        },
      ],
      searchDialogVisible: false,
      addProjectTypeDialog: false,
      newProjectType: "",
      page: {},
      form: {
        jobNumber: "",
        isEffect: 0,
        phone: "",
      },
      projectNameList: [],
      projectLeadList: [],
      params: {},
      loading: false,
      searchShow: false,
      data: [],
      selectedRows: [],
      projectTypes: [],
      option: {
        // index: true,
        align: "center",
        headerAlign: "center",
        border: true,
        stripe: true,
        editBtn: false,
        delBtn: false,
        formslot: true,
        addBtn: false,
        searchShow: false,
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
            filterable: true,
            searchFilterable: true,
            props: {
              label: "projectName",
              value: "projectName",
            },
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
            label: "项目人员姓名",
            prop: "projectLead",
            type: "select",

            filterable: true,
            searchFilterable: true,
            labelWidth: 120,
            width: 120,
            props: {
              label: "name",
              value: "id",
            },
            dicData: [],
            rules: [
              {
                required: true,
                message: "请选择项目人员姓名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "分组",
            prop: "projectType",
            type: "select",
            formslot: true,
            dicData: [],
            props: {
              label: "projectType",
              value: "id",
            },
            span: 12,
            rules: [
              {
                required: true,
                message: "请选择分组",
                trigger: "submit",
              },
            ],
          },
          {
            label: "电话",
            prop: "phone",
            span: 12,
          },
          {
            label: "邮箱",
            prop: "email",
            span: 12,
          },
          {
            label: "是否有效",
            prop: "isEffect",
            formslot: true,
            searchslot: true,
            hide: true,
          },
        ],
      },
    };
  },
  created() {
    getProjectList({}).then((res) => {
      this.projectNameList = res.data.data;
      this.option.column[0].dicData = res.data.data;
    });
    this.getProjectType();
    getEmployeeList({ limit: 9999 }).then((res) => {
      this.projectLeadList = res.data.data;
      this.option.column[1].dicData = res.data.data;
    });
  },
  computed: {
    ...mapGetters(["permission", "userInfo"]),
  },
  watch: {
    "form.projectLead": function (e) {
      console.log(this.option.column[1].dicData[e].phone);
      this.form.phone = this.option.column[1].dicData[e].phone;
      this.form.email = this.option.column[1].dicData[e].email;
    },
  },
  methods: {
    getProjectType() {
      getProjectType({}).then((res) => {
        this.projectTypes = res.data.data;
        this.option.column[2].dicData = res.data.data;
      });
    },
    openSearchPop() {
      this.searchDialogVisible = true;
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
        projectLead: row.$projectLead,
        projectName: row.$projectName,
        projectSn: this.option.column[0].dicData[row.projectName]
          ? this.option.column[0].dicData[row.projectName].projectSn
          : row.projectSn,
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
    searchRole() {
      this.page.currentPage = 1;
      this.getList();
      this.searchDialogVisible = false;
      this.$message.success("搜索成功");
    },
    reset() {
      this.params = {};
      this.getList();
      this.searchDialogVisible = false;
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
    selectType(e) {
      console.log(e);
      if (e == -1) return (this.addProjectTypeDialog = true);
      this.form.projectType = e;
    },
    addProjectType() {
      if (this.newProjectType == "") return;
      addProjectType({
        projectType: this.newProjectType,
      }).then((res) => {
        this.$message.success("添加成功");
        this.getProjectType();
        this.handleProjectTypeClose();
      });
    },
    handleProjectTypeClose() {
      this.addProjectTypeDialog = false;
      this.newProjectType = "";
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.avue-crud__right button:nth-child(3) {
  display: none;
}
</style>