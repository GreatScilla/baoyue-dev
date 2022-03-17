// 资产管理
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
      <el-form ref="form" :model="form" label-width="90px" class="form-footer">
        <el-form-item label="运行状态:" prop="runningStatus">
          <el-select v-model="form.runningStatus">
            <el-option :value="0" label="正常"></el-option>
            <el-option :value="1" label="保养中"></el-option>
            <el-option :value="2" label="维修中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="form.status">
            <el-option :value="0" label="闲置"></el-option>
            <el-option :value="1" label="使用中"></el-option>
            <el-option :value="2" label="已报废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产编号:" prop="assetSn">
          <el-input
            placeholder="请输入资产编号"
            v-model="form.assetSn"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号:" prop="facilitySn">
          <el-input
            placeholder="请输入设备编号"
            v-model="form.facilitySn"
          ></el-input>
        </el-form-item>
        <el-form-item label="资产类别:" prop="assetType">
          <el-input
            placeholder="请输入资产类别"
            v-model="form.assetType"
          ></el-input>
        </el-form-item>
        <el-form-item label="权属人员:" prop="whomBelongs">
          <el-input
            placeholder="请输入权属人员"
            v-model="form.whomBelongs"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="销售员:" prop="salesMan">
          <el-input
            placeholder="请输入销售员"
            v-model="form.salesMan"
          ></el-input>
        </el-form-item>
        <el-form-item label="单据日期:">
          <el-date-picker
            @change="changeTime"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item class="search-footer">
          <el-button @click="handleReset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row class="operation-function">
      <el-button
        v-if="permission.assetsParameter_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.assetsParameter_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <el-button
        v-if="permission.assetsParameter_card"
        size="small"
        icon="el-icon-postcard"
        type=""
        @click="getPdfCard()"
        >生成资产卡</el-button
      >
      <!-- <el-button
        v-if="permission.salesManage_contract_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      > -->
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter()"
        >打印</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @select="selectData"
        :data="tableData"
        ref="multipleCardTable"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          label="运行状态"
          prop="runningStatusName"
          width="100px"
        >
          <template slot-scope="{ row }">
            <span>{{ row.runningStatus | runningStatusName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusName" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.status | statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="assetPic">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.assetPic"
              style="width: 100px; height: 100px"
              :src="scope.row.assetPic"
              fit="cover"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="assetSn" label="资产编号" width="160px">
        </el-table-column>
        <el-table-column prop="facilitySn" label="设备编号" width="160px">
        </el-table-column>
        <el-table-column prop="assetName" label="资产名称" width="120px">
        </el-table-column>
        <el-table-column prop="assetType" label="资产类别" width="120px">
        </el-table-column>
        <el-table-column prop="model" label="规格型号" width="120px">
        </el-table-column>
        <el-table-column
          prop="qualityAssuranceDate"
          label="质保日期"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="location" label="所在位置"> </el-table-column>
        <el-table-column prop="department" label="权属部门"> </el-table-column>
        <el-table-column prop="whomBelongs" label="权属人员"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.assetsParameter_edit"
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.assetsParameter_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="handleDetail(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.assetsParameter_delete"
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
              >
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-wrapper margin-bottom-20">
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
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="viewVisible"
      width="40%"
      class="cardDialog"
      :modal="false"
    >
      <div class="pdf">
        <pdf
          :src="pdfsrc"
          style="width: 125%; margin-top: -40px; margin-left: -110px"
        ></pdf>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCard()">取 消</el-button>
        <el-button type="primary" @click="getPdfBill(pdfIdApi, ids)"
          >打 印</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getList,
  deleteAssetBookBatch,
  getAssetBookReportPDF,
} from "@/api/asset-management/assetsParameter.js";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
import pdf from "vue-pdf"; // 引入插件
export default {
  name: "contract",
  components: { pdf },
  mixins: [paginationMixin, deleteOrAudit, exportMixin],
  data() {
    return {
      ids: "",
      pdfsrc: "",
      form: {
        contractName: "",
        memberName: "",
        salesMan: "",
        contractStartDate: "",
        contractEndDate: "",
      },
      recordForm: {}, //暂存数据
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false,
      viewVisible: false,
      deleteApi: deleteAssetBookBatch,
      auditApi: "",
      pdfIdApi: "rcm/assetBook/getAssetBookReportPDF",
    };
  },
  async created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.form = recordObj.data;
    }
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //取消卡片
    cancelCard() {
      this.viewVisible = false;
      this.ids = "";
      this.$refs.multipleCardTable.clearSelection();
    },
    //单选
    selectData(selection, row) {
      this.$refs.multipleCardTable.clearSelection();
      if (selection.length === 0) {
        this.ids = "";
        return;
      }
      this.$refs.multipleCardTable.toggleRowSelection(row, true);
      this.ids = row.id;
    },
    //资产卡
    async getPdfCard() {
      if (!this.ids) {
        return this.$message.warning("请勾选数据");
      }
      this.viewVisible = true;
      const res = await getAssetBookReportPDF(this.ids);
      this.pdfsrc = window.URL.createObjectURL(
        new Blob([res.data], { type: `application/pdf` })
      );
    },
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getList(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/asset-management/assetsParameter/add",
      });
    },
    handleEdit(row) {
      // 修改
      this.$router.push({
        path: "/asset-management/assetsParameter/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      // 详情
      this.$router.push({
        path: "/asset-management/assetsParameter/detail",
        query: {
          data: row,
        },
      });
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    changeTime(val) {
      // 选择时间
      if (val !== null) {
        this.form.contractStartDate = `${val[0]}`;
        this.form.contractEndDate = `${val[1]}`;
      } else {
        this.form.contractStartDate = this.form.contractEndDate = "";
      }
    },
  },
  filters: {
    //0 正常 1 保养中 2 维修中
    runningStatusName(value) {
      if (value == 0) {
        value = "正常";
      } else if (value == 1) {
        value = "保养中";
      } else if (value == 2) {
        value = "维修中";
      }
      return value;
    }, // 0 闲置 1 使用中 2 已报废
    statusName(value) {
      if (value == 0) {
        value = "闲置";
      } else if (value == 1) {
        value = "使用中";
      } else if (value == 2) {
        value = "已报废";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.cardDialog {
  /deep/.el-dialog {
    border-radius: 5px;
    height: 70%;
  }
  /deep/.el-dialog__header {
    padding: 0;
  }
  /deep/.el-dialog__body {
    padding: 0;
    overflow: hidden;
    height: 90%;
    border-radius: 5px;
    padding-right: 50px;
  }
}

.search-dialog {
  .el-form-item__content {
    height: 37px !important;
  }
  .el-form-item {
    padding-left: 80px !important;
  }
  .el-form-item__label {
    line-height: 37px !important;
  }
  .el-input,
  .el-select,
  .el-date-editor {
    width: 320px !important;
  }
  .search-footer {
    text-align: right;
  }
  .form-footer {
    padding-bottom: 8px;
  }
}
</style>
