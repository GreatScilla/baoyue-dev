<template>
  <div>
    <!-- 新增类型 -->
    <el-dialog
      :title="'新增' + label"
      width="30%"
      append-to-body
      :visible.sync="selectAddDialogVisible"
      :before-close="handleClose"
    >
      <el-form 
        :model="form"
        label-position="right"
        label-width="100px"
        ref="form"
        :rules="rules"
      >
        <el-form-item required :label="label + ':'" prop="name">
          <el-input
            size="small"
            v-model="form.name"
            :placeholder="'请输入' + label">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="confim">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {selectAddType} from "@/api/common"
import { getDictionary } from "@/api/system/dictbiz";
export default {
  name: 'select-add',
  props:{
    selectAddDialogVisible:Boolean,
    label:String,
    code:String
  },
  data () {
    return {
      form:{
        name:''
      },
      rules:{
        name: [
          {required: true, message: '请输入', trigger: ['blur', 'change']}
        ],
      }
    }
  },
  methods: {
    // 确定
    confim(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.code = this.code
          selectAddType(this.form)
          .then(res => {
            if (res.data.success) {
              this.$message.success('操作成功')
              this.closeInitDialog()
              this.$emit('transmitSelectAdd','addSuccess')
            }
          })
        } else {
          return false
        }
      }) 
    },
    // 取消
    cancel(){
      this.closeInitDialog()
    },
    // 关闭
    handleClose(){
      this.closeInitDialog()
    },
    // 表单初始
    closeInitDialog(){
      this.$refs.form.resetFields()
      this.$emit('transmitSelectAdd',this.selectAddDialogVisible = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width:240px
}
</style>