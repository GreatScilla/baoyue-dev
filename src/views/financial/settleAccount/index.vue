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
      :before-open="beforeOpen"
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
          新增账号</el-button
        >
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="xfType">
        <div>{{ status[scope.row.xfType] }}</div>
      </template>
      <template slot-scope="scope" slot="xfstatus">
        <el-switch
          :value="scope.row.xfStatus"
          @change="changeStatus(scope.row)"
          active-value="0"
          inactive-value="1"
        ></el-switch>
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
          content="详情"
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
import { getList, submit, del } from "@/api/system/settleAccount.js";
// import { getProcessType, getList, add, del } from "@/api/flow2/flowConfig.js";
export default {
  data() {
    return {
      page: {},
      form: {},
      params: {},
      loading: false,
      data: [],
      selectedRows: [],
      status: ["现金", "银行卡"],
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
        addBtn: false,
        addTitle: "新增",
        editTitle: "编辑",
        viewTitle: "查看",
        selection: true,
        tip: false,
        labelWidth: 110,
        dialogClickModal: false,
        searchShow: false,
        searchShowBtn: false,
        column: [
          {
            label: "类型",
            prop: "xfType",
            type: "radio",
            slot: true,
            span: 18,
            dicData: [
              {
                label: "现金",
                value: 0,
              },
              {
                label: "银行卡",
                value: 1,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择结算类型",
                trigger: "blur",
              },
            ],
            change: (e) => {
              console.log(e);
              if (e.value === 0) {
                this.option.column[1].addDisplay = false;
                this.option.column[2].addDisplay = false;
                this.option.column[3].addDisplay = false;
                this.option.column[1].editDisplay = false;
                this.option.column[2].editDisplay = false;
                this.option.column[3].editDisplay = false;
              } else {
                this.option.column[1].addDisplay = true;
                this.option.column[2].addDisplay = true;
                this.option.column[3].addDisplay = true;
                this.option.column[1].editDisplay = true;
                this.option.column[2].editDisplay = true;
                this.option.column[3].editDisplay = true;
              }
            },
          },
          {
            label: "银行账户",
            prop: "bankAccount",
            span: 18,
            addDisplay: true,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入银行账户",
                trigger: "blur",
              },
            ],
          },
          {
            label: "银行名称",
            prop: "bankName",
            span: 18,
            addDisplay: true,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入银行名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "开户行名称",
            prop: "openAccountName",
            span: 18,
            labelWidth: 120,
            searchLabelWidth: 120,
            addDisplay: true,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入开户行名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "状态",
            prop: "xfstatus",
            type: "switch",
            cell: true,
            slot: true,
            addDisplay: false,
            editDisplay: false,
          },
        ],
      },
    };
  },
  created() {},
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
    rowSave(row, done, loading) {
      submit(row)
        .then(() => {
          this.$message.success("新增成功");
          done();
          this.getList();
        })
        .catch(() => {
          loading();
        });
    },
    rowUpdate(row, done, loading) {
      submit(row)
        .then(() => {
          this.$message.success("修改成功");
          done();
          this.getList();
        })
        .catch(() => {
          loading();
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
    openSearchPop() {
      this.$refs.crud.$refs.headerSearch.searchShow =
        !this.$refs.crud.$refs.headerSearch.searchShow;
      this.searchShow = !this.searchShow;
    },
    beforeOpen(done, type) {
      if (type !== "edit") return done();
      console.log(this.form);
      setTimeout(() => {
        this.$forceUpdate();
      });
      done();
    },
    changeStatus(row) {
      submit({
        ...row,
        xfStatus: 1 - row.xfStatus,
      })
        .then(() => {
          this.$message.success("修改成功");

          this.getList();
        })
        .catch(() => {
          loading();
        });
    },
  },
};
</script>