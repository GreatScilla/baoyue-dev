// 工艺BOM
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.craftBom_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
    </el-row>
    <div class="content-wrapper">
      <div class="route-tree border">
        <div class="title">产品工艺路线</div>
        <div>
          <el-tree
            :data="craftLineData"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <div class="right">
        <div class="table border">
          <div class="row border-bottom">
            <div class="table-item">
              <div class="key">产品编码</div>
              <div class="value">{{ product.productSn }}</div>
            </div>
            <div class="table-item">
              <div class="key">产品类别</div>
              <div class="value">{{ product.productCategoryName }}</div>
            </div>
            <div class="table-item">
              <div class="key">工艺路线编码</div>
              <div class="value">{{ selectCraftLine.processCode }}</div>
            </div>
          </div>
          <div class="row">
            <div class="table-item">
              <div class="key">产品名称</div>
              <div class="value">{{ product.name }}</div>
            </div>
            <div class="table-item">
              <div class="key">规格型号</div>
              <div class="value">{{ product.model }}</div>
            </div>
            <div class="table-item">
              <div class="key">工艺路线名称</div>
              <div class="value">{{ selectCraftLine.processName }}</div>
            </div>
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="process-tree border">
            <el-checkbox v-model="isDefault">设为默认路线</el-checkbox>
            <el-tree
              :data="lineProcesses"
              :props="processProps"
              default-expand-all
              @node-click="handleClickProcess"
            ></el-tree>
          </div>
          <div class="material-table border">
            <div class="header">
              <div>
                <el-button size="small" type="primary" plain @click="state = 0"
                  >关联产品</el-button
                ><el-button @click="state = 1" size="small" type="primary" plain
                  >关联SOP</el-button
                ><el-button @click="state = 2" size="small" type="primary" plain
                  >关联组件</el-button
                >
              </div>
              <div>
                <el-button
                  v-if="permission.craftBom_add"
                  size="small"
                  icon="el-icon-plus"
                  type="primary"
                  @click="toAdd"
                  >新增</el-button
                >
              </div>
            </div>

            <!-- 产品表 -->
            <el-table
              v-if="state === 0"
              :data="productTable"
              style="width: 100%"
            >
              <el-table-column prop="productSn" label="产品编码">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称">
              </el-table-column>
              <el-table-column prop="cateName" label="产品类别">
              </el-table-column>
              <el-table-column label="追溯方式">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.dataFromMode === 0 ? "单体" : "批次" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="组件数量"> </el-table-column>
              <el-table-column prop="isReplace" label="是否替代">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.isReplace === 0 ? "否" : "是" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- SOP表 -->
            <el-table v-if="state === 1" :data="sopTable" style="width: 100%">
              <el-table-column prop="name" label="文档名称"> </el-table-column>
              <el-table-column prop="url" label="文档地址"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleDeleteProcessSop(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- 组件表 -->
            <el-table
              v-if="state === 2"
              :data="componentTable"
              style="width: 100%"
            >
              <el-table-column prop="compTypeName" label="组件类型">
              </el-table-column>
              <el-table-column prop="productName" label="组件名称">
              </el-table-column>
              <el-table-column prop="productSn" label="组件编码">
              </el-table-column>
              <el-table-column prop="isCheck" label="是否开工校验">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleDeleteProcessComponent(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
import { getLineList } from "@/api/process/craft-route.js";
import {
  deleteProcessSop,
  getProcessByLineId,
  getProcessSopListByProcess,
  getProcessProductByProcessId,
  getProcessComponentList,
  removeProcessComponent,
} from "@/api/product/craft-bom.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchDialogVisible: false,
      column: [
        {
          label: "路线名称",
          prop: "keywords",
        },
      ],
      tableData: [],
      craftLineData: [],
      selectCraftLine: {},
      selectProcess: {},
      productTable: [],
      lineProcesses: [],
      componentTable: [],
      sopTable: [],
      isDefault: false,
      state: 0,
      product: {},
      defaultProps: {
        label: "lineName",
        children: "lineList",
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
    // 查询
    async onSearch(value) {
      const getLineRes = await getLineList(value);
      this.craftLineData = getLineRes.data.data;
      this.searchDialogVisible = false;
    },
    // 选择工艺路线
    handleNodeClick(data) {
      this.selectCraftLine = data;
      this.lineProcesses = [];
      this.getProcessByLineId(this.selectCraftLine.id);
    },
    // 选择工序
    async handleClickProcess(data) {
      this.selectProcess = data;
      if (this.selectProcess.children) {
        return;
      }
      await this.getProcessProductByProcessId(
        this.selectCraftLine.id,
        this.selectProcess.id
      );
      await this.getProcessSopListByProcess(
        this.selectCraftLine.id,
        this.selectProcess.id
      );
      console.log(this.sopTable);
      await this.getProcessComponentList(
        this.selectCraftLine.id,
        this.selectProcess.id
      );
    },

    // 查询工序组件
    async getProcessComponentList(lineId, processId) {
      const res = await getProcessComponentList({ lineId, processId });
      if (res.data.success) {
        this.componentTable = res.data.data;
      }
    },
    // 查询SOP
    async getProcessSopListByProcess(lineId, processId) {
      const res = await getProcessSopListByProcess({ lineId, processId });
      if (res.data.success) {
        this.sopTable = res.data.data;
      }
    },
    // 获取工序
    async getProcessByLineId(lineId) {
      const res = await getProcessByLineId({ lineId });
      if (res.data.success) {
        this.lineProcesses.push({ processName: this.selectCraftLine.lineName });
        this.lineProcesses[0].children = res.data.data.lineProcesses;
        this.product = res.data.data.product;
      }
    },
    // 获取工序产品关联数据
    async getProcessProductByProcessId(lineId, processId) {
      const res = await getProcessProductByProcessId({ lineId, processId });
      this.productTable = res.data.data;
    },

    // 删除工序组件
    async handleDeleteProcessComponent(row) {
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const ids = row.id;
        const res = await removeProcessComponent({ ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await getProcessProductByProcessId({
            lineId: this.selectCraftLine.id,
            processId: this.selectProcess.id,
          });
        }
      } catch (error) {
        console.log(error);
        this.$message.error("已取消删除");
      }
    },
    // 删除sop
    async handleDeleteProcessSop(row) {
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const ids = row.id;
        const res = await deleteProcessSop({ ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await getProcessSopListByProcess({
            lineId: this.selectCraftLine.id,
            processId: this.selectProcess.id,
          });
        }
      } catch (error) {
        console.log(error);
        this.$message.error("已取消删除");
      }
    },
    toRelatedComponent(operationState, row) {
      this.to("/product-development/craft-bom/related-component", {
        operationState,
        row,
        selectCraftLine: this.selectCraftLine,
        selectProcess: this.selectProcess,
      });
    },
    toAdd() {
      if (!this.selectCraftLine.id || !this.selectProcess.id) {
        this.$message.error("请先选择工艺路线和工序");
        return;
      }
      if (this.state === 0) {
        // 产品
        this.to("/product-development/craft-bom/related-material", {
          selectCraftLine: this.selectCraftLine.id,
          selectProcess: this.selectProcess.id,
        });
      } else if (this.state === 1) {
        // sop
        this.to("/product-development/craft-bom/related-sop", {
          selectCraftLine: this.selectCraftLine,
          selectProcess: this.selectProcess,
        });
      } else if (this.state === 2) {
        // 组件
        this.to("/product-development/craft-bom/related-component", {
          selectCraftLine: this.selectCraftLine,
          selectProcess: this.selectProcess,
        });
      }
    },
    to(path, data) {
      this.$router.push({
        path,
        query: data,
      });
    },
  },
  async mounted() {
    const getLineRes = await getLineList();
    this.craftLineData = getLineRes.data.data;
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
        .header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
        }
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
