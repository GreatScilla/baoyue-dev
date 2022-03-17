新增类型
<template>
  <div>
    <el-dialog append-to-body :visible.sync="show" :title="title" @close="handleCancel">
      <el-form :model="addForm" label-width="80px" :fullscreen="true">
        <el-form-item label="类型编码">
          <el-input v-model="addForm.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item v-if="type !== 'detail'">
          <el-button size="small" type="primary" @click="submit">保存</el-button>
          <el-button @click="handleCancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addErpSubType } from "@/api/salesManage/saleType";
import { getId } from "@/api/common";
export default {
  name: 'addType',
  props: {
    type: {
      type: String,
      default: '销售'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '类型新增',
      showAdds: false,
      addForm: {
        number: '',
        name: ''
      }
    }
  },
  mounted () {
    // this.getOrderSn()
  },
  methods: {
    async getOrderSn () { // 获取单据编号
      let name = ''
      if (this.type === 1) {
        name =  '采购类型'
      } else if (this.type === 3) {
        name = '销售类型'
      }
      const res = await getId({codeName: name})
      this.addForm.number = res.data.data
    },
    async submit () {
        const params = {
          ...this.addForm,
          type: this.type
        }
        const data = await addErpSubType(params)
        this.$message.success({
          message: '操作成功'
        })
        this.showAdds = false
        this.$emit('on-refresh')
    },
    handleCancel () {
      this.$emit('on-close')
    }
  }
}
</script>