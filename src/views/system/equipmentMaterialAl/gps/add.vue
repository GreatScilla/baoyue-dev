// gps新增、修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      :rules="rules"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="type !== 'add'" class="deatilsColumn">
            <el-form-item label="设备编号" prop="deviceSn">
              <span>{{ form.deviceSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item required label="接口地址" prop="url">
              <span v-if="type === 'detail'">{{ form.url }}</span>
              <el-input v-else size="small" v-model="form.url"></el-input>
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
          @click="saveData"
          >保存</el-button
        >
      </el-row>
    </el-form>
  </basic-container>
</template>

<script>
import { submit, detailList } from "@/api/equipmentMaterialAl/gps";
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
      form: {},
    };
  },
  async created() {
    if (this.type !== "add") {
      const res = await detailList(this.data.id);
      this.form = res.data.data;
    }
  },
  computed: {},
  methods: {
    async saveData() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      submit(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("保存成功");
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
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
