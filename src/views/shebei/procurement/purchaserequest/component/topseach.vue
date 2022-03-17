<template>
  <div>

    <el-dialog
      title="条件搜索"
      :visible.sync="info.searchShow"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">

      <el-form ref="form" inline :model="ruleForm" label-width="80px">
        <el-row>
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="单据编号">
              <el-input
                v-model="ruleForm.number"
                placeholder="请输入单据编号"
              ></el-input>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="申请人">
              <el-select v-model="ruleForm.purchaseMan" placeholder="请选择">
                <el-option
                  v-for="item in purchaseManOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="6"><div class="grid-content bg-purple-light">-->
            <el-form-item label="单据日期">
              <el-date-picker
                v-model="ruleForm.numberDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
          <br>
            <el-button type="primary" @click="InfoQuery" size="small">查询</el-button>
            <el-button type="info" @click="resetForm" size="small">重置</el-button>
<!--          </div></el-col>-->
        </el-row>
      </el-form>


    </el-dialog>

  </div>
</template>
<script>
import { getPurchase } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: ["info"],
  data() {
    return {
        ruleForm: {}
    };
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {

    async InfoQuery() {
      this.info.searchShow=false
      const { data: res } = await getPurchase(this.ruleForm);
      this.$emit("updateTab", res.data);
    },
    // 重置
    resetForm() {
      this.ruleForm = {};
      this.InfoQuery();
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item__content {
  width: 185px;
}
.el-date-editor {
  width: 215px;
}
</style>
