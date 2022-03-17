// 库存盘点
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.inventoryCheck_expore"
        size="small"
        type="primary"
        @click="searchDialogVisible = true"
        icon="el-icon-search"
        >查询</el-button
      >
      <el-button
        v-if="permission.inventoryCheck_add"
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="add"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.inventoryCheck_audit"
        icon="el-icon-s-check"
        plain
        size="small"
        type="success"
        @click="handleAudit"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.inventoryCheck_delete"
        icon="el-icon-delete"
        plain
        size="small"
        type="success"
        @click="handleDelRole"
        >删除
      </el-button>
      <!--      <el-button size="small" type="danger" plain   icon="el-icon-upload2">导出</el-button-->
      <!--      >-->
      <!--      <el-button size="small" type="danger" plain   icon="el-icon-printer"-->
      <!--      >打印</el-button-->
      <!--      >-->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="单据状态">
          <template slot-scope="scope">
            <div>{{ scope.row.status | approvalName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="file" label="附件"> </el-table-column>
        <el-table-column prop="number" label="单据号"> </el-table-column>
        <el-table-column prop="handsPersonName" label="经手人">
        </el-table-column>
        <el-table-column prop="depotName" label="仓库"> </el-table-column>
        <el-table-column prop="deptName" label="经手部门"> </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.inventoryCheck_audit"
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                :loading="auditLoading"
                @click="handleAudit(scope.row)"
                :disabled="!(scope.row.status === 0)"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.adjustment_edit && permission.adjustment_details"
            ></el-divider>
            <el-tooltip
              v-if="permission.inventoryCheck_edit"
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/inventoryCheck/edit',
                  query: { data: scope.row },
                }"
              >
                <el-button
                  :disabled="!(scope.row.status === 0)"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                >
                </el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              v-if="permission.inventoryCheck_edit"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.inventoryCheck_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <router-link
                :to="{
                  path: '/storageManage/inventoryCheck/detail',
                  query: { data: scope.row },
                }"
              >
                <el-button type="text" size="small" icon="el-icon-tickets">
                </el-button>
              </router-link>
            </el-tooltip>
            <el-divider
              v-if="permission.inventoryCheck_detail"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.inventoryCheck_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                :disabled="!(scope.row.status === 0)"
                @click="handleDelete(scope.$index, scope.row)"
              >
              </el-button>
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
      >
      </el-pagination>
    </el-row>

    <!-- 查询 -->
    <!-- <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search> -->
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
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点仓库">
          <el-select v-model="searchForm.depotId" placeholder="请选择">
            <el-option
              v-for="item in depotIdList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input
            placeholder="请输入制单人"
            v-model="searchForm.createUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input
            placeholder="请输入审核人"
            v-model="searchForm.checkPerson"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import { page, remove, audits } from "@/api/storageManage/inventoryCheck";
import { getDepot } from "@/api/common";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchDialogVisible: false,
                auditLoading:false,
      column: [
        {
          label: "开始日期",
          "value-format": "yyyy-MM-dd HH:mm:ss",
          prop: "startTime",
          type: "date",
        },
        {
          label: "结束日期",
          "value-format": "yyyy-MM-dd HH:mm:ss",
          prop: "endTime",
          type: "date",
        },
      ],
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      ids: [],
      tableRowData: [],
      depotIdList: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑库存盘点" || from.name === "库存盘点详情") {
      recordObj = JSON.parse(sessionStorage.getItem("recordForm"));
      next();
    } else {
      recordObj = "";
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
    const getDepotRes = await getDepot();
    if (getDepotRes.data.code === 200) {
      this.depotIdList = getDepotRes.data.data;
      console.log(this.depotIdList);
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    // 查询
    onSearch() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 审核
    async handleAudit(row) {
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
      let flag = this.tableRowData.filter((item) => {
        return item.status !== 0;
      });
      if (flag.length > 0) {
        this.$message.warning("请选择未提交的单据");
        return;
      }

      try {
        await this.$confirm("确定数据提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.auditLoading = true
        const res = await audits({ ids: ids });
        if (res.data.code === 200) {
          this.auditLoading = false
          this.$message.success("操作成功");
          this.ids = "";
          await this.handleList();
        }
      } catch (error) {
        this.auditLoading = false
        console.log(error);
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.tableRowData = value;
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 列表
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize, type: 1 };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      page(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //删除角色
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove({ ids: ids })
            .then((res) => {
              if (res.data.success) {
                this.handleList();
                this.$message.success(res.data.msg);
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
    handleDelete(index, row) {
      this.funDelRole(row.id);
    },
    // 多行删除
    handleDelRole() {
      this.funDelRole(this.ids);
    },
    // 删除
    add() {
      this.$router.push("/storageManage/inventoryCheck/add");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
