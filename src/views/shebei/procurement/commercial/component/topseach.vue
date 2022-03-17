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
<!--          <el-col :span="8"><div class="grid-content bg-purple">-->
            <el-form-item label="供应商">
              <el-input
                v-model="ruleForm.supplierName"
                placeholder="请输入供应商名称"
              ></el-input>
            </el-form-item>
<!--          </div></el-col>-->

<!--          <el-col :span="8"><div class="grid-content bg-purple-light">-->
            <el-form-item label="开票日期">
              <el-date-picker
                v-model="ruleForm.numberDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="8"><div class="grid-content bg-purple">-->
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
import { getInvoiceOrderByPage } from "@/api/shebei/purchase";
export default {
  name: "",
  components: {},
  props: ["info"],
  data() {
    return {
      ruleForm: {
        numberDate: '',
        supplierName: ''
      }
    };
  },
  activated() {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async InfoQuery() {
      this.info.searchShow=false
      const { data: res } = await getInvoiceOrderByPage(this.ruleForm);
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
.el-date-editor {
  width: 215px;
}
/deep/ .el-form-item__content {
  width: 185px;
}
</style>
