//假期类型
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
        v-if="permission.leaveType_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="openDialog()"
        >新增</el-button
      >
      <el-button
        v-if="permission.leaveType_delete"
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
        <el-table-column prop="leaveName" label="假期名称"> </el-table-column>
        <el-table-column prop="area" label="区域">
          <template slot-scope="scope">
            {{ getDicValue(regionList, scope.row.area) }}
          </template>
        </el-table-column>
        <el-table-column prop="leaveUnit" label="请假单位">
          <template slot-scope="scope">
            {{ getDicValue(leaveUnitList, scope.row.leaveUnit) }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="计算假期时长方式">
          <template slot-scope="scope">
            {{ getDicValue(options, scope.row.duration) }}
          </template>
        </el-table-column>
        <el-table-column prop="annualVacationNumber" label="启动假期余额">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.annualVacationNumber"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row, 'annualVacationNumber')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row, 'status')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.leaveType_edit">
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
            <span v-if="permission.leaveType_detail">
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
              v-if="permission.leaveType_delete"
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
        label-width="150px"
        :rules="rules"
        class="form-footer"
        :show-message="false"
      >
        <el-form-item prop="leaveName" label="假期名称:">
          <el-input
            v-if="type !== 'detail'"
            v-model="form.leaveName"
            placeholder="请输入名称"
          ></el-input>
          <span v-else>
            {{ form.leaveName }}
          </span>
        </el-form-item>
        <el-form-item prop="area" label="区域:">
          <el-select
            :disabled="type === 'detail'"
            v-model="form.area"
            placeholder="请选择"
          >
            <el-option
              v-for="item in regionList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="leaveUnit" label="请假单位:">
          <el-select
            :disabled="type === 'detail'"
            v-model="form.leaveUnit"
            placeholder="请选择"
          >
            <el-option
              v-for="item in leaveUnitList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="duration" label="计算请假时长方式:">
          <el-select
            :disabled="type === 'detail'"
            v-model="form.duration"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="annualVacationNumber" label="启用假期余额:">
          <el-switch
            :disabled="type === 'detail'"
            v-model="form.annualVacationNumber"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
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
import {
  leaveTypeGetPage,
  leaveTypeSubmit,
  leaveTypeDelete,
} from "@/api/attendance/index";
import { getDictionary } from "@/api/system/dictbiz";
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
      tableData: [],
      searchDialogVisible: false,
      infoDialogVisible: false,
      type: "", //类型
      rules: {
        leaveName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      multipleSelection: [], //列表选中数据
      regionList: [], //区域下拉数据
      leaveUnitList: [], //请假单位下拉数据
      options: [], //计算请假时长方式下拉数据
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.handleList();
    this.getDiction();
  },
  methods: {
    //列表数据
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await leaveTypeGetPage(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    //字典数据
    async getDiction() {
      Promise.all([
        getDictionary({ code: "hr_region" }),
        getDictionary({ code: "hr_leave_unit" }),
        getDictionary({ code: "hr_calculate_leave_time " }),
      ]).then((values) => {
        this.regionList = values[0].data.data;
        this.leaveUnitList = values[1].data.data;
        this.options = values[2].data.data;
      });
    },
    //重置
    reset() {
      this.searchForm = {};
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
        this.form = deepClone(info);
        this.dateList = [info.startDate, info.endDate];
      } else {
        this.type = "";
        this.form = {};
        this.dateList = [];
      }
      this.infoDialogVisible = true;
    },
    //保存
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请验证必填!",
        });
        return;
      }
      let res = await leaveTypeSubmit(this.form);
      if (res.data.code === 200) {
        this.form = {};
        this.handleList();
        this.$message.success("保存成功");
        this.infoDialogVisible = false;
      }
    },
    //改变状态
    async changeStatus(info, type) {
      let form = {
        id: info.id,
      };
      if (type === "status") {
        form.status = info.status;
      } else {
        form.annualVacationNumber = info.annualVacationNumber;
      }
      let res = await leaveTypeSubmit(form);
      if (res.data.code === 200) {
        form = {};
        this.handleList();
        this.$message.success("修改成功");
      }
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
        const res = await leaveTypeDelete({ ids: ids });
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
    //返回字典名称
    getDicValue(list, key) {
      let name = "";
      list.forEach((el) => {
        if (el.dictKey == key) {
          name = el.dictValue;
          return;
        }
      });
      return name;
    },
  },
  filters: {
    workingAgeName(num) {
      switch (num) {
        case 0:
          return "一年以下";
        case 1:
          return "1-10年";
        case 2:
          return "10-20年";
        case 3:
          return "20年以上";
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
