<template>
  <div>
    <!-- 条件擦寻 -->
    <top-seach @updateTab="updateTab" :info="info"></top-seach>

    <!-- 按钮 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
        <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
          <el-button type="primary" size="small" @click="add">新增</el-button>
          <el-button type="primary" size="small" @click="infoexport">导出</el-button>
          <el-button type="primary" size="small" @click="clearTab">删除</el-button>
        </div></el-col
      >
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      max-height="350"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="numberDate" label="开票日期">
      </el-table-column>
      <el-table-column prop="invoiceHead" label="发票抬头"></el-table-column>
      <el-table-column prop="invoiceNumber" label="发票号码"></el-table-column>
      <el-table-column prop="invoiceAmount" label="开票金额"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column prop="note" label="备注"> </el-table-column>
      <el-table-column prop="file" label="附件"></el-table-column>
      <el-table-column width="160" fixed="right" label="操作">
        <template v-slot:default="slotProps">
          <!-- <span class="span" v-if="slotProps.row.status == '0'"
            ><a @click="showEdit('0', slotProps.row)">详情</a
            ><a @click="showEdit('1', slotProps.row)">编辑</a
            ><a @click="clearlist(slotProps.row)">删除</a></span
          >
          <span
            class="span"
            v-if="slotProps.row.status == '1' || slotProps.row.status == '3'"
            ><a @click="showEdit('0', slotProps.row)">详情</a
            ><a>转采购</a></span
          > -->
          <span class="span">
            <a @click="showEdit('0', slotProps.row)">详情</a
            ><a @click="showEdit('1', slotProps.row)">编辑</a></span
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagina-ele
      :total="total"
      @updatepageNum="updatepageNum"
      @updatepageSize="updatepageSize"
    ></pagina-ele>

    <!-- 添加 -->
    <add-ele @addupdate="addupdate" ref="add"></add-ele>
    <!-- 详情编辑 -->
    <edit-ele
      ref="edit"
      :flag="flag"
      :detailAll="detailAll"
      @updatedit="updatedit"
      @updateFalg="flag = '0'"
      @updateFalgC="flag = '1'"
    ></edit-ele>
  </div>
</template>
<script>
import topSeach from "./topseach";
import addEle from "./addele";
import paginaEle from "../../component/pagingele";
import editEle from "./editele";
import {
  getInvoiceOrderByPage,
  FPgetInvoiceOrderById,
  FPdeleteOrderBatch
} from "@/api/shebei/purchase";
export default {
  name: "",
  components: { topSeach, addEle, paginaEle, editEle },
  props: {},
  data() {
    return {
      info:{
        searchShow:false
      },
      total: 10,
      tableData: [
        {
          status: "0",
          file: "2",
          number: "13132",
          numberDate: "2",
          purchaseDepot: "2",
          purchaseMan: "2",
          checkPerson: "2"
        }
      ],
      // 表格批量数据
      array: { ids: "" },
      flag: "0",
      // 详情本行
      detailAll: {}
    };
  },
  activated() {},
  watch: {},
  created() {
    this.inittab();
  },
  mounted() {},
  methods: {
    searchBtn(){
      this.info.searchShow=true
    },
    // 添加
    add() {
      this.$refs.add.dialogVisible = true;
    },

    // 添加成功后
    addupdate() {
      this.inittab();
    },

    updatedit() {
      this.inittab();
    },

    // 初始化数据
    async inittab() {
      const { data: res } = await getInvoiceOrderByPage();
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 条件查询
    updateTab(val) {
      this.tableData = val.records;
      this.total = val.total;
    },

    // 分页
    async updatepageNum(val) {
      const { data: res } = await getInvoiceOrderByPage(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    async updatepageSize(val) {
      const { data: res } = await getInvoiceOrderByPage(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },
    // -------------

    // 多选table
    handleSelectionChange(val) {
      const newarr = val.map(ele => ele.id);
      this.array.ids = newarr.join(",");
    },


    // 删除
    async clearTab(val) {
      const rest = await this.$confirm("是否确定删除本条数据?", "数据删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消删除成功");
      const { data: res } = await FPdeleteOrderBatch(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("删除成功");
      this.inittab();
    },

    // 详情/编辑
    async showEdit(val, ele) {
      const { data: res } = await FPgetInvoiceOrderById({ id: ele.id });
      this.detailAll = res.data;
      this.$refs.edit.dialogVisible = true;
      this.flag = val;
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
.btn-color {
  color: #fff;
  background-color: #1abc9c;
}
.upload-demo {
  display: inline-block;
  margin: 0 15px;
}

.span a {
  font-size: 13px;
  padding: 0 5px;
  color: #169bd5;
  cursor: pointer;
}
.el-tag {
  color: #fff;
}
</style>
