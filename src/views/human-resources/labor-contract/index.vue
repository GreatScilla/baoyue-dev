<template>
  <div>
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
            新增</el-button
          >
          <el-button type="default" size="small" @click="muiltiDelete"
            >批量删除</el-button
          >
        </template>
        <template slot-scope="scope" slot="contractTypeForm">
          <div>
            <el-select
              v-if="!addContractTypeDialog"
              :value="scope.row.contractType"
              @change="selectType"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.contractType"
                :value="item.contractType"
              ></el-option>
              <el-option label="+新增合同类型" value="-1"></el-option>
            </el-select>
            <div v-else>
              <el-input
                v-model="newContractType"
                placeholder="合同类型"
              ></el-input>
              <el-button type="primary" size="mini" @click="addContractType"
                >确认</el-button
              >
              <el-button
                type="default"
                size="mini"
                @click="handleContractTypeClose"
                >取消</el-button
              >
            </div>
          </div>
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
        <template slot-scope="scope" slot="postForm">
          <div>
            {{ formWorker.post }}
          </div>
        </template>
        <template slot-scope="scope" slot="createUserForm">
          <div>
            {{ form.createUser }}
          </div>
        </template>
        <template slot-scope="scope" slot="createTimeForm">
          <div>
            {{ form.createTime || nowDate }}
          </div>
        </template>
        <!-- <template slot-scope="scope" slot="updaterForm">
        <div>
          {{ form.updaterName || userInfo.real_name }}
        </div>
      </template> -->
        <template slot-scope="scope" slot="uploadForm">
          <div>
            <upload-file
              :status="popStatus == 'view' ? 'pic-list' : ''"
              listType="picture-card"
              :imageList="fileList"
              @on-success="onSuccess"
              @on-remove="onRemove"
            >
            </upload-file>
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
    <!-- <div>
      <el-dialog
        title="新增合同类型"
        :visible.sync="addContractTypeDialog"
        width="30%"
        :modal="false"
        :before-close="handleContractTypeClose"
      >
        <el-input v-model="newContractType" placeholder="合同类型"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleContractTypeClose">取消</el-button>
          <el-button
            type="primary"
            :disabled="!newContractType"
            @click="addContractType"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getList, update, add, del } from "@/views/test.js";
import {
  getList,
  submit,
  del,
  getContractType,
  addContractType,
} from "@/api/humanResources/labor-contract.js";
import { getEmployeeList } from "@/api/humanResources/employeeFile.js";
import { dateFormat } from "@/util/date.js";
import uploadFile from "@/components/uploadFileN.vue";
export default {
  components: {
    uploadFile,
  },
  data() {
    return {
      addContractTypeDialog: false,
      newContractType: "",
      page: {},
      form: {
        jobNumber: "",
      },
      params: {},
      loading: false,
      data: [],
      selectedRows: [],
      searchShow: false,
      fileList: [],
      nowDate: "",
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
        typeList: [
          {
            label: "劳动合同",
            value: "劳动合同",
          },
          {
            label: "实习合同",
            value: "实习合同",
          },
          {
            label: "兼职合同",
            value: "兼职合同",
          },
          {
            label: "员工守秘合同",
            value: "员工守秘合同",
          },
          {
            label: "其他合同",
            value: "其他合同",
          },
        ],
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
            label: "职务",
            prop: "post",
            formslot: true,
            search: true,
          },
          {
            label: "合同甲方",
            prop: "contractOwner",
            rules: [
              {
                required: true,
                message: "请输入合同甲方",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同备案甲编号",
            prop: "recordNumber",
            labelWidth: 130,
            rules: [
              {
                required: true,
                message: "请输入合同备案甲编号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同状态",
            prop: "contractState",
            type: "select",
            dicData: [
              {
                label: "新签",
                value: "新签",
              },
              {
                label: "续签",
                value: "续签",
              },
              {
                label: "变更",
                value: "变更",
              },
              {
                label: "中止",
                value: "中止",
              },
              {
                label: "解除",
                value: "解除",
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择合同状态",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同备案日期",
            prop: "recordNumberTime",
            type: "datetime",
            labelWidth: 120,
            width: 120,
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择合同备案日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同类型",
            prop: "contractType",
            type: "select",
            formslot: true,
            rules: [
              {
                required: true,
                message: "请选择合同类型",
                trigger: "submit",
              },
            ],
          },
          {
            label: "合同期限",
            prop: "contractPeriod",
            type: "select",
            dicData: [
              {
                label: "一年",
                value: "一年",
              },
              {
                label: "两年",
                value: "两年",
              },
              {
                label: "三年",
                value: "三年",
              },
              {
                label: "五年",
                value: "五年",
              },
              {
                label: "无固定期限",
                value: "无固定期限",
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择合同期限",
                trigger: "blur",
              },
            ],
          },
          {
            label: "试用开始日期",
            prop: "trialStartTime",
            type: "datetime",
            labelWidth: 120,
            width: 120,
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择试用开始日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "试用结束日期",
            prop: "trialEndTime",
            type: "datetime",
            labelWidth: 120,
            width: 120,
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择试用结束日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同开始日期",
            prop: "contractStartTime",
            type: "datetime",
            labelWidth: 120,
            width: 120,
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择合同开始日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "合同结束日期",
            prop: "contractEndTime",
            type: "datetime",
            labelWidth: 120,
            width: 120,
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择合同结束日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "制单人",
            prop: "createUser",
            editDisplay: false,
            formslot: true,
          },
          {
            label: "创建日期",
            prop: "createTime",
            width: 120,
            editDisplay: false,
            formslot: true,
          },
          {
            label: "更新人",
            prop: "updateUser",
            addDisplay: false,
            editDisplay: false,
            formslot: true,
          },
          {
            label: "更新日期",
            prop: "updateTime",
            width: 120,
            addDisplay: false,
            editDisplay: false,
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
          {
            label: "附件",
            prop: "upload",
            span: 24,
            hide: true,
            formslot: true,
            viewslot: true,
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
        post: x.postName,
      }));
    });
    this.nowDate = dateFormat(new Date(), "yyyy-MM-dd");
    this.getContractType();
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
    onSuccess(value) {
      this.fileList.push(value);
    },
    onRemove(fl) {
      this.fileList = fl;
    },
    openSearchPop() {
      this.$refs.crud.$refs.headerSearch.searchShow =
        !this.$refs.crud.$refs.headerSearch.searchShow;
      this.searchShow = !this.searchShow;
    },
    beforeOpen(done, type) {
      this.popStatus = type;
      if (type == "add") this.fileList = [];
      if (type == "edit")
        this.fileList = this.form.file ? this.form.file.split(",") : [];
      done();
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
        ...this.formWorker,
        file: this.fileList.join(","),
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
    getContractType() {
      getContractType().then((res) => {
        this.typeList = res.data.data;
      });
    },
    selectType(e) {
      console.log(e);
      if (e == -1) return (this.addContractTypeDialog = true);
      this.form.contractType = e;
    },
    addContractType() {
      addContractType({
        contractType: this.newContractType,
      }).then((res) => {
        this.$message.success("添加成功");
        this.handleContractTypeClose();
      });
    },
    handleContractTypeClose() {
      this.addContractTypeDialog = false;
      this.newContractType = "";
    },
  },
};
</script>