// 条件分支
<template>
  <basic-container>
    <el-dialog
      class="form-dialog"
      :visible.sync="infoDialogVisible"
      :before-close="handleClose"
      title="条件分支"
      append-to-body
      width="680px"
    >
      <el-form ref="form" :model="form" label-width="160px" class="form-footer">
        <el-form-item required label="条件名称">
          <el-input
            class="ipt_320"
            :disabled="type === 'detail'"
            v-model="form.conditionsName"
          ></el-input>
        </el-form-item>
        <el-row class="title"> 条件设置 </el-row>
        <el-form-item required label="发起人">
          <el-input
            class="ipt_320"
            v-model="form.conditionsInitiatorName"
            suffix-icon="el-icon-search"
            placeholder="请选择发起人"
            @focus="checkUserVisible = true"
            :disabled="type === 'detail'"
          ></el-input>
        </el-form-item>
        <el-row style="margin-left: 56px"> 且 </el-row>
        <el-form-item required label="条件">
          <el-select
            :disabled="type === 'detail'"
            class="ipt_160"
            v-model="form.daysJudge"
            placeholder="请选择"
            @change="handelCondition"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-input-limit="2"
            :disabled="type === 'detail'"
            class="ipt_120"
            style="margin-left: 10px"
            v-model="form.daysNum"
          ></el-input>
          <el-input
            v-input-limit="2"
            :disabled="type === 'detail'"
            v-if="form.daysJudge === '6'"
            class="ipt_120"
            style="margin-left: 10px"
            v-model="form.daysNumEnd"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="250px" class="search-footer">
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            :loading="requesting"
            size="small"
            @click="onSumbit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <!-- <el-button
        v-if="permission.laboratory_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      > -->
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="addBranch"
        >添加条件分支</el-button
      >
      <!-- <el-button
        v-if="permission.laboratory_delete"
        plain
        size="small"
        @click="handleDelRole()"
        >批量删除</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="conditionsName" label="条件名称">
        </el-table-column>
        <el-table-column prop="remark" label="条件设置">
          <template slot-scope="scope">
            <div v-if="scope.row.daysJudgeEnd">
              {{ scope.row.daysJudge | judgeName }} {{ scope.row.daysNum }},
              {{ scope.row.daysJudgeEnd | judgeName }}
              {{ scope.row.daysNumEnd }}
            </div>
            <div v-else>
              {{ scope.row.daysJudge | judgeName }}: {{ scope.row.daysNum }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span>
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
                  @click="addBranch(scope.row, 'edit')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <sapn>
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                  @click="addBranch(scope.row, 'detail')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </sapn>
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
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-row>
    <!-- 选择执行人弹窗 -->
    <leadingCadres
      title="发起人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />
  </basic-container>
</template>

<script>
import { getList, submit, update, remove } from "@/api/flow2/conditionBranch";
import leadingCadres from "@/components/quality/leadingCadres";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  components: { leadingCadres },
  data() {
    return {
      requesting: false,
      searchForm: {},
      form: {
        daysNum: "",
        daysNumEnd: "",
      },
      tableData: [],
      options: [
        {
          value: "1",
          label: "小于",
        },
        {
          value: "2",
          label: "大于",
        },
        {
          value: "3",
          label: "小于等于",
        },
        {
          value: "4",
          label: "等于",
        },
        {
          value: "5",
          label: "大于等于",
        },
        {
          value: "6",
          label: "介于两个数之间",
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
      infoDialogVisible: false,
      checkUserVisible: false, //发起人弹窗
      type: "",
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.handleList();
  },
  methods: {
    //新增发起
    addBranch(data, type) {
      if (type) {
        let info = JSON.parse(JSON.stringify(data));
        this.type = type;
        if (info.daysJudgeEnd) {
          info.daysJudge = "6";
        }
        this.form = info;
        this.infoDialogVisible = true;
      } else {
        this.type = "";
        this.form = {
          daysNum: "",
          daysNumEnd: "",
        };
        this.infoDialogVisible = true;
      }
    },
    //选择发起人
    addUser(list) {
      let idList = [];
      let nameList = [];
      list.forEach((res) => {
        idList.push(res.id);
        nameList.push(res.name);
      });
      this.form.conditionsInitiatorId = idList.join(",");
      this.form.conditionsInitiatorName = nameList.join(",");
    },
    //条件选择
    handelCondition() {
      this.form.daysNum = "";
      this.form.daysNumEnd = "";
    },
    //提交
    async onSumbit() {
      if (
        !this.form.conditionsName ||
        !this.form.conditionsInitiatorName ||
        !this.form.daysJudge ||
        !this.form.daysNum ||
        (this.form.daysJudge === "6" && !this.form.daysNumEnd)
      ) {
        return this.$message.error("请验证必填!");
      }
      if (
        this.form.daysJudge === "6" &&
        (Number(this.form.daysNum) > Number(this.form.daysNumEnd) ||
          this.form.daysNum === this.form.daysNumEnd)
      ) {
        console.log(this.form);
        return this.$message.error("条件中第一条数据应该小于第二条数据!");
      }

      var infoForm = JSON.parse(JSON.stringify(this.form));
      if (this.form.daysJudge === "6") {
        infoForm.daysJudge = 5;
        infoForm.daysJudgeEnd = 3;
      } else {
        infoForm.daysJudgeEnd = "";
        infoForm.daysNumEnd = "";
      }
      let submitApi = submit;
      if (this.type === "edit") {
        submitApi = update;
      }
      const res = await submitApi(infoForm);
      this.requesting = true;
      if (res.data.code === 200) {
        this.requesting = false;
        this.form = {};
        this.handleList();
        this.infoDialogVisible = false;
        this.$message.success("保存成功");
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      };
      const res = await getList(params, this.searchForm);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
    },

    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove({ idList: ids })
            .then((res) => {
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole(row.id);
    },
    // 多行删除
    handleDelRole() {
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids, join(","));
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/laboratory/add");
    },
  },
  filters: {
    judgeName(val) {
      switch (val) {
        case "1":
          return "小于";

        case "2":
          return "大于";

        case "3":
          return "小于等于";
        case "4":
          return "等于";
        case "5":
          return "大于等于";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 650;
  line-height: 24px;

  color: #303133;
}
.ipt_320 {
  width: 320px;
}
.ipt_160 {
  width: 160px;
}
.ipt_120 {
  width: 120px;
}
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.search-footer {
  margin: 20px 0 0;
}
</style>
