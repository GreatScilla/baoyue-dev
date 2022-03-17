<template>
  <div>
    <el-dialog
      append-to-body
      title="新增设备数据"
      :visible.sync="dialogVisible"
      width="60%"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple-dark">
            <strong>● 基本信息</strong>
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary" @click="addForm">保存</el-button>
          </div></el-col
        >
      </el-row>
      <el-divider></el-divider>

      <el-form
        inline
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 1 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="设备编号" prop="equipmentCoding">
                <el-input v-model="ruleForm.equipmentCoding"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="设备类别" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择">
                  <el-option
                    v-for="item in categoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 2 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="规格型号" prop="model">
                <el-input v-model="ruleForm.model"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="单位" class="item-l">
                <el-select
                  class="select"
                  v-model="ruleForm.unit"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in unitOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="是否转资产"
                prop="isDepreciation"
                class="item-min"
              >
                <el-select
                  class="select"
                  v-model="ruleForm.isDepreciation"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isDepreciationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="库存下限" class="item-a">
                <el-input v-model="ruleForm.amountMin"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="库存上限" class="item-a">
                <el-input v-model="ruleForm.amountMax"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="保养标准" class="item-b">
                <el-select
                  class="select"
                  v-model="ruleForm.upkeep"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in upkeepOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 4 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-form-item label="点检标准" class="item-a">
                <el-select
                  class="select"
                  v-model="ruleForm.check"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in checkOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addEviceDatabase } from "@/api/shebei/InventoryManagement";

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      // 表单数据
      ruleForm: {
        equipmentCoding: "", //编号
        name: "", //名字
        category: "", //类别
        model: "", //型号
        unit: "", //单位
        isDepreciation: "", //转资产
        amountMin: "", //小
        amountMax: "", //大
        upkeep: "", //保养标准
        check: "" //点检标准
      },
      // 校验
      rules: {
        equipmentCoding: [
          { required: true, message: "设备编号不为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        category: [
          { required: true, message: "请输入设备类别", trigger: "blur" }
        ],
        model: [
          { required: true, message: "请输入规格型号", trigger: "blur" }
        ],
        isDepreciation: [
          { required: true, message: "资产不为空", trigger: "blur" }
        ]
      }
    };
  },
  activated() {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    updateVisible() {
      this.dialogVisible = false;
      this.$emit("addupdate");
    },
    detailialogClosed() {
      this.$refs.ruleForm.resetFields();
    },

    // 添加
    async addForm() {
      const { data: res } = await addEviceDatabase(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.updateVisible();
    }
  },
  computed: {}
};
</script>
<style scoped lang="scss">
.item-l {
  padding-left: 40px;
}
.select {
  width: 188px;
}
.item-a {
  // width: 100px;
  margin-left: 10px;
}
.item-b {
  // width: 100px;
  margin-left: 25px;
}
</style>
