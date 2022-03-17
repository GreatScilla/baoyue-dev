// 关联SOP新增
<template>
  <basic-container>
    <el-row>
      <div class="title">关联SOP新增</div>
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-form label-width="100px" :model="selectProcess" class="detail-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工序编码：">
              <el-input
                size="small"
                v-model="selectProcess.processCode"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工序名称：">
              <el-input
                disabled
                size="small"
                v-model="selectProcess.processName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >新增
      </el-button>
    </el-row>
    <el-row>
      <el-table :data="sopTable" style="margin-top: 10px; width: 100%">
        <el-table-column type="index" width="50">
          <template slot="header">
            <div @click="dialogVisible = true">
              <i
                style="color: #409eff; font-size: 24px"
                class="el-icon-circle-plus-outline"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="文件名称"></el-table-column>
        <el-table-column prop="url" label="文件地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="savePerson"
        :loading="requesting"
        >保存
      </el-button>
    </el-row>

    <el-dialog
      title="选择文件"
      :visible.sync="dialogVisible"
      width="723px"
      append-to-body
      :before-close="handleClose"
    >
      <sop-select @on-submit="selectSop"></sop-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import { saveProcessSop } from "@/api/product/craft-bom.js";
import sopSelect from "@/components/sopSelect";

export default {
  components: {
    sopSelect,
  },
  data() {
    return {
      requesting: false,
      dialogVisible: false,
      sopTable: [],
      processProduct: {},
      selectProcess: {},
      selectCraftLine: {},
    };
  },
  async mounted() {
    this.selectCraftLine = this.$route.query.selectCraftLine;
    this.selectProcess = this.$route.query.selectProcess;
    if (this.$route.query.operationState) {
      this.operationState = this.$route.query.operationState;
      this.sopTable = this.$route.query.row;
    }
  },
  methods: {
    selectSop(value) {
      if (value.length > 0) {
        this.sopTable.push(...value);
      }
      this.dialogVisible = false;
    },

    handleDelete(row) {
      this.$confirm("确定要删除该计划排程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sopTable = this.sopTable.filter((ele) => row.id != ele.id);
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 取消
    cancel() {
      this.$router.back();
    },
    // 保存
    async savePerson() {
      this.sopTable.forEach((ele) => {
        ele.sopFileId = ele.id;
        ele.lineId = this.selectCraftLine.id;
        ele.processId = this.selectProcess.id;
        delete ele.id;
      });
      this.requesting = true;
      try {
        const res = await saveProcessSop(this.sopTable);
        this.requesting = false;
        if (res.data.success) {
          this.$message.success("新增成功");
          this.$router.back();
        }
      } catch {
        this.requesting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}

.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
</style>
