
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
      <el-row v-if="type !== 'add'">
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
          <el-form-item label="化验室编号:">
            <span>{{ form.labNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="labName" label="化验室名称:">
            <span v-if="type === 'detail'">{{ form.labName }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.labName"
              placeholder="请输入化验室名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人:">
            <span v-if="type === 'detail'">{{ form.principalUserName }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.principalUserName"
              suffix-icon="el-icon-search"
              @focus="checkUserVisible = true"
              placeholder="请输入负责人"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="化验室描述:">
            <span v-if="type === 'detail'">{{ form.description }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.description"
              placeholder="请输入化验室描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="labAddress" label="化验室位置:">
            <span v-if="type === 'detail'">{{ form.labAddress }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.labAddress"
              placeholder="请输入化验室位置"
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
    <!-- 选择弹窗 -->
    <leadingCadre
      title="负责人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />
  </div>
</template>

<script>
import { saveOrUpdateLab } from "@/api/quality/index";
import leadingCadre from "@/components/quality/leadingCadre";
export default {
  components: { leadingCadre },
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
      checkUserVisible: false,
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
        labName: [{ required: true, message: "请输入", trigger: "blur" }],
        labAddress: [{ required: true, message: "请输入", trigger: "blur" }],
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
    //选择负责人
    addUser(info) {
      console.log(info);
      this.form.principalUserId = info.id;
      this.form.principalUserName = info.name;
    },
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
        saveOrUpdateLab(tag, this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/quality/laboratory");
          }
        });
      } else {
        tag = 1;
        saveOrUpdateLab(tag, this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/quality/laboratory");
          }
        });
      }
    },
    handleBack() {
      this.$router.push("/quality/laboratory");
    },
  },
};
</script>
<style src="../common.css"  scoped>
</style>
