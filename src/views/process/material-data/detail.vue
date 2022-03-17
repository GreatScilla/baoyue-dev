// 物料数据新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">添加产品</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="100px"
        :rules="rules"
        :inline="true"
        :model="form"
        ref="materialForm"
        class="detail-form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item required label="产品编码" prop="matNo">
              <span v-if="status === 'isDetail'"> {{ form.matNo }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.matNo"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <el-select
                :disabled="status === 'isDetail'"
                size="small"
                v-model="form.status"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in materialStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="产品版本" prop="version">
              <span v-if="status === 'isDetail'"> {{ form.version }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.version"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item required label="产品类型" prop="matType">
              <el-select
                :disabled="status === 'isDetail'"
                size="small"
                v-model="form.matType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in materialType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工艺路线">
              <span v-if="status === 'isDetail'"> {{ form.lineName }}</span>
              <el-input
                v-else
                @click.native="dialogVisible = true"
                size="small"
                v-model="form.lineName"
                placeholder="请选择"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item required label="产品名称" prop="matName">
              <span v-if="status === 'isDetail'"> {{ form.matName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.matName"
                placeholder="请选择"
              ></el-input>
            </el-form-item>
            <el-form-item label="正则效验">
              <span v-if="status === 'isDetail'"> {{ form.scanReg }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.scanReg"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述">
              <span v-if="status === 'isDetail'"> {{ form.matDesc }}</span>
              <el-input
                v-else
                style="width: 615px;"
                :rows="5"
                type="textarea"
                v-model="form.matDesc"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="footer" v-if="status !== 'isDetail'">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave"
        >保存</el-button
      >
    </el-row>

    <el-dialog
      title="工艺路线选择"
      :visible.sync="dialogVisible"
      width="723px"
      append-to-body
      :before-close="handleClose"
    >
      <el-row style="margin-bottom: 20px;">
        <el-input
          style="width: 320px;"
          size="small"
          placeholder="输入工艺路线编码或名称"
        ></el-input>
      </el-row>
      <el-row>
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="tableData"
        >
          <el-table-column prop="name" label="工艺路线编码"> </el-table-column>
          <el-table-column prop="date" label="工艺路线名称"> </el-table-column>
        </el-table>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { saveMaterial } from "@/api/material/material";
import { getDictionary } from "@/api/system/dict";

export default {
  data() {
    return {
      dialogVisible: false,
      rules: {
        matNo: [{ required: true, message: "请输入产品编码", trigger: "blur" }],
        matType: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        matName: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        version: [
          { required: true, message: "请输入产品版本", trigger: "blur" }
        ]
      },
      form: {
        matNo: "",
        matType: "",
        matName: "",
        status: 0,
        scanReg: "",
        version: "",
        matDesc: "",
        lineId: "",
        lineName: ""
      },
      materialType: [],
      materialStatus: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "不启用"
        }
      ],
      tableData: [
        {
          id: "1",
          date: "机床001",
          name: "XLSK001"
        },
        {
          id: "2",
          date: "机床002",
          name: "XLSK002"
        },
        {
          id: "3",
          date: "机床003",
          name: "XLSK003"
        }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.form.lineId = val.id;
      this.form.lineName = val.name;
    },
    async handleSave() {
      try {
        await this.$refs.materialForm.validate();
      } catch (error) {
        this.$message.error("请输入正确的产品信息");
        return;
      }
      const saveRes = await saveMaterial(this.form);
      if (saveRes.data.code === 200) {
        this.$message.success("操作成功");
        this.$router.push({
          path: "/process/material-data"
        });
      }
    },
    cancel() {
      this.$router.back();
    }
  },
  async mounted() {
    const dictRes = await getDictionary({ code: "mat_type" });
    if (dictRes.data.code === 200) {
      this.materialType = dictRes.data.data;
    }
    this.status = this.$route.query.status;
    if (this.$route.query.row) {
      this.form = this.$route.query.row;
    }
  }
};
</script>

<style lang="scss" scoped>
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
