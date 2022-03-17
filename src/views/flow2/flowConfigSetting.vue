<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="infoDialogVisible"
      :before-close="handleClose"
      title="新增节点"
      append-to-body
      width="680px"
    >
      <el-form
        :rules="rules"
        :show-message="false"
        ref="form"
        :model="form"
        label-width="120px"
        class="form-footer"
      >
        <el-form-item v-if="type === 'child'" label="属于条件分支">
          <el-select
            v-model="form.conditionId"
            placeholder="请选择"
            @change="handelCondition"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.conditionsName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="nodeName" label="节点名称">
          <el-input v-model="form.nodeName"></el-input>
        </el-form-item>
        <el-form-item label="节点描述">
          <el-input v-model="form.nodeDescription"></el-input>
        </el-form-item>
        <el-form-item prop="nodeTotalnumber" label="审批总人数">
          <el-input-number
            style="width: 320px"
            size="small"
            v-model="form.nodeTotalnumber"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="nodePassnumber" label="最少审批人数">
          <el-input-number
            style="width: 320px"
            size="small"
            v-model="form.nodePassnumber"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="roleName" label="审批角色">
          <el-input
            v-model="form.roleName"
            suffix-icon="el-icon-search"
            placeholder="请选择"
            @focus="approvalUserVisible = true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="carbonCopyName" label="抄送角色">
          <el-input
            v-model="form.carbonCopyName"
            suffix-icon="el-icon-search"
            placeholder="请选择"
            @focus="checkUserVisible = true"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button
            type="primary"
            :loading="requesting"
            size="small"
            @click="rowSave"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 10px">
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="addEelment()"
        >添加节点</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="topNodeName" label="上级节点"> </el-table-column>
        <el-table-column prop="conditionName" label="属于条件分支">
        </el-table-column>
        <el-table-column prop="nodeGrade" label="节点等级"> </el-table-column>
        <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
        <el-table-column prop="nodeDescription" label="节点描述">
        </el-table-column>
        <el-table-column prop="nodeTotalnumber" label="审批总人数">
        </el-table-column>
        <el-table-column prop="nodePassnumber" label="最少审批人数">
        </el-table-column>
        <el-table-column prop="roleName" label="审批角色">
          <template slot-scope="scope">
            {{ scope.row.roleName.join(",") }}
          </template>
        </el-table-column>
        <el-table-column prop="carbonCopyName" label="抄送角色">
        </el-table-column>
        <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
            <span>
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
                  @click="addEelment(scope.row, 'edit')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <sapn>
              <el-tooltip
                class="item"
                effect="dark"
                content="添加子节点"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-circle-plus-outline"
                  @click="addChildEelment(scope.row, 'child')"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </sapn>
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
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 选择抄送人弹窗 -->
    <leadingCadres
      title="抄送人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />
    <!-- 选择审批人弹窗 -->
    <auditorDia
      title="审批人"
      :checkUserVisible.sync="approvalUserVisible"
      @on-selected="addAuditorDiaUser"
    />
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getList,
  add,
  update,
  updateSort,
  del,
  conditionsNameList,
} from "@/api/flow2/flowConfigSetting.js";
import leadingCadres from "@/components/quality/leadingCadres";
import auditorDia from "@/components/flow/auditorDia";
export default {
  components: { leadingCadres, auditorDia },
  data() {
    return {
      tableData: [],
      form: {
        // carbonCopyId: "",
        // conditionId: "",
        // nodeDescription: "",
        // nodeId: "",
        // nodeName: "",
        // nodePassnumber: "",
        // nodeTotalnumber: "",
        // processId: "",
        // roleId: "",
      },
      loading: false,
      options: [],
      infoDialogVisible: false,
      approvalUserVisible: false, //审批角色弹窗
      checkUserVisible: false, //抄送角色弹窗
      type: "",
      rules: {
        roleName: [{ required: true, message: "请选择", trigger: "change" }],
        carbonCopyName: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        nodeName: [{ required: true, message: "请输入", trigger: "blur" }],
        nodeTotalnumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        nodePassnumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.id = this.$route.query.row.id;
    this.getList();
    conditionsNameList({}).then((res) => {
      this.options = res.data.data;
    });
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    //获取列表
    getList() {
      getList({
        processId: this.id,
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    //打开弹窗
    addEelment(info, type) {
      this.type = "";
      if (info) {
        this.type = type;
        this.form = info;
      }
      this.infoDialogVisible = true;
    },
    handleClose() {
      this.form = {};
      this.infoDialogVisible = false;
    },
    //打开子节点弹窗
    addChildEelment(info, type) {
      this.type = type;
      this.form.topNodeId = info.nodeId;
      this.form.nodeGrade = info.nodeGrade;
      this.infoDialogVisible = true;
    },
    //前往设置页面
    goSetting(row) {
      this.$router.push({
        url: "/flow2/flowConfigSetting",
        params: {
          row,
        },
      });
    },

    //选择审批人
    addAuditorDiaUser(list) {
      let idList = [];
      let nameList = [];
      list.forEach((res) => {
        idList.push(res.id);
        nameList.push(res.approverDescription);
      });
      this.form.roleId = idList;
      this.form.roleName = nameList.join(",");
    },
    //选择抄送人
    addUser(list) {
      let idList = [];
      let nameList = [];
      list.forEach((res) => {
        idList.push(res.id);
        nameList.push(res.realName);
      });
      this.form.carbonCopyId = idList;
      this.form.carbonCopyName = nameList.join(",");
      console.log(this.form.carbonCopyName);
    },
    //新增提交触发
    async rowSave() {
        try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      this.form.processId = this.id;
      let submitApi = add;
      if (this.type === "edit") {
        submitApi = update;
      }
      const res = await submitApi(this.form);
      this.requesting = true;
      if (res.data.code === 200) {
        this.requesting = false;
        this.form = {};
        this.getList();
        this.infoDialogVisible = false;
        this.$message.success("保存成功");
      }
    },
    //删除操作
    rowDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return del({
            processId: this.id,
            nodeIdList: row.nodeId,
          });
        })
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        });
    },
    //多选时触发
    muiltiSelect(e) {
      this.selectedRows = e;
    },
    //删除
    funDelRole(ids) {
      console.log(ids);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del({
            processId: this.id,
            nodeIdList: ids,
          })
            .then((res) => {
              if (res.data.success) {
                this.getList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole(row.nodeId);
    },
    // 多行删除
    handleDelRole() {
      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids, join(","));
    },
  },
};
</script>