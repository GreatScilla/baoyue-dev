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
        <el-form-item label="大小">
          <el-input
            size="small"
            style="width: 150px !important"
            v-model="folderManagerReq.fileSizeSmall"
            placeholder="请输入最小值"
          >
          </el-input>
          -
          <el-input
            size="small"
            style="width: 150px !important"
            v-model="folderManagerReq.fileSizeBig"
            placeholder="请输入最大值"
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
        <el-form-item label="创建时间">
          <el-date-picker
            size="small"
            v-model="createDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间">
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
        v-if="permission.manage_expore"
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <el-button
        v-if="permission.manage_add"
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="handleAdd('folder')"
        >新增</el-button
      >
      <el-button
        v-if="permission.manage_upload"
        icon="el-icon-upload2"
        size="small"
        @click="handleAdd('file')"
        >上传</el-button
      >
      <el-button
        v-if="permission.manage_recycle"
        plain
        size="small"
        @click="toRecycle"
        >回收站</el-button
      >
      <el-button
        v-if="permission.manage_delete"
        size="small"
        @click="handleDelete()"
        >批量删除
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
            <i v-if="scope.row.type === 0" class="el-icon-folder"></i>
            <router-link
              v-if="scope.row.type === 0"
              class="foldertxt"
              :to="{
                path: '/document/manage/sublist',
                query: { id: scope.row.id, name: scope.row.folderName },
              }"
            >
              {{ scope.row.folderName }}
            </router-link>
            <span v-else>
              {{ scope.row.folderName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" label="大小">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">
              {{ scope.row.fileSize + "MB" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="createUser" label="创建者"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.manage_download">
              <el-tooltip
                class="item"
                effect="dark"
                content="下载"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.type === 0"
                  type="text"
                  size="small"
                  icon="el-icon-download"
                  @click="download(scope.row)"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.manage_detail">
              <el-tooltip
                class="item"
                effect="dark"
                content="预览"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.type === 0"
                  type="text"
                  @click="getinfo(scope.row.file)"
                  size="small"
                  icon="el-icon-view"
                >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <span v-if="permission.manage_edit">
              <el-tooltip
                class="item"
                effect="dark"
                content="重命名"
                placement="bottom"
              >
                <el-button
                  @click="handleAdd('folder', scope.row)"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <el-tooltip
              v-if="permission.manage_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >
              </el-button>
            </el-tooltip>
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
    <!-- 新增 -->
    <el-dialog
      class="search-dialog"
      :visible.sync="addDialogVisible"
      :title="type === 'folder' ? '新建文件夹' : '上传'"
      append-to-body
      width="550px"
    >
      <el-form ref="addForm" :model="ifolderManagerReq" :rules="rules">
        <div v-if="type === 'folder'">
          <el-form-item prop="folderName" required label="文件夹名称">
            <el-input v-model="ifolderManagerReq.folderName"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <upload @on-success="fileUplod"></upload>
          <el-form-item style="margin: 15px 0" label="备注">
            <el-input v-model="ifolderManagerReq.remark"></el-input>
          </el-form-item>
        </div>

        <el-form-item class="search-footer">
          <el-button @click="addDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="onSumbit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getList, submit, recycle } from "@/api/document/index";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";
import upload from "@/components/document/upload";

export default {
  mixins: [paginationMixin],
  components: { upload },
  data() {
    return {
      type: "",
      createDate: [],
      updateDate: [],
      folderManagerReq: {
        folderName: "",
        id: "",
        superiorId: "", //上级id
      },
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false, //查询
      addDialogVisible: false,
      ifolderManagerReq: {
        folderName: "",
      }, //新增数据
    };
  },
  async created() {
    this.handleList();
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    //新增
    handleAdd(type, info) {
      this.type = type;
      if (info) {
        this.ifolderManagerReq.folderName = info.folderName;
        this.ifolderManagerReq.id = info.id;
      } else {
        this.ifolderManagerReq.folderName = "";
        this.ifolderManagerReq.id = "";
      }
      this.addDialogVisible = true;
    },
    //跳转回收站
    toRecycle() {
      this.$router.push("/document/recycle");
    },
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
      getList(params)
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
      if (this.createDate) {
        this.folderManagerReq.createStartTime = this.createDate[0];
        this.folderManagerReq.createEndTime = this.createDate[1];
      } else {
        this.folderManagerReq.createStartTime = "";
        this.folderManagerReq.createEndTime = "";
      }
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
    //下载
    async download(info) {
      fetch(info.file).then((res) =>
        res.blob().then((blob) => {
          var a = document.createElement("a");
          var url = window.URL.createObjectURL(blob);
          var filename = info.folderName + "." + info.fileType;
          a.href = url;
          console.log(url)
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        })
      );
    },
    //预览
    getinfo(url) {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.target = "_blank";
      link.click();
    },
    //删除角色
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
        const res = await recycle({ ids: ids });
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    fileUplod(form) {
      this.ifolderManagerReq = { ...form };
    },
    //保存
    async onSumbit() {
      if (this.ifolderManagerReq.folderName) {
        let res = await submit(this.ifolderManagerReq);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功!",
          });
          this.handleList();
          this.addDialogVisible = false;
        }
      } else {
        this.$message.error({
          message: "文件不能为空!",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.foldertxt {
  text-decoration: underline;
}
::v-deep .el-upload-list{
  width: 360px;
 overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
</style>
