<template>
  <div>
    <!-- 筛选条件 -->
    <top-screen @updateTB="updateTB" :info="info"></top-screen>
    <!-- 按钮 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
        <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
          <el-button type="primary" @click="add" size="small">新增</el-button>
          <el-button class="btn-color" @click="Audit" size="small">审核</el-button>
          <el-button @click="delList" size="small">删除</el-button>
          <el-button @click="outexport" size="small">导出</el-button>
          <el-button size="small">打印</el-button>
          <el-button @click="cancellAtion" size="small">作废</el-button>
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
      <el-table-column prop="status" label="单据状态">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.status == '0'">
            <el-tag color="#999999">待审</el-tag>
          </span>
          <span v-if="slotProps.row.status == '1'">
            <el-tag color="#1ABC9C">审核</el-tag>
          </span>
          <!-- <span v-if="slotProps.row.status == '2'">
            <el-tag color="#1ABC9C">审核</el-tag>
            <el-tag color="#F59A23">转资产</el-tag>
          </span> -->
          <span v-if="slotProps.row.status == '3'">
            <el-tag color="#027DB4">作废</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="file" label="附件" width="50"></el-table-column>
      <el-table-column prop="number" label="单据编号"></el-table-column>
      <el-table-column prop="documentTime" label="单据日期"></el-table-column>
      <el-table-column prop="allotType" label="调拔类型">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.allotType == '1'">库内调拨</span>
          <span v-if="slotProps.row.allotType == '2'">库外调拨</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="调出仓库">
      </el-table-column>
      <el-table-column prop="inLocation" label="调入仓库"></el-table-column>
      <el-table-column prop="handleDeptId" label="执行部门"></el-table-column>
      <el-table-column prop="handlePersonId" label="执行人"></el-table-column>
      <el-table-column prop="createUser" label="制单人"></el-table-column>
      <el-table-column prop="checkPerson" label="审核人"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot:default="slotProps">
          <span class="span" v-if="slotProps.row.status == '0'"
            ><a @click="showEdit('0', slotProps.row)">编辑</a
            ><a @click="showEdit('1', slotProps.row)">详情</a
            ><a @click="delEdit(slotProps.row)">删除</a></span
          >
          <span
            class="span"
            v-if="slotProps.row.status == '1' || slotProps.row.status == '3'"
            ><a @click="showEdit('1', slotProps.row)">详情</a></span
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
    <add-Thedrawing
      @updateAdd="updateAdd"
      :adddialogVisible="adddialogVisible"
    ></add-Thedrawing>

    <!-- 编辑 -->
    <edit-ele
      @updateFalg="flag = '0'"
      @updateFalgC="flag = '1'"
      :flag="flag"
      :detailAll="detailAll"
      @updateEdit="updateEdit"
      :editdialogVisible="editdialogVisible"
    ></edit-ele>
  </div>
</template>
<script>
import paginaEle from "../../component/pagingele";
import topScreen from "./topscreen";
import addThedrawing from "./addThedrawing";
import editEle from "./editinfo";

import {
  pageTable,
  InfoAudit,
  delstorage,
  InfoisVoid,
  InfoDetailBean
} from "@/api/shebei/InventoryManagement";
export default {
  name: "",
  components: { topScreen, paginaEle, addThedrawing, editEle },
  props: {},
  data() {
    return {
      info:{
        searchShow:false,
      },
      total: null,

      tableData: [],

      adddialogVisible: false, // 添加
      editdialogVisible: false, // 编辑

      flag: "0",

      // 表格批量所以数据
      array: { ids: "" },

      detailAll: {}
    };
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {
    this.pageInit();
  },
  mounted() {},
  methods: {
    searchBtn(){
      this.info.searchShow=true
    },
    // 监听add子组件事件
    updateAdd() {
      this.adddialogVisible = false;
      // 初始化数据
      this.pageInit();
    },
    // 监听edit子组件事件
    updateEdit() {
      this.editdialogVisible = false;
      this.pageInit();
    },
    // 新增
    add() {
      this.adddialogVisible = true;
    },

    // 初始 表格
    async pageInit() {
      const { data: res } = await pageTable();
      this.tableData = [];
      res.data.records.forEach(ele => {
        if (ele.type == "调拨") {
          this.tableData.push(ele);
        }
      });
      this.total = res.data.total;
    },

    // 分页
    async updatepageNum(val) {
      const { data: res } = await pageTable(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    async updatepageSize(val) {
      const { data: res } = await pageTable(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 条件查询
    updateTB(val) {
      this.tableData = val.records;
      this.total = val.total;
    },

    // 编辑/ 详情
    async showEdit(val, ele) {
      const { data: res } = await InfoDetailBean({ id: ele.id });
      this.detailAll = res.data;
      this.editdialogVisible = true;
      this.flag = val;
    },

    // tablechange
    handleSelectionChange(val) {
      const newarr = val.map(ele => ele.id);
      this.array.ids = newarr.join(",");
    },

    // 导出
    async outexport() {
      const res = await InfoExport(this.array);
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      link.style.display = "none";
      link.download = "自定义文件名";
      link.href = URL.createObjectURL(blob);
      link.click();
      document.body.appendChild(link);
    },

    // 审核
    async Audit() {
      const { data: res } = await InfoAudit(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("操作成功");
      this.pageInit();
    },

    // 删除
    async delList() {
      const rest = await this.$confirm("是否确定删除本条数据?", "数据删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消删除成功");
      const { data: res } = await delstorage(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("删除成功");
      this.pageInit();
    },

    // 作废
    async cancellAtion() {
      const rest = await this.$confirm("是否确定作废本条数据?", "数据作废", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消作废成功");
      const { data: res } = await InfoisVoid(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("作废成功");
      this.pageInit();
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

.el-tag {
  color: #fff;
}

.span a {
  font-size: 13px;
  padding: 0 5px;
  color: #169bd5;
  cursor: pointer;
}
</style>
