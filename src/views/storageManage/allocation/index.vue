// 库存调拨
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.allocation_search"
        >查 询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        v-if="permission.allocation_add"
        >新 增</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-s-check"
        type="primary"
        plain
        @click="examine"
        v-if="permission.allocation_examine"
        >批量提交审核</el-button
      > -->
      <!-- <el-button size="small" icon="el-icon-upload2" type="success" plain v-if="permission.allocation_export">导 出</el-button>
      <el-button size="small" icon="el-icon-printer" type="primary" plain v-if="permission.allocation_print">打 印</el-button>-->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="allocationTableData"
        border
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="procCode" label="单据状态">
          <template slot-scope="scope">{{
            scope.row.status | approvalName
          }}</template>
        </el-table-column>
        <el-table-column prop="number" label="单据编号" width="150">
          <template slot-scope="scope">
            <el-tooltip>
              <div slot="content" style="font-size: 14px">
                <div style="padding: 0 0 10px 0; font-size: 16px">产品信息</div>
                <table
                  border="1px solid #dedede"
                  id="Aclass"
                  cellpadding="1"
                  cellspacing="1"
                  align="center"
                  bgcolor="#303133"
                >
                  <tr bgcolor="#303133">
                    <td>产品编码</td>
                    <td>产品名称</td>
                    <td>规格型号</td>
                    <td>单位</td>
                    <td>调出仓库</td>
                    <td>调入仓库</td>
                    <td>数量</td>
                  </tr>
                  <tr v-if="scope.row.depotItemList.length == 0">
                    <td colspan="7" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.depotItemList"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.productCate }}</td>
                    <td width="auto">{{ item.unit }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.anotherDepotName }}</td>
                    <td width="auto">{{ item.operNumber }}</td>
                  </tr>
                </table>
              </div>
              <div>{{ scope.row.number }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="单据日期"
          width="150"
        ></el-table-column>
        <el-table-column prop="allotType" label="调拨类型">
          <template slot-scope="scope">
            <span v-if="scope.row.allotType == 1"> 库内调拨 </span>
            <span v-if="scope.row.allotType == 2"> 库外调拨 </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="processTypeName" label="调出"></el-table-column>
        <el-table-column prop="processTypeName" label="调入"></el-table-column> -->
        <el-table-column prop="createUser" label="制单人"></el-table-column>
        <el-table-column prop="checkPerson" label="审核人"></el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
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
                @click="examine(scope.row)"
                :disabled="!(scope.row.status === 0)"
              >
              </el-button>
            </el-tooltip>
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
                :disabled="!(scope.row.status === 0)"
                @click="edit(scope.row)"
                v-if="permission.allocation_edit"
              ></el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.allocation_edit && permission.allocation_details"
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
                @click="detail(scope.row)"
                v-if="permission.allocation_details"
              ></el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="
                permission.allocation_details && permission.allocation_delete
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
                :disabled="!(scope.row.status === 0)"
                @click="handleDelInboundManage(scope.row)"
                v-if="permission.allocation_delete"
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
    <!-- 查询 -->
    <!-- <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    ></search> -->
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
        <el-form-item label="单据日期">
          <el-date-picker
            v-model="billDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调拨类型">
          <el-select v-model="searchForm.allotType" placeholder="请选择">
            <el-option
              v-for="item in allotTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出仓库">
          <el-select v-model="searchForm.goDepotId" placeholder="请选择">
            <el-option
              v-for="item in goDepotIdList"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调入仓库">
          <el-select v-model="searchForm.anotherDepotId" placeholder="请选择">
            <el-option
              v-for="item in goDepotIdList"
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
            v-model="searchForm.createUser"
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
import {
  getInAndOutBoundPage,
  examineInAndOutBoundPage,
  delInAndOutBoundPage,
} from "@/api/storageManage/inAndOutBound";
import { getDictionary } from "@/api/system/dictbiz";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import paginationMixin from "@/mixins/pagination";
import search from "@/components/search/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  components: {
    search,
  },
  data() {
    return {
      searchForm: {},
      recordForm: {}, //暂存数据
      allocationTableData: [],
      ids: [],
      tableRowData: [],
      allotTypeList: [
        { name: "库内调拨", value: 1 },
        { name: "库外调拨", value: 2 },
      ],
      goDepotIdList: [],
      inAndOutBoundCategoryOptions: [],
      billDate: [],
      allocationOptions: [
        {
          value: 0,
          label: "待入库",
        },
        {
          value: 1,
          label: "已入库",
        },
      ],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑库存调拨" || from.name === "库存调拨详情") {
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
    await this.handleList(this.searchForm);
    await this.initSearchCondition();
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        type: "调拨",
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      let res = await getInAndOutBoundPage(params);
      this.allocationTableData = res.data.data.records;
      this.allocationTableData.forEach((item) => {
        if (item.file) {
          item.file = item.file.split(",");
        }
      });
      this.total = res.data.data.total;
    },
    // 初始查询条件
    async initSearchCondition() {
      let res = await getWarehouseList();
      this.goDepotIdList = res.data.data;
    },
    // 查询
    onSearch() {
      this.currentPage = 1;
      if (this.billDate) {
        this.searchForm.beginTime = this.billDate[0];
        this.searchForm.endTime = this.billDate[1];
      } else {
        this.searchForm.beginTime = "";
        this.searchForm.endTime = "";
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    // 重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.billDate = [];
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // 获取出入库类别
    async handleResources() {
      let res = await getDictionary({ code: "in_type_class" });
      this.inAndOutBoundCategoryOptions = res.data.data;
    },
    // 审核
    async examine(row) {
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
        await this.$confirm("确定该入库单提交审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await examineInAndOutBoundPage({ ids: ids, type: 3 });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 删除
    async handleDelInboundManage(row) {
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
        this.$message.warning("请选择未审核的单据");
        return;
      }
      try {
        await this.$confirm("确定要删除该入库单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delInAndOutBoundPage({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 选择单据日期
    changeBillDate(value) {
      this.allocationManageForm.beginTime = value[0];
      this.allocationManageForm.endTime = value[1];
    },
    // 选择入库类别
    changeTypeClass(value) {
      let item = this.inAndOutBoundCategoryOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.allocationManageForm.typeClass = item[0].dictValue;
    },
    // 选择表格
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
    // 跳转新增
    add() {
      this.$router.push("/storageManage/allocation/add");
    },
    // 跳转编辑
    edit(row) {
      this.$router.push({
        path: "/storageManage/allocation/edit",
        query: {
          row,
        },
      });
    },
    // 跳转详情
    detail(row) {
      this.$router.push({
        path: "/storageManage/allocation/detail",
        query: {
          row,
        },
      });
    },
  },
  filters: {
    billStatus: function (value) {
      if (value === 0) {
        return "未审核";
      } else {
        return "已审核";
      }
    },
    bePutStatus: function (value) {
      if (value === 0) {
        return "未入库";
      } else {
        return "已入库";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 160px;
}
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
