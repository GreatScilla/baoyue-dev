// 产品BOM
<template>
  <basic-container>
    <el-row style="margin-bottom: 25px">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-button
          v-if="permission.bomManage_expore"
          icon="el-icon-search"
          @click="searchDialogVisible = true"
          size="small"
          type="primary"
          >查询
        </el-button>
        <el-button
          v-if="permission.bomManage_add"
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="add"
          >新增
        </el-button>
        <!-- <el-button size="small" icon="el-icon-download" type="danger" plain
          >导入
        </el-button> -->
        <el-button
          v-if="permission.bomManage_delete"
          size="small"
          icon="el-icon-delete"
          type="danger"
          plain
          @click="handleDelRole"
          >批量删除
        </el-button>
        <!-- <el-button
          v-if="permission.bomManage_printer"
          size="small"
          icon="el-icon-printer"
          plain
          @click="handlePrinter('MesProductBomV1.1.2配方记录单.ureport')"
          >导出</el-button
        > -->
      </el-form>
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="proBomName" label="清单主题"></el-table-column>
        <el-table-column prop="bomSn" label="清单编号"></el-table-column>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change="hanldeStatus(scope.row.id, scope.row.status)"
            >
            </el-switch>
            <!-- <div>
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </div> -->
          </template>
        </el-table-column>
        <el-table-column label="清单类型">
          <template slot-scope="scope">
            <div>
              {{ scope.row.proBomType | proBomType }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="productName" label="父件产品"></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column> -->
        <el-table-column prop="createUsername" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column width="150" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.bomManage_edit"
              :to="{
                path: '/product-development/bom-manage/edit',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button type="text" size="small" icon="el-icon-edit-outline">
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <router-link
              v-if="permission.bomManage_detail"
              :to="{
                path: '/product-development/bom-manage/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button type="text" size="small" icon="el-icon-tickets">
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <span v-if="permission.bomManage_delete">
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
                  @click="handleDelete(scope.$index, scope.row)"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <!-- <el-tooltip
              v-if="permission.bomManage_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
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
      >
      </el-pagination>
    </el-row>
    <!-- 查询 -->
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
        label-width="110px"
        class="form-footer"
      >
        <el-form-item label="清单名称/编码">
          <el-input
            placeholder="请输入清单名称/编码"
            v-model="searchForm.keywords"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="searchForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
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
  getProductBomList,
  deleteProductBom,
  productBomStatus,
  getFormulaRecordBillsReportPDF,
} from "@/api/product/product-bom.js";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  name: "BOM管理",
  mixins: [paginationMixin, exportMixin],
  data() {
    return {
      pdfIdApi: getFormulaRecordBillsReportPDF,
      searchForm: {},
      recordForm: {},
      tableData: [],
      ids: [],
      searchDialogVisible: false,
      options: [
        {
          label: "禁用",
          value: 1,
        },
        {
          label: "正常",
          value: 0,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑BOM" || from.name === "BOM详情") {
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
  created() {
    if (recordObj) {
      this.currentPage = recordObj.current;
      this.pageSize = recordObj.size;
      delete recordObj.current;
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    //打印
    async handlePrinter(reportName) {
      if (this.ids.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // debugger;
        //  页面跳转
        var win = window.open(
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${this.ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 查询产品
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      getProductBomList(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜素
    onSearch() {
      console.log(typeof this.searchForm.startTime);
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
    },
    //更改状态
    hanldeStatus(id, status) {
      let params = {
        id: id,
        status: status,
      };
      productBomStatus(params).then((res) => {
        if (res.data.code === 200) {
          this.handleList();
          this.$message.success("状态更改成功");
        }
      });
    },
    //删除角色
    funDelRole(ids) {
      this.$confirm("确定要删除该bom吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProductBom({ ids: ids })
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
    handleDelete(index, row) {
      this.funDelRole(row.id);
    },
    // 多行删除
    handleDelRole() {
      if (this.ids.length === 0) {
        return this.$message.error("请至少选择一条数据");
      }
      this.funDelRole(this.ids);
    },
    // 跳转新增
    add() {
      this.$router.push({
        path: "/product-development/bom-manage/add",
      });
    },
  },
  filters: {
    proBomType(value) {
      if (value === 1) {
        return "自制件";
      } else if (value === 2) {
        return "委外件";
      } else if (value === 3) {
        return "外购件";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
