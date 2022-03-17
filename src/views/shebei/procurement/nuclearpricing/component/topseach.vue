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

<!--          <el-col :span="6"><div class="grid-content bg-purple WH">-->
            <el-form-item label="供应商" >
              <el-select v-model="ruleForm.supplierName" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div=></el-col>-->

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

<!--          <el-col :span="4"><div class="grid-content bg-purple">-->
          <br>
            <el-button size="small" type="primary" @click="InfoQuery">查询</el-button>
            <el-button size="small" type="info" @click="resetForm">重置</el-button>
<!--          </div></el-col>-->
        </el-row>
      </el-form>


    </el-dialog>


  </div>
</template>
<script>
import { getPriceListByPage } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: ["info"],
  data() {
    return {
      ruleForm: {
        number: '',
        supplierName: '采购一部',
        numberDate: '',
      }
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
      const { data: res } = await getPriceListByPage(this.ruleForm);
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
<style scoped lang="scss" >
.el-date-editor {
  width: 185px;
}
.WH {
  /deep/ label {
    width: 83px !important;
  }
}
</style>
