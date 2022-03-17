// 换钢丝修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item required label="日期:" prop="steelWireTime">
              <span v-if="type === 'detail'">{{ form.steelWireTime }}</span>
              <el-date-picker
                v-else
                v-model="form.steelWireTime"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="规格型号1:" prop="modelOne">
              <span v-if="type === 'detail'">{{ form.modelOne }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.modelOne"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号2:">
              <span v-if="type === 'detail'">{{ form.modelTwo }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.modelTwo"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号3:">
              <span v-if="type === 'detail'">{{ form.modelThree }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.modelThree"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="操作员:" prop="userName">
              <span v-if="type === 'detail'">{{ form.userName }}</span>
              <el-input
                v-else
                @click.native="employeeDialogVisible = true"
                size="small"
                suffix-icon="el-icon-search"
                v-model="form.userName"
                placeholder="请选择操作员"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.status == 2">
            <el-form-item label="审核人:">
              <span v-if="type === 'detail'">{{ form.checkPerson }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.checkPerson"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span v-if="type === 'detail'">{{ form.remark }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.remark"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="操作员"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
  </basic-container>
</template>
<script>
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import {
  steelWireSave,
  getSteelWireByPageDetail,
  steelWireUpdate,
} from "@/api/manufacture/changeWireForm";
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
    model: {
      type: String,
      default: "",
    },
  },
  components: { dialogSelectPersonnel },
  data() {
    return {
      employeeDialogVisible: false,
      form: {
        userName:""
      },
    };
  },
  created() {},
  mounted() {
    if (this.type != "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.form.userName = value.name;
        this.form.userId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getSteelWireByPageDetail({
        id: id,
      });
      this.form = res.data.data;
    },
    //保存
    async saveProducePlan() {
      let saveApi = "";
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.type == "add") {
        saveApi = steelWireSave;
      } else {
        saveApi = steelWireUpdate;
      }
      saveApi(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("操作成功");
            this.$router.back();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0px;
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
.el-input,
.el-select {
  width: 240px;
}
.el-table {
  /deep/th {
    padding: 0 !important;
  }
  .el-input,
  .el-select {
    width: 100%;
    /deep/.el-input__inner {
      text-align: center;
    }
  }
}
</style>
