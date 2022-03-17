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
      :before-close="beforeClose"
      @selection-change="muiltiSelect"
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
    <el-button @click="test">show</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getList, update, add, del } from "@/views/test.js";
export default {
  data() {
    return {
      page: {},
      form: {},
      params: {},
      loading: false,
      data: [],
      selectedRows:[],
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
        addTitle: "新增流程",
        editTitle: "编辑流程",
        viewTitle: "查看流程",
        selection: true,
        tip: false,
        column: [
          {
            label: "流程名称",
            prop: "name",
            search: true,
            span: 18,
            rules: [
              {
                required: true,
                message: "请输入流程名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "流程类型",
            prop: "type",
            search: true,
            type: "select",
            span: 18,
            dicData: [
              {
                label: "选项1",
                desc: "描述1",
                disabled: true,
                value: 0,
              },
              {
                label: "选项2",
                desc: "描述2",
                value: 1,
              },
            ],
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
            prop: "version",
            search: true,
            addDisplay: false,
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
            prop: "description",
            search: true,
            span: 18,
            type: "textarea",
            minRows: 6,
            maxRows: 6,
            rules: [
              {
                required: true,
                message: "请输入流程描述",
                trigger: "blur",
              },
            ],
          },
        ],
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    beforeClose(done, type) {
      if (type=='view') return done()
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getList() {
      this.loading = true;
      const data = Object.assign(
        {
          pageNum: this.page.currentPage,
          pageSize: this.page.pageSize,
        },
        this.params
      );
      this.data = [];
      getList(data).then((res) => {
        const data = res.data.data;
        this.loading = false;
        this.page.total = data.total;
        const result = data.list;
        this.data = result;
      });
    },
    //前往设置页面
    goSetting(){
      this.$router.push({
        url:''
      })
    },
    //新增提交触发
    rowSave(row, done, loading) {
      add(
        Object.assign(
          {
            createUser: this.userInfo.name,
          },
          row
        )
      )
        .then(() => {
          this.$message.success("新增成功");
          done();
          this.getList();
        })
        .catch(() => {
          loading();
        });
    },
    //修改提交触发
    rowUpdate(row, index, done, loading) {
      update(
        Object.assign(
          {
            updateUser: this.userInfo.name,
          },
          row
        )
      )
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
          return del(row.id);
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
      if (this.selectedRows.length==0) return this.$message.info('您还未选中任何数据！')
      this.$confirm("确认批量删除选中的数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    test(e) {},
  },
};
</script>