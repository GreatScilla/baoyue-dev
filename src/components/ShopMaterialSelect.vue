// 产品选择
<template>
  <div>
    <el-row>
      <el-col>
        <avue-crud
          :option="option"
          :table-loading="loading"
          :data="data"
          ref="crud"
          v-model="form"
          :before-open="beforeOpen"
          :page="page"
          @search-change="searchChange"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @refresh-change="refreshChange"
          @on-load="onLoad"
          @row-dblclick="rowDblClick"
        >
          >
          <template slot="menuLeft">
            <div class="inline-box">
              <el-select
                v-model="selectedCategory"
                placeholder="全部分类"
                @change="searchChange"
                clearable
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                </el-option>
              </el-select>
              <!--            <el-select v-model="selectedDepot" placeholder="全部仓库" @change="searchChange">-->
              <!--              <el-option-->
              <!--                  v-for="item in depotData"-->
              <!--                  :key="item.id"-->
              <!--                  :value="item.id"-->
              <!--                  :label="item.depotName">-->
              <!--              </el-option>-->
              <!--            </el-select>-->
              <el-input
                clearable
                placeholder="综合搜索"
                v-model="searchDetail"
                @change="searchChange"
              >
                <i
                  slot="suffix"
                  v-show="!searchDetail"
                  class="el-input__icon el-icon-search"
                ></i>
              </el-input>
            </div>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <div class="text-center">
      <el-button type="primary" @click="submitBtn">确定</el-button>
    </div>
  </div>
</template>

<script>
// import { getList, searchProduct } from "@/api/shop/product/product";
// import { withChildren } from "@/api/common";
export default {
  name: "shop-material-select",
  props: {
    depotId: Number
  },
  data() {
    return {
      searchDetail: "",
      selectedCategory: "",
      selectedDepot: "",
      selection: true,
      form: {},
      excelBox: false,
      selectionList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      props: {
        label: "title",
        value: "key"
      },
      roleTreeObj: [],
      treeDeptId: "",
      option: {
        height: "auto",
        calcHeight: 80,
        tip: false,
        searchShow: true,
        searchMenuSpan: 3,
        border: true,
        index: true,
        indexLabel: "序号",
        selection: true,
        dialogClickModal: false,
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
        menu: false,
        column: [
          {
            label: "编号",
            prop: "id",
            hide: true, //隐藏
            display: false //不显示
          },
          {
            label: "商品",
            prop: "name",
            width: "160",
            align: "center"
          },
          {
            label: "货号",
            prop: "productSn",
            width: "100",
            align: "center"
          },
          {
            label: "单位",
            prop: "unit",
            width: "100",
            align: "center"
          },
          {
            label: "库存",
            prop: "stock",
            width: "120",
            align: "center"
          },
          {
            label: "销售单价",
            prop: "price",
            align: "center"
          }
        ]
      },
      data: [],
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: []
      },
      depotData: [],
      categoryList: [] // 分类
    };
  },
  watch: {},
  computed: {},
  async mounted() {
    this.getCategoryList();
    await this.getDepotData();
  },
  methods: {
    changeDepot() {},
    async searchChange() {
      this.page.currentPage = 1;
      let params = {
        name: this.searchDetail,
        productCategoryId: this.selectedCategory,
        depotId: this.depotId
      };
      const result = await searchProduct(
        this.page.currentPage,
        this.page.pageSize,
        params
      );
      if (result.data.code === 200) {
        this.data = result.data.data.records;
        this.page.total = result.data.data.total;
      }
    },
    async getDepotData() {
      let result = await this.$http.get(
        "/api/blade-erp/depot/findDepotByUserId?UBType=UserDepot&UBKeyId=120",
        {
          orderBy: "orderid asc"
        }
      );
      this.depotData = result.data;
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleImport() {
      this.excelBox = true;
    },
    uploadAfter(res, done, loading, column) {
      this.excelBox = false;
      this.refreshChange();
      done();
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        //预留
      }
      done();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = { verifyStatus: "1" }) {
      this.loading = true;
      if (this.depotId) {
        params.depotId = this.depotId;
      }
      // getList(
      //   page.currentPage,
      //   page.pageSize,
      //   Object.assign(params, this.query)
      // ).then(res => {
      //   const data = res.data.data;
      //   this.page.total = data.total;
      //   this.data = data.records;
      //   this.loading = false;
      //   this.selectionClear();
      // });
    },
    rowDblClick(row) {
      // this.$emit('getData', row)
    },
    getCategoryList() {
      // withChildren().then(res => {
      //   this.categoryList = res.data.data;
      // });
    },
    submitBtn() {
      this.$emit("getData", this.selectionList);
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-box {
  .el-select {
    width: 160px !important;
    margin-right: 20px;
  }
  .el-input {
    width: 180px;
  }
}
.text-center {
  width: 100%;
  text-align: center;
}
</style>
