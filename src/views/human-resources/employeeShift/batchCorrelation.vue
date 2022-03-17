// 同步班次
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :inline="true"
      :model="formInline"
    >
      <el-form-item label="班次:">
        <el-input
          size="small"
          v-model="formInline.user"
          placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <el-select size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工:">
        <el-input
          size="small"
          v-model="formInline.user"
          placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:40px;margin-top:-1px">
        <el-button size="small" type="primary">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col style="width:265px">
        <!-- 表格table -->
        <el-table :data="tableData" highlight-current-row :show-header="false" border>
          <el-table-column prop="name" align="center"> </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="17">
        <el-transfer v-model="value" :data="data"></el-transfer>
      </el-col>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </el-row>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData:[{
        name:'001'
      },{
        name:'002'
      },{
        name:'003'
      }]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {
    console.log(this.$route.query);
  }
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}
/deep/ .el-transfer{
  .el-transfer-panel{
    width:322px
  }
}
</style>
