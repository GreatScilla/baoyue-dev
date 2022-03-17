// 年假有效期设置
<template>
  <basic-container>
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="年份">
          <el-date-picker
            value-format="yyyy"
            v-model="searchForm.years"
            type="year"
            placeholder="选择年份"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <!-- <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      > -->
      <el-button
        v-if="permission.annualLeaveValid_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="openDialog()"
        >新增</el-button
      >
      <el-button
        v-if="permission.annualLeaveValid_delete"
        size="small"
        @click="handleDelete()"
        >批量删除
      </el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="years" label="年份"> </el-table-column>
        <el-table-column prop="startDate" label="生效日期"> </el-table-column>
        <el-table-column prop="endDate" label="失效日期"> </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.annualLeaveValid_edit">
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
                  @click="openDialog(scope.row, 'edit')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.annualLeaveValid_detail">
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
                  @click="openDialog(scope.row, 'detail')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.annualLeaveValid_delete"
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
    <el-dialog
      class="search-dialog"
      :visible.sync="infoDialogVisible"
      :before-close="handleClose"
      :title="getTypeName(this.type)"
      append-to-body
      width="680px"
    >
      <el-form
        ref="ruleForm"
        :model="form"
        label-width="100px"
        :rules="rules"
        class="form-footer"
        :show-message="false"
      >
        <el-form-item prop="years" label="年份:">
          <el-date-picker
            :disabled="type === 'detail'"
            v-model="form.years"
            value-format="yyyy"
            type="year"
            placeholder="选择年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item required label="日期">
          <el-date-picker
            :disabled="type === 'detail'"
            value-format="yyyy-MM-dd"
            v-model="dateList"
            type="daterange"
            range-separator="至"
            start-placeholder="生效日期"
            end-placeholder="失效日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="infoDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            size="small"
            @click="submit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getPage, submit, validDelete } from "@/api/attendance/index";
import paginationMixin from "@/mixins/pagination";
import { deepClone } from "@/util/util";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      requesting: false,
      searchForm: {},
      form: {},
      dateList: [],
      tableData: [],
      searchDialogVisible: false,
      infoDialogVisible: false,
      type: "", //类型
      rules: {
        years: [{ required: true, message: "请选择", trigger: "change" }],
      },
      multipleSelection: [], //列表选中数据
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.handleList();
  },
  methods: {
    //列表数据
    handleList() {
      let params = { current: this.currentPage, size: this.pageSize };
      getPage(params, this.searchForm)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //重置
    reset() {
      this.searchForm = {};
      this.dateList = [];
      this.handleList();
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //打开弹窗
    openDialog(info, type) {
      if (info) {
        this.type = type;
        this.form = info;
        this.dateList = [info.startDate, info.endDate];
      } else {
        this.type = "";
        this.form = {};
        this.dateList = [];
      }
      this.infoDialogVisible = true;
    },
    //修改
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "年份不能为空",
        });
        return;
      }
      if (this.dateList.length !== 0) {
        this.form.startDate = this.dateList[0];
        this.form.endDate = this.dateList[1];
        let res = await submit(this.form);
        if (res.data.code === 200) {
          this.form = {};
          this.dateList = [];
          this.handleList();
          this.$message.success("保存成功");
          this.infoDialogVisible = false;
        }
      } else {
        this.$message.error("日期不能为空");
      }
      // let form = deepClone(this.form);
      // form.signInTime = form.createTime + " " + form.signInTime;
      // form.signOutTime = form.createTime + " " + form.signOutTime;

      console.log(this.form);
    },
    //删除
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await validDelete({ ids: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error);
        // this.$message.error("已取消删除");
      }
    },
    //返回状态
    getTypeName(type) {
      let name = "";
      if (type === "edit") {
        name = "修改";
      } else if (type === "detail") {
        name = "详情";
      } else {
        name = "新增";
      }
      return name;
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
