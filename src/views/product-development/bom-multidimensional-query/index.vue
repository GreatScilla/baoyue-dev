// 工艺BOM
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.bomMultidimensionalQuery_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <!-- <el-button size="small" type="warning" plain icon="el-icon-upload2">导出</el-button> -->
    </el-row>
    <div class="content-wrapper">
      <div class="route-tree border">
        <div class="title">产品分类</div>
        <div>
          <el-tree
            :data="cateTree"
            node-key="id"
            highlight-current
            :props="cateTreeProps"
            @node-click="selectProductCate"
          ></el-tree>
        </div>
      </div>
      <div class="right">
        <div class="bottom-wrapper">
          <div class="material-table">
            <el-tabs v-model="tab" @tab-click="changeTab" type="border-card">
              <el-tab-pane name="0" label="树状查看">
                <!-- 产品表 -->
                <el-table
                  :data="treeTable"
                  row-key="id"
                  style="width: 100%"
                  :tree-props="{ children: 'childProductBomDTO' }"
                >
                  <el-table-column type="index">
                    <template slot="header"> 序号 </template>
                  </el-table-column>
                  <el-table-column prop="productSn" label="产品编码">
                  </el-table-column>
                  <el-table-column prop="name" label="产品名称">
                  </el-table-column>
                  <el-table-column prop="model" label="产品型号">
                  </el-table-column>
                  <el-table-column prop="unitName" label="单位">
                  </el-table-column>
                  <!--                  <el-table-column prop="productName" label="产品比例">-->
                  <!--                    <template slot-scope="scope">-->
                  <!--                      {{scope.row.product.unit}}-->
                  <!--                    </template>-->
                  <!--                  </el-table-column>-->
                  <el-table-column prop="num" label="数量"> </el-table-column>
                  <el-table-column prop="productType" label="产品角色">
                      <template slot-scope="scope">
                      {{ scope.row.productType | productTypeName }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="lossScale" label="损耗率">
                  </el-table-column>
                  <el-table-column label="领料方式">
                    <template slot-scope="scope">
                      {{
                        scope.row.pickMaterielType === 1
                          ? "正常领料"
                          : "倒冲领料"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="specificationName" label="规格">
                  </el-table-column>
                  <el-table-column prop="productCategoryName" label="产品类别">
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane name="1" label="多阶查看">
                <el-table :data="multiTable" style="width: 100%">
                  <el-table-column type="index">
                    <template slot="header"> 序号 </template>
                  </el-table-column>
                  <el-table-column prop="name" label="产品名称">
                  </el-table-column>
                  <el-table-column prop="productSn" label="产品编码">
                  </el-table-column>
                  <el-table-column prop="model" label="产品型号">
                  </el-table-column>
                  <el-table-column prop="unitName" label="单位">
                  </el-table-column>
                  <!--                  <el-table-column prop="productName" label="产品比例"></el-table-column>-->
                  <el-table-column prop="num" label="数量"> </el-table-column>
                  <el-table-column label="产品角色">
                    <template slot-scope="scope">
                      {{ scope.row.productType | productTypeName }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="lossScale" label="损耗率">
                  </el-table-column>
                  <el-table-column porp="pickMaterielType" label="领料方式">
                    <template slot-scope="scope">
                      {{
                        scope.row.pickMaterielType === 1
                          ? "正常领料"
                          : "倒冲领料"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="specificationName" label="规格">
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane name="2" label="单阶查看">
                <el-row>
                  <div class="title">父件信息</div>
                  <el-divider></el-divider>
                </el-row>
                <el-row>
                  <el-form
                    :model="singleBom"
                    label-width="100px"
                    class="demo-form-inline"
                  >
                    <el-col :span="12">
                      <el-form-item label="产品名称">
                        <div>{{ singleBom.product.name }}</div>
                      </el-form-item>
                      <el-form-item label="单位">
                        <div>{{ singleBom.product.unitName }}</div>
                      </el-form-item>
                      <el-form-item label="损耗率">
                        <div>{{ singleBom.product.lossScale }}</div>
                      </el-form-item>
                      <el-form-item label="产品型号">
                        <div>{{ singleBom.product.model }}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="产品编码">
                        <div>{{ singleBom.product.productSn }}</div>
                      </el-form-item>
                      <el-form-item label="数量">
                        <div>{{ singleBom.num }}</div>
                      </el-form-item>
                      <el-form-item label="领料方式">
                        <div>{{ singleBom.pickMaterielType }}</div>
                      </el-form-item>
                      <el-form-item label="产品角色">
                        <div>{{ singleBom.product.productType|productTypeName }}</div>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
                <el-row>
                  <div class="title">子件信息</div>
                  <el-divider></el-divider>
                </el-row>
                <el-row>
                  <el-table
                    :data="singleBom.productBomComponents"
                    style="width: 100%"
                  >
                    <el-table-column type="index">
                      <template slot="header"> 序号 </template>
                    </el-table-column>
                    <el-table-column label="产品名称">
                      <template slot-scope="scope">
                        {{ scope.row.product.name }}
                      </template>
                    </el-table-column>
                    <el-table-column label="下级信息">
                      <template prop="操作" slot-scope="scope">
                        <el-button
                          @click="getChildDetail(scope.row)"
                          type="text"
                        >
                          查看子件信息
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="产品编码">
                      <template slot-scope="scope">
                        {{ scope.row.product.productSn }}
                      </template>
                    </el-table-column>
                    <el-table-column label="产品型号">
                      <template slot-scope="scope">
                        {{ scope.row.product.model }}
                      </template>
                    </el-table-column>
                    <el-table-column label="单位">
                      <template slot-scope="scope">
                        {{ scope.row.product.unitName }}
                      </template>
                    </el-table-column>
                    <!--                  <el-table-column prop="productName" label="产品比例"></el-table-column>-->
                    <el-table-column label="数量">
                      <template slot-scope="scope">
                        {{ scope.row.product.num }}
                      </template>
                    </el-table-column>
                    <el-table-column label="产品角色">
                      <template slot-scope="scope">
                        {{ scope.row.product.productType | productTypeName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lossScale" label="损耗率">
                      <template slot-scope="scope">
                        {{ scope.row.product.lossScale }}
                      </template>
                    </el-table-column>
                    <el-table-column porp="pickMaterielType" label="领料方式">
                      <template slot-scope="scope">
                        {{
                          scope.row.product.pickMaterielType === 1
                            ? "正常领料"
                            : "倒冲领料"
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格">
                      <template slot-scope="scope">
                        {{ scope.row.product.specificationName }}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>

    <!-- 查询 -->
    <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search>
  </basic-container>
</template>

<script>
import {
  listProductCateWithBom,
  treeProductBom,
  moreProductBom,
  getProductBom,
  getChildProductBom,
} from "@/api/product/product-bom";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      column: [
        {
          label: "分类名称",
          prop: "keywords",
        },
      ],
      searchDialogVisible: false,
      tab: "0",
      cateTree: [],
      selectedProductCate: {},
      treeTable: [], // 树状查看数据
      multiTable: [], // 多阶查看数据
      singleBom: {
        product: {},
      },
      cateTreeProps: {
        label: "productCateName",
        children: "cateChildrenList",
      },
      processProps: {
        label: "processName",
        children: "children",
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    async changeTab() {
      if (!this.selectedProductCate["id"]) {
        return;
      }
      if (this.tab === "0") {
        //  树状查看
        await this.getTreeData();
      } else if (this.tab === "1") {
        //  多阶查看
        await this.getMultiData();
      } else if (this.tab === "2") {
        //  单阶查看
        await this.getSingleData();
      }
    },
    // 选择产品分类
    async selectProductCate(node) {
      if (node["level"] && node["level"] === 3) {
        this.selectedProductCate = node;
        if (this.tab === "0") {
          //  树状查看
          await this.getTreeData();
        } else if (this.tab === "1") {
          //  多阶查看
          await this.getMultiData();
        } else if (this.tab === "2") {
          //  单阶查看
          await this.getSingleData();
        }
      }
    },

    // 获取树状数据
    async getTreeData() {
      const treeProductBomRes = await treeProductBom({
        id: this.selectedProductCate.id,
      });
      this.treeTable = treeProductBomRes.data.data;
    },

    // 获取多维数据
    async getMultiData() {
      const multiLevelRes = await moreProductBom({
        id: this.selectedProductCate.id,
      });
      this.multiTable = multiLevelRes.data.data;
    },

    // 获取单阶数据
    async getSingleData() {
      const singleBomRes = await getProductBom({
        id: this.selectedProductCate.id,
      });
      this.singleBom = singleBomRes.data.data;
    },

    // 查询子件信息
    async getChildDetail(row) {
      const res = await getChildProductBom({ bomId: row.bomId });
      console.log(res);
    },

    // 遍历树
    traverseTree(data) {
      if (!data) return;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].parentId) {
          //  第一级
          this.traverseTree(data[i].cateChildrenList);
        }
        if (data[i].parentId && data[i].cateChildrenList.length > 0) {
          //  第二级
          this.traverseTree(data[i].cateChildrenList);
        }
        if (data[i].parentId && data[i].productBomList.length > 0) {
          // 第三级
          data[i].cateChildrenList = data[i].productBomList;
          data[i].cateChildrenList.forEach((ele) => {
            ele.productCateName = ele.proBomName;
            ele.level = 3;
          });
        }
      }
    },
    to(path, data) {
      this.$router.push({
        path,
        query: data,
      });
    },
    async onSearch(value) {
      const res = await listProductCateWithBom(value);
      this.cateTree = res.data.data;
      this.traverseTree(this.cateTree);
      this.searchDialogVisible = false;
    },
  },
  async mounted() {
    const res = await listProductCateWithBom();
    this.cateTree = res.data.data;
    this.traverseTree(this.cateTree);
  },
  filters: {
    productTypeName(value) {
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
.content-wrapper {
  display: flex;
  min-height: 857px;

  .route-tree {
    width: 267px;
    margin-right: 15px;

    .title {
      background: #f7f8fa;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #3e3e3e;
      line-height: 53px;
      padding-left: 20px;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;

    .table {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;

      .row {
        display: flex;

        .table-item {
          display: flex;
          flex-basis: 33.33%;

          .key {
            width: 112px;
            text-align: center;
            font-size: 14px;
            background: #fdf5ed;
            font-family: MicrosoftYaHei;
            color: #3e3e3e;
            line-height: 52px;
          }

          .value {
            font-size: 14px;
            padding-left: 10px;
            font-family: MicrosoftYaHei;
            color: #3e3e3e;
            line-height: 52px;
          }
        }
      }
    }

    .bottom-wrapper {
      display: flex;

      .process-tree {
        padding-top: 15px;
        text-align: center;
        width: 267px;
        min-height: 729px;
        margin-right: 15px;
      }

      .material-table {
        flex: 1;
      }
    }
  }

  .border {
    border: 1px solid #dedede;
  }

  .border-bottom {
    border-bottom: 1px solid #dedede;
  }
}
</style>
