// 物料数据
<template>
  <basic-container>
    <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 10px;"
        placeholder="输入编码或名称"
        v-model="searchParam"
      ></el-input>
      <el-button size="small" type="primary" @click="search">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="to('isCreate')"
        >新增</el-button
      >
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >删除</el-button
      >
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column width="30" type="selection"> </el-table-column>
        <el-table-column prop="matNo" label="产品编码"> </el-table-column>
        <el-table-column prop="matName" label="产品名称"> </el-table-column>
        <el-table-column prop="materialTypeName" label="产品类别">
        </el-table-column>
        <el-table-column prop="version" label="产品版本号"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createUsername" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="to('idEdit', scope.row)">
              编辑
            </el-button>
            <el-button type="text" @click="to('isDetail', scope.row)">
              详情
            </el-button>
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
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
  </basic-container>
</template>

<script>
import { findMaterialList, deleteMaterial } from "@/api/material/material";
import paginationMixin from "@/mixins/pagination";
import { getDictionary } from "@/api/system/dict";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      tableData: [
        {
          date: "哈哈哈哈",
          name: "王小虎",
          status: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          status: true,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          status: false,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          status: false,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      materialType: [],
      searchParam: "",
      multipleSelection: []
    };
  },
  async mounted() {
    await this._init();
  },
  methods: {
    async _init(searchParam) {
      const dictRes = await getDictionary({ code: "mat_type" });
      if (dictRes.data.code === 200) {
        this.materialType = dictRes.data.data;
      }
      await this.handleList(searchParam);
    },
    async search() {
      this.page = 1;
      await this._init(this.searchParam);
    },
    reset() {
      this.searchParam = "";
      this.page = 1;
      this._init();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleList(searchParam) {
      const res = await findMaterialList({
        keywords: searchParam,
        current: this.currentPage,
        size: this.pageSize
      });
      this.tableData = res.data.data.records;
      this.tableData.forEach(ele => {
        const materialType = this.materialType.find(
          processTypeItem => processTypeItem.dictKey === ele.matType
        );
        if (materialType) {
          ele.materialTypeName = materialType.dictValue;
        }
      });
      this.total = res.data.data.total;
    },
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        ids = this.multipleSelection.map(ele => ele.id);
      }
      try {
        const deleteRes = await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        if (deleteRes === "confirm") {
          console.log("yes");
          const res = await deleteMaterial(ids);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            await this.handleList();
          }
        } else if (deleteRes === "cancel") {
          console.log("no");
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }
      } catch (error) {
        this.$message.success("操作失败");
      }
    },
    to(status, row) {
      this.$router.push({
        path: "/process/material-data/detail",
        query: {
          row,
          status
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
 
</style>
