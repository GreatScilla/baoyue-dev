<template>
  <div>
    <el-dialog
      title="条件搜索"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      style="background-color: rgba(0, 0, 0, 0.5)"
      :before-close="handleClose"
    >
      <el-form label-width="80px" :model="sizeForm" size="mini">
        <el-form-item label="查询编号">
          <el-input v-model="sizeForm.tagName"></el-input>
        </el-form-item>
        <el-form-item label="所在位置">
          <el-input v-model="sizeForm.position"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchAll">查询</el-button>
          <el-button type="primary" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  <el-button @click="qqqq">787987</el-button>-->
    <el-button size="small" type="primary" @click="searchBtn">
      <i class="el-icon-search"></i>查询</el-button
    >
    <el-button size="small" type="primary" @click="addBtn">新增</el-button>
    <el-button size="small" type="primary" @click="deletAll"
      >批量删除</el-button
    >
    <el-divider></el-divider>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        label="编号"
        align="center"
        prop="tagName"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="摄像头名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="url"
        align="center"
        label="IP地址"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="position"
        align="center"
        label="摄像头位置"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="是否显示" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.isOpened == 0">是</span
          ><span v-if="scope.row.isOpened == 1">否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit-outline"
              @click="editBtn(scope.row)"
            >
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="详情"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-tickets"
              @click="detailBtn(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="delBtn(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <detail :info="info"></detail>
  </div>
</template>

<script>
import { cameraList, cameraRemove } from "@/api/shebei/iInternetOfthings";
import detail from "./detail";
// import Detail from "@/views/shebei/plan/checkPlan/detail";
export default {
  name: "index",
  components: {
    detail,
  },
  data() {
    return {
      sizeForm: {},
      dialogVisible: false,
      total: "",
      info: {
        detailShow: false,
        flag: "",
      },
      tableData: [],
    };
  },
  created() {
    this.getpage();
  },
  methods: {
    searchAll() {
      let param = JSON.parse(JSON.stringify(this.sizeForm));
      this.getpage(param);
      this.dialogVisible = false;
    },
    resetBtn() {
      this.sizeForm = {};
    },
    searchBtn() {
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      const newarr = val.map((ele) => ele.id);
      this.rowIds = newarr.join(",");
    },
    async deletAll() {
      let res = await cameraRemove({ ids: this.rowIds });
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.getpage();
    },
    async getpage(para) {
      console.log(para);
      let res = await cameraList(para);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      console.log(res.data.data.records);
      let arr = [];
      res.data.data.records.forEach((item) => {
        if (item.isOpened == 0) {
          arr.push(item);
        }

        // switch (this.tableData[item].isOpened) {
        //   case "0":
        //     this.tableData[item].isOpened = "是";
        //     break;
        //   case "1":
        //     this.tableData[item].isOpened = "否";
        // }
      });
    },
    addBtn() {
      //新增
      this.info.detailShow = true;
      this.info.flag = "add";
    },
    editBtn(row) {
      this.info.detailShow = true;
      this.info.flag = "edit";
      this.info.id = row.id;
    },
    detailBtn(row) {
      this.info.id = row.id;
      this.info.detailShow = true;
      this.info.flag = "detail";
      //详情
    },
    async delBtn(index, row) {
      let res = await cameraRemove({ ids: row.id });
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.getpage();
    },

    handleSizeChange(val) {
      this.getpage({ pageSize: val });
    },

    handleCurrentChange(val) {
      this.getpage({ pageNum: val });
    },
  },
};
</script>

<style scoped>
</style>
