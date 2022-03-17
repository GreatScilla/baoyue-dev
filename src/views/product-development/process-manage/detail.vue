<template>
  <div>
    <add-process-manage type="detail" :data="data"></add-process-manage>
  </div>
</template>

<script>
import  addProcessManage from './add'
export default {
  name: 'processManageDetail',
  components: {
    addProcessManage
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>