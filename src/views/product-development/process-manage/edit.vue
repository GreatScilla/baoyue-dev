<template>
  <div>
    <add-process-manage type="edit" :data="data"></add-process-manage>
  </div>
</template>

<script>
import  addProcessManage from './add'
export default {
  name: 'processManageEdit',
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