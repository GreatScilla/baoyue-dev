// 切补计划单
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
        :label-position="labelPosition"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="切补计划单号:">
          <el-input
            placeholder="请输入切补计划单号"
            v-model="searchForm.cutMendSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="权重等级:">
          <el-select
            size="small"
            v-model="searchForm.weight"
            placeholder="请选择"
          >
            <el-option
              v-for="item in weightList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态:">
          <el-select
            size="small"
            v-model="searchForm.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下发状态:">
          <el-select
            size="small"
            v-model="searchForm.downStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in downStatusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <!-- <el-button
        size="small"
        v-if="permission.cutMendPlanOrder_add"
        type="primary"
        @click="add"
        icon="el-icon-plus"
        >新增</el-button
      > -->
      <el-button
        v-if="permission.cutMendPlanOrder_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button size="small" @click="handleDelete()"> 批量删除 </el-button> -->
      <el-button
        v-if="permission.cutMendPlanOrder_export"
        style="margin-left: 10px"
        size="small"
        plain
        @click="exports(exportApi, searchForm)"
      >
        导出
      </el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column prop="cutMendSn" label="切补计划单号">
          <template slot-scope="scope">
            <el-tooltip :manual="true" v-model="scope.row.showIndex">
              <div slot="content" style="font-size: 14px">
                <div style="padding: 0 0 10px 0; font-size: 16px">
                  切补产品信息
                </div>
                <table
                  border="1px solid #dedede"
                  id="Aclass"
                  cellpadding="1"
                  cellspacing="1"
                  align="center"
                  bgcolor="#303133"
                >
                  <tr bgcolor="#303133">
                    <td>原产品编码</td>
                    <td>原产品名称</td>
                    <td>原规格型号</td>
                    <td>原数量(方)</td>
                    <td>修正产品编码</td>
                    <td>修正产品名称</td>
                    <td>修正规格型号</td>
                    <td>修正数量(方)</td>
                    <td>预进库位</td>
                  </tr>
                  <tr v-if="scope.row.newProduct.length == 0">
                    <td colspan="8" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.newProduct"
                    :key="index"
                  >
                    <td width="auto">{{ scope.row.materialSn }}</td>
                    <td width="auto">{{ scope.row.materialName }}</td>
                    <td width="auto">{{ scope.row.model }}</td>
                    <td width="auto">{{ scope.row.sum }}</td>
                    <td width="auto">{{ item.materialSnNew }}</td>
                    <td width="auto">{{ item.materialNameNew }}</td>
                    <td width="auto">{{ item.modelNew }}</td>
                    <td width="auto">{{ item.sumNew }}</td>
                    <td width="auto">{{ item.location }}</td>
                  </tr>
                </table>
              </div>
              <div
                @mouseenter="mouseenter(scope.row.id)"
                @mouseleave="mouseLeave"
              >
                {{ scope.row.cutMendSn }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="下发状态">
          <template slot-scope="scope">
            {{ scope.row.downStatus | issuedName }}
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重等级">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.weight == '1'
                  ? 'danger'
                  : scope.row.weight == '2'
                  ? 'warning'
                  : ''
              "
              disable-transitions
              >{{ scope.row.weight | weightName }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="单据日期"></el-table-column>
        <el-table-column
          prop="deliveryDate"
          label="预计完成时间"
        ></el-table-column>
        <el-table-column width="140" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.cutMendPlanOrder_audit">
              <el-tooltip
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
                  :disabled="
                    scope.row.status != 0 || scope.row.updateStatus == 0
                  "
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.cutMendPlanOrder_toIssued">
              <el-tooltip
                class="item"
                effect="dark"
                content="下发"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-set-up"
                  @click="toDistribution(scope.row)"
                  :disabled="scope.row.status != 2 || scope.row.downStatus == 1"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <router-link
              v-if="permission.cutMendPlanOrder_edit"
              :to="{
                path: '/production-management/cutMendPlanOrder/edit',
                query: { data: scope.row },
              }"
            >
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
                  :disabled="scope.row.status != 0"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              v-if="permission.cutMendPlanOrder_detail"
              :to="{
                path: '/production-management/cutMendPlanOrder/detail',
                query: { data: scope.row },
              }"
            >
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
                ></el-button>
              </el-tooltip>
              <!-- <el-divider direction="vertical"></el-divider> -->
            </router-link>
            <!-- <el-tooltip
              v-if="permission.cutMendPlanOrder_delete"
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
            </el-tooltip> -->
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
  </basic-container>
</template>
<script>
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import {
  getCutMendPlanByPage,
  cutMendPlanUpdateStatus,
  cutMendPlanUpdateDownStatus,
  getCutMendPlanExport,
  getCutMendPlanByPageDetail,
} from "@/api/manufacture/cutMendPlanOrder";
import { getShiftList } from "@/api/humanResources/shift";
import { mapGetters } from "vuex";
import exportMixin from "@/mixins/reportForm";
export default {
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      deleteApi: "",
      auditApi: cutMendPlanUpdateStatus,
      exportApi: getCutMendPlanExport,
      ids: [], //id
      teamList: [],
      weightList: [
        { code: "1", name: "A" },
        { code: "2", name: "B" },
        { code: "3", name: "C" },
      ],
      downStatusList: [
        { code: "0", name: "未下发" },
        { code: "1", name: "已下发" },
      ],
      statusList: [
        { code: "0", name: "未提交" },
        { code: "1", name: "待审核" },
        { code: "2", name: "已审核" },
        { code: "3", name: "审核未通过" },
      ],
      form: {},
      labelPosition: "right",
      searchForm: {},
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.handleList(this.searchForm);
  },
  methods: {
    // 跳转新增
    add() {
      this.$router.push("/production-management/cutMendPlanOrder/add");
    },
    //跳转下发
    toDistribution(row) {
      this.$confirm("确定要下发吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cutMendPlanUpdateDownStatus({ id: row.id })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.handleList();
                this.$message.success("下发成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await getCutMendPlanByPage(params);
      res.data.data.records.forEach((item) => {
        item.showIndex = false;
      });
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    async mouseenter(id) {
      this.tableData.map((item, index) => {
        //  item.newProduct.splice(this.$refs.td[index], 1)
        if (id == item.id) {
          console.log(id);
          item.showIndex = true;
          getCutMendPlanByPageDetail({ id: id }).then((res) => {
            this.tableData[index].newProduct = res.data.data.newProduct;
          });
        }
      });
    },

    mouseLeave() {
      this.tableData.map((item) => {
        item.showIndex = false;
      });
    },
  },
  filters: {
    statusName(value) {
      //status	审核状态 0 未提交 1 待审核 2 已审核 3 审核未通过
      if (value == 0) {
        value = "未提交";
      } else if (value == 1) {
        value = "待审核";
      } else if (value == 2) {
        value = "已审核";
      } else if (value == 3) {
        value = "审核未通过";
      }
      return value;
    },
    issuedName(value) {
      if (value == 0) {
        value = "未下发";
      } else if (value == 1) {
        value = "已下发";
      }
      return value;
    },
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
#Aclass {
  td {
    padding: 5px;
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
}
</style>
