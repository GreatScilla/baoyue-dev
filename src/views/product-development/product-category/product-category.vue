// 产品分类
<!--product_category_add-->
<!--product_category_delete-->
<!--product_category_modify-->
<!--product_category_detail-->
<!--product_category_import-->
<!--product_category_search-->
<template>
  <basic-container>
    <el-row>
      <el-button
        icon="el-icon-search"
        size="small"
        type="primary"
        v-if="permission.product_category_add"
        @click="searchDialogVisible = true"
        >查询
      </el-button>
      <!--      <el-button size="small" @click="reset">重置</el-button>-->
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        v-if="permission.product_category_add"
        @click="$router.push('/product-development/product-category/add')"
        >添加根分类
      </el-button>
      <!--      <el-button v-if="permission.product_category_import" icon="el-icon-download" size="small" type="danger" plain>导入-->
      <!--      </el-button>-->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{
          children: 'productCateList',
          hasChildren: 'hasChildren',
        }"
      >
        <el-table-column prop="cateName" label="分类名称"></el-table-column>
        <el-table-column prop="shortName" label="分类简称"></el-table-column>
        <el-table-column label="计价方式">
          <template slot-scope="scope">
            <div>{{ scope.row.priceType | priceType }}</div>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="transRangeType" label="可用范围">-->
        <!--          <template slot-scope="scope">-->
        <!--            <div>-->
        <!--              {{ scope.row.transRangeType | transRangeType }}-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column width="150" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="添加子分类"
              placement="bottom"
              v-if="
                scope.row.parentId === '0' && permission.product_category_add
              "
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-plus"
                @click="to('addChild', scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              v-if="
                scope.row.parentId === '0' && permission.product_category_add
              "
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.product_category_modify"
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="toEdit(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider
              direction="vertical"
              v-if="permission.product_category_modify"
            ></el-divider>
            <span v-if="permission.product_category_detail">
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
                  @click="toDetail(scope.row)"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              v-if="permission.product_category_delete"
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
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--    <el-row class="pagination-wrapper">-->
    <!--      <el-pagination-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        :current-page="currentPage"-->
    <!--        :page-sizes="pageSizes"-->
    <!--        :page-size="pageSize"-->
    <!--        layout="total, sizes, prev, pager, next, jumper"-->
    <!--        :total="total"-->
    <!--        background-->
    <!--      >-->
    <!--      </el-pagination>-->
    <!--    </el-row>-->

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
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="分类名称">
          <el-input
            placeholder="请输入分类名称"
            v-model="searchForm.cateName"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类简称">
          <el-input
            placeholder="请输入分类简称"
            v-model="searchForm.shortName"
          ></el-input>
        </el-form-item>
        <el-form-item label="代号">
          <el-input
            placeholder="请输入代号"
            v-model="searchForm.snCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input
            placeholder="请输入流水号"
            v-model="searchForm.snPre"
          ></el-input>
        </el-form-item>
        <el-form-item label="计价方式">
          <el-select v-model="searchForm.priceType" placeholder="请选择">
            <el-option
              v-for="item in priceTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
let recordObj = "";
import { getProductCates, deleteCate } from "@/api/product/pruduct-categroy.js";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      priceTypeData: [
        { label: "先进先出法", value: "1" },
        { label: "个别计价法", value: "2" },
        { label: "全月平均法", value: "3" },
      ],
      searchForm: {}, // 搜索条件
      recordForm: {}, //暂存数据
      tableData: [],
      ids: [],
      searchDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑产品分类" || from.name === "产品分类详情") {
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
      this.searchForm = recordObj;
    }
    this.handleList(this.searchForm);
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
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
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      const productCateRes = await getProductCates(params);
      this.tableData = productCateRes.data.data;
      this.total = productCateRes.data.total;
    },
    // 搜索
    searchRole() {
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },

    //删除角色
    funDelRole(ids) {
      this.$confirm("确定要删除该分类吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCate({ ids: ids })
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
      this.funDelRole(this.ids);
    },
    toEdit(row) {
      this.$router.push({
        path: "/product-development/product-category/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/product-development/product-category/detail",
        query: {
          data: row,
        },
      });
    },
  },
  filters: {
    priceType(value) {
      if (value === 1) {
        return "先进先出法";
      } else if (value === 2) {
        return "个别计价法";
      } else if (value === 3) {
        return "全月平均法";
      }
    },
    transRangeType(value) {
      if (value === 1) {
        return "全部用户";
      } else if (value === 2) {
        return "部分用户";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
