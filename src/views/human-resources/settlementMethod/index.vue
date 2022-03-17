// 结算方式
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.storageLocation_search"
      >
        查 询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleOpenDialog('add')"
        v-if="permission.settlementMethod_add"
      >
        新 增
      </el-button>
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelSettlementMethod"
        v-if="permission.settlementMethod_delete"
      >
        批量删除
      </el-button>
      <!-- <el-button size="small" icon="el-icon-check" type="success" plain @click="enable" v-if="permission.settlementMethod_enable">
        启用/停用
      </el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <!-- <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="handleOpenDialog('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelSettlementMethod">删除</el-button>
      <el-button size="small" type="success" plain @click="enable">启用/停用</el-button>
    </el-row> -->
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="settlementMethodTableData"
      border
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            class="switch"
            v-model="scope.row.status"
            inactive-color="#FF4949"
            :active-value="0"
            :inactive-value="1"
            @change="
              (value) => {
                handleSwitchChange(value, scope.row);
              }
            "
          >
          </el-switch>
          <!-- <span :class="[scope.row.status === 0 ? 'normalColor' : 'setOutColor']">
            {{ scope.row.status | status}}
          </span> -->
        </template>
      </el-table-column>
      <el-table-column prop="codeSn" label="编号"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column width="150" label="操作" fixed="right">
        <template slot-scope="scope">
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
              @click="handleOpenDialog('edit', scope.row)"
              v-if="permission.settlementMethod_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.settlementMethod_edit &&
              permission.settlementMethod_details
            "
          ></el-divider>
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
              @click="handleOpenDialog('details', scope.row)"
              v-if="permission.settlementMethod_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider
            direction="vertical"
            v-if="
              permission.settlementMethod_details &&
              permission.settlementMethod_delete
            "
          ></el-divider>
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
              @click="handleDelSettlementMethod(scope.row)"
              v-if="permission.settlementMethod_delete"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
      >
      </el-pagination>
    </el-row>
    <!-- 新增 -->
    <el-dialog
      :title="elDialogTitle"
      append-to-body
      width="40%"
      :visible.sync="settlementMethodDialogVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="settlementMethodForm"
        label-position="right"
        label-width="100px"
        ref="settlementMethodForm"
        :rules="rules"
        :inline-message="true"
      >
        <el-form-item
          label="方式编号:"
          prop="codeSn"
          v-if="settlementMethodForm.codeSn"
        >
          <span v-if="operationState === 'details'">{{
            settlementMethodForm.codeSn
          }}</span>
          <el-input
            v-else
            size="small"
            :disabled="true"
            v-model="settlementMethodForm.codeSn"
          >
          </el-input>
        </el-form-item>
        <el-form-item required label="方式名称:" prop="name">
          <span v-if="operationState === 'details'">{{
            settlementMethodForm.name
          }}</span>
          <el-input
            v-else
            size="small"
            v-model="settlementMethodForm.name"
            placeholder="请输入方式名称"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="operationState !== 'details'"
      >
        <el-button @click="cancel" size="small"> 取 消 </el-button>
        <el-button
          type="primary"
          size="small"
          @click="confimsettlementMethodDialogVisible"
        >
          保 存
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose1"
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
        <el-form-item label="状态">
          <el-select
            size="small"
            v-model="searchForm.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-select
            size="small"
            v-model="searchForm.name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in paymentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码">
          <el-input
            placeholder="请输入编码"
            v-model="searchForm.codeSn"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset1" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getSettlementMethod,
  addEditSettlementMethod,
  delSettlementMethod,
  enableSettlementMethod,
} from "@/api/base-data/settlementMethod";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import { getPaymentTypeList } from "@/api/common.js";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      statusOptions: [
        { value: 0, label: "正常" },
        { value: 1, label: "禁用" },
      ],
      paymentOptions: [],
      searchForm: {},
      searchDialogVisible: false,
      settlementMethodTableData: [],
      settlementMethodForm: {},
      settlementMethodDialogVisible: false,
      operationState: "",
      ids: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入方式名称",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  async created() {
    this.handleList();
    const res = await getPaymentTypeList();
    console.log(res);
    this.paymentOptions = res.data.data;
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    elDialogTitle: function () {
      switch (this.operationState) {
        case "add":
          return "结算方式-新增";
          break;
        case "edit":
          return "结算方式-编辑";
          break;
        case "details":
          return "结算方式-详情";
          break;
      }
    },
  },
  methods: {
    handleClose1() {
      this.searchDialogVisible = false;
    },
    // 搜索
    searchRole() {
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset1() {
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getSettlementMethod(params);
      this.settlementMethodTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 新增编辑
    async handleOpenDialog(operationState, row) {
      this.settlementMethodDialogVisible = true;
      this.operationState = operationState;
      if (this.operationState !== "add") {
        this.$nextTick(() => {
          this.settlementMethodForm = JSON.parse(JSON.stringify(row));
        });
      } else {
        this.settlementMethodForm = {
          codeName: "结算方式",
        };
      }
    },
    // 启用状态
    async handleSwitchChange(value, row) {
      if (value === 0) {
        row.status = 1;
      } else {
        row.status = 0;
      }
      let res = await enableSettlementMethod({ ids: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.handleList();
      }
    },
    // 确认新增修改
    async confimsettlementMethodDialogVisible() {
      try {
        await this.$refs.settlementMethodForm.validate();
      } catch (error) {
        return;
      }

      let res = await addEditSettlementMethod(this.settlementMethodForm);

      if (res.data.success) {
        this.$message.success("操作成功");
        this.closeInitDialog();
        this.handleList();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 选择表格
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 启用
    async enable() {
      if (this.ids.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      try {
        await this.$confirm("确定要启用/停用该科目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await enableSettlementMethod({ ids: this.ids });
        if (res.data.success) {
          this.$message.success("操作成功");
          this.handleList();
        }
      } catch (error) {
        console.error(error);
        this.$message.info("已取消");
      }
    },
    // 删除
    async handleDelSettlementMethod(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      try {
        await this.$confirm("确定要删除该结算方式吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delSettlementMethod({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        console.log(error, "error");
        this.$message.info("已取消删除");
      }
    },
    // 取消
    cancel() {
      this.closeInitDialog();
    },
    // 关闭
    handleClose() {
      this.closeInitDialog();
    },
    // 表单初始
    closeInitDialog() {
      this.$refs.settlementMethodForm.resetFields();
      this.settlementMethodDialogVisible = false;
    },
  },
  filters: {
    status: function (value) {
      if (value === 0) {
        value = "正常";
      } else if (value === 1) {
        value = "停用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
.normalColor {
  color: #13ce66;
}
.setOutColor {
  color: #ff4949;
}
</style>