<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
      <el-form>
        <el-form-item label="方式编码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="方式名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addType',
  data () {
    return {
      title: '结算方式新增',
      visible: false
    }
  }
}
</script>