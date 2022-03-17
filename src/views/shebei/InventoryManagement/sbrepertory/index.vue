<template>
  <div>
    <basic-container>
      <!-- 条件查询 -->
      <el-dialog
        title="搜索条件"
        :visible.sync="searchShow"
        width="30%"
        :modal="false"
        style="background-color: rgba(0,0,0,0.5)"
        :before-close="handleClose">
        <el-form ref="repertoryForm" :model="repertoryForm" inline>
          <el-row>
<!--            <el-col :span="6">-->
<!--              <div class="grid-content bg-purple">-->
              <el-form-item label="设备名称">
                <el-input
                  style="width: 205px"
                  placeholder="请输入设备名称"
                  v-model="repertoryForm.name"
                ></el-input>
              </el-form-item>
<!--              </div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple-light">-->
              <el-form-item label="预警报告">
                <el-select
                  v-model="repertoryForm.alertStatus"
                  placeholder="请选择预警报告"
                >
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="高库存" value="1"></el-option>
                  <el-option label="低库存" value="2"></el-option>
                </el-select>
              </el-form-item>
            <br>
<!--            </div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple W-btn">-->
            <el-form-item>
              <el-button type="primary" @click="initQuery" size="small">查询</el-button>
              <el-button type="info" @click="clearForm" size="small">重置</el-button>
            </el-form-item>

<!--            </div></el-col>-->
          </el-row>
        </el-form>
      </el-dialog>

      <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
      <el-button type="primary" @click="daochu" size="small">导出</el-button>

      <el-row :gutter="24" class="Mtop">
        <el-col :span="4">
          <el-card shadow="hover" class="back-C">
            <span class="Sleft">设备类别</span>
            <!-- ----- -->

            <el-tree
              class="back-C"
              :data="selecTtree.data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="20">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            max-height="350"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="alertStatus" label="预警状态">
              <template v-slot:default="slotProps">
                <el-tag v-if="slotProps.row.alertStatus == '0'" color="#1ABC9C"
                  >正常</el-tag
                >
                <el-tag
                  v-if="slotProps.row.alertStatus == '1'"
                   color="#FF5918"
                  >高库存</el-tag
                >
                <el-tag  v-if="slotProps.row.alertStatus == '2'" color="#F59A23">低库存</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="设备名称"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="category"
              label="设备类别"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="model"
              label="规格型号"
            ></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="amount" label="库存量"></el-table-column>
            <el-table-column
              prop="amountSafe"
              label="可用库存量"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="amountMax"
              label="库存下限"
            ></el-table-column>
            <el-table-column
              prop="amountMin"
              label="库存上限"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template v-slot:default="slotProps">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showdetail(slotProps.row)"
                  >明细</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-col class="newMtop">
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next, sizes, jumper"
              :total="total"
              @size-change="handlePageSize"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </el-col>
        </el-col>
      </el-row>

      <!-- 明细弹框 -->
      <detail-dalog
        :roeAll="roeAll"
        @updateVisible="detailVisible = false"
        :detailVisible="detailVisible"
      ></detail-dalog>
    </basic-container>
  </div>
</template>

<script>
import { selecTtree } from "@/api/shebei/account";
import { sbpageList, exportList } from "@/api/shebei/InventoryManagement";

import detailDalog from "./component/detaildalog";
export default {
  components: {
    detailDalog
  },

  data() {
    return {
      searchShow:false,
      // 明细的数据
      detailVisible: false,

      // 查询的form数据
      repertoryForm: {
        name: "", // 去皮机
        // 下拉框数据
        alertStatus: ""
      },

      // 树形 规则
      defaultProps: {
        children: "children",
        label: "name"
      },

      selecTtree: {
        data: []
      },

      // table数据
      tableData: [],

      // 分页
      total: "",

      // 分页
      paging: { pageNum: 1, pageSize: 10 },

      // 明细本行的数据
      roeAll: {},

      // 导出
      array: { ids: "" }
    };
  },

  async created() {
    // 树形 data
    const { data: res } = await selecTtree();
    this.selecTtree.data = res.data;

    // 分页
    this.getPage();
  },

  methods: {
    searchBtn(){

      this.searchShow=true
    },
    // 几页
    handleCurrentChange(val) {
      this.paging.pageNum = val;
      this.getPage();
    },

    // 几条
    handlePageSize(val) {
      this.paging.pageSize = val;
      this.getPage();
    },

    // 明细
    showdetail(val) {
      this.roeAll = val;
      this.detailVisible = true;
    },

    // init table
    async getPage() {
      // 分页
      const { data: res } = await sbpageList(this.paging);
      this.total = res.data.total;
      this.tableData = res.data.records;
    },

    // 导出
    async daochu() {
      const res = await exportList(this.array);
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      link.style.display = "none";
      link.download = "自定义文件名";
      link.href = URL.createObjectURL(blob);
      link.click();
      document.body.appendChild(link);
    },

    // 多选table
    handleSelectionChange(val) {
      const newarr = val.map(ele => ele.id);
      this.array.ids = newarr.join(",");
    },

    // 条件查询
    async initQuery() {
      this.searchShow=false
      const { data: res } = await sbpageList(this.repertoryForm);
      this.tableData = res.data.records;
    },

    // 重置

    clearForm() {
      this.repertoryForm.name = ''
      this.repertoryForm.alertStatus = ''
      this.getPage();
    }
  }
};
</script>

<style lang="scss" scoped>
.W-btn .el-button {
  width: 92px;
}

.Mtop {
  margin-top: 10px;
}

.newMtop {
  margin-top: 50px;
}

.Sleft {
  font-size: 14px;
  margin-left: 25%;
}

.el-tree {
  margin-top: 15px;
}

.back-C {
  background-color: #f2f2f2;
}

.el-tag {
  color: #fff;
}
</style>
