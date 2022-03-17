// 工序管理新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">工序信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="100px"
        ref="processForm"
        :rules="rules"
        :model="process"
        class="detail-form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="工序名称：" prop="procName">
              <span v-if="type === 'detail'"> {{ process.procName }}</span>
              <el-input
                v-else
                size="small"
                v-model="process.procName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="工序类型：">
              <span v-if="type === 'detail'">
                {{ process.procTypeName }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="process.procType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in processType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              required
              label="工序编码："
              prop="procCode"
              v-if="type === 'detail'"
            >
              <span> {{ process.procCode }}</span>
            </el-form-item>

            <el-form-item required label="工序状态：" prop="enabled">
              <span v-if="type === 'detail'">
                {{ process.enabledName }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="process.enabled"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in processtype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：">
              <span v-if="type === 'detail'"> {{ process.descInfo }}</span>
              <el-input
                v-else
                style="width: 615px"
                :rows="5"
                type="textarea"
                v-model="process.descInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-row>
        <div class="title">关联工位</div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <el-button
          style="margin-bottom: 20px"
          size="small"
          type="primary"
          @click="dialogVisible = true"
          v-if="type != 'detail'"
          >批量关联</el-button
        >
      </el-row>
      <el-row>
        <el-table :data="processTable" style="width: 100%">
          <el-table-column align="center" prop="id" label="工位编码">
          </el-table-column>
          <el-table-column align="center" prop="factoryName" label="工位名称">
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </el-row>
    </el-row>

    <el-dialog
      title="工位选择"
      :visible.sync="dialogVisible"
      width="723px"
      @opened="openDialog"
      append-to-body
    >
      <el-row>
        <el-tree
          :check-strictly="true"
          :data="factoryModelTree"
          show-checkbox
          node-key="id"
          default-expand-all
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="associatedStation">确 定</el-button>
      </span>
    </el-dialog>
    <el-row class="footer">
      <el-button size="small" @click="$router.push('/product-development/process-manage')">取消</el-button>
      <el-button
        v-if="type != 'detail'"
        size="small"
        type="primary"
        @click="handleSave"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import {
  saveProcess,
  getFactoryModelTree,
  updateProcess,
} from "@/api/process/process";
import { getDictionary } from "@/api/system/dictbiz";
import { getCode } from "@/api/common";

export default {
   props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      requesting: false,
      rules: {
        procCode: [
          { required: true, message: "请输入工序编码", trigger: "blur" },
        ],
        enabled: [
          { required: true, message: "请选择工序状态", trigger: "change" },
        ],
        procName: [
          { required: true, message: "请输入工序名称", trigger: "blur" },
        ],
      },
      factoryModelTree: [],
      defaultProps: {
        children: "children",
        label: "factoryName",
      },
      dialogVisible: false,
      // 工序状态
      processtype: [
        {
          value: "0",
          label: "启用",
        },
        {
          value: "1",
          label: "不启用",
        },
      ],
      // 工序类型
      processType: [],
      process: {
        enabled: "",
        procCode: "",
        procName: "",
        procType: "",
        descInfo: "",
      },
      processTable: [],
      processStation: [],
    };
  },
  methods: {
    async handleSave() {
      try {
        await this.$refs.processForm.validate();
      } catch (error) {
        this.$message.error("请输入正确的工序信息");
        return;
      }
      const data = {};
      let res;
      data.process = this.process;
      data.processStation = this.processTable.map((ele) => ele.id);
      this.requesting = true;
      try {
        if (this.type === "add") {
          res = await saveProcess(data);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            this.$router.push({
              path: "/product-development/process-manage",
            });
          }
        } else if (this.type === "edit") {
          res = await updateProcess(data);
          if (res.data.code === 200) {
            this.$message.success("操作成功");
            this.$router.back();
          }
        }
        this.requesting = false;
      } catch {
        this.requesting = false;
      }
    },
    // 关联工位
    associatedStation() {
      this.processTable = this.$refs.tree.getCheckedNodes();
      console.log(this.processTable);
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.processStation = val;
    },
    async _init() {
      const dictRes = await getDictionary({ code: "mes_proc_type" });
      if (dictRes.data.code === 200) {
        this.processType = dictRes.data.data;
      }
      const getFactoryModelTreeRes = await getFactoryModelTree();
      if (getFactoryModelTreeRes.data.code === 200) {
        this.factoryModelTree = getFactoryModelTreeRes.data.data;
        console.log(this.factoryModelTree);
        this.factoryModelTree.forEach((info) => {
          info.disabled = true;
          if (info.children.length !== 0) {
            info.children.forEach((info1) => {
              info1.disabled = true;
              if (info1.children.length !== 0) {
                info1.children.forEach((info2) => {
                  info2.disabled = true;
                });
              }
            });
          }
        });
      }
      if (this.type!=='add') {
        this.process = this.data;
        this.processTable = this.process.processStationLIst.map((ele) => {
          return { id: ele.stationId, factoryName: ele.stationName };
        });
        // this.processStation = this.processTable.map((ele) => ele.stationId);
        delete this.process.processStationLIst
      }
    },
  },

  async mounted() {
    await this._init();
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
.footer {
  width: 1166px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
</style>
