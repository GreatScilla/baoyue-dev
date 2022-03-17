<template>
  <div>
    <el-dialog
      append-to-body
      title="备件数据详情"
      :visible.sync="dialogVisible"
      width="60%"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row class="D-flex">
        <el-col :span="14"
          ><div>
            <strong>● 调拨信息</strong>
          </div></el-col
        >
        <el-col :span="9" v-if="flag == '0'"
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="$emit('updateFalgC')"
              >编辑</el-button
            >
          </div></el-col
        >
        <el-col :span="10" v-else
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="$emit('updateFalg')"
              >取消编辑</el-button
            >
            <el-button type="primary" @click="editForm">保存编辑</el-button>
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
              <el-form-item label="备件编号" prop="equipmentCoding">
                <el-input v-model="ruleForm.equipmentCoding"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="备件名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="备件类别" prop="category">
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
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { updateSpareDatabase } from "@/api/shebei/InventoryManagement";
export default {
  name: "",
  components: {},
  props: {
    flag: {
      type: [String, Number, Object, Array]
    },
    detailAll: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      flag: null,
      dialogVisible: false,
      // 表单数据
      ruleForm: {},
      // 校验
      rules: {
        equipmentCoding: [
          { required: true, message: "设备编号不为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        category: [
          { required: true, message: "请输入设备类别", trigger: "blur" }
        ],
        model: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
        isDepreciation: [
          { required: true, message: "资产不为空", trigger: "blur" }
        ]
      }
    };
  },
  activated() {},
  watch: {
    detailAll(val) {
      this.ruleForm = val;
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateVisible() {
      this.$emit("updateEdit");
      this.dialogVisible = false;
    },
    detailialogClosed() {
      this.$refs.ruleForm.resetFields();
    },
    // 编辑
    async editForm() {
      const { data: res } = await updateSpareDatabase(this.ruleForm);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      this.updateVisible();
    }
  },
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/ .D-flex .grid-content {
  display: flex;
  justify-content: flex-end;
}
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
