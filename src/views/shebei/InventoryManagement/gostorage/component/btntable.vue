<template>
  <div>
    <!-- 条件查询 -->
    <top-filter @updateTB="updateTB" :info="info"></top-filter>

    <!-- 按钮 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
        <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
          <el-button type="primary" @click="adddialogVisible = true" size="small"
            >新增</el-button
          >
          <el-button class="btn-color" @click="updelAudit"  size="small">审核</el-button>
          <el-button @click="delList" size="small">删除</el-button>
          <el-upload class="upload-demo" action="#" :before-upload="myUpload">
            <el-button size="small">导入</el-button>
          </el-upload>
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
          <span v-if="slotProps.row.status == '2'">
            <el-tag color="#1ABC9C">审核</el-tag>
            <el-tag color="#F59A23">转资产</el-tag>
          </span>
          <span v-if="slotProps.row.status == '3'">
            <el-tag color="#027DB4">作废</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="file" label="附件" width="50"></el-table-column>
      <el-table-column prop="number" label="单据编号"></el-table-column>
      <el-table-column prop="documentTime" label="单据日期"></el-table-column>
      <el-table-column prop="typeClass" label="入库类别">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.typeClass == '1'">采购</span>
          <span v-else-if="slotProps.row.typeClass == '2'">采购退货</span>
          <span v-else-if="slotProps.row.typeClass == '3'">其他</span>
          <span v-else-if="slotProps.row.typeClass == '4'">零售</span>
          <span v-else-if="slotProps.row.typeClass == '5'">销售</span>
          <span v-else>调拔</span>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryStatus" label="入库状态">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.deliveryStatus == '0'">待出库</span>
          <span v-else-if="slotProps.row.deliveryStatus == '1'">部分出库</span>
          <span v-else>已出库</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="送货单号"></el-table-column>
      <el-table-column prop="createUser" label="制单人"></el-table-column>
      <el-table-column prop="checkPerson" label="审核人"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <!--  -->
        <template v-slot:default="slotProps">
          <span class="span" v-if="slotProps.row.status == '0'"
            ><a @click="showEdit('0', slotProps.row)">详情</a
            ><a @click="showEdit('1', slotProps.row)">编辑</a></span
          >
          <span class="span" v-if="slotProps.row.status == '1'"
            ><a @click="showEdit('0', slotProps.row)">详情</a
            ><a @click="updelAsset(slotProps.row)">转资产</a></span
          >
          <span
            class="span"
            v-if="slotProps.row.status == '2' || slotProps.row.status == '3'"
            ><a @click="showEdit('0', slotProps.row)">详情</a></span
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

    <!-- 新增弹框 -->
    <add-stock
      @updateAdd="updateAdd"
      :adddialogVisible="adddialogVisible"
    ></add-stock>

    <!--  编辑详情-->
    <edit-mation
      @upTAb="upTAb"
      :detailAll="detailAll"
      :falg="falg"
      @updateFalg="falg = '0'"
      @updateFalgC="falg = '1'"
      @updateEditVisible="updateEditVisible"
      :editdialogVisible="editdialogVisible"
    ></edit-mation>

    <!-- 转资产 -->
    <InfoisAsset-ele
    @updateIsAsset='updateIsAsset'
      :InfoisAssetall="InfoisAssetall"
      ref="isAsset"
    ></InfoisAsset-ele>
  </div>
</template>
<script>
import pagination from "../../component/pagingele"; // 分页;
import addStock from "./addstock"; // 新增
import editMation from "./editmation";
import InfoisAsset from "./InfoisAsset";
import {
  delstorage,
  pageTable,
  InfoisVoid,
  InfoAudit,
  InfoDetailBean,
  InfoExport
} from "@/api/shebei/InventoryManagement";
import website from "@/config/website";
import { Base64 } from "js-base64";
import { getToken } from "@/util/auth";
import topFilter from "./topfilter";

export default {
  name: "",
  components: {
    "pagina-ele": pagination, // 分页;
    addStock, // 新增
    editMation, // 详情编辑
    topFilter, // 条件查询,
    "InfoisAsset-ele": InfoisAsset
  },
  props: {},
  data() {
    return {
      info:{
        searchShow:false
      },
      adddialogVisible: false, // 新增弹框
      editdialogVisible: false, // 详情编辑弹框
      falg: "0",
      // 表格数据
      tableData: [],

      // 详情本行
      detailAll: {},

      // 表格批量所以数据
      array: { ids: "" },
      InfoisAssetall: {}, // 转资产

      // 分页
      total: null
    };
  },
  activated() {},
  watch: {},
  created() {
    this.pageInit();
  },
  mounted() {
    this.total = 30;
  },
  methods: {
    searchBtn(){
      this.info.searchShow=true
    },
    // 监听添加
    updateAdd() {
      this.adddialogVisible = false;
      this.pageInit();
    },
    // 监听详情
    updateEditVisible() {
      // this.detailAll = {};
      this.editdialogVisible = false;
    },

    // 详情/编辑
    async showEdit(val, ele) {
      const { data: res } = await InfoDetailBean({ id: ele.id });
      this.detailAll = res.data;

      this.falg = val;
      this.editdialogVisible = true;
    },

    // 删除
    async delList() {
      const rest = await this.$confirm("是否确认本条删除?", "数据删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消删除");
      const { data: res } = await delstorage(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("删除成功");
      this.pageInit();
    },

    // 多选table
    handleSelectionChange(val) {
      const newarr = val.map(ele => ele.id);
      this.array.ids = newarr.join(",");
    },

    // 转资产ok
    updateIsAsset() {
      this.pageInit();
    },

    // 初始 表格
    async pageInit() {
      const { data: res } = await pageTable({ type: "入库" });
      this.tableData = [];
      res.data.records.forEach(ele => {
        if (ele.type == "入库") {
          this.tableData.push(ele);
        }
      });
      this.total = res.data.total;
    },

    // 条件查询
    updateTB(val) {
      this.tableData = val.records;
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

    // 作废
    async cancellAtion() {
      const rest = await this.$confirm("是否确认作废本条数据?", "数据作废", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消作废");
      const { data: res } = await InfoisVoid(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("作废成功");
      this.pageInit();
    },

    // 转资产
    async updelAsset(val) {
      const { data: res } = await InfoDetailBean({ id: val.id });
      this.InfoisAssetall = res.data;
      this.$refs.isAsset.adddialogVisible = true;
    },

    // 审核
    async updelAudit() {
      const { data: res } = await InfoAudit(this.array);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("审核成功");
      this.pageInit();
    },

    myUpload(file) {
      let result = `Basic ${Base64.encode(
        `${website.clientId}:${website.clientSecret}`
      )}`;
      var form = new FormData();
      form.append("file", file);
      var xhr = new XMLHttpRequest();
      // 添加 上传成功后的回调函数
      xhr.onload = function(res) {};
      // 添加 上传失败后的回调函数
      xhr.onerror = function(err) {};
      xhr.open(
        "POST",
        // "http://192.168.0.107:8001/blade-rcm/equipmentDepotHead/import",
        "/api/blade-rcm/equipmentDepotHead/import",
        true
      );
      xhr.setRequestHeader("Authorization", result);
      xhr.setRequestHeader(website.tokenHeader, "bearer " + getToken());
      xhr.send(form);
      return false;
    },

    // 导出
    async outexport() {
      const res = await InfoExport(this.array);
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      link.style.display = "none";
      link.download = "自定义文件名";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // 编辑
    upTAb() {
      this.pageInit();
      this.editdialogVisible = false;
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
.upload-demo {
  display: inline-block;
  margin: 0 15px;
}
</style>
