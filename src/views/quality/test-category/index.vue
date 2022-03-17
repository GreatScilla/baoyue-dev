// 化验产品维护
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.testCategory_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <!-- <el-button
        v-if="permission.testCategory_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        >新增</el-button
      > -->

      <!-- <el-button
        v-if="permission.testCategory_delete"
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
        <el-table-column prop="roleType" label="产品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="url + scope.row.pic"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column
          prop="productSn"
          show-overflow-tooltip
          label="产品编码"
        ></el-table-column>
        <el-table-column prop="model" label="规格型号"></el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="分类"
        ></el-table-column>
        <el-table-column prop="unitName" label="单位"></el-table-column>
        <el-table-column
          resizable
          show-overflow-tooltip
          min-width="100"
          label="价格"
        >
          <template slot-scope="scope">
            <div>
              <div>建议售价：{{ scope.row.priceSuggest }}</div>
              <div>最低售价：{{ scope.row.priceMin }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          resizable
          show-overflow-tooltip
          min-width="100"
          label="库存上/下限"
        >
          <template slot-scope="scope">
            <div>
              <div>上限：{{ scope.row.stockMax }}</div>
              <div>下限：{{ scope.row.stockMin }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="permission.testCategory_edit"
              :to="{
                path: '/quality/test-category/edit',
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
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>

            <router-link
              v-if="permission.testCategory_detail"
              :to="{
                path: '/quality/test-category/detail',
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
            </router-link>
            <!-- <el-tooltip
              v-if="permission.testCategory_delete"
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
        <el-form-item label="产品编码">
          <el-input v-model="searchForm.productSn"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="searchForm.model"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="searchForm.productType" placeholder="请选择">
            <el-option
              v-for="item in dicData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="searchForm.supplierName"></el-input>
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
import {
  listProductData,
  delData,
  saveOrUpdateProduct,
} from "@/api/base-data/product-data.js";
import {
  assayCategoryPage,
  removeAssayCategory,
  selectLabNameList,
} from "@/api/quality/index";
import uploadUrl from "@/config/uploadConfig";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      url: "",
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      dicData: [
        {
          label: "自制件",
          value: 1,
        },
        {
          label: "委外件",
          value: 2,
        },
        {
          label: "外购件",
          value: 3,
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改化验产品维护" || from.name === "化验产品维护详情") {
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
    this.url = uploadUrl;
    let res = await selectLabNameList({});
    this.labList = res.data.data;
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      this.recordForm = params;
      listProductData(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeAssayCategory({ ids: ids })
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
      this.funDelRole([row.id]);
    },
    // 多行删除
    handleDelRole() {
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/test-category/add");
    },
  },
  filters: {
    statusName(val) {
      if (val === 0) {
        return (val = "失效");
      }
      if (val === 1) {
        return (val = "生效");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
</style>
