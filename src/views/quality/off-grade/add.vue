
<template>
  <div class="handlePages addPages">
    <el-row>
      <div class="title">基础数据</div>
      <el-divider></el-divider>
    </el-row>
    <el-form
      :model="form"
      :show-message="false"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态:">
            <el-select
              class="iptWidth"
              v-model="form.status"
              placeholder="请选择"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="traitName" label="特征名称:">
            <span v-if="type === 'detail'">{{ form.traitName }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.traitName"
              placeholder="请输入特征名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="描述:">
            <span v-if="type === 'detail'">{{ form.description }}</span>
            <el-input
              v-else
              v-model="form.description"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="备注:">
            <span v-if="type === 'detail'">{{ form.remark }}</span>
            <el-input
              v-else
              v-model="form.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer-box margin_30">
        <div v-if="type !== 'detail'">
          <el-button @click="handleBack" size="small">取消</el-button>
          <el-button type="primary" @click="submit" size="small"
            >保存</el-button
          >
        </div>
        <el-button v-else type="primary" size="small" @click="handleBack"
          >返回</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdateFailTrait } from "@/api/quality/index";
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
      options: [
        {
          value: 1,
          label: "生效",
        },
        {
          value: 0,
          label: "失效",
        },
      ],
      rules: {
        traitName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {},
  async created() {
    if (this.type !== "add") {
      this.form = this.data;
    }
  },
  mounted() {},
  methods: {
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let tag = "";
      console.log(this.form);
      if (this.type === "add") {
        tag = 0;
        saveOrUpdateFailTrait(tag, this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/quality/off-grade");
          }
        });
      } else {
        tag = 1;
        saveOrUpdateFailTrait(tag, this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/quality/off-grade");
          }
        });
      }
    },
    handleBack() {
      this.$router.push("/quality/off-grade");
    },
  },
};
</script>
<style src="../common.css"  scoped>
</style>
