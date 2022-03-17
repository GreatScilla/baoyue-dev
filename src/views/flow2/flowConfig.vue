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
          type="primary"
          size="small"
          @click="searchDialogVisible = true"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button type="primary" size="small" @click="$refs.crud.rowAdd()">
          <i class="el-icon-plus"></i>
          新增流程</el-button
        >
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        >
      </template>
      <template slot="isEnable" slot-scope="scope">
        <el-switch
          v-model="scope.row.isEnable"
          active-value="1"
          inactive-value="0"
          @change="checkStatus(scope.row)"
        ></el-switch>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          class="item"
          effect="dark"
          content="设置"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-setting"
            @click="goSetting(scope.row)"
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
        :model="searchForm"
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="流程名称">
          <el-input
            placeholder="请输入流程名称"
            v-model="searchForm.processName"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="searchForm.isEnable" placeholder="请选择">
            <el-option
              v-for="item in priceTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流程类型">
          <el-select v-model="searchForm.processTypeName" placeholder="请选择">
            <el-option
              v-for="item in processTypeNameData"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流程描述">
          <el-input
            placeholder="请输入流程描述"
            v-model="searchForm.processDescription"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getList, update, add, del } from "@/views/test.js";
import {
  getProcessType,
  getList,
  add,
  del,
  openOrClose,
} from "@/api/flow2/flowConfig.js";
import { getDictionary } from "@/api/system/dictbiz";
export default {
  data() {
    return {
      searchForm: {},
      searchDialogVisible: false,
      page: {},
      form: {},
      params: {},
      loading: false,
      data: [],
      selectedRows: [],
      processTypeNameData: [],
      priceTypeData: [
        {
          label: "启用",
          value: 1,
        },
        {
          label: "停用",
          value: 0,
        },
      ],
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
        addTitle: "新增流程",
        editTitle: "编辑流程",
        viewTitle: "查看流程",
        selection: true,
        tip: false,
        dialogClickModal: false,
        column: [
          {
            label: "流程名称",
            prop: "processName",
            search: true,
            span: 18,
            searchSpan: 12,
            rules: [
              {
                required: true,
                message: "请输入流程名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "是否启用",
            prop: "isEnable",
            search: true,
            // addDisplay: false,
            type: "switch",
            editDisplay: false,
            viewDisplay: false,
            slot: true,
            dicData: [
              {
                value: "0",
              },
              {
                value: "1",
              },
            ],
          },
          {
            label: "流程类型",
            prop: "processTypeId",
            search: true,
            type: "select",
            searchSpan: 12,
            span: 18,
            dicData: [],
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            rules: [
              {
                required: true,
                message: "请选择流程类型",
                trigger: "blur",
              },
            ],
          },
          {
            label: "流程版本",
            prop: "processVersion",
            // addDisplay: false,
            rules: [
              {
                required: true,
                message: "请输入流程版本",
                trigger: "blur",
              },
            ],
          },
          {
            label: "流程描述",
            prop: "processDescription",
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
    getDictionary({ code: "mes_process_type" }).then((res) => {
      this.processTypeNameData = res.data.data;
      this.option.column[2].dicData = res.data.data;
    });
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    // 搜索
    searchRole() {
      this.getList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.getList();
      // this.searchDialogVisible = false;
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    getList(params) {
      this.loading = true;
      this.data = [];
      getList(this.page.currentPage, this.page.pageSize, params).then((res) => {
        const data = res.data.data;
        this.loading = false;
        this.page.total = data.total;
        const result = data.records;
        this.data = result;
      });
    },
    //更改状态
    checkStatus(row) {
      openOrClose({ processId: row.id }).then((res) => {
        if (res.data.code === 200) {
          this.getList();
          this.$message.success("更改成功");
        }
      });
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
      const d = this.option.column[2].dicData;
      row.processTypeName =
        d[d.findIndex((x) => x.dictKey == row.processTypeId)].dictValue;
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
    //删除操作
    rowDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return del({
            processId: row.id,
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
            processId: this.selectedRows.map((x) => x.id).join(","),
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