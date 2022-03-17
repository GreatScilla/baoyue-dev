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
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        >
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
            icon="el-icon-edit-outline"
            @click="$refs.crud.rowEdit(scope.row)"
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
import { getList, add, del, put } from "@/api/flow2/auditorManage.js";
import { getUser } from "@/api/base-data/user";
import { getSuperior } from "@/api/humanResources/employeeFile.js";
const formName = "审批人";
export default {
  data() {
    return {
      page: {},
      form: {},
      params: {},
      loading: false,
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
        searchShow: false,
        addTitle: "新增" + formName,
        editTitle: "编辑" + formName,
        viewTitle: "查看" + formName,
        selection: true,
        tip: false,
        dialogClickModal: false,
        column: [
          {
            label: "角色",
            prop: "approverDescription",
            span: 18,
            searchSpan: 12,
            rules: [
              {
                required: true,
                message: "请输入角色",
                trigger: "blur",
              },
            ],
          },
          {
            label: "权限描述",
            prop: "approverRightsDescription",
            span: 18,
            searchSpan: 12,
            type: "textarea",
            minRows: 4,
            maxRows: 4,
          },
          {
            label: "用户名称",
            prop: "userId",
            span: 18,
            type: "select",
            dicData: [],
            props: {
              label: "name",
              value: "id",
            },
            rules: [
              {
                required: true,
                message: "请选择用户名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "部门",
            prop: "accountDept",
            span: 18,
            addDisplay: false,
            editDisplay: false,
          },
        ],
      },
    };
  },
  created() {
    getUser({
      current: 1,
      size: 9999,
      status:0
    }).then((res) => {
      console.log(res.data);
      this.option.column[2].dicData = res.data.data.records;
    });
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
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
    rowSave(row, done, loading) {
      const d = this.option.column[2].dicData;
      const i = d.findIndex((x) => x.id == row.userId);
      row.userId = d[i].id;
      row.accountDept = d[i].deptName;
      row.accountUserName = d[i].account;
      row.userName = d[i].name;
      row.avatar = d[i].avatar;
      add(row)
        .then(() => {
          this.$message.success("新增成功");
          done();
          this.getList();
        })
        .catch(() => {
          loading();
        });
    },
    //修改
    rowUpdate(row, done, loading) {
      const d = this.option.column[2].dicData;
      const i = d.findIndex((x) => x.id == row.userId);
      console.log(d, row, d[i]);
      row.userId = d[i].id;
      row.accountDept = d[i].deptName;
      row.accountUserName = d[i].account;
      row.userName = d[i].name;
      row.avatar = d[i].avatar;
      console.log(row);
      put({
        data: row,
        params: {
          approverId: row.id,
        },
      })
        .then(() => {
          this.$message.success("修改成功");
          done();
          this.getList();
        })
        .catch(() => {
          loading();
          this.getList();
        });
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
            approverIdList: row.id,
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
      const d = this.option.column[1].dicData;
      params.processTypeName =
        d[d.findIndex((x) => x.code == params.processTypeId)].name;
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
            approverIdList: this.selectedRows.map((x) => x.id).join(","),
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