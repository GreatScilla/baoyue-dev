<template>
  <div>
    <basic-container>

      <el-dialog
        title="条件搜索"
        :visible.sync="searchShow"
        width="30%"
        :modal="false"
        style="background-color: rgba(0,0,0,0.5)"
        :before-close="handleClose">
        <el-form ref="form" inline :model="ruleForm" label-width="80px">
        <el-row>
<!--          <el-col :span="8"><div class="grid-content bg-purple">-->
            <el-form-item label="设备/备件名称">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入设备/备件名称"
              ></el-input>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="8"><div class="grid-content bg-purple">-->
            <el-form-item label="供应商名称">
              <el-input
                v-model="ruleForm.supplierName"
                placeholder="请输入客户名称"
              ></el-input>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="8"><div class="grid-content bg-purple">-->
            <el-form-item label="订单类型">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
        </el-row>
        <el-row>
<!--          <el-col :span="8"><div class="grid-content bg-purple-light">-->
            <el-form-item label="单据日期">
              <el-date-picker
                v-model="ruleForm.numberDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="4"><div class="grid-content bg-purple">-->
          <br>
            <el-button type="primary" @click="InfoQuery" size="small">查询</el-button>
            <el-button type="info" @click="resetForm" size="small">重置</el-button>
<!--          </div></el-col>-->
        </el-row>
        </el-form>
      </el-dialog>




      <el-form ref="form" inline :model="ruleForm" label-width="80px">


        <!-- box 盒子 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <ul>
                <li>
                  <span>{{ this.total || 999 }}</span
                  ><br />采购单总价
                </li>
                <li>
                  <span>{{ this.shebeiCount || 999 }}</span
                  ><br />采购设备数
                </li>
                <li>
                  <span>{{ this.beijianCount || 999 }}</span
                  ><br />采购备件数
                </li>
                <li>
                  <span>{{ this.sumTotal || 999 }}</span
                  ><br />采购总金额
                </li>
              </ul>
            </div></el-col
          >
        </el-row>

        <!-- 按钮 -->
        <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="infoexport" size="small" type="primary">导出</el-button>
        <el-button size="small" type="primary">打印</el-button>

        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          max-height="350"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="number" label="单据编号"></el-table-column>
          <el-table-column prop="numberDate" label="单据日期"></el-table-column>
          <el-table-column prop="supplierName" label="供应商"></el-table-column>
          <el-table-column width="120px" prop="number" label="设备/备件编号">
            <!-- <template v-slot='slotProps'>
            <div>
              <span v-if="slotProps.row.type =='设备'"> 设备 {{slotProps.row.number}}</span>
              <span v-if="slotProps.row.type =='备件'"> 备件 {{slotProps.row.number}}</span>
            </div>
          </template> -->
          </el-table-column>
          <el-table-column width="120px" prop="name" label="设备/备件名称">
          </el-table-column>
          <el-table-column width="120px" prop="category" label="设备/备件类别">
          </el-table-column>
          <el-table-column prop="model" label="规格型号"> </el-table-column>
          <el-table-column prop="unit" label="单位"> </el-table-column>
          <el-table-column prop="purchaseNum" label="数量"> </el-table-column>
          <el-table-column prop="price" label="单价"> </el-table-column>
          <el-table-column prop="totalAmount" label="采购金额">
          </el-table-column>
          <el-table-column prop="expectReceiveDate" label="到货日期">
          </el-table-column>
          <el-table-column prop="arriveNum" label="到货数量"> </el-table-column>
          <el-table-column prop="checkNum" label="验收数量"> </el-table-column>
          <el-table-column prop="returnNum" label="退货数量"> </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagina-ele
          :total="total"
          @updatepageNum="updatepageNum"
          @updatepageSize="updatepageSize"
        ></pagina-ele>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import paginaEle from "./component/pageEle";
import { equipmentPurchaseOrderpage } from "@/api/shebei/purchase";
export default {
  name: "",
  components: { paginaEle },
  props: {},
  data() {
    return {
      searchShow:false,
      total: "", // 采购总数
      shebeiCount: "", // 采购设备总数
      beijianCount: "", // 采购备件总数
      sumTotal: "", // 采购总金额
      ruleForm: {},
      tableData: []
    };
  },
  activated() {},
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    searchBtn(){
      this.searchShow=true
    },
    async InfoQuery() {
      this.searchShow=false
      const { data: res } = await equipmentPurchaseOrderpage(this.ruleForm);
      this.tableData = res.data.records;
    },
    // 重置
    resetForm() {
      this.ruleForm = {};
      this.init();
    },

    // 初始化
    async init() {
      const { data: res } = await equipmentPurchaseOrderpage();
      this.tableData = res.data.records;
      this.total = res.data.total;
      this.shebeiCount = res.data.records[0].shebeiCount;
      this.beijianCount = res.data.records[0].beijianCount;
      this.sumTotal = res.data.records[0].sumTotal;
    },

    // 分页
    async updatepageNum(val) {
      const { data: res } = await equipmentPurchaseOrderpage(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    async updatepageSize(val) {
      const { data: res } = await equipmentPurchaseOrderpage(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 导出
    infoexport() {
      // const res = await PurchaseStockexport(this.array);
      // const link = document.createElement("a");
      // let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      // link.style.display = "none";
      // link.download = "自定义文件名";
      // link.href = URL.createObjectURL(blob);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
.el-date-editor {
  width: 190px;
}
/deep/.el-form-item__label {
  width: 110px !important;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
}
ul li {
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  text-align: center;
  list-style: none;
  color: #fff;
  font-size: 14px;
  background-color: #fb7985;

  & span {
    font-size: 20px;
  }
}

ul {
  & li:nth-child(2) {
    background-color: #02aaf3;
  }
  & li:nth-child(3) {
    background-color: #70b603;
  }
  & li:nth-child(4) {
    background-color: #9675ce;
  }
}
</style>
