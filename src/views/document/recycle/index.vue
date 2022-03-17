// 文档管理
<template>
  <basic-container>
    <!-- 查询 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form ref="form" label-width="90px" class="form-footer">
        <el-form-item label="文件名">
          <el-input
            size="small"
            v-model="folderManagerReq.folderName"
            placeholder="请输入文件名"
          >
          </el-input>
        </el-form-item>
          <el-form-item label="目录">
          <el-input
            size="small"
            v-model="folderManagerReq.superiorName"
            placeholder="请输入目录"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="大小">
          <el-input
            size="small"
            style="width:150px !important"
            v-model="folderManagerReq.fileSizeSmall"
            placeholder="请输入最小值"
          >
          </el-input>
          -
          <el-input
            size="small"
            style="width:150px !important"
            v-model="folderManagerReq.fileSizeBig"
            placeholder="请输入最大值"
          >
          </el-input>
        </el-form-item>
          <el-form-item label="类型">
          <el-input
            size="small"
            v-model="folderManagerReq.fileType"
            placeholder="请输入类型"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            size="small"
            v-model="folderManagerReq.remark"
            placeholder="请输入备注"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input
            size="small"
            v-model="folderManagerReq.createUser"
            placeholder="请输入创建者"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="删除时间">
          <el-date-picker
            size="small"
            v-model="updateDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
           <el-form-item label="删除者">
          <el-input
            size="small"
            v-model="folderManagerReq.updateUser"
            placeholder="请输入删除者"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin: 10px 0 20px">
      <el-button
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" size="small" @click="handleRestore"
        >还原</el-button
      >
      <el-button
        icon="el-icon-delete"
        type="danger"
        size="small"
        @click="handleDelete()"
        >清除
      </el-button>
      <!-- <el-button size="small">导出</el-button>
      <el-button size="small">打印</el-button> -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="folderName" label="文件名">
          <template slot-scope="scope">
            <i class="el-icon-folder"></i>
            {{ scope.row.folderName }}
          </template>
        </el-table-column>
        <el-table-column prop="superiorName" label="上级名称">
        </el-table-column>
        <el-table-column prop="fileSize" label="大小">
          <template slot-scope="scope">
            <span v-if="scope.row.fileSize !== ''">
              {{ scope.row.fileSize + "MB" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileType" label="类型"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="createUser" label="创建者"> </el-table-column>
        <el-table-column prop="updateTime" label="删除时间"> </el-table-column>
        <el-table-column prop="updateUser" label="删除者"> </el-table-column>
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
import { getRecycleList, remove, restore } from "@/api/document/index";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      updateDate: [],
      folderManagerReq: {
        folderName: "",
        id: "",
        superiorId: "", //上级id
      },
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false, //查询
    };
  },
  async created() {
    this.handleList();
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 查询角色
    handleList(...arg) {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.folderManagerReq,
      };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      getRecycleList(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //重置
    reset() {
      this.folderManagerReq = {};
      this.searchDialogVisible = false;
      this.handleList(this.folderManagerReq);
    },
    // 搜索
    onSearch() {
      if (this.updateDate) {
        this.folderManagerReq.updateStartTime = this.updateDate[0];
        this.folderManagerReq.updateEndTime = this.updateDate[1];
      } else {
        this.folderManagerReq.updateStartTime = "";
        this.folderManagerReq.updateEndTime = "";
      }
      this.searchDialogVisible = false;
      this.handleList(this.folderManagerReq);
    },
    //还原
    async handleRestore() {
      let formList = [];
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        this.multipleSelection.map((ele) => {
          let obj = {
            folderName: ele.folderName,
            id: ele.id,
            superiorId: ele.superiorId,
          };
          formList.push(obj);
        });
        try {
          await this.$confirm("是否要还原该数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          const res = await restore(formList);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            await this.handleList();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    //删除
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        } else {
          ids = this.multipleSelection.map((ele) => ele.id);
        }
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        ids = ids.join(",");
        const res = await remove({ ids: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //保存
    async onSumbit() {
      try {
        await this.$refs.addForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      console.log(this.iFolderManagerReq);
      let res = await submit(this.iFolderManagerReq);
      if (res.data.code === 200) {
        this.$message.success({
          message: "新增成功!",
        });
        this.handleList();
        this.addDialogVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
