// 产品数据
<!--product_data_add-->
<!--product_data_delete-->
<!--product_data_modify-->
<!--product_data_detail-->
<!--product_data_search-->
<template>
  <basic-container>
    <el-row style="margin-bottom: 25px">
      <el-button
        v-if="permission.product_data_search"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        >查询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        v-if="permission.product_data_add"
        @click="$router.push('/product-development/product-data/add')"
        >产品新增
      </el-button>
      <!-- <el-button size="small" type="primary">导入</el-button> -->
      <!--      <el-button-->
      <!--        size="small"-->
      <!--        icon="el-icon-delete"-->
      <!--        type="danger"-->
      <!--        plain-->
      <!--        v-if="permission.product_data_delete"-->
      <!--        @click="handleDelRole"-->
      <!--      >批量删除-->
      <!--      </el-button-->
      <!--      >-->
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        border
        :data="roleTableData"
        @selection-change="handleSelectionChange"
      >
        <!--        <el-table-column type="selection" width="50"></el-table-column>-->
        <el-table-column prop="roleType" label="产品图片">
          <template slot-scope="scope">
            <div v-if="scope.row.picList">
              <el-image
                style="width: 100px; height: 100px"
                v-if="scope.row.picList.length > 0"
                :src="scope.row.picList[0]"
                :fit="fit"
              ></el-image>
            </div>
            <div v-else>无</div>
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
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-if="permission.product_data_isStatus"
              v-model="scope.row.status"
              @change="changeStatus(scope.row)"
              active-value="0"
              inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>

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
        <el-table-column width="150" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.product_data_modify"
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
              v-if="permission.product_data_modify"
              direction="vertical"
            ></el-divider>
            <el-tooltip
              v-if="permission.product_data_detail"
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
            <!--            <el-divider v-if="permission.product_data_detail" direction="vertical"></el-divider>-->
            <!--            <el-tooltip v-if="permission.product_data_delete" class="item" effect="dark" content="删除"-->
            <!--                        placement="bottom">-->
            <!--              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">-->
            <!--              </el-button>-->
            <!--            </el-tooltip>-->
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="产品编码">
          <el-input placeholder="请输入产品编码" v-model="searchForm.productSn"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input placeholder="请输入商品名称" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input placeholder="请输入规格型号" v-model="searchForm.model"></el-input>
        </el-form-item>
        <el-form-item label="产品分类">
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
        <el-form-item label="供应商名称">
          <el-input placeholder="请输入供应商名称" v-model="searchForm.supplierName"></el-input>
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
import uploadUrl from "@/config/uploadConfig";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      searchForm: {},
      recordForm: {}, //暂存数据
      roleTableData: [],
      searchDialogVisible: false,
      ids: [],
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
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
   beforeRouteEnter(to, from, next) {
    if (from.name === "编辑产品数据" || from.name === "产品数据详情") {
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
  },
  methods: {
    async changeStatus(row) {
      const res = await saveOrUpdateProduct(row);
      if (res.data.success) {
        this.$message.success("操作成功");
      }
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
    handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
       this.recordForm = params;
      listProductData(params)
        .then((res) => {
          this.roleTableData = res.data.data.records;
          this.roleTableData.forEach((ele) => {
            if (ele.pic) {
              const tempArr = ele.pic.split(",");
              ele.picList = tempArr.map((item) => {
                return `${uploadUrl}${item}`;
              });
            }
          });
          console.log(this.roleTableData);
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
          delData({ ids: ids })
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
    // 删除
    toEdit(row) {
      this.$router.push({
        path: "/product-development/product-data/edit",
        query: {
          data: row,
        },
      });
    },
    toDetail(row) {
      this.$router.push({
        path: "/product-development/product-data/detail",
        query: {
          data: row,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
