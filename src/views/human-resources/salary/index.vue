<template>
  <div>
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
          v-if="!searchShow"
          type="primary"
          size="small"
          @click="openSearchPop"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button v-else type="primary" size="small" @click="openSearchPop">
          收起查询</el-button
        >
        <el-button type="primary" size="small" @click="$refs.crud.rowAdd()">
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="nameForm">
        <div>
          {{ formWorker.name }}
        </div>
      </template>
      <template slot-scope="scope" slot="depotForm">
        <div>
          {{ formWorker.depot }}
        </div>
      </template>
      <template slot-scope="scope" slot="emailForm">
        <div>
          {{ formWorker.email }}
        </div>
      </template>
      <template slot-scope="scope" slot="phoneNumberForm">
        <div>
          {{ formWorker.phoneNumber }}
        </div>
      </template>
      <template slot-scope="scope" slot="createUserForm">
        <div>
          {{ userInfo.real_name }}
        </div>
      </template>
      <template slot-scope="scope" slot="jobNumber">
        <div>
          {{ scope.row.jobNumber }}
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
        <el-divider direction="vertical"></el-divider>
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
        </el-tooltip>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getList, update, add, del } from "@/views/test.js";
import { getList, submit, del } from "@/api/humanResources/salary.js";
import { getEmployeeList } from "@/api/humanResources/employeeFile.js";
export default {
  data() {
    return {
      page: {},
      form: {
        jobNumber: "",
      },
      params: {},
      loading: false,
      data: [],
      selectedRows: [],
      searchShow: false,
      option: {
        // index: true,
        align: "center",
        headerAlign: "center",
        border: true,
        stripe: true,
        editBtn: false,
        delBtn: false,
        formslot: true,
        searchShow: false,
        addBtn: false,
        addTitle: "新增",
        editTitle: "编辑",
        viewTitle: "查看",
        selection: true,
        tip: false,
        dialogClickModal: false,
        labelWidth: 120,
        popStatus: "add",
        menuWidth: 120,
        column: [
          {
            label: "工号",
            prop: "jobNumber",
            type: "select",
            filterable: true,
            searchFilterable: true,
            search: true,
            slot: true,
            span: 12,
            searchSpan: 12,
            dicData: [],
            props: {
              label: "numName",
              value: "jobNumber",
            },
            rules: [
              {
                required: true,
                message: "请选择工号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "姓名",
            prop: "name",
            formslot: true,
            search: true,
          },
          {
            label: "所属部门",
            prop: "depot",
            formslot: true,
          },
          {
            label: "邮箱",
            prop: "email",
            width: 100,
            formslot: true,
            search: true,
          },
          {
            label: "手机",
            width: 100,
            prop: "phoneNumber",
            formslot: true,
            search: true,
          },
          {
            label: "发放月份",
            prop: "distributedIn",
            type: "datetime",
            labelWidth: 120,
            format: "yyyy-MM",
            rules: [
              {
                required: true,
                message: "请选择发放月份",
                trigger: "blur",
              },
            ],
          },
          {
            label: "基本工资",
            prop: "basePay",
            rules: [
              {
                required: true,
                message: "请输入基本工资金额",
                trigger: "blur",
              },
            ],
          },
          {
            label: "绩效",
            prop: "performance",
            rules: [
              {
                required: true,
                message: "请输入绩效",
                trigger: "blur",
              },
            ],
          },
          {
            label: "扣除社保",
            prop: "socialSecurity",
            rules: [
              {
                required: true,
                message: "请输入扣除社保",
                trigger: "blur",
              },
            ],
          },
          {
            label: "扣除公积金",
            prop: "accumulationFund",
            rules: [
              {
                required: true,
                message: "请输入扣除公积金金额",
                trigger: "blur",
              },
            ],
          },
          {
            label: "扣税",
            prop: "deduction",
            rules: [
              {
                required: true,
                message: "请输入扣税金额",
                trigger: "blur",
              },
            ],
          },
          {
            label: "实发工资",
            prop: "netPayroll",
            rules: [
              {
                required: true,
                message: "请输入实发工资",
                trigger: "blur",
              },
            ],
          },
          {
            label: "备注",
            prop: "remark",
            span: 18,
            type: "textarea",
            minRows: 6,
            maxRows: 6,
          },
        ],
      },
    };
  },
  created() {
    getEmployeeList({ limit: 9999 }).then((res) => {
      this.option.column[0].dicData = res.data.data.map((x) => ({
        numName: x.jobNumber + " " + x.name,
        name: x.name,
        jobNumber: x.jobNumber,
        gender: x.sex,
        depot: x.deptName,
        email: x.email,
        phoneNumber: x.phone,
      }));
    });
  },
  computed: {
    ...mapGetters(["permission", "userInfo"]),
    formWorker() {
      if (!this.form.jobNumber) return "";
      let i = this.option.column[0].dicData.findIndex(
        (x) => x.jobNumber == this.form.jobNumber
      );
      return this.option.column[0].dicData[i];
    },
  },
  methods: {
    openSearchPop() {
      this.$refs.crud.$refs.headerSearch.searchShow =
        !this.$refs.crud.$refs.headerSearch.searchShow;
      this.searchShow = !this.searchShow;
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
    //前往设置页面
    goSetting(row) {
      this.$router.push({
        path: "/flow2/flowConfigSetting",
        query: {
          row,
        },
      });
    },
    //新增提交触发
    rowSave(row, done, loading, msg = "新增成功") {
      const params = {
        ...row,
        ...this.formWorker,
      };
      submit(params)
        .then(async () => {
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