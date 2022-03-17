<template>
  <div>
    <avue-crud
      ref="crud"
      :option="option"
      :page.sync="page"
      :table-loading="loading"
      :before-open="beforeOpen"
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
        <el-button type="primary" size="small" @click="openSearchPop">
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button type="primary" size="small" @click="$refs.crud.rowAdd()">
          <i class="el-icon-plus"></i>
          新增</el-button
        >
        <el-button type="default" size="small" @click="muiltiDelete"
          >批量删除</el-button
        >
      </template>
      <template slot="insuredRegion" slot-scope="scope">
        {{ scope.row.insuredRegion | area }}
      </template>
      <template slot="insuredRegionForm" slot-scope="scope">
        <el-row>
          <el-cascader
            style="width: 100px; margin-right: 10px"
            size="small"
            ref="companyAddress"
            :options="addressOptions"
            v-model="insuredRegion"
            @change="handleChangeCompanyAddress"
            placeholder="请选择地区"
          ></el-cascader>
        </el-row>
      </template>
      <template slot-scope="scope" slot="nameForm">
        <div>
          {{ formWorkName }}
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
import { regionData, CodeToText } from "element-china-area-data";
import { getList, submit, del } from "@/api/humanResources/insurance.js";
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
      addressOptions: regionData,
      insuredRegion: [],
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
            label: "工号",
            prop: "jobNumber",
            type: "select",
            search: true,
            filterable: true,
            searchFilterable: true,
            slot: true,
            span: 12,
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
            label: "参保人",
            prop: "name",
            formslot: true,
            search: true,
          },
          {
            label: "参保地区",
            prop: "insuredRegion",
            search: true,
            formslot: true,
            slot: true,
          },
          {
            label: "开始参保月份",
            prop: "insuredTime",
            type: "datetime",
            labelWidth: 120,
            format: "yyyy-MM",
            rules: [
              {
                required: true,
                message: "请选择开始参保月份",
                trigger: "blur",
              },
            ],
          },
          {
            label: "参保基数",
            prop: "insuredNumber",
            rules: [
              {
                required: true,
                message: "请输入参保基数",
                trigger: "blur",
              },
            ],
          },
          {
            label: "个人缴纳",
            prop: "individualPay",
            rules: [
              {
                required: true,
                message: "请输入个人缴纳",
                trigger: "blur",
              },
            ],
          },
          {
            label: "企业缴纳",
            prop: "companiesPay",
            rules: [
              {
                required: true,
                message: "请输入企业缴纳",
                trigger: "blur",
              },
            ],
          },
          {
            label: "制单人",
            prop: "createUser",
            formslot: true,
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
        id: x.id,
        numName: x.jobNumber + " " + x.name,
        name: x.name,
        jobNumber: x.jobNumber,
      }));
    });
  },
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
    beforeOpen(done, type) {
      if (type !== "add") {
        console.log(type);
        this.insuredRegion = this.form.insuredRegion.split(",");
      }
      done();
    },
    //新增提交触发
    rowSave(row, done, loading, msg = "新增成功") {
      if (!this.insuredRegion[2]) {
        this.$message.info("请选择参保地区");
        done();
        return;
      }
      console.log(row);
      const params = {
        ...row,
        name: this.formWorkName,
        insuredRegion: this.insuredRegion.join(","),
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
  filters: {
    area(e) {
      try {
        let a = e.split(",");
        return (
          CodeToText[a[0] || ""] +
          " , " +
          CodeToText[a[1] || ""] +
          " , " +
          CodeToText[a[2] || ""]
        );
      } catch (aa) {
        console.log(aa);
      }
    },
  },
};
</script>